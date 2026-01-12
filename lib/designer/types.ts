// Core Designer Type Definitions

export type ElementType = 'text' | 'image' | 'shape' | 'group' | 'mockup' | 'path'
export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'polygon' | 'line' | 'pen' | 'arrow' | 'diamond' | 'hexagon' | 'pentagon'
export type AlignType = 'left' | 'center' | 'right' | 'justify'
export type VerticalAlignType = 'top' | 'middle' | 'bottom'
export type ToolType = 'select' | 'text' | 'shape' | 'pen' | 'image' | 'gradient' | 'eyedropper' | 'crop' | 'eraser' | 'hand' | 'zoom' | 'freehand' | 'path' | 'brush' | 'pencil'
export type FilterType = 'blur' | 'brightness' | 'contrast' | 'saturation' | 'grayscale' | 'sepia' | 'hue-rotate' | 'invert'
export type MockupType = 'tshirt' | 'mug' | 'pen' | 'notebook' | 'card' | 'poster' | 'phone-case' | 'tote-bag' | 'pillow' | 'sticker'
export type PathCommandType = 'M' | 'L' | 'C' | 'Q' | 'A' | 'Z' // Move, Line, Cubic Bezier, Quadratic, Arc, Close

export interface Point {
  x: number
  y: number
}

// Path point with optional bezier handles
export interface PathPoint extends Point {
  handleIn?: Point  // Bezier handle for incoming curve
  handleOut?: Point // Bezier handle for outgoing curve
  type: 'corner' | 'smooth' | 'symmetric' // How handles are linked
}

// Individual path command
export interface PathCommand {
  type: PathCommandType
  point: Point
  controlPoint1?: Point // For cubic bezier
  controlPoint2?: Point // For cubic bezier
}

// Complete path data
export interface PathProperties {
  points: PathPoint[]
  closed: boolean
  fill: string
  stroke: string
  strokeWidth: number
  strokeLineCap: 'butt' | 'round' | 'square'
  strokeLineJoin: 'miter' | 'round' | 'bevel'
  strokeDashArray?: number[]
  fillRule: 'nonzero' | 'evenodd'
}

// Freehand drawing properties
export interface FreehandProperties {
  points: Point[]
  smoothing: number // 0-1, how much to smooth the path
  pressure?: number[] // Optional pressure sensitivity
  stroke: string
  strokeWidth: number
  strokeLineCap: 'butt' | 'round' | 'square'
}

// Brush properties for painting tools
export interface BrushProperties {
  type: 'round' | 'flat' | 'spray' | 'calligraphy'
  size: number
  hardness: number // 0-100
  opacity: number
  spacing: number // 0-100, percentage of brush size
  color: string
  pressure: boolean // Enable pressure sensitivity
}

export interface Size {
  width: number
  height: number
}

export interface Transform {
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scaleX: number
  scaleY: number
}

export interface TextProperties {
  content: string
  fontSize: number
  fontFamily: string
  fontWeight: number
  fontStyle: 'normal' | 'italic'
  textDecoration: 'none' | 'underline' | 'line-through'
  textAlign: AlignType
  lineHeight: number
  letterSpacing: number
  color: string
}

export interface ShapeProperties {
  shapeType: ShapeType
  fill: string
  stroke: string
  strokeWidth: number
  cornerRadius?: number
  points?: number // for star/polygon
  customShapeId?: string // ID for custom SVG path lookup
}

export interface ImageProperties {
  src: string
  objectFit: 'contain' | 'cover' | 'fill'
  brightness: number
  contrast: number
  saturation: number
  blur: number
  opacity: number
  filters?: FilterEffect[]
}

export interface FilterEffect {
  type: FilterType
  value: number // 0-100 or specific range
  enabled: boolean
}

export interface MockupProperties {
  mockupType: MockupType
  designArea: {
    x: number
    y: number
    width: number
    height: number
    rotation: number
  }
  mockupImage: string
  perspective?: {
    topLeft: Point
    topRight: Point
    bottomLeft: Point
    bottomRight: Point
  }
}

export interface GradientProperties {
  type: 'linear' | 'radial' | 'conic'
  colors: Array<{ color: string; position: number }>
  angle?: number
  centerX?: number
  centerY?: number
}

export interface EffectProperties {
  shadow?: {
    enabled: boolean
    x: number
    y: number
    blur: number
    color: string
  }
  glow?: {
    enabled: boolean
    blur: number
    color: string
  }
  stroke?: {
    enabled: boolean
    width: number
    color: string
  }
}

export interface CanvasElement {
  id: string
  type: ElementType
  name: string
  transform: Transform
  opacity: number
  visible: boolean
  locked: boolean
  zIndex: number
  
  // Type-specific properties
  text?: TextProperties
  shape?: ShapeProperties
  image?: ImageProperties
  mockup?: MockupProperties
  gradient?: GradientProperties
  effects?: EffectProperties
  path?: PathProperties
  freehand?: FreehandProperties
  
  // Custom SVG for icons/assets
  customSvg?: string
  
  // Grouping
  parentId?: string
  childIds?: string[]
}

export interface CanvasState {
  width: number
  height: number
  backgroundColor: string
  zoom: number
  gridSize: number
  showGrid: boolean
  snapToGrid: boolean
  gridColor?: string
  gridOpacity?: number
  elements: CanvasElement[]
}

export interface SelectionState {
  selectedIds: string[]
  isDragging: boolean
  isResizing: boolean
  isRotating: boolean
  resizeHandle?: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w'
  dragStart?: Point
  transformStart?: Transform
}

export interface HistoryCommand {
  type: 'add' | 'delete' | 'move' | 'resize' | 'rotate' | 'style' | 'reorder'
  elementIds: string[]
  beforeState?: any
  afterState?: any
  timestamp: number
}

export interface Template {
  id: string
  name: string
  category: string
  thumbnail: string
  width: number
  height: number
  elements: CanvasElement[]
  mockupImage?: string
  printArea?: { x: number; y: number; width: number; height: number }
}

export interface Asset {
  id: string
  type: 'icon' | 'image' | 'pattern' | 'background'
  name: string
  url: string
  category: string
  tags: string[]
}

export interface DesignProject {
  id: string
  name: string
  canvas: CanvasState
  thumbnail?: string
  createdAt: string
  updatedAt: string
  status: 'draft' | 'published'
}
