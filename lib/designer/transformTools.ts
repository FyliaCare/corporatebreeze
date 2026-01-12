/**
 * Advanced Transform Tools
 * Professional transformation utilities for the design studio
 */

import { Point, Transform, CanvasElement } from './types'

// Transform origin presets
export type TransformOriginPreset = 
  | 'center'
  | 'top-left' | 'top-center' | 'top-right'
  | 'middle-left' | 'middle-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right'
  | 'custom';

export interface TransformOrigin {
  x: number;  // 0 = left, 0.5 = center, 1 = right
  y: number;  // 0 = top, 0.5 = center, 1 = bottom
}

// Skew configuration
export interface SkewConfig {
  x: number;  // Horizontal skew in degrees
  y: number;  // Vertical skew in degrees
}

// Perspective configuration
export interface PerspectiveConfig {
  value: number;     // Perspective value in pixels
  originX: number;   // 0-1, perspective origin X
  originY: number;   // 0-1, perspective origin Y
}

// Distribution options
export type DistributionType = 'horizontal' | 'vertical';
export type SpacingType = 'equal' | 'gaps';

// Alignment options
export type HorizontalAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'top' | 'middle' | 'bottom';

// Transform constraint options
export interface TransformConstraints {
  lockAspectRatio: boolean;
  maintainProportions: boolean;
  snapAngle: number;  // Snap rotation to increments (e.g., 15, 45, 90)
  snapPosition: number;  // Snap position to grid
}

// ============================================
// TRANSFORM ORIGIN UTILITIES
// ============================================

export const TRANSFORM_ORIGIN_PRESETS: Record<TransformOriginPreset, TransformOrigin> = {
  'center': { x: 0.5, y: 0.5 },
  'top-left': { x: 0, y: 0 },
  'top-center': { x: 0.5, y: 0 },
  'top-right': { x: 1, y: 0 },
  'middle-left': { x: 0, y: 0.5 },
  'middle-right': { x: 1, y: 0.5 },
  'bottom-left': { x: 0, y: 1 },
  'bottom-center': { x: 0.5, y: 1 },
  'bottom-right': { x: 1, y: 1 },
  'custom': { x: 0.5, y: 0.5 }
};

export function getTransformOriginPoint(
  element: CanvasElement,
  origin: TransformOrigin
): Point {
  const { transform } = element;
  return {
    x: transform.x + transform.width * origin.x,
    y: transform.y + transform.height * origin.y
  };
}

export function transformOriginToCSS(origin: TransformOrigin): string {
  return `${origin.x * 100}% ${origin.y * 100}%`;
}

// ============================================
// ROTATION UTILITIES
// ============================================

/**
 * Rotate element around a specific origin point
 */
export function rotateAroundPoint(
  element: CanvasElement,
  angleDelta: number,
  origin: Point
): Transform {
  const { transform } = element;
  
  // Convert angle to radians
  const rad = (angleDelta * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  
  // Element center
  const cx = transform.x + transform.width / 2;
  const cy = transform.y + transform.height / 2;
  
  // Translate center relative to origin
  const dx = cx - origin.x;
  const dy = cy - origin.y;
  
  // Rotate
  const newCx = origin.x + dx * cos - dy * sin;
  const newCy = origin.y + dx * sin + dy * cos;
  
  // New position
  return {
    ...transform,
    x: newCx - transform.width / 2,
    y: newCy - transform.height / 2,
    rotation: (transform.rotation + angleDelta) % 360
  };
}

/**
 * Snap rotation to nearest increment
 */
export function snapRotation(angle: number, increment: number): number {
  return Math.round(angle / increment) * increment;
}

/**
 * Calculate rotation angle from two points relative to center
 */
export function calculateRotationAngle(
  center: Point,
  startPoint: Point,
  currentPoint: Point
): number {
  const startAngle = Math.atan2(startPoint.y - center.y, startPoint.x - center.x);
  const currentAngle = Math.atan2(currentPoint.y - center.y, currentPoint.x - center.x);
  return ((currentAngle - startAngle) * 180) / Math.PI;
}

// ============================================
// SCALE & RESIZE UTILITIES
// ============================================

/**
 * Scale element from a specific origin
 */
export function scaleFromOrigin(
  element: CanvasElement,
  scaleX: number,
  scaleY: number,
  origin: Point
): Transform {
  const { transform } = element;
  
  // Calculate new dimensions
  const newWidth = transform.width * scaleX;
  const newHeight = transform.height * scaleY;
  
  // Calculate offset from origin
  const offsetX = transform.x - origin.x;
  const offsetY = transform.y - origin.y;
  
  // Scale offset
  const newOffsetX = offsetX * scaleX;
  const newOffsetY = offsetY * scaleY;
  
  return {
    ...transform,
    x: origin.x + newOffsetX,
    y: origin.y + newOffsetY,
    width: newWidth,
    height: newHeight,
    scaleX: transform.scaleX * scaleX,
    scaleY: transform.scaleY * scaleY
  };
}

/**
 * Calculate scale factors to fit element within bounds
 */
export function calculateFitScale(
  elementWidth: number,
  elementHeight: number,
  boundWidth: number,
  boundHeight: number,
  mode: 'contain' | 'cover' = 'contain'
): { scaleX: number; scaleY: number } {
  const scaleX = boundWidth / elementWidth;
  const scaleY = boundHeight / elementHeight;
  
  if (mode === 'contain') {
    const scale = Math.min(scaleX, scaleY);
    return { scaleX: scale, scaleY: scale };
  } else {
    const scale = Math.max(scaleX, scaleY);
    return { scaleX: scale, scaleY: scale };
  }
}

/**
 * Resize with aspect ratio lock
 */
export function resizeWithAspectRatio(
  element: CanvasElement,
  newWidth: number | null,
  newHeight: number | null
): Transform {
  const { transform } = element;
  const aspectRatio = transform.width / transform.height;
  
  if (newWidth !== null && newHeight === null) {
    return {
      ...transform,
      width: newWidth,
      height: newWidth / aspectRatio
    };
  } else if (newHeight !== null && newWidth === null) {
    return {
      ...transform,
      width: newHeight * aspectRatio,
      height: newHeight
    };
  } else if (newWidth !== null && newHeight !== null) {
    // Use the dimension that produces smaller result
    const widthBasedHeight = newWidth / aspectRatio;
    const heightBasedWidth = newHeight * aspectRatio;
    
    if (widthBasedHeight <= newHeight) {
      return {
        ...transform,
        width: newWidth,
        height: widthBasedHeight
      };
    } else {
      return {
        ...transform,
        width: heightBasedWidth,
        height: newHeight
      };
    }
  }
  
  return transform;
}

// ============================================
// SKEW UTILITIES
// ============================================

/**
 * Apply skew transformation
 */
export function applySkew(
  element: CanvasElement,
  skew: SkewConfig
): string {
  // Returns CSS transform string
  return `skewX(${skew.x}deg) skewY(${skew.y}deg)`;
}

/**
 * Calculate skew from mouse movement
 */
export function calculateSkewFromDrag(
  startPoint: Point,
  currentPoint: Point,
  elementHeight: number,
  axis: 'x' | 'y'
): number {
  const delta = axis === 'x' 
    ? currentPoint.x - startPoint.x 
    : currentPoint.y - startPoint.y;
  
  // Convert pixel movement to degrees (sensitivity factor)
  const sensitivity = 0.5;
  return Math.atan2(delta * sensitivity, elementHeight) * (180 / Math.PI);
}

// ============================================
// FLIP UTILITIES
// ============================================

/**
 * Flip element horizontally
 */
export function flipHorizontal(element: CanvasElement): Transform {
  const { transform } = element;
  return {
    ...transform,
    scaleX: transform.scaleX * -1
  };
}

/**
 * Flip element vertically
 */
export function flipVertical(element: CanvasElement): Transform {
  const { transform } = element;
  return {
    ...transform,
    scaleY: transform.scaleY * -1
  };
}

// ============================================
// ALIGNMENT UTILITIES
// ============================================

/**
 * Align elements horizontally
 */
export function alignElements(
  elements: CanvasElement[],
  alignment: HorizontalAlignment,
  canvasWidth?: number
): Map<string, { x: number }> {
  if (elements.length === 0) return new Map();
  
  const result = new Map<string, { x: number }>();
  
  if (elements.length === 1 && canvasWidth) {
    // Align to canvas
    const element = elements[0];
    let x: number;
    
    switch (alignment) {
      case 'left':
        x = 0;
        break;
      case 'center':
        x = (canvasWidth - element.transform.width) / 2;
        break;
      case 'right':
        x = canvasWidth - element.transform.width;
        break;
    }
    
    result.set(element.id, { x });
  } else {
    // Align to selection bounds
    const bounds = getBoundingBox(elements);
    
    for (const element of elements) {
      let x: number;
      
      switch (alignment) {
        case 'left':
          x = bounds.x;
          break;
        case 'center':
          x = bounds.x + (bounds.width - element.transform.width) / 2;
          break;
        case 'right':
          x = bounds.x + bounds.width - element.transform.width;
          break;
      }
      
      result.set(element.id, { x });
    }
  }
  
  return result;
}

/**
 * Align elements vertically
 */
export function alignElementsVertical(
  elements: CanvasElement[],
  alignment: VerticalAlignment,
  canvasHeight?: number
): Map<string, { y: number }> {
  if (elements.length === 0) return new Map();
  
  const result = new Map<string, { y: number }>();
  
  if (elements.length === 1 && canvasHeight) {
    // Align to canvas
    const element = elements[0];
    let y: number;
    
    switch (alignment) {
      case 'top':
        y = 0;
        break;
      case 'middle':
        y = (canvasHeight - element.transform.height) / 2;
        break;
      case 'bottom':
        y = canvasHeight - element.transform.height;
        break;
    }
    
    result.set(element.id, { y });
  } else {
    // Align to selection bounds
    const bounds = getBoundingBox(elements);
    
    for (const element of elements) {
      let y: number;
      
      switch (alignment) {
        case 'top':
          y = bounds.y;
          break;
        case 'middle':
          y = bounds.y + (bounds.height - element.transform.height) / 2;
          break;
        case 'bottom':
          y = bounds.y + bounds.height - element.transform.height;
          break;
      }
      
      result.set(element.id, { y });
    }
  }
  
  return result;
}

// ============================================
// DISTRIBUTION UTILITIES
// ============================================

/**
 * Distribute elements evenly
 */
export function distributeElements(
  elements: CanvasElement[],
  direction: DistributionType,
  spacingType: SpacingType = 'equal'
): Map<string, { x?: number; y?: number }> {
  if (elements.length < 3) return new Map();
  
  const result = new Map<string, { x?: number; y?: number }>();
  
  // Sort elements by position
  const sorted = [...elements].sort((a, b) => {
    if (direction === 'horizontal') {
      return a.transform.x - b.transform.x;
    } else {
      return a.transform.y - b.transform.y;
    }
  });
  
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  
  if (direction === 'horizontal') {
    if (spacingType === 'equal') {
      // Equal spacing between centers
      const totalSpace = (last.transform.x + last.transform.width / 2) - 
                         (first.transform.x + first.transform.width / 2);
      const step = totalSpace / (sorted.length - 1);
      
      sorted.forEach((element, index) => {
        const centerX = first.transform.x + first.transform.width / 2 + step * index;
        result.set(element.id, { x: centerX - element.transform.width / 2 });
      });
    } else {
      // Equal gaps between elements
      let totalWidth = 0;
      sorted.forEach(el => totalWidth += el.transform.width);
      
      const availableSpace = (last.transform.x + last.transform.width) - first.transform.x - totalWidth;
      const gap = availableSpace / (sorted.length - 1);
      
      let currentX = first.transform.x;
      sorted.forEach((element, index) => {
        result.set(element.id, { x: currentX });
        currentX += element.transform.width + gap;
      });
    }
  } else {
    if (spacingType === 'equal') {
      // Equal spacing between centers
      const totalSpace = (last.transform.y + last.transform.height / 2) - 
                         (first.transform.y + first.transform.height / 2);
      const step = totalSpace / (sorted.length - 1);
      
      sorted.forEach((element, index) => {
        const centerY = first.transform.y + first.transform.height / 2 + step * index;
        result.set(element.id, { y: centerY - element.transform.height / 2 });
      });
    } else {
      // Equal gaps between elements
      let totalHeight = 0;
      sorted.forEach(el => totalHeight += el.transform.height);
      
      const availableSpace = (last.transform.y + last.transform.height) - first.transform.y - totalHeight;
      const gap = availableSpace / (sorted.length - 1);
      
      let currentY = first.transform.y;
      sorted.forEach((element, index) => {
        result.set(element.id, { y: currentY });
        currentY += element.transform.height + gap;
      });
    }
  }
  
  return result;
}

// ============================================
// POSITIONING UTILITIES
// ============================================

/**
 * Get bounding box of multiple elements
 */
export function getBoundingBox(elements: CanvasElement[]): {
  x: number;
  y: number;
  width: number;
  height: number;
} {
  if (elements.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  
  for (const element of elements) {
    const { x, y, width, height } = element.transform;
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x + width);
    maxY = Math.max(maxY, y + height);
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

/**
 * Snap position to grid
 */
export function snapToGrid(position: Point, gridSize: number): Point {
  return {
    x: Math.round(position.x / gridSize) * gridSize,
    y: Math.round(position.y / gridSize) * gridSize
  };
}

/**
 * Move element by delta with optional snapping
 */
export function moveElement(
  element: CanvasElement,
  deltaX: number,
  deltaY: number,
  snapSize?: number
): Transform {
  let newX = element.transform.x + deltaX;
  let newY = element.transform.y + deltaY;
  
  if (snapSize) {
    const snapped = snapToGrid({ x: newX, y: newY }, snapSize);
    newX = snapped.x;
    newY = snapped.y;
  }
  
  return {
    ...element.transform,
    x: newX,
    y: newY
  };
}

/**
 * Nudge element by small amount
 */
export function nudgeElement(
  element: CanvasElement,
  direction: 'up' | 'down' | 'left' | 'right',
  amount: number = 1
): Transform {
  const { transform } = element;
  
  switch (direction) {
    case 'up':
      return { ...transform, y: transform.y - amount };
    case 'down':
      return { ...transform, y: transform.y + amount };
    case 'left':
      return { ...transform, x: transform.x - amount };
    case 'right':
      return { ...transform, x: transform.x + amount };
  }
}

// ============================================
// PRECISE POSITIONING
// ============================================

export interface PrecisePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

/**
 * Set exact position values
 */
export function setExactPosition(
  element: CanvasElement,
  position: Partial<PrecisePosition>
): Transform {
  return {
    ...element.transform,
    x: position.x ?? element.transform.x,
    y: position.y ?? element.transform.y,
    width: position.width ?? element.transform.width,
    height: position.height ?? element.transform.height,
    rotation: position.rotation ?? element.transform.rotation
  };
}

/**
 * Round position values to integers
 */
export function roundPosition(transform: Transform): Transform {
  return {
    ...transform,
    x: Math.round(transform.x),
    y: Math.round(transform.y),
    width: Math.round(transform.width),
    height: Math.round(transform.height)
  };
}

// ============================================
// TRANSFORM MATRIX UTILITIES
// ============================================

export interface TransformMatrix {
  a: number;  // scaleX
  b: number;  // skewY
  c: number;  // skewX
  d: number;  // scaleY
  e: number;  // translateX
  f: number;  // translateY
}

/**
 * Create identity matrix
 */
export function identityMatrix(): TransformMatrix {
  return { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };
}

/**
 * Create transform matrix from element
 */
export function createTransformMatrix(
  element: CanvasElement,
  skew?: SkewConfig
): TransformMatrix {
  const { transform } = element;
  
  // Start with identity
  let matrix = identityMatrix();
  
  // Apply scale
  matrix.a = transform.scaleX;
  matrix.d = transform.scaleY;
  
  // Apply rotation
  if (transform.rotation !== 0) {
    const rad = (transform.rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);
    
    const newA = matrix.a * cos - matrix.b * sin;
    const newB = matrix.a * sin + matrix.b * cos;
    const newC = matrix.c * cos - matrix.d * sin;
    const newD = matrix.c * sin + matrix.d * cos;
    
    matrix.a = newA;
    matrix.b = newB;
    matrix.c = newC;
    matrix.d = newD;
  }
  
  // Apply skew
  if (skew) {
    const skewXRad = (skew.x * Math.PI) / 180;
    const skewYRad = (skew.y * Math.PI) / 180;
    
    const tanX = Math.tan(skewXRad);
    const tanY = Math.tan(skewYRad);
    
    const newA = matrix.a + matrix.c * tanY;
    const newB = matrix.b + matrix.d * tanY;
    const newC = matrix.a * tanX + matrix.c;
    const newD = matrix.b * tanX + matrix.d;
    
    matrix.a = newA;
    matrix.b = newB;
    matrix.c = newC;
    matrix.d = newD;
  }
  
  // Apply translation
  matrix.e = transform.x;
  matrix.f = transform.y;
  
  return matrix;
}

/**
 * Convert matrix to CSS transform string
 */
export function matrixToCSS(matrix: TransformMatrix): string {
  return `matrix(${matrix.a}, ${matrix.b}, ${matrix.c}, ${matrix.d}, ${matrix.e}, ${matrix.f})`;
}

// ============================================
// SMART GUIDES
// ============================================

export interface SmartGuide {
  type: 'vertical' | 'horizontal';
  position: number;
  start: number;
  end: number;
}

/**
 * Find smart guides when moving element
 */
export function findSmartGuides(
  movingElement: CanvasElement,
  otherElements: CanvasElement[],
  threshold: number = 5
): SmartGuide[] {
  const guides: SmartGuide[] = [];
  const moving = movingElement.transform;
  
  // Moving element edges and center
  const movingEdges = {
    left: moving.x,
    right: moving.x + moving.width,
    top: moving.y,
    bottom: moving.y + moving.height,
    centerX: moving.x + moving.width / 2,
    centerY: moving.y + moving.height / 2
  };
  
  for (const other of otherElements) {
    if (other.id === movingElement.id) continue;
    
    const otherEdges = {
      left: other.transform.x,
      right: other.transform.x + other.transform.width,
      top: other.transform.y,
      bottom: other.transform.y + other.transform.height,
      centerX: other.transform.x + other.transform.width / 2,
      centerY: other.transform.y + other.transform.height / 2
    };
    
    // Vertical guides (x-axis alignment)
    if (Math.abs(movingEdges.left - otherEdges.left) < threshold) {
      guides.push({
        type: 'vertical',
        position: otherEdges.left,
        start: Math.min(movingEdges.top, other.transform.y),
        end: Math.max(movingEdges.bottom, other.transform.y + other.transform.height)
      });
    }
    if (Math.abs(movingEdges.right - otherEdges.right) < threshold) {
      guides.push({
        type: 'vertical',
        position: otherEdges.right,
        start: Math.min(movingEdges.top, other.transform.y),
        end: Math.max(movingEdges.bottom, other.transform.y + other.transform.height)
      });
    }
    if (Math.abs(movingEdges.centerX - otherEdges.centerX) < threshold) {
      guides.push({
        type: 'vertical',
        position: otherEdges.centerX,
        start: Math.min(movingEdges.top, other.transform.y),
        end: Math.max(movingEdges.bottom, other.transform.y + other.transform.height)
      });
    }
    
    // Horizontal guides (y-axis alignment)
    if (Math.abs(movingEdges.top - otherEdges.top) < threshold) {
      guides.push({
        type: 'horizontal',
        position: otherEdges.top,
        start: Math.min(movingEdges.left, other.transform.x),
        end: Math.max(movingEdges.right, other.transform.x + other.transform.width)
      });
    }
    if (Math.abs(movingEdges.bottom - otherEdges.bottom) < threshold) {
      guides.push({
        type: 'horizontal',
        position: otherEdges.bottom,
        start: Math.min(movingEdges.left, other.transform.x),
        end: Math.max(movingEdges.right, other.transform.x + other.transform.width)
      });
    }
    if (Math.abs(movingEdges.centerY - otherEdges.centerY) < threshold) {
      guides.push({
        type: 'horizontal',
        position: otherEdges.centerY,
        start: Math.min(movingEdges.left, other.transform.x),
        end: Math.max(movingEdges.right, other.transform.x + other.transform.width)
      });
    }
  }
  
  return guides;
}

// ============================================
// DEFAULTS AND EXPORTS
// ============================================

export const DEFAULT_TRANSFORM_CONSTRAINTS: TransformConstraints = {
  lockAspectRatio: false,
  maintainProportions: true,
  snapAngle: 15,
  snapPosition: 10
};

export const ROTATION_PRESETS = [0, 45, 90, 135, 180, 225, 270, 315];
export const SCALE_PRESETS = [25, 50, 75, 100, 125, 150, 200, 300, 400];

export default {
  TRANSFORM_ORIGIN_PRESETS,
  getTransformOriginPoint,
  transformOriginToCSS,
  rotateAroundPoint,
  snapRotation,
  calculateRotationAngle,
  scaleFromOrigin,
  calculateFitScale,
  resizeWithAspectRatio,
  applySkew,
  calculateSkewFromDrag,
  flipHorizontal,
  flipVertical,
  alignElements,
  alignElementsVertical,
  distributeElements,
  getBoundingBox,
  snapToGrid,
  moveElement,
  nudgeElement,
  setExactPosition,
  roundPosition,
  identityMatrix,
  createTransformMatrix,
  matrixToCSS,
  findSmartGuides,
  DEFAULT_TRANSFORM_CONSTRAINTS,
  ROTATION_PRESETS,
  SCALE_PRESETS
};
