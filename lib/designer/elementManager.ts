// Canvas Element Management Algorithms

import { CanvasElement, Point, Transform, CanvasState } from './types'

export class ElementManager {
  
  // Generate unique ID for elements
  static generateId(): string {
    return `el_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Add element to canvas
  static addElement(canvas: CanvasState, element: CanvasElement): CanvasState {
    const maxZIndex = Math.max(0, ...canvas.elements.map(el => el.zIndex))
    const newElement = { ...element, zIndex: maxZIndex + 1 }
    
    return {
      ...canvas,
      elements: [...canvas.elements, newElement]
    }
  }

  // Delete elements by IDs
  static deleteElements(canvas: CanvasState, ids: string[]): CanvasState {
    const idsSet = new Set(ids)
    return {
      ...canvas,
      elements: canvas.elements.filter(el => !idsSet.has(el.id))
    }
  }

  // Update element properties
  static updateElement(canvas: CanvasState, id: string, updates: Partial<CanvasElement>): CanvasState {
    return {
      ...canvas,
      elements: canvas.elements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    }
  }

  // Update multiple elements
  static updateElements(canvas: CanvasState, updates: { id: string, data: Partial<CanvasElement> }[]): CanvasState {
    const updateMap = new Map(updates.map(u => [u.id, u.data]))
    
    return {
      ...canvas,
      elements: canvas.elements.map(el => 
        updateMap.has(el.id) ? { ...el, ...updateMap.get(el.id) } : el
      )
    }
  }

  // Get element by ID
  static getElement(canvas: CanvasState, id: string): CanvasElement | undefined {
    return canvas.elements.find(el => el.id === id)
  }

  // Get elements by IDs
  static getElements(canvas: CanvasState, ids: string[]): CanvasElement[] {
    const idsSet = new Set(ids)
    return canvas.elements.filter(el => idsSet.has(el.id))
  }

  // Reorder elements (change z-index)
  static reorderElement(canvas: CanvasState, id: string, direction: 'front' | 'forward' | 'backward' | 'back'): CanvasState {
    const element = canvas.elements.find(el => el.id === id)
    if (!element) return canvas

    let newElements = [...canvas.elements]
    const currentIndex = newElements.indexOf(element)

    switch (direction) {
      case 'front':
        // Move to front (highest z-index)
        newElements = newElements.filter(el => el.id !== id)
        newElements.push(element)
        break
      
      case 'back':
        // Move to back (lowest z-index)
        newElements = newElements.filter(el => el.id !== id)
        newElements.unshift(element)
        break
      
      case 'forward':
        // Move one layer up
        if (currentIndex < newElements.length - 1) {
          [newElements[currentIndex], newElements[currentIndex + 1]] = 
          [newElements[currentIndex + 1], newElements[currentIndex]]
        }
        break
      
      case 'backward':
        // Move one layer down
        if (currentIndex > 0) {
          [newElements[currentIndex], newElements[currentIndex - 1]] = 
          [newElements[currentIndex - 1], newElements[currentIndex]]
        }
        break
    }

    // Reassign z-indices based on order
    newElements = newElements.map((el, index) => ({ ...el, zIndex: index }))

    return { ...canvas, elements: newElements }
  }

  // Duplicate elements
  static duplicateElements(canvas: CanvasState, ids: string[]): { canvas: CanvasState, newIds: string[] } {
    const elementsToDuplicate = this.getElements(canvas, ids)
    const newIds: string[] = []
    let newCanvas = canvas

    elementsToDuplicate.forEach(el => {
      const newId = this.generateId()
      newIds.push(newId)
      
      const duplicated: CanvasElement = {
        ...el,
        id: newId,
        name: `${el.name} Copy`,
        transform: {
          ...el.transform,
          x: el.transform.x + 20,
          y: el.transform.y + 20
        }
      }
      
      newCanvas = this.addElement(newCanvas, duplicated)
    })

    return { canvas: newCanvas, newIds }
  }

  // Group elements
  static groupElements(canvas: CanvasState, ids: string[]): { canvas: CanvasState, groupId: string } {
    if (ids.length < 2) return { canvas, groupId: '' }

    const elements = this.getElements(canvas, ids)
    const bounds = TransformUtils.getGroupBounds(elements)
    
    const groupId = this.generateId()
    const groupElement: CanvasElement = {
      id: groupId,
      type: 'group',
      name: 'Group',
      transform: {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: Math.max(...elements.map(el => el.zIndex)),
      childIds: ids
    }

    // Update children to reference parent
    let newCanvas = canvas
    ids.forEach(id => {
      newCanvas = this.updateElement(newCanvas, id, { parentId: groupId })
    })

    newCanvas = this.addElement(newCanvas, groupElement)
    return { canvas: newCanvas, groupId }
  }

  // Ungroup elements
  static ungroupElements(canvas: CanvasState, groupId: string): CanvasState {
    const group = this.getElement(canvas, groupId)
    if (!group || group.type !== 'group' || !group.childIds) return canvas

    // Remove parent reference from children
    let newCanvas = canvas
    group.childIds.forEach(childId => {
      newCanvas = this.updateElement(newCanvas, childId, { parentId: undefined })
    })

    // Delete the group
    newCanvas = this.deleteElements(newCanvas, [groupId])
    return newCanvas
  }

  // Get all children of a group (including nested)
  static getGroupChildren(canvas: CanvasState, groupId: string, recursive: boolean = true): CanvasElement[] {
    const group = this.getElement(canvas, groupId)
    if (!group || !group.childIds) return []

    let children = group.childIds.map(id => this.getElement(canvas, id)).filter(Boolean) as CanvasElement[]
    
    if (recursive) {
      const nestedChildren = children.filter(el => el.type === 'group').flatMap(g => 
        this.getGroupChildren(canvas, g.id, true)
      )
      children = [...children, ...nestedChildren]
    }

    return children
  }

  // Check if element is in a group
  static isInGroup(element: CanvasElement): boolean {
    return !!element.parentId
  }

  // Get top-level parent (root group) of an element
  static getRootParent(canvas: CanvasState, elementId: string): CanvasElement | undefined {
    const element = this.getElement(canvas, elementId)
    if (!element || !element.parentId) return element

    return this.getRootParent(canvas, element.parentId)
  }
}

export class TransformUtils {
  
  // Calculate bounding box for multiple elements
  static getGroupBounds(elements: CanvasElement[]): { x: number, y: number, width: number, height: number } {
    if (elements.length === 0) return { x: 0, y: 0, width: 0, height: 0 }

    const bounds = elements.map(el => this.getElementBounds(el))
    
    const minX = Math.min(...bounds.map(b => b.x))
    const minY = Math.min(...bounds.map(b => b.y))
    const maxX = Math.max(...bounds.map(b => b.x + b.width))
    const maxY = Math.max(...bounds.map(b => b.y + b.height))

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    }
  }

  // Get element bounds (considering rotation)
  static getElementBounds(element: CanvasElement): { x: number, y: number, width: number, height: number } {
    const { x, y, width, height, rotation } = element.transform
    
    if (rotation === 0) {
      return { x, y, width, height }
    }

    // Calculate rotated bounds
    const rad = (rotation * Math.PI) / 180
    const cos = Math.abs(Math.cos(rad))
    const sin = Math.abs(Math.sin(rad))
    
    const rotatedWidth = width * cos + height * sin
    const rotatedHeight = width * sin + height * cos
    
    return {
      x: x - (rotatedWidth - width) / 2,
      y: y - (rotatedHeight - height) / 2,
      width: rotatedWidth,
      height: rotatedHeight
    }
  }

  // Move elements by delta
  static moveElements(canvas: CanvasState, ids: string[], dx: number, dy: number): CanvasState {
    const updates = ids.map(id => {
      const element = ElementManager.getElement(canvas, id)
      if (!element) return null
      
      return {
        id,
        data: {
          transform: {
            ...element.transform,
            x: element.transform.x + dx,
            y: element.transform.y + dy
          }
        }
      }
    }).filter(Boolean) as { id: string, data: Partial<CanvasElement> }[]

    return ElementManager.updateElements(canvas, updates)
  }

  // Resize element
  static resizeElement(
    element: CanvasElement,
    handle: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w',
    dx: number,
    dy: number,
    maintainAspectRatio: boolean = false
  ): Transform {
    const { x, y, width, height, rotation, scaleX, scaleY } = element.transform
    let newTransform = { ...element.transform }

    const aspectRatio = width / height

    switch (handle) {
      case 'se': // Bottom-right
        if (maintainAspectRatio) {
          const newWidth = Math.max(10, width + dx)
          const newHeight = newWidth / aspectRatio
          newTransform.width = newWidth
          newTransform.height = newHeight
        } else {
          newTransform.width = Math.max(10, width + dx)
          newTransform.height = Math.max(10, height + dy)
        }
        break

      case 'sw': // Bottom-left
        if (maintainAspectRatio) {
          const newWidth = Math.max(10, width - dx)
          const newHeight = newWidth / aspectRatio
          newTransform.x = x + (width - newWidth)
          newTransform.width = newWidth
          newTransform.height = newHeight
        } else {
          newTransform.x = x + dx
          newTransform.width = Math.max(10, width - dx)
          newTransform.height = Math.max(10, height + dy)
        }
        break

      case 'ne': // Top-right
        if (maintainAspectRatio) {
          const newWidth = Math.max(10, width + dx)
          const newHeight = newWidth / aspectRatio
          newTransform.y = y + (height - newHeight)
          newTransform.width = newWidth
          newTransform.height = newHeight
        } else {
          newTransform.y = y + dy
          newTransform.width = Math.max(10, width + dx)
          newTransform.height = Math.max(10, height - dy)
        }
        break

      case 'nw': // Top-left
        if (maintainAspectRatio) {
          const newWidth = Math.max(10, width - dx)
          const newHeight = newWidth / aspectRatio
          newTransform.x = x + (width - newWidth)
          newTransform.y = y + (height - newHeight)
          newTransform.width = newWidth
          newTransform.height = newHeight
        } else {
          newTransform.x = x + dx
          newTransform.y = y + dy
          newTransform.width = Math.max(10, width - dx)
          newTransform.height = Math.max(10, height - dy)
        }
        break

      case 'n': // Top
        newTransform.y = y + dy
        newTransform.height = Math.max(10, height - dy)
        break

      case 's': // Bottom
        newTransform.height = Math.max(10, height + dy)
        break

      case 'e': // Right
        newTransform.width = Math.max(10, width + dx)
        break

      case 'w': // Left
        newTransform.x = x + dx
        newTransform.width = Math.max(10, width - dx)
        break
    }

    return newTransform
  }

  // Rotate element around center
  static rotateElement(element: CanvasElement, angle: number): Transform {
    return {
      ...element.transform,
      rotation: (element.transform.rotation + angle) % 360
    }
  }

  // Snap to grid
  static snapToGrid(value: number, gridSize: number): number {
    return Math.round(value / gridSize) * gridSize
  }

  // Snap point to grid
  static snapPointToGrid(point: Point, gridSize: number): Point {
    return {
      x: this.snapToGrid(point.x, gridSize),
      y: this.snapToGrid(point.y, gridSize)
    }
  }

  // Check if point is inside element bounds
  static isPointInElement(point: Point, element: CanvasElement): boolean {
    const { x, y, width, height } = element.transform
    return point.x >= x && point.x <= x + width && point.y >= y && point.y <= y + height
  }

  // Align elements
  static alignElements(
    canvas: CanvasState,
    ids: string[],
    alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom',
    alignTo: 'selection' | 'canvas' = 'selection'
  ): CanvasState {
    const elements = ElementManager.getElements(canvas, ids)
    if (elements.length === 0) return canvas

    // Calculate reference bounds - either canvas or selection bounds
    const bounds = alignTo === 'canvas'
      ? { x: 0, y: 0, width: canvas.width, height: canvas.height }
      : this.getGroupBounds(elements)
    
    const updates = elements.map(el => {
      let newX = el.transform.x
      let newY = el.transform.y

      switch (alignment) {
        case 'left':
          newX = bounds.x
          break
        case 'center':
          newX = bounds.x + (bounds.width - el.transform.width) / 2
          break
        case 'right':
          newX = bounds.x + bounds.width - el.transform.width
          break
        case 'top':
          newY = bounds.y
          break
        case 'middle':
          newY = bounds.y + (bounds.height - el.transform.height) / 2
          break
        case 'bottom':
          newY = bounds.y + bounds.height - el.transform.height
          break
      }

      return {
        id: el.id,
        data: {
          transform: { ...el.transform, x: newX, y: newY }
        }
      }
    })

    return ElementManager.updateElements(canvas, updates)
  }

  // Distribute elements
  static distributeElements(
    canvas: CanvasState,
    ids: string[],
    direction: 'horizontal' | 'vertical'
  ): CanvasState {
    const elements = ElementManager.getElements(canvas, ids)
    if (elements.length < 3) return canvas

    // Sort by position
    const sorted = [...elements].sort((a, b) => 
      direction === 'horizontal' 
        ? a.transform.x - b.transform.x 
        : a.transform.y - b.transform.y
    )

    const first = sorted[0]
    const last = sorted[sorted.length - 1]
    
    const totalSpace = direction === 'horizontal'
      ? (last.transform.x + last.transform.width) - first.transform.x
      : (last.transform.y + last.transform.height) - first.transform.y
    
    const totalElementSize = sorted.reduce((sum, el) => 
      sum + (direction === 'horizontal' ? el.transform.width : el.transform.height), 0
    )
    
    const spacing = (totalSpace - totalElementSize) / (sorted.length - 1)

    let currentPos = direction === 'horizontal' ? first.transform.x : first.transform.y

    const updates = sorted.map((el, index) => {
      if (index === 0 || index === sorted.length - 1) {
        return null // Don't move first and last
      }

      const size = direction === 'horizontal' ? el.transform.width : el.transform.height
      currentPos += spacing

      const data = direction === 'horizontal'
        ? { transform: { ...el.transform, x: currentPos } }
        : { transform: { ...el.transform, y: currentPos } }

      currentPos += size

      return { id: el.id, data }
    }).filter(Boolean) as { id: string, data: Partial<CanvasElement> }[]

    return ElementManager.updateElements(canvas, updates)
  }

  // Group elements
  static groupElements(canvas: CanvasState, elementIds: string[]): CanvasState {
    if (elementIds.length < 2) return canvas

    const elements = elementIds.map(id => ElementManager.getElement(canvas, id)).filter(Boolean) as CanvasElement[]
    if (elements.length < 2) return canvas

    // Calculate group bounds
    const bounds = TransformUtils.getGroupBounds(elements)
    
    // Create group element
    const groupId = ElementManager.generateId()
    const maxZIndex = Math.max(...elements.map(el => el.zIndex))
    
    const group: CanvasElement = {
      id: groupId,
      type: 'group',
      name: `Group ${canvas.elements.filter(el => el.type === 'group').length + 1}`,
      transform: {
        x: bounds.x,
        y: bounds.y,
        width: bounds.width,
        height: bounds.height,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: maxZIndex,
      childIds: elementIds
    }

    // Update children to reference parent and adjust their transforms to be relative
    const updatedElements = canvas.elements.map(el => {
      if (elementIds.includes(el.id)) {
        return {
          ...el,
          parentId: groupId,
          transform: {
            ...el.transform,
            x: el.transform.x - bounds.x,
            y: el.transform.y - bounds.y
          }
        }
      }
      return el
    })

    return {
      ...canvas,
      elements: [...updatedElements, group]
    }
  }

  // Ungroup elements
  static ungroupElements(canvas: CanvasState, groupId: string): CanvasState {
    const group = ElementManager.getElement(canvas, groupId)
    if (!group || group.type !== 'group' || !group.childIds) return canvas

    // Update children to remove parent reference and adjust transforms to be absolute
    const updatedElements = canvas.elements.map(el => {
      if (group.childIds?.includes(el.id)) {
        const { parentId, ...restEl } = el
        return {
          ...restEl,
          transform: {
            ...el.transform,
            x: el.transform.x + group.transform.x,
            y: el.transform.y + group.transform.y
          }
        }
      }
      return el
    }).filter(el => el.id !== groupId) // Remove the group itself

    return {
      ...canvas,
      elements: updatedElements
    }
  }
}
