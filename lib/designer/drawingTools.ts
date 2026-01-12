// Advanced Drawing Tools Utilities
import { Point, PathPoint, PathProperties, FreehandProperties, BrushProperties, CanvasElement } from './types'

// ============================================
// PATH UTILITIES
// ============================================

/**
 * Convert path points to SVG path data string
 */
export function pathPointsToSVG(path: PathProperties): string {
  if (path.points.length === 0) return ''
  
  const commands: string[] = []
  const points = path.points
  
  // Start with move to first point
  commands.push(`M ${points[0].x} ${points[0].y}`)
  
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const curr = points[i]
    
    // Check if we need a bezier curve
    if (prev.handleOut && curr.handleIn) {
      // Cubic bezier
      commands.push(`C ${prev.handleOut.x} ${prev.handleOut.y} ${curr.handleIn.x} ${curr.handleIn.y} ${curr.x} ${curr.y}`)
    } else if (prev.handleOut) {
      // Quadratic bezier
      commands.push(`Q ${prev.handleOut.x} ${prev.handleOut.y} ${curr.x} ${curr.y}`)
    } else {
      // Line
      commands.push(`L ${curr.x} ${curr.y}`)
    }
  }
  
  // Handle closing the path
  if (path.closed) {
    const first = points[0]
    const last = points[points.length - 1]
    
    if (last.handleOut && first.handleIn) {
      commands.push(`C ${last.handleOut.x} ${last.handleOut.y} ${first.handleIn.x} ${first.handleIn.y} ${first.x} ${first.y}`)
    } else if (last.handleOut) {
      commands.push(`Q ${last.handleOut.x} ${last.handleOut.y} ${first.x} ${first.y}`)
    }
    commands.push('Z')
  }
  
  return commands.join(' ')
}

/**
 * Create SVG element from path properties
 */
export function renderPathSVG(path: PathProperties, width: number, height: number): string {
  const d = pathPointsToSVG(path)
  const dashArray = path.strokeDashArray ? `stroke-dasharray="${path.strokeDashArray.join(' ')}"` : ''
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="${d}" 
        fill="${path.fill}"
        stroke="${path.stroke}"
        stroke-width="${path.strokeWidth}"
        stroke-linecap="${path.strokeLineCap}"
        stroke-linejoin="${path.strokeLineJoin}"
        fill-rule="${path.fillRule}"
        ${dashArray}
      />
    </svg>
  `
}

/**
 * Calculate bounding box of path points
 */
export function getPathBounds(points: PathPoint[]): { x: number, y: number, width: number, height: number } {
  if (points.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 }
  }
  
  let minX = Infinity, minY = Infinity
  let maxX = -Infinity, maxY = -Infinity
  
  for (const point of points) {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
    
    // Also consider bezier handles
    if (point.handleIn) {
      minX = Math.min(minX, point.handleIn.x)
      minY = Math.min(minY, point.handleIn.y)
      maxX = Math.max(maxX, point.handleIn.x)
      maxY = Math.max(maxY, point.handleIn.y)
    }
    if (point.handleOut) {
      minX = Math.min(minX, point.handleOut.x)
      minY = Math.min(minY, point.handleOut.y)
      maxX = Math.max(maxX, point.handleOut.x)
      maxY = Math.max(maxY, point.handleOut.y)
    }
  }
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  }
}

// ============================================
// FREEHAND DRAWING
// ============================================

/**
 * Smooth freehand points using Catmull-Rom spline
 */
export function smoothFreehandPoints(points: Point[], smoothing: number = 0.5): Point[] {
  if (points.length < 3) return points
  
  const result: Point[] = []
  const tension = 1 - smoothing
  
  // Add first point
  result.push(points[0])
  
  // Interpolate between points
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)]
    const p1 = points[i]
    const p2 = points[Math.min(points.length - 1, i + 1)]
    const p3 = points[Math.min(points.length - 1, i + 2)]
    
    // Generate intermediate points
    const numSegments = Math.max(1, Math.floor(
      Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)) / 5
    ))
    
    for (let j = 1; j <= numSegments; j++) {
      const t = j / numSegments
      const t2 = t * t
      const t3 = t2 * t
      
      // Catmull-Rom spline interpolation
      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * t +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      )
      
      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * t +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      )
      
      result.push({ x, y })
    }
  }
  
  return result
}

/**
 * Simplify freehand path using Ramer-Douglas-Peucker algorithm
 */
export function simplifyPath(points: Point[], epsilon: number = 2): Point[] {
  if (points.length < 3) return points
  
  // Find point with max distance from line between first and last
  let maxDist = 0
  let maxIndex = 0
  
  const first = points[0]
  const last = points[points.length - 1]
  
  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i], first, last)
    if (dist > maxDist) {
      maxDist = dist
      maxIndex = i
    }
  }
  
  // If max distance is greater than epsilon, recursively simplify
  if (maxDist > epsilon) {
    const left = simplifyPath(points.slice(0, maxIndex + 1), epsilon)
    const right = simplifyPath(points.slice(maxIndex), epsilon)
    return [...left.slice(0, -1), ...right]
  }
  
  return [first, last]
}

/**
 * Calculate perpendicular distance from point to line
 */
function perpendicularDistance(point: Point, lineStart: Point, lineEnd: Point): number {
  const dx = lineEnd.x - lineStart.x
  const dy = lineEnd.y - lineStart.y
  
  const num = Math.abs(dy * point.x - dx * point.y + lineEnd.x * lineStart.y - lineEnd.y * lineStart.x)
  const den = Math.sqrt(dy * dy + dx * dx)
  
  return num / den
}

/**
 * Convert freehand points to SVG path
 */
export function freehandToSVG(freehand: FreehandProperties, width: number, height: number): string {
  if (freehand.points.length === 0) return ''
  
  // Optionally smooth the points
  let points = freehand.points
  if (freehand.smoothing > 0) {
    points = smoothFreehandPoints(points, freehand.smoothing)
  }
  
  // Build SVG path
  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="${d}" 
        fill="none"
        stroke="${freehand.stroke}"
        stroke-width="${freehand.strokeWidth}"
        stroke-linecap="${freehand.strokeLineCap}"
        stroke-linejoin="round"
      />
    </svg>
  `
}

// ============================================
// BEZIER UTILITIES
// ============================================

/**
 * Calculate point on cubic bezier curve at t
 */
export function cubicBezierPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  const t2 = t * t
  const t3 = t2 * t
  const mt = 1 - t
  const mt2 = mt * mt
  const mt3 = mt2 * mt
  
  return {
    x: mt3 * p0.x + 3 * mt2 * t * p1.x + 3 * mt * t2 * p2.x + t3 * p3.x,
    y: mt3 * p0.y + 3 * mt2 * t * p1.y + 3 * mt * t2 * p2.y + t3 * p3.y
  }
}

/**
 * Calculate point on quadratic bezier curve at t
 */
export function quadraticBezierPoint(p0: Point, p1: Point, p2: Point, t: number): Point {
  const t2 = t * t
  const mt = 1 - t
  const mt2 = mt * mt
  
  return {
    x: mt2 * p0.x + 2 * mt * t * p1.x + t2 * p2.x,
    y: mt2 * p0.y + 2 * mt * t * p1.y + t2 * p2.y
  }
}

/**
 * Calculate symmetric bezier handles for smooth point
 */
export function calculateSymmetricHandles(prev: Point, current: Point, next: Point, tension: number = 0.3): { handleIn: Point, handleOut: Point } {
  // Direction from prev to next
  const dx = next.x - prev.x
  const dy = next.y - prev.y
  const dist = Math.sqrt(dx * dx + dy * dy)
  
  // Normalized direction
  const nx = dist > 0 ? dx / dist : 0
  const ny = dist > 0 ? dy / dist : 0
  
  // Calculate handle length based on distance to neighbors
  const handleLength = dist * tension
  
  return {
    handleIn: {
      x: current.x - nx * handleLength,
      y: current.y - ny * handleLength
    },
    handleOut: {
      x: current.x + nx * handleLength,
      y: current.y + ny * handleLength
    }
  }
}

// ============================================
// PATH OPERATIONS
// ============================================

/**
 * Find nearest point on path to given point
 */
export function nearestPointOnPath(path: PathPoint[], point: Point): { point: Point, index: number, t: number } {
  let nearestPoint = path[0]
  let nearestIndex = 0
  let nearestT = 0
  let minDist = Infinity
  
  for (let i = 0; i < path.length - 1; i++) {
    const p0 = path[i]
    const p1 = path[i + 1]
    
    // Check line segment
    if (!p0.handleOut && !p1.handleIn) {
      // Line segment
      for (let t = 0; t <= 1; t += 0.05) {
        const p: PathPoint = {
          x: p0.x + (p1.x - p0.x) * t,
          y: p0.y + (p1.y - p0.y) * t,
          type: 'corner'
        }
        const dist = Math.sqrt(Math.pow(p.x - point.x, 2) + Math.pow(p.y - point.y, 2))
        if (dist < minDist) {
          minDist = dist
          nearestPoint = p
          nearestIndex = i
          nearestT = t
        }
      }
    } else {
      // Bezier curve - sample more points
      for (let t = 0; t <= 1; t += 0.02) {
        let tempPoint: Point
        if (p0.handleOut && p1.handleIn) {
          tempPoint = cubicBezierPoint(p0, p0.handleOut, p1.handleIn, p1, t)
        } else if (p0.handleOut) {
          tempPoint = quadraticBezierPoint(p0, p0.handleOut, p1, t)
        } else {
          tempPoint = quadraticBezierPoint(p0, p1.handleIn!, p1, t)
        }
        const dist = Math.sqrt(Math.pow(tempPoint.x - point.x, 2) + Math.pow(tempPoint.y - point.y, 2))
        if (dist < minDist) {
          minDist = dist
          nearestPoint = { ...tempPoint, type: 'smooth' }
          nearestIndex = i
          nearestT = t
        }
      }
    }
  }
  
  return { point: nearestPoint, index: nearestIndex, t: nearestT }
}

/**
 * Split path at given index and t value
 */
export function splitPath(path: PathProperties, index: number, t: number): [PathProperties, PathProperties] {
  const points1: PathPoint[] = []
  const points2: PathPoint[] = []
  
  // First path: start to split point
  for (let i = 0; i <= index; i++) {
    points1.push({ ...path.points[i] })
  }
  
  // Calculate split point
  const p0 = path.points[index]
  const p1 = path.points[index + 1]
  let splitPoint: PathPoint
  
  if (p0.handleOut && p1.handleIn) {
    // Split cubic bezier using De Casteljau's algorithm
    const q0 = {
      x: p0.x + (p0.handleOut.x - p0.x) * t,
      y: p0.y + (p0.handleOut.y - p0.y) * t
    }
    const q1 = {
      x: p0.handleOut.x + (p1.handleIn.x - p0.handleOut.x) * t,
      y: p0.handleOut.y + (p1.handleIn.y - p0.handleOut.y) * t
    }
    const q2 = {
      x: p1.handleIn.x + (p1.x - p1.handleIn.x) * t,
      y: p1.handleIn.y + (p1.y - p1.handleIn.y) * t
    }
    const r0 = {
      x: q0.x + (q1.x - q0.x) * t,
      y: q0.y + (q1.y - q0.y) * t
    }
    const r1 = {
      x: q1.x + (q2.x - q1.x) * t,
      y: q1.y + (q2.y - q1.y) * t
    }
    const s = {
      x: r0.x + (r1.x - r0.x) * t,
      y: r0.y + (r1.y - r0.y) * t
    }
    
    splitPoint = { ...s, type: 'smooth', handleIn: r0, handleOut: r1 }
    
    // Update last point of first path
    points1[points1.length - 1].handleOut = q0
    
    // Start second path
    points2.push({ ...splitPoint })
    points2[0].handleIn = r0
  } else {
    // Simple line split
    splitPoint = {
      x: p0.x + (p1.x - p0.x) * t,
      y: p0.y + (p1.y - p0.y) * t,
      type: 'corner'
    }
    points1.push(splitPoint)
    points2.push({ ...splitPoint })
  }
  
  // Second path: split point to end
  for (let i = index + 1; i < path.points.length; i++) {
    points2.push({ ...path.points[i] })
  }
  
  return [
    { ...path, points: points1, closed: false },
    { ...path, points: points2, closed: false }
  ]
}

/**
 * Join two paths
 */
export function joinPaths(path1: PathProperties, path2: PathProperties): PathProperties {
  const points = [...path1.points]
  
  // Check if we should reverse path2
  const end1 = path1.points[path1.points.length - 1]
  const start2 = path2.points[0]
  const end2 = path2.points[path2.points.length - 1]
  
  const distToStart = Math.sqrt(Math.pow(end1.x - start2.x, 2) + Math.pow(end1.y - start2.y, 2))
  const distToEnd = Math.sqrt(Math.pow(end1.x - end2.x, 2) + Math.pow(end1.y - end2.y, 2))
  
  if (distToEnd < distToStart) {
    // Reverse path2
    points.push(...path2.points.slice().reverse())
  } else {
    points.push(...path2.points)
  }
  
  return { ...path1, points, closed: false }
}

// ============================================
// SHAPE CONVERSION
// ============================================

/**
 * Convert shape to path
 */
export function shapeToPath(shapeType: string, width: number, height: number, options: { cornerRadius?: number, points?: number } = {}): PathProperties {
  const points: PathPoint[] = []
  
  switch (shapeType) {
    case 'rectangle': {
      const r = options.cornerRadius || 0
      if (r > 0) {
        // Rounded rectangle
        points.push(
          { x: r, y: 0, type: 'corner' },
          { x: width - r, y: 0, type: 'corner', handleOut: { x: width - r + r * 0.55, y: 0 } },
          { x: width, y: r, type: 'corner', handleIn: { x: width, y: r - r * 0.55 } },
          { x: width, y: height - r, type: 'corner', handleOut: { x: width, y: height - r + r * 0.55 } },
          { x: width - r, y: height, type: 'corner', handleIn: { x: width - r + r * 0.55, y: height } },
          { x: r, y: height, type: 'corner', handleOut: { x: r - r * 0.55, y: height } },
          { x: 0, y: height - r, type: 'corner', handleIn: { x: 0, y: height - r + r * 0.55 } },
          { x: 0, y: r, type: 'corner', handleOut: { x: 0, y: r - r * 0.55 } },
          { x: r, y: 0, type: 'corner', handleIn: { x: r - r * 0.55, y: 0 } }
        )
      } else {
        points.push(
          { x: 0, y: 0, type: 'corner' },
          { x: width, y: 0, type: 'corner' },
          { x: width, y: height, type: 'corner' },
          { x: 0, y: height, type: 'corner' }
        )
      }
      break
    }
    
    case 'circle': {
      // Approximate circle with bezier curves
      const cx = width / 2
      const cy = height / 2
      const rx = width / 2
      const ry = height / 2
      const k = 0.5522847498 // Magic number for circle approximation
      
      points.push(
        { x: cx, y: 0, type: 'smooth', handleIn: { x: cx - rx * k, y: 0 }, handleOut: { x: cx + rx * k, y: 0 } },
        { x: width, y: cy, type: 'smooth', handleIn: { x: width, y: cy - ry * k }, handleOut: { x: width, y: cy + ry * k } },
        { x: cx, y: height, type: 'smooth', handleIn: { x: cx + rx * k, y: height }, handleOut: { x: cx - rx * k, y: height } },
        { x: 0, y: cy, type: 'smooth', handleIn: { x: 0, y: cy + ry * k }, handleOut: { x: 0, y: cy - ry * k } }
      )
      break
    }
    
    case 'triangle': {
      points.push(
        { x: width / 2, y: 0, type: 'corner' },
        { x: width, y: height, type: 'corner' },
        { x: 0, y: height, type: 'corner' }
      )
      break
    }
    
    case 'star': {
      const numPoints = options.points || 5
      const outerRadius = Math.min(width, height) / 2
      const innerRadius = outerRadius * 0.4
      const cx = width / 2
      const cy = height / 2
      
      for (let i = 0; i < numPoints * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = (i * Math.PI / numPoints) - Math.PI / 2
        points.push({
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
          type: 'corner'
        })
      }
      break
    }
    
    case 'polygon': {
      const numSides = options.points || 6
      const radius = Math.min(width, height) / 2
      const cx = width / 2
      const cy = height / 2
      
      for (let i = 0; i < numSides; i++) {
        const angle = (i * 2 * Math.PI / numSides) - Math.PI / 2
        points.push({
          x: cx + radius * Math.cos(angle),
          y: cy + radius * Math.sin(angle),
          type: 'corner'
        })
      }
      break
    }
    
    case 'diamond': {
      points.push(
        { x: width / 2, y: 0, type: 'corner' },
        { x: width, y: height / 2, type: 'corner' },
        { x: width / 2, y: height, type: 'corner' },
        { x: 0, y: height / 2, type: 'corner' }
      )
      break
    }
    
    case 'hexagon': {
      const cx = width / 2
      const cy = height / 2
      const rx = width / 2
      const ry = height / 2
      
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI / 3) - Math.PI / 6
        points.push({
          x: cx + rx * Math.cos(angle),
          y: cy + ry * Math.sin(angle),
          type: 'corner'
        })
      }
      break
    }
    
    default:
      // Default to rectangle
      points.push(
        { x: 0, y: 0, type: 'corner' },
        { x: width, y: 0, type: 'corner' },
        { x: width, y: height, type: 'corner' },
        { x: 0, y: height, type: 'corner' }
      )
  }
  
  return {
    points,
    closed: true,
    fill: '#3B82F6',
    stroke: '#1E40AF',
    strokeWidth: 2,
    strokeLineCap: 'round',
    strokeLineJoin: 'round',
    fillRule: 'nonzero'
  }
}

// ============================================
// DRAWING STATE MANAGER
// ============================================

export interface DrawingState {
  isDrawing: boolean
  tool: 'pen' | 'freehand' | 'brush' | 'line' | 'bezier'
  currentPath: PathPoint[] | Point[]
  tempPoint?: Point
  selectedPointIndex?: number
  selectedHandleType?: 'in' | 'out'
}

export const defaultDrawingState: DrawingState = {
  isDrawing: false,
  tool: 'pen',
  currentPath: [],
  tempPoint: undefined,
  selectedPointIndex: undefined,
  selectedHandleType: undefined
}

/**
 * Create a new path element from drawing
 */
export function createPathElement(
  pathProps: PathProperties,
  transform: { x: number, y: number }
): CanvasElement {
  const bounds = getPathBounds(pathProps.points)
  
  return {
    id: `path-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'path',
    name: 'Path',
    transform: {
      x: transform.x + bounds.x,
      y: transform.y + bounds.y,
      width: bounds.width || 1,
      height: bounds.height || 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    },
    opacity: 1,
    visible: true,
    locked: false,
    zIndex: 0,
    path: {
      ...pathProps,
      // Normalize points relative to bounds
      points: pathProps.points.map(p => ({
        ...p,
        x: p.x - bounds.x,
        y: p.y - bounds.y,
        handleIn: p.handleIn ? { x: p.handleIn.x - bounds.x, y: p.handleIn.y - bounds.y } : undefined,
        handleOut: p.handleOut ? { x: p.handleOut.x - bounds.x, y: p.handleOut.y - bounds.y } : undefined
      }))
    }
  }
}

/**
 * Create a new freehand element from drawing
 */
export function createFreehandElement(
  freehandProps: FreehandProperties,
  transform: { x: number, y: number }
): CanvasElement {
  const points = freehandProps.points
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  
  for (const p of points) {
    minX = Math.min(minX, p.x)
    minY = Math.min(minY, p.y)
    maxX = Math.max(maxX, p.x)
    maxY = Math.max(maxY, p.y)
  }
  
  return {
    id: `freehand-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type: 'path',
    name: 'Freehand',
    transform: {
      x: transform.x + minX,
      y: transform.y + minY,
      width: maxX - minX || 1,
      height: maxY - minY || 1,
      rotation: 0,
      scaleX: 1,
      scaleY: 1
    },
    opacity: 1,
    visible: true,
    locked: false,
    zIndex: 0,
    freehand: {
      ...freehandProps,
      points: points.map(p => ({
        x: p.x - minX,
        y: p.y - minY
      }))
    }
  }
}
