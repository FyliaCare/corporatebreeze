// History Management with Undo/Redo

import { CanvasState, HistoryCommand } from './types'

export class HistoryManager {
  private undoStack: HistoryCommand[] = []
  private redoStack: HistoryCommand[] = []
  private maxHistorySize: number = 50

  // Add command to history
  addCommand(command: HistoryCommand): void {
    this.undoStack.push(command)
    this.redoStack = [] // Clear redo stack when new action is performed

    // Limit history size
    if (this.undoStack.length > this.maxHistorySize) {
      this.undoStack.shift()
    }
  }

  // Can undo
  canUndo(): boolean {
    return this.undoStack.length > 0
  }

  // Can redo
  canRedo(): boolean {
    return this.redoStack.length > 0
  }

  // Get undo command
  undo(): HistoryCommand | null {
    const command = this.undoStack.pop()
    if (command) {
      this.redoStack.push(command)
      return command
    }
    return null
  }

  // Get redo command
  redo(): HistoryCommand | null {
    const command = this.redoStack.pop()
    if (command) {
      this.undoStack.push(command)
      return command
    }
    return null
  }

  // Clear history
  clear(): void {
    this.undoStack = []
    this.redoStack = []
  }

  // Get history state
  getState(): { canUndo: boolean, canRedo: boolean, undoCount: number, redoCount: number } {
    return {
      canUndo: this.canUndo(),
      canRedo: this.canRedo(),
      undoCount: this.undoStack.length,
      redoCount: this.redoStack.length
    }
  }
}

// Create history commands
export class CommandFactory {
  
  static createAddCommand(elementIds: string[], canvas: CanvasState): HistoryCommand {
    return {
      type: 'add',
      elementIds,
      afterState: canvas.elements.filter(el => elementIds.includes(el.id)),
      timestamp: Date.now()
    }
  }

  static createDeleteCommand(elementIds: string[], beforeCanvas: CanvasState): HistoryCommand {
    return {
      type: 'delete',
      elementIds,
      beforeState: beforeCanvas.elements.filter(el => elementIds.includes(el.id)),
      timestamp: Date.now()
    }
  }

  static createMoveCommand(
    elementIds: string[],
    beforeCanvas: CanvasState,
    afterCanvas: CanvasState
  ): HistoryCommand {
    return {
      type: 'move',
      elementIds,
      beforeState: beforeCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, transform: el.transform })),
      afterState: afterCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, transform: el.transform })),
      timestamp: Date.now()
    }
  }

  static createResizeCommand(
    elementIds: string[],
    beforeCanvas: CanvasState,
    afterCanvas: CanvasState
  ): HistoryCommand {
    return {
      type: 'resize',
      elementIds,
      beforeState: beforeCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, transform: el.transform })),
      afterState: afterCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, transform: el.transform })),
      timestamp: Date.now()
    }
  }

  static createRotateCommand(
    elementIds: string[],
    beforeCanvas: CanvasState,
    afterCanvas: CanvasState
  ): HistoryCommand {
    return {
      type: 'rotate',
      elementIds,
      beforeState: beforeCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, rotation: el.transform.rotation })),
      afterState: afterCanvas.elements
        .filter(el => elementIds.includes(el.id))
        .map(el => ({ id: el.id, rotation: el.transform.rotation })),
      timestamp: Date.now()
    }
  }

  static createStyleCommand(
    elementIds: string[],
    beforeCanvas: CanvasState,
    afterCanvas: CanvasState
  ): HistoryCommand {
    return {
      type: 'style',
      elementIds,
      beforeState: beforeCanvas.elements.filter(el => elementIds.includes(el.id)),
      afterState: afterCanvas.elements.filter(el => elementIds.includes(el.id)),
      timestamp: Date.now()
    }
  }

  static createReorderCommand(
    beforeCanvas: CanvasState,
    afterCanvas: CanvasState
  ): HistoryCommand {
    return {
      type: 'reorder',
      elementIds: afterCanvas.elements.map(el => el.id),
      beforeState: beforeCanvas.elements.map(el => ({ id: el.id, zIndex: el.zIndex })),
      afterState: afterCanvas.elements.map(el => ({ id: el.id, zIndex: el.zIndex })),
      timestamp: Date.now()
    }
  }
}
