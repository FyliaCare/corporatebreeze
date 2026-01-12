/**
 * Mockup System for Product Visualization
 * Provides templates and utilities for projecting designs onto mockup products
 */

export type MockupType = 't-shirt' | 'mug' | 'poster' | 'hoodie' | 'tote-bag' | 'business-card'

export interface MockupPoint {
  x: number
  y: number
}

export interface MockupTransformArea {
  topLeft: MockupPoint
  topRight: MockupPoint
  bottomLeft: MockupPoint
  bottomRight: MockupPoint
}

export interface MockupTemplate {
  id: string
  name: string
  type: MockupType
  category: string
  thumbnail: string
  mockupImage: string // Background product image
  width: number // Mockup canvas width
  height: number // Mockup canvas height
  printArea: MockupTransformArea // Quadrilateral area for design projection
  aspectRatio: number // Recommended design aspect ratio
  description: string
  perspective?: boolean // Whether to apply perspective transformation
  curveIntensity?: number // For curved surfaces (0-1)
}

export const MOCKUP_TEMPLATES: MockupTemplate[] = [
  // T-Shirts
  {
    id: 'tshirt-white-front',
    name: 'White T-Shirt (Front)',
    type: 't-shirt',
    category: 'Apparel',
    thumbnail: '/mockups/tshirt-white-thumb.png',
    mockupImage: '/mockups/tshirt-white-front.png',
    width: 800,
    height: 1000,
    printArea: {
      topLeft: { x: 275, y: 320 },
      topRight: { x: 525, y: 320 },
      bottomLeft: { x: 275, y: 620 },
      bottomRight: { x: 525, y: 620 }
    },
    aspectRatio: 1,
    description: 'Classic white t-shirt with centered print area',
    perspective: false
  },
  {
    id: 'tshirt-black-front',
    name: 'Black T-Shirt (Front)',
    type: 't-shirt',
    category: 'Apparel',
    thumbnail: '/mockups/tshirt-black-thumb.png',
    mockupImage: '/mockups/tshirt-black-front.png',
    width: 800,
    height: 1000,
    printArea: {
      topLeft: { x: 275, y: 320 },
      topRight: { x: 525, y: 320 },
      bottomLeft: { x: 275, y: 620 },
      bottomRight: { x: 525, y: 620 }
    },
    aspectRatio: 1,
    description: 'Classic black t-shirt with centered print area',
    perspective: false
  },

  // Mugs
  {
    id: 'mug-white-11oz',
    name: 'White Mug (11oz)',
    type: 'mug',
    category: 'Drinkware',
    thumbnail: '/mockups/mug-white-thumb.png',
    mockupImage: '/mockups/mug-white-11oz.png',
    width: 900,
    height: 700,
    printArea: {
      topLeft: { x: 320, y: 200 },
      topRight: { x: 580, y: 220 },
      bottomLeft: { x: 320, y: 480 },
      bottomRight: { x: 580, y: 500 }
    },
    aspectRatio: 1.2,
    description: '11oz ceramic mug with curved print area',
    perspective: true,
    curveIntensity: 0.3
  },
  {
    id: 'mug-black-11oz',
    name: 'Black Mug (11oz)',
    type: 'mug',
    category: 'Drinkware',
    thumbnail: '/mockups/mug-black-thumb.png',
    mockupImage: '/mockups/mug-black-11oz.png',
    width: 900,
    height: 700,
    printArea: {
      topLeft: { x: 320, y: 200 },
      topRight: { x: 580, y: 220 },
      bottomLeft: { x: 320, y: 480 },
      bottomRight: { x: 580, y: 500 }
    },
    aspectRatio: 1.2,
    description: '11oz ceramic mug with curved print area',
    perspective: true,
    curveIntensity: 0.3
  },

  // Posters
  {
    id: 'poster-framed-18x24',
    name: 'Framed Poster (18×24")',
    type: 'poster',
    category: 'Wall Art',
    thumbnail: '/mockups/poster-framed-thumb.png',
    mockupImage: '/mockups/poster-framed-18x24.png',
    width: 1000,
    height: 1333,
    printArea: {
      topLeft: { x: 200, y: 150 },
      topRight: { x: 800, y: 150 },
      bottomLeft: { x: 200, y: 1183 },
      bottomRight: { x: 800, y: 1183 }
    },
    aspectRatio: 0.75, // 18:24 ratio
    description: 'Framed poster with slight perspective',
    perspective: true,
    curveIntensity: 0
  },
  {
    id: 'poster-unframed-24x36',
    name: 'Poster (24×36")',
    type: 'poster',
    category: 'Wall Art',
    thumbnail: '/mockups/poster-unframed-thumb.png',
    mockupImage: '/mockups/poster-unframed-24x36.png',
    width: 1000,
    height: 1500,
    printArea: {
      topLeft: { x: 150, y: 100 },
      topRight: { x: 850, y: 100 },
      bottomLeft: { x: 150, y: 1400 },
      bottomRight: { x: 850, y: 1400 }
    },
    aspectRatio: 0.67, // 24:36 ratio
    description: 'Unframed poster with flat display',
    perspective: false
  },

  // Hoodies
  {
    id: 'hoodie-gray-front',
    name: 'Gray Hoodie (Front)',
    type: 'hoodie',
    category: 'Apparel',
    thumbnail: '/mockups/hoodie-gray-thumb.png',
    mockupImage: '/mockups/hoodie-gray-front.png',
    width: 800,
    height: 1000,
    printArea: {
      topLeft: { x: 250, y: 380 },
      topRight: { x: 550, y: 380 },
      bottomLeft: { x: 250, y: 680 },
      bottomRight: { x: 550, y: 680 }
    },
    aspectRatio: 1,
    description: 'Comfortable hoodie with centered print area',
    perspective: false
  },

  // Tote Bags
  {
    id: 'tote-natural-canvas',
    name: 'Natural Canvas Tote',
    type: 'tote-bag',
    category: 'Bags',
    thumbnail: '/mockups/tote-natural-thumb.png',
    mockupImage: '/mockups/tote-natural-canvas.png',
    width: 800,
    height: 900,
    printArea: {
      topLeft: { x: 250, y: 280 },
      topRight: { x: 550, y: 280 },
      bottomLeft: { x: 250, y: 580 },
      bottomRight: { x: 550, y: 580 }
    },
    aspectRatio: 1,
    description: 'Eco-friendly canvas tote bag',
    perspective: false
  },

  // Business Cards
  {
    id: 'business-card-standard',
    name: 'Business Card (Standard)',
    type: 'business-card',
    category: 'Stationery',
    thumbnail: '/mockups/business-card-thumb.png',
    mockupImage: '/mockups/business-card-mockup.png',
    width: 1200,
    height: 800,
    printArea: {
      topLeft: { x: 350, y: 280 },
      topRight: { x: 850, y: 260 },
      bottomLeft: { x: 370, y: 520 },
      bottomRight: { x: 870, y: 500 }
    },
    aspectRatio: 1.75, // 3.5:2 standard business card ratio
    description: 'Standard business card (3.5×2")',
    perspective: true,
    curveIntensity: 0.1
  }
]

export class MockupProjection {
  /**
   * Apply perspective transformation to project a design onto a mockup area
   */
  static projectToMockup(
    sourceCanvas: HTMLCanvasElement,
    targetArea: MockupTransformArea,
    perspective: boolean = false,
    curveIntensity: number = 0
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get canvas context')

    // Calculate target dimensions
    const width = Math.max(
      targetArea.topRight.x - targetArea.topLeft.x,
      targetArea.bottomRight.x - targetArea.bottomLeft.x
    )
    const height = Math.max(
      targetArea.bottomLeft.y - targetArea.topLeft.y,
      targetArea.bottomRight.y - targetArea.topRight.y
    )

    canvas.width = width
    canvas.height = height

    if (perspective) {
      // Apply perspective transformation using matrix
      this.applyPerspectiveTransform(ctx, sourceCanvas, targetArea, curveIntensity)
    } else {
      // Simple scaling
      ctx.drawImage(sourceCanvas, 0, 0, width, height)
    }

    return canvas
  }

  /**
   * Apply perspective transformation matrix
   */
  private static applyPerspectiveTransform(
    ctx: CanvasRenderingContext2D,
    sourceCanvas: HTMLCanvasElement,
    area: MockupTransformArea,
    curveIntensity: number
  ): void {
    // For curved surfaces (like mugs), we need to apply a horizontal curve
    if (curveIntensity > 0) {
      this.applyCurvedTransform(ctx, sourceCanvas, area, curveIntensity)
      return
    }

    // Standard perspective transform using homography
    // This is a simplified version - for production, use a proper transformation library
    const sw = sourceCanvas.width
    const sh = sourceCanvas.height

    // Calculate transformation matrix
    const tl = area.topLeft
    const tr = area.topRight
    const bl = area.bottomLeft
    const br = area.bottomRight

    // Simple approach: divide into triangles and transform
    // Top triangle
    ctx.save()
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(sw, 0)
    ctx.lineTo(sw / 2, sh / 2)
    ctx.closePath()
    ctx.clip()
    
    // This is a placeholder - proper perspective requires matrix calculations
    ctx.drawImage(sourceCanvas, 0, 0, sw, sh)
    ctx.restore()
  }

  /**
   * Apply curved transformation for cylindrical surfaces (mugs, bottles)
   */
  private static applyCurvedTransform(
    ctx: CanvasRenderingContext2D,
    sourceCanvas: HTMLCanvasElement,
    area: MockupTransformArea,
    intensity: number
  ): void {
    const sw = sourceCanvas.width
    const sh = sourceCanvas.height
    const width = area.topRight.x - area.topLeft.x
    const height = area.bottomLeft.y - area.topLeft.y

    // Draw source to temporary canvas
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = sw
    tempCanvas.height = sh
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCtx.drawImage(sourceCanvas, 0, 0)

    // Apply horizontal curve by sampling vertical strips
    const strips = 50
    const stripWidth = sw / strips

    for (let i = 0; i < strips; i++) {
      const x = i * stripWidth
      const normalizedX = (i / strips) * 2 - 1 // -1 to 1
      
      // Calculate vertical offset based on curve
      const curve = Math.sin(normalizedX * Math.PI) * intensity * height * 0.1
      
      // Draw strip with offset
      ctx.drawImage(
        tempCanvas,
        x, 0, stripWidth, sh, // source
        (x / sw) * width, curve, (stripWidth / sw) * width, height // destination
      )
    }
  }

  /**
   * Generate a mockup preview with design projected onto product
   */
  static generateMockupPreview(
    template: MockupTemplate,
    designCanvas: HTMLCanvasElement,
    width: number = 400,
    height: number = 500
  ): string {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''

    // Scale factor
    const scale = Math.min(width / template.width, height / template.height)

    // Draw mockup background (product image)
    // Note: In production, you'd load the actual image
    ctx.fillStyle = '#f5f5f5'
    ctx.fillRect(0, 0, width, height)
    
    // Draw placeholder for mockup image
    ctx.fillStyle = '#e0e0e0'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = '#666'
    ctx.font = '14px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(template.name, width / 2, height / 2)
    ctx.fillText('Mockup Preview', width / 2, height / 2 + 20)

    // Project design onto print area
    const projected = this.projectToMockup(
      designCanvas,
      template.printArea,
      template.perspective,
      template.curveIntensity
    )

    // Scale and position the projected design
    const printArea = template.printArea
    const px = printArea.topLeft.x * scale
    const py = printArea.topLeft.y * scale
    const pw = (printArea.topRight.x - printArea.topLeft.x) * scale
    const ph = (printArea.bottomLeft.y - printArea.topLeft.y) * scale

    ctx.drawImage(projected, px, py, pw, ph)

    return canvas.toDataURL('image/png')
  }

  /**
   * Get recommended canvas dimensions for a mockup template
   */
  static getRecommendedCanvasDimensions(template: MockupTemplate): { width: number; height: number } {
    const area = template.printArea
    const width = Math.max(
      area.topRight.x - area.topLeft.x,
      area.bottomRight.x - area.bottomLeft.x
    )
    const height = Math.max(
      area.bottomLeft.y - area.topLeft.y,
      area.bottomRight.y - area.topRight.y
    )

    return { width: Math.round(width), height: Math.round(height) }
  }
}

/**
 * Utility to filter mockups by type/category
 */
export class MockupFilter {
  static byType(type: MockupType): MockupTemplate[] {
    return MOCKUP_TEMPLATES.filter(m => m.type === type)
  }

  static byCategory(category: string): MockupTemplate[] {
    return MOCKUP_TEMPLATES.filter(m => m.category === category)
  }

  static getCategories(): string[] {
    return Array.from(new Set(MOCKUP_TEMPLATES.map(m => m.category)))
  }

  static getTypes(): MockupType[] {
    return Array.from(new Set(MOCKUP_TEMPLATES.map(m => m.type)))
  }

  static search(query: string): MockupTemplate[] {
    const q = query.toLowerCase()
    return MOCKUP_TEMPLATES.filter(m => 
      m.name.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q)
    )
  }
}
