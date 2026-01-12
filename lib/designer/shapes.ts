// Comprehensive Shapes Library for Designer

export interface ShapeDefinition {
  id: string
  name: string
  category: 'basic' | 'arrows' | 'callouts' | 'flowchart' | 'badges' | 'decorative' | 'icons' | 'frames' | 'banners'
  icon: string // SVG path or emoji
  defaultWidth: number
  defaultHeight: number
  svgPath?: string // Custom SVG path for complex shapes
  points?: number // For stars/polygons
  aspectRatio?: number // Lock aspect ratio if defined
}

// Basic Shapes
export const BASIC_SHAPES: ShapeDefinition[] = [
  { id: 'rectangle', name: 'Rectangle', category: 'basic', icon: '▭', defaultWidth: 120, defaultHeight: 80 },
  { id: 'square', name: 'Square', category: 'basic', icon: '■', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'rounded-rectangle', name: 'Rounded Rectangle', category: 'basic', icon: '▢', defaultWidth: 120, defaultHeight: 80 },
  { id: 'circle', name: 'Circle', category: 'basic', icon: '●', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'ellipse', name: 'Ellipse', category: 'basic', icon: '⬭', defaultWidth: 120, defaultHeight: 80 },
  { id: 'triangle', name: 'Triangle', category: 'basic', icon: '▲', defaultWidth: 100, defaultHeight: 87 },
  { id: 'right-triangle', name: 'Right Triangle', category: 'basic', icon: '◢', defaultWidth: 100, defaultHeight: 100 },
  { id: 'diamond', name: 'Diamond', category: 'basic', icon: '◆', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'pentagon', name: 'Pentagon', category: 'basic', icon: '⬠', defaultWidth: 100, defaultHeight: 100, points: 5 },
  { id: 'hexagon', name: 'Hexagon', category: 'basic', icon: '⬡', defaultWidth: 100, defaultHeight: 87, points: 6 },
  { id: 'heptagon', name: 'Heptagon', category: 'basic', icon: '⬡', defaultWidth: 100, defaultHeight: 100, points: 7 },
  { id: 'octagon', name: 'Octagon', category: 'basic', icon: '⯃', defaultWidth: 100, defaultHeight: 100, points: 8 },
  { id: 'decagon', name: 'Decagon', category: 'basic', icon: '⬡', defaultWidth: 100, defaultHeight: 100, points: 10 },
  { id: 'parallelogram', name: 'Parallelogram', category: 'basic', icon: '▱', defaultWidth: 120, defaultHeight: 80 },
  { id: 'trapezoid', name: 'Trapezoid', category: 'basic', icon: '⏢', defaultWidth: 120, defaultHeight: 80 },
  { id: 'rhombus', name: 'Rhombus', category: 'basic', icon: '◇', defaultWidth: 100, defaultHeight: 100 },
  { id: 'cross', name: 'Cross', category: 'basic', icon: '✚', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'plus', name: 'Plus', category: 'basic', icon: '➕', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'ring', name: 'Ring', category: 'basic', icon: '○', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'half-circle', name: 'Half Circle', category: 'basic', icon: '◗', defaultWidth: 100, defaultHeight: 50 },
  { id: 'quarter-circle', name: 'Quarter Circle', category: 'basic', icon: '◔', defaultWidth: 100, defaultHeight: 100 },
  { id: 'arc', name: 'Arc', category: 'basic', icon: '⌒', defaultWidth: 100, defaultHeight: 50 },
]

// Stars & Bursts
export const STAR_SHAPES: ShapeDefinition[] = [
  { id: 'star-4', name: '4-Point Star', category: 'decorative', icon: '✦', defaultWidth: 100, defaultHeight: 100, points: 4, aspectRatio: 1 },
  { id: 'star-5', name: '5-Point Star', category: 'decorative', icon: '★', defaultWidth: 100, defaultHeight: 100, points: 5, aspectRatio: 1 },
  { id: 'star-6', name: '6-Point Star', category: 'decorative', icon: '✡', defaultWidth: 100, defaultHeight: 100, points: 6, aspectRatio: 1 },
  { id: 'star-8', name: '8-Point Star', category: 'decorative', icon: '✴', defaultWidth: 100, defaultHeight: 100, points: 8, aspectRatio: 1 },
  { id: 'star-12', name: '12-Point Star', category: 'decorative', icon: '✹', defaultWidth: 100, defaultHeight: 100, points: 12, aspectRatio: 1 },
  { id: 'burst-8', name: '8-Point Burst', category: 'decorative', icon: '💥', defaultWidth: 100, defaultHeight: 100, points: 8 },
  { id: 'burst-12', name: '12-Point Burst', category: 'decorative', icon: '✺', defaultWidth: 100, defaultHeight: 100, points: 12 },
  { id: 'burst-16', name: '16-Point Burst', category: 'decorative', icon: '✸', defaultWidth: 100, defaultHeight: 100, points: 16 },
  { id: 'explosion', name: 'Explosion', category: 'decorative', icon: '💢', defaultWidth: 120, defaultHeight: 120 },
  { id: 'seal', name: 'Seal', category: 'decorative', icon: '🔴', defaultWidth: 100, defaultHeight: 100 },
]

// Arrows
export const ARROW_SHAPES: ShapeDefinition[] = [
  { id: 'arrow-right', name: 'Arrow Right', category: 'arrows', icon: '→', defaultWidth: 150, defaultHeight: 40 },
  { id: 'arrow-left', name: 'Arrow Left', category: 'arrows', icon: '←', defaultWidth: 150, defaultHeight: 40 },
  { id: 'arrow-up', name: 'Arrow Up', category: 'arrows', icon: '↑', defaultWidth: 40, defaultHeight: 150 },
  { id: 'arrow-down', name: 'Arrow Down', category: 'arrows', icon: '↓', defaultWidth: 40, defaultHeight: 150 },
  { id: 'arrow-double', name: 'Double Arrow', category: 'arrows', icon: '↔', defaultWidth: 150, defaultHeight: 40 },
  { id: 'arrow-double-vertical', name: 'Double Arrow Vertical', category: 'arrows', icon: '↕', defaultWidth: 40, defaultHeight: 150 },
  { id: 'arrow-curved-right', name: 'Curved Arrow Right', category: 'arrows', icon: '↪', defaultWidth: 100, defaultHeight: 80 },
  { id: 'arrow-curved-left', name: 'Curved Arrow Left', category: 'arrows', icon: '↩', defaultWidth: 100, defaultHeight: 80 },
  { id: 'arrow-u-turn', name: 'U-Turn Arrow', category: 'arrows', icon: '↺', defaultWidth: 80, defaultHeight: 100 },
  { id: 'arrow-circular', name: 'Circular Arrow', category: 'arrows', icon: '🔄', defaultWidth: 100, defaultHeight: 100 },
  { id: 'arrow-chevron', name: 'Chevron', category: 'arrows', icon: '❯', defaultWidth: 80, defaultHeight: 100 },
  { id: 'arrow-chevron-double', name: 'Double Chevron', category: 'arrows', icon: '»', defaultWidth: 100, defaultHeight: 100 },
  { id: 'arrow-striped', name: 'Striped Arrow', category: 'arrows', icon: '➤', defaultWidth: 150, defaultHeight: 50 },
  { id: 'arrow-notched', name: 'Notched Arrow', category: 'arrows', icon: '➔', defaultWidth: 150, defaultHeight: 50 },
  { id: 'arrow-pentagon', name: 'Pentagon Arrow', category: 'arrows', icon: '⮞', defaultWidth: 150, defaultHeight: 60 },
  { id: 'arrow-bent-up', name: 'Bent Arrow Up', category: 'arrows', icon: '↱', defaultWidth: 100, defaultHeight: 100 },
  { id: 'arrow-bent-down', name: 'Bent Arrow Down', category: 'arrows', icon: '↳', defaultWidth: 100, defaultHeight: 100 },
]

// Lines
export const LINE_SHAPES: ShapeDefinition[] = [
  { id: 'line', name: 'Line', category: 'basic', icon: '─', defaultWidth: 150, defaultHeight: 4 },
  { id: 'line-dashed', name: 'Dashed Line', category: 'basic', icon: '┄', defaultWidth: 150, defaultHeight: 4 },
  { id: 'line-dotted', name: 'Dotted Line', category: 'basic', icon: '┈', defaultWidth: 150, defaultHeight: 4 },
  { id: 'line-double', name: 'Double Line', category: 'basic', icon: '═', defaultWidth: 150, defaultHeight: 8 },
  { id: 'line-wavy', name: 'Wavy Line', category: 'decorative', icon: '〰', defaultWidth: 150, defaultHeight: 20 },
  { id: 'line-zigzag', name: 'Zigzag Line', category: 'decorative', icon: '⚡', defaultWidth: 150, defaultHeight: 30 },
  { id: 'connector-elbow', name: 'Elbow Connector', category: 'flowchart', icon: '⌐', defaultWidth: 100, defaultHeight: 100 },
  { id: 'connector-curved', name: 'Curved Connector', category: 'flowchart', icon: '⌒', defaultWidth: 100, defaultHeight: 100 },
]

// Callouts & Speech Bubbles
export const CALLOUT_SHAPES: ShapeDefinition[] = [
  { id: 'callout-rectangle', name: 'Rectangle Callout', category: 'callouts', icon: '🗨', defaultWidth: 150, defaultHeight: 100 },
  { id: 'callout-rounded', name: 'Rounded Callout', category: 'callouts', icon: '💬', defaultWidth: 150, defaultHeight: 100 },
  { id: 'callout-oval', name: 'Oval Callout', category: 'callouts', icon: '🗯', defaultWidth: 150, defaultHeight: 100 },
  { id: 'callout-cloud', name: 'Cloud Callout', category: 'callouts', icon: '💭', defaultWidth: 150, defaultHeight: 120 },
  { id: 'thought-bubble', name: 'Thought Bubble', category: 'callouts', icon: '🤔', defaultWidth: 150, defaultHeight: 120 },
  { id: 'speech-bubble-left', name: 'Speech Left', category: 'callouts', icon: '◀💬', defaultWidth: 150, defaultHeight: 100 },
  { id: 'speech-bubble-right', name: 'Speech Right', category: 'callouts', icon: '💬▶', defaultWidth: 150, defaultHeight: 100 },
  { id: 'shout', name: 'Shout Bubble', category: 'callouts', icon: '📢', defaultWidth: 150, defaultHeight: 120 },
]

// Flowchart Shapes
export const FLOWCHART_SHAPES: ShapeDefinition[] = [
  { id: 'process', name: 'Process', category: 'flowchart', icon: '▭', defaultWidth: 120, defaultHeight: 60 },
  { id: 'decision', name: 'Decision', category: 'flowchart', icon: '◇', defaultWidth: 100, defaultHeight: 100 },
  { id: 'terminator', name: 'Terminator', category: 'flowchart', icon: '⬬', defaultWidth: 120, defaultHeight: 50 },
  { id: 'data', name: 'Data', category: 'flowchart', icon: '▱', defaultWidth: 120, defaultHeight: 60 },
  { id: 'document', name: 'Document', category: 'flowchart', icon: '📄', defaultWidth: 100, defaultHeight: 80 },
  { id: 'database', name: 'Database', category: 'flowchart', icon: '🗄', defaultWidth: 80, defaultHeight: 100 },
  { id: 'manual-input', name: 'Manual Input', category: 'flowchart', icon: '⌨', defaultWidth: 120, defaultHeight: 60 },
  { id: 'preparation', name: 'Preparation', category: 'flowchart', icon: '⬡', defaultWidth: 120, defaultHeight: 60 },
  { id: 'predefined-process', name: 'Predefined Process', category: 'flowchart', icon: '▤', defaultWidth: 120, defaultHeight: 60 },
  { id: 'internal-storage', name: 'Internal Storage', category: 'flowchart', icon: '⬚', defaultWidth: 100, defaultHeight: 100 },
  { id: 'sequential-data', name: 'Sequential Data', category: 'flowchart', icon: '◎', defaultWidth: 100, defaultHeight: 100 },
  { id: 'direct-data', name: 'Direct Data', category: 'flowchart', icon: '◗', defaultWidth: 100, defaultHeight: 80 },
  { id: 'manual-operation', name: 'Manual Operation', category: 'flowchart', icon: '⏢', defaultWidth: 120, defaultHeight: 60 },
  { id: 'merge', name: 'Merge', category: 'flowchart', icon: '▽', defaultWidth: 100, defaultHeight: 60 },
  { id: 'extract', name: 'Extract', category: 'flowchart', icon: '△', defaultWidth: 100, defaultHeight: 60 },
  { id: 'or', name: 'Or', category: 'flowchart', icon: '⊕', defaultWidth: 80, defaultHeight: 80 },
  { id: 'summing-junction', name: 'Summing Junction', category: 'flowchart', icon: '⊗', defaultWidth: 80, defaultHeight: 80 },
  { id: 'delay', name: 'Delay', category: 'flowchart', icon: '◗', defaultWidth: 100, defaultHeight: 60 },
]

// Badges & Labels
export const BADGE_SHAPES: ShapeDefinition[] = [
  { id: 'badge-circle', name: 'Circle Badge', category: 'badges', icon: '🔴', defaultWidth: 100, defaultHeight: 100 },
  { id: 'badge-shield', name: 'Shield', category: 'badges', icon: '🛡', defaultWidth: 80, defaultHeight: 100 },
  { id: 'badge-ribbon', name: 'Ribbon', category: 'badges', icon: '🎗', defaultWidth: 120, defaultHeight: 80 },
  { id: 'badge-banner', name: 'Banner', category: 'badges', icon: '🏷', defaultWidth: 150, defaultHeight: 50 },
  { id: 'badge-corner', name: 'Corner Badge', category: 'badges', icon: '📐', defaultWidth: 80, defaultHeight: 80 },
  { id: 'badge-certificate', name: 'Certificate', category: 'badges', icon: '📜', defaultWidth: 120, defaultHeight: 100 },
  { id: 'badge-award', name: 'Award', category: 'badges', icon: '🏆', defaultWidth: 100, defaultHeight: 120 },
  { id: 'badge-medal', name: 'Medal', category: 'badges', icon: '🎖', defaultWidth: 80, defaultHeight: 100 },
  { id: 'tag', name: 'Tag', category: 'badges', icon: '🏷', defaultWidth: 120, defaultHeight: 60 },
  { id: 'bookmark', name: 'Bookmark', category: 'badges', icon: '🔖', defaultWidth: 60, defaultHeight: 100 },
]

// Frames & Borders
export const FRAME_SHAPES: ShapeDefinition[] = [
  { id: 'frame-rectangle', name: 'Rectangle Frame', category: 'frames', icon: '⬜', defaultWidth: 200, defaultHeight: 150 },
  { id: 'frame-rounded', name: 'Rounded Frame', category: 'frames', icon: '▢', defaultWidth: 200, defaultHeight: 150 },
  { id: 'frame-circle', name: 'Circle Frame', category: 'frames', icon: '⭕', defaultWidth: 150, defaultHeight: 150 },
  { id: 'frame-oval', name: 'Oval Frame', category: 'frames', icon: '⬯', defaultWidth: 200, defaultHeight: 150 },
  { id: 'frame-ornate', name: 'Ornate Frame', category: 'frames', icon: '🖼', defaultWidth: 200, defaultHeight: 150 },
  { id: 'frame-polaroid', name: 'Polaroid', category: 'frames', icon: '📷', defaultWidth: 150, defaultHeight: 180 },
  { id: 'frame-film', name: 'Film Frame', category: 'frames', icon: '🎬', defaultWidth: 200, defaultHeight: 120 },
  { id: 'frame-stamp', name: 'Stamp', category: 'frames', icon: '📮', defaultWidth: 120, defaultHeight: 150 },
]

// Banners & Ribbons
export const BANNER_SHAPES: ShapeDefinition[] = [
  { id: 'banner-horizontal', name: 'Horizontal Banner', category: 'banners', icon: '🏳', defaultWidth: 200, defaultHeight: 60 },
  { id: 'banner-vertical', name: 'Vertical Banner', category: 'banners', icon: '🎌', defaultWidth: 60, defaultHeight: 200 },
  { id: 'banner-wave', name: 'Wave Banner', category: 'banners', icon: '〰', defaultWidth: 200, defaultHeight: 60 },
  { id: 'ribbon-horizontal', name: 'Ribbon', category: 'banners', icon: '🎀', defaultWidth: 200, defaultHeight: 50 },
  { id: 'ribbon-folded', name: 'Folded Ribbon', category: 'banners', icon: '📃', defaultWidth: 200, defaultHeight: 70 },
  { id: 'scroll', name: 'Scroll', category: 'banners', icon: '📜', defaultWidth: 150, defaultHeight: 100 },
  { id: 'curved-banner', name: 'Curved Banner', category: 'banners', icon: '⌒', defaultWidth: 200, defaultHeight: 80 },
  { id: 'corner-ribbon', name: 'Corner Ribbon', category: 'banners', icon: '🔖', defaultWidth: 100, defaultHeight: 100 },
]

// Decorative & Misc
export const DECORATIVE_SHAPES: ShapeDefinition[] = [
  { id: 'heart', name: 'Heart', category: 'decorative', icon: '❤', defaultWidth: 100, defaultHeight: 90 },
  { id: 'cloud', name: 'Cloud', category: 'decorative', icon: '☁', defaultWidth: 150, defaultHeight: 100 },
  { id: 'lightning', name: 'Lightning', category: 'decorative', icon: '⚡', defaultWidth: 60, defaultHeight: 100 },
  { id: 'moon', name: 'Moon', category: 'decorative', icon: '🌙', defaultWidth: 80, defaultHeight: 100 },
  { id: 'sun', name: 'Sun', category: 'decorative', icon: '☀', defaultWidth: 100, defaultHeight: 100 },
  { id: 'drop', name: 'Drop', category: 'decorative', icon: '💧', defaultWidth: 60, defaultHeight: 100 },
  { id: 'flame', name: 'Flame', category: 'decorative', icon: '🔥', defaultWidth: 60, defaultHeight: 100 },
  { id: 'leaf', name: 'Leaf', category: 'decorative', icon: '🍃', defaultWidth: 80, defaultHeight: 100 },
  { id: 'flower', name: 'Flower', category: 'decorative', icon: '🌸', defaultWidth: 100, defaultHeight: 100 },
  { id: 'clover', name: 'Clover', category: 'decorative', icon: '🍀', defaultWidth: 100, defaultHeight: 100 },
  { id: 'puzzle', name: 'Puzzle Piece', category: 'decorative', icon: '🧩', defaultWidth: 100, defaultHeight: 100 },
  { id: 'gear', name: 'Gear', category: 'decorative', icon: '⚙', defaultWidth: 100, defaultHeight: 100, aspectRatio: 1 },
  { id: 'bolt', name: 'Bolt', category: 'decorative', icon: '🔩', defaultWidth: 40, defaultHeight: 80 },
  { id: 'checkmark', name: 'Checkmark', category: 'decorative', icon: '✓', defaultWidth: 80, defaultHeight: 80 },
  { id: 'x-mark', name: 'X Mark', category: 'decorative', icon: '✗', defaultWidth: 80, defaultHeight: 80 },
  { id: 'wave', name: 'Wave', category: 'decorative', icon: '🌊', defaultWidth: 150, defaultHeight: 60 },
  { id: 'spiral', name: 'Spiral', category: 'decorative', icon: '🌀', defaultWidth: 100, defaultHeight: 100 },
  { id: 'infinity', name: 'Infinity', category: 'decorative', icon: '∞', defaultWidth: 150, defaultHeight: 60 },
  { id: 'music-note', name: 'Music Note', category: 'decorative', icon: '♪', defaultWidth: 60, defaultHeight: 100 },
  { id: 'play', name: 'Play', category: 'decorative', icon: '▶', defaultWidth: 80, defaultHeight: 100 },
  { id: 'pause', name: 'Pause', category: 'decorative', icon: '⏸', defaultWidth: 80, defaultHeight: 100 },
]

// Icons (commonly used)
export const ICON_SHAPES: ShapeDefinition[] = [
  { id: 'icon-home', name: 'Home', category: 'icons', icon: '🏠', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-user', name: 'User', category: 'icons', icon: '👤', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-settings', name: 'Settings', category: 'icons', icon: '⚙️', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-search', name: 'Search', category: 'icons', icon: '🔍', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-mail', name: 'Mail', category: 'icons', icon: '✉️', defaultWidth: 100, defaultHeight: 70 },
  { id: 'icon-phone', name: 'Phone', category: 'icons', icon: '📱', defaultWidth: 60, defaultHeight: 100 },
  { id: 'icon-location', name: 'Location', category: 'icons', icon: '📍', defaultWidth: 60, defaultHeight: 90 },
  { id: 'icon-calendar', name: 'Calendar', category: 'icons', icon: '📅', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-clock', name: 'Clock', category: 'icons', icon: '🕐', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-camera', name: 'Camera', category: 'icons', icon: '📷', defaultWidth: 90, defaultHeight: 70 },
  { id: 'icon-wifi', name: 'WiFi', category: 'icons', icon: '📶', defaultWidth: 80, defaultHeight: 60 },
  { id: 'icon-battery', name: 'Battery', category: 'icons', icon: '🔋', defaultWidth: 80, defaultHeight: 40 },
  { id: 'icon-lock', name: 'Lock', category: 'icons', icon: '🔒', defaultWidth: 60, defaultHeight: 80 },
  { id: 'icon-key', name: 'Key', category: 'icons', icon: '🔑', defaultWidth: 90, defaultHeight: 40 },
  { id: 'icon-cart', name: 'Cart', category: 'icons', icon: '🛒', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-dollar', name: 'Dollar', category: 'icons', icon: '💲', defaultWidth: 60, defaultHeight: 100 },
  { id: 'icon-percent', name: 'Percent', category: 'icons', icon: '％', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-gift', name: 'Gift', category: 'icons', icon: '🎁', defaultWidth: 80, defaultHeight: 90 },
  { id: 'icon-thumbsup', name: 'Thumbs Up', category: 'icons', icon: '👍', defaultWidth: 80, defaultHeight: 80 },
  { id: 'icon-star', name: 'Star', category: 'icons', icon: '⭐', defaultWidth: 80, defaultHeight: 80 },
]

// All shapes combined
export const ALL_SHAPES: ShapeDefinition[] = [
  ...BASIC_SHAPES,
  ...STAR_SHAPES,
  ...ARROW_SHAPES,
  ...LINE_SHAPES,
  ...CALLOUT_SHAPES,
  ...FLOWCHART_SHAPES,
  ...BADGE_SHAPES,
  ...FRAME_SHAPES,
  ...BANNER_SHAPES,
  ...DECORATIVE_SHAPES,
  ...ICON_SHAPES,
]

// Shape categories for UI
export const SHAPE_CATEGORIES = [
  { id: 'all', name: 'All Shapes', icon: '📦', count: ALL_SHAPES.length },
  { id: 'basic', name: 'Basic', icon: '⬜', count: BASIC_SHAPES.length },
  { id: 'decorative', name: 'Stars & Decorative', icon: '⭐', count: STAR_SHAPES.length + DECORATIVE_SHAPES.length },
  { id: 'arrows', name: 'Arrows & Lines', icon: '➡️', count: ARROW_SHAPES.length + LINE_SHAPES.length },
  { id: 'callouts', name: 'Callouts', icon: '💬', count: CALLOUT_SHAPES.length },
  { id: 'flowchart', name: 'Flowchart', icon: '📊', count: FLOWCHART_SHAPES.length },
  { id: 'badges', name: 'Badges & Labels', icon: '🏷️', count: BADGE_SHAPES.length },
  { id: 'frames', name: 'Frames', icon: '🖼️', count: FRAME_SHAPES.length },
  { id: 'banners', name: 'Banners', icon: '🎀', count: BANNER_SHAPES.length },
  { id: 'icons', name: 'Icons', icon: '🔣', count: ICON_SHAPES.length },
]

// Get shapes by category
export function getShapesByCategory(category: string): ShapeDefinition[] {
  if (category === 'all') return ALL_SHAPES
  if (category === 'decorative') return [...STAR_SHAPES, ...DECORATIVE_SHAPES]
  if (category === 'arrows') return [...ARROW_SHAPES, ...LINE_SHAPES]
  
  return ALL_SHAPES.filter(s => s.category === category)
}

// Get shape by ID
export function getShapeById(id: string): ShapeDefinition | undefined {
  return ALL_SHAPES.find(s => s.id === id)
}

// SVG Path generators for complex shapes
export const SVG_PATHS: Record<string, (w: number, h: number) => string> = {
  // Hearts
  'heart': (w, h) => `M ${w/2} ${h*0.25} C ${w*0.75} ${-h*0.1}, ${w*1.1} ${h*0.35}, ${w/2} ${h} C ${-w*0.1} ${h*0.35}, ${w*0.25} ${-h*0.1}, ${w/2} ${h*0.25} Z`,
  
  // Cloud
  'cloud': (w, h) => `M ${w*0.25} ${h*0.7} C ${w*0.1} ${h*0.7}, 0 ${h*0.55}, ${w*0.15} ${h*0.4} C ${w*0.15} ${h*0.2}, ${w*0.35} ${h*0.1}, ${w*0.5} ${h*0.2} C ${w*0.65} ${h*0.05}, ${w*0.9} ${h*0.15}, ${w*0.9} ${h*0.4} C ${w} ${h*0.5}, ${w} ${h*0.7}, ${w*0.8} ${h*0.7} Z`,
  
  // Lightning
  'lightning': (w, h) => `M ${w*0.6} 0 L ${w*0.35} ${h*0.4} L ${w*0.5} ${h*0.4} L ${w*0.4} ${h} L ${w*0.65} ${h*0.55} L ${w*0.5} ${h*0.55} Z`,
  
  // Drop / Raindrop
  'drop': (w, h) => `M ${w/2} 0 C ${w*0.8} ${h*0.35}, ${w} ${h*0.6}, ${w/2} ${h} C 0 ${h*0.6}, ${w*0.2} ${h*0.35}, ${w/2} 0 Z`,
  'raindrop': (w, h) => `M ${w/2} 0 C ${w*0.8} ${h*0.35}, ${w} ${h*0.6}, ${w/2} ${h} C 0 ${h*0.6}, ${w*0.2} ${h*0.35}, ${w/2} 0 Z`,
  
  // Parallelogram
  'parallelogram': (w, h) => `M ${w*0.2} 0 L ${w} 0 L ${w*0.8} ${h} L 0 ${h} Z`,
  
  // Trapezoid
  'trapezoid': (w, h) => `M ${w*0.15} 0 L ${w*0.85} 0 L ${w} ${h} L 0 ${h} Z`,
  
  // Right Triangle
  'right-triangle': (w, h) => `M 0 ${h} L ${w} ${h} L 0 0 Z`,
  
  // Cross/Plus
  'cross': (w, h) => `M ${w*0.35} 0 L ${w*0.65} 0 L ${w*0.65} ${h*0.35} L ${w} ${h*0.35} L ${w} ${h*0.65} L ${w*0.65} ${h*0.65} L ${w*0.65} ${h} L ${w*0.35} ${h} L ${w*0.35} ${h*0.65} L 0 ${h*0.65} L 0 ${h*0.35} L ${w*0.35} ${h*0.35} Z`,
  'plus': (w, h) => `M ${w*0.35} 0 L ${w*0.65} 0 L ${w*0.65} ${h*0.35} L ${w} ${h*0.35} L ${w} ${h*0.65} L ${w*0.65} ${h*0.65} L ${w*0.65} ${h} L ${w*0.35} ${h} L ${w*0.35} ${h*0.65} L 0 ${h*0.65} L 0 ${h*0.35} L ${w*0.35} ${h*0.35} Z`,
  
  // Diamond
  'diamond': (w, h) => `M ${w/2} 0 L ${w} ${h/2} L ${w/2} ${h} L 0 ${h/2} Z`,
  'rhombus': (w, h) => `M ${w/2} 0 L ${w} ${h/2} L ${w/2} ${h} L 0 ${h/2} Z`,
  
  // Arrows
  'arrow-chevron': (w, h) => `M 0 ${h*0.2} L ${w*0.7} ${h*0.2} L ${w} ${h/2} L ${w*0.7} ${h*0.8} L 0 ${h*0.8} L ${w*0.3} ${h/2} Z`,
  'arrow-pentagon': (w, h) => `M 0 ${h*0.25} L ${w*0.7} ${h*0.25} L ${w} ${h/2} L ${w*0.7} ${h*0.75} L 0 ${h*0.75} Z`,
  'arrow-notched': (w, h) => `M 0 ${h*0.25} L ${w*0.6} ${h*0.25} L ${w*0.6} 0 L ${w} ${h/2} L ${w*0.6} ${h} L ${w*0.6} ${h*0.75} L 0 ${h*0.75} L ${w*0.15} ${h/2} Z`,
  'arrow-right': (w, h) => `M 0 ${h*0.35} L ${w*0.65} ${h*0.35} L ${w*0.65} 0 L ${w} ${h/2} L ${w*0.65} ${h} L ${w*0.65} ${h*0.65} L 0 ${h*0.65} Z`,
  'arrow-left': (w, h) => `M ${w} ${h*0.35} L ${w*0.35} ${h*0.35} L ${w*0.35} 0 L 0 ${h/2} L ${w*0.35} ${h} L ${w*0.35} ${h*0.65} L ${w} ${h*0.65} Z`,
  'arrow-up': (w, h) => `M ${w*0.35} ${h} L ${w*0.35} ${h*0.35} L 0 ${h*0.35} L ${w/2} 0 L ${w} ${h*0.35} L ${w*0.65} ${h*0.35} L ${w*0.65} ${h} Z`,
  'arrow-down': (w, h) => `M ${w*0.35} 0 L ${w*0.35} ${h*0.65} L 0 ${h*0.65} L ${w/2} ${h} L ${w} ${h*0.65} L ${w*0.65} ${h*0.65} L ${w*0.65} 0 Z`,
  'arrow-double': (w, h) => `M 0 ${h/2} L ${w*0.2} ${h*0.2} L ${w*0.2} ${h*0.4} L ${w*0.8} ${h*0.4} L ${w*0.8} ${h*0.2} L ${w} ${h/2} L ${w*0.8} ${h*0.8} L ${w*0.8} ${h*0.6} L ${w*0.2} ${h*0.6} L ${w*0.2} ${h*0.8} Z`,
  
  // Callouts / Speech Bubbles
  'callout-rectangle': (w, h) => `M 0 0 L ${w} 0 L ${w} ${h*0.7} L ${w*0.35} ${h*0.7} L ${w*0.2} ${h} L ${w*0.25} ${h*0.7} L 0 ${h*0.7} Z`,
  'callout-rounded': (w, h) => `M ${w*0.1} 0 L ${w*0.9} 0 Q ${w} 0 ${w} ${h*0.1} L ${w} ${h*0.6} Q ${w} ${h*0.7} ${w*0.9} ${h*0.7} L ${w*0.35} ${h*0.7} L ${w*0.2} ${h} L ${w*0.25} ${h*0.7} L ${w*0.1} ${h*0.7} Q 0 ${h*0.7} 0 ${h*0.6} L 0 ${h*0.1} Q 0 0 ${w*0.1} 0 Z`,
  'callout-cloud': (w, h) => `M ${w*0.25} ${h*0.6} C ${w*0.1} ${h*0.6}, 0 ${h*0.45}, ${w*0.15} ${h*0.3} C ${w*0.15} ${h*0.15}, ${w*0.35} ${h*0.05}, ${w*0.5} ${h*0.15} C ${w*0.65} ${h*0.02}, ${w*0.9} ${h*0.1}, ${w*0.9} ${h*0.3} C ${w} ${h*0.4}, ${w} ${h*0.6}, ${w*0.8} ${h*0.6} L ${w*0.3} ${h*0.6} L ${w*0.15} ${h*0.85} L ${w*0.25} ${h*0.6} Z`,
  'thought-bubble': (w, h) => `M ${w*0.25} ${h*0.55} C ${w*0.1} ${h*0.55}, 0 ${h*0.4}, ${w*0.15} ${h*0.25} C ${w*0.15} ${h*0.1}, ${w*0.35} ${h*0.02}, ${w*0.5} ${h*0.1} C ${w*0.65} ${h*0.02}, ${w*0.9} ${h*0.08}, ${w*0.9} ${h*0.25} C ${w} ${h*0.35}, ${w} ${h*0.55}, ${w*0.8} ${h*0.55} Z M ${w*0.2} ${h*0.7} A ${w*0.08} ${h*0.06} 0 1 1 ${w*0.2} ${h*0.72} M ${w*0.12} ${h*0.85} A ${w*0.05} ${h*0.04} 0 1 1 ${w*0.12} ${h*0.87}`,
  
  // Badges
  'badge-shield': (w, h) => `M ${w/2} 0 L ${w} ${h*0.15} L ${w} ${h*0.5} Q ${w} ${h*0.85} ${w/2} ${h} Q 0 ${h*0.85} 0 ${h*0.5} L 0 ${h*0.15} Z`,
  'badge-ribbon': (w, h) => `M ${w*0.1} 0 L ${w*0.9} 0 L ${w*0.9} ${h*0.7} L ${w/2} ${h*0.55} L ${w*0.1} ${h*0.7} Z M ${w*0.1} ${h*0.65} L ${w*0.1} ${h} L ${w*0.25} ${h*0.8} M ${w*0.9} ${h*0.65} L ${w*0.9} ${h} L ${w*0.75} ${h*0.8}`,
  'badge-banner': (w, h) => `M 0 ${h*0.2} L ${w*0.1} ${h*0.35} L 0 ${h*0.5} L 0 ${h*0.8} L ${w} ${h*0.8} L ${w} ${h*0.5} L ${w*0.9} ${h*0.35} L ${w} ${h*0.2} L ${w} 0 L 0 0 Z`,
  'badge-seal': (w, h) => {
    const cx = w/2, cy = h/2
    const outer = Math.min(w, h) * 0.48
    const inner = outer * 0.85
    const points = 16
    let path = ''
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const angle = (i * Math.PI) / points - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + ' Z'
  },
  
  // Flowchart
  'process': (w, h) => `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`,
  'decision': (w, h) => `M ${w/2} 0 L ${w} ${h/2} L ${w/2} ${h} L 0 ${h/2} Z`,
  'terminator': (w, h) => `M ${h/2} 0 L ${w - h/2} 0 A ${h/2} ${h/2} 0 0 1 ${w - h/2} ${h} L ${h/2} ${h} A ${h/2} ${h/2} 0 0 1 ${h/2} 0 Z`,
  'data': (w, h) => `M ${w*0.15} 0 L ${w} 0 L ${w*0.85} ${h} L 0 ${h} Z`,
  'document': (w, h) => `M 0 0 L ${w} 0 L ${w} ${h*0.85} Q ${w*0.75} ${h*0.7} ${w/2} ${h*0.85} Q ${w*0.25} ${h} 0 ${h*0.85} Z`,
  'database': (w, h) => `M 0 ${h*0.15} A ${w/2} ${h*0.15} 0 0 1 ${w} ${h*0.15} L ${w} ${h*0.85} A ${w/2} ${h*0.15} 0 0 1 0 ${h*0.85} Z M 0 ${h*0.15} A ${w/2} ${h*0.15} 0 0 0 ${w} ${h*0.15}`,
  
  // Banners
  'ribbon-horizontal': (w, h) => `M 0 ${h*0.3} L ${w*0.1} ${h/2} L 0 ${h*0.7} L ${w*0.15} ${h*0.7} L ${w*0.15} ${h} L ${w*0.25} ${h*0.7} L ${w*0.75} ${h*0.7} L ${w*0.85} ${h} L ${w*0.85} ${h*0.7} L ${w} ${h*0.7} L ${w*0.9} ${h/2} L ${w} ${h*0.3} L ${w*0.85} ${h*0.3} L ${w*0.85} 0 L ${w*0.75} ${h*0.3} L ${w*0.25} ${h*0.3} L ${w*0.15} 0 L ${w*0.15} ${h*0.3} Z`,
  'banner-wave': (w, h) => `M 0 ${h*0.3} Q ${w*0.25} ${h*0.1} ${w/2} ${h*0.3} Q ${w*0.75} ${h*0.5} ${w} ${h*0.3} L ${w} ${h*0.7} Q ${w*0.75} ${h*0.5} ${w/2} ${h*0.7} Q ${w*0.25} ${h*0.9} 0 ${h*0.7} Z`,
  'banner-bookmark': (w, h) => `M 0 0 L ${w} 0 L ${w} ${h} L ${w/2} ${h*0.75} L 0 ${h} Z`,
  
  // Decorative
  'sparkle': (w, h) => {
    const cx = w/2, cy = h/2
    const outer = Math.min(w, h) * 0.48
    const inner = outer * 0.25
    let path = ''
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? outer : inner
      const angle = (i * Math.PI) / 4 - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + ' Z'
  },
  'sun': (w, h) => {
    const cx = w/2, cy = h/2
    const outer = Math.min(w, h) * 0.48
    const inner = outer * 0.6
    const rays = 12
    let path = ''
    for (let i = 0; i < rays * 2; i++) {
      const r = i % 2 === 0 ? outer : inner
      const angle = (i * Math.PI) / rays - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + ' Z'
  },
  'flower': (w, h) => {
    const cx = w/2, cy = h/2
    const r = Math.min(w, h) * 0.35
    let path = ''
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3
      const px = cx + r * Math.cos(angle)
      const py = cy + r * Math.sin(angle)
      path += `M ${cx} ${cy} Q ${cx + r*0.7*Math.cos(angle-0.3)} ${cy + r*0.7*Math.sin(angle-0.3)} ${px} ${py} Q ${cx + r*0.7*Math.cos(angle+0.3)} ${cy + r*0.7*Math.sin(angle+0.3)} ${cx} ${cy} `
    }
    return path
  },
  'leaf': (w, h) => `M ${w*0.5} ${h} Q 0 ${h*0.5} ${w*0.5} 0 Q ${w} ${h*0.5} ${w*0.5} ${h} M ${w*0.5} ${h} L ${w*0.5} ${h*0.3}`,
  'moon': (w, h) => `M ${w*0.7} ${h*0.1} C ${w*0.3} ${h*0.1}, ${w*0.1} ${h*0.35}, ${w*0.1} ${h*0.6} C ${w*0.1} ${h*0.85}, ${w*0.35} ${h}, ${w*0.65} ${h*0.9} C ${w*0.35} ${h*0.8}, ${w*0.25} ${h*0.5}, ${w*0.4} ${h*0.25} C ${w*0.5} ${h*0.1}, ${w*0.6} ${h*0.05}, ${w*0.7} ${h*0.1} Z`,
  'flame': (w, h) => `M ${w/2} 0 Q ${w*0.7} ${h*0.2}, ${w*0.65} ${h*0.4} Q ${w*0.8} ${h*0.35}, ${w*0.75} ${h*0.55} Q ${w} ${h*0.65}, ${w*0.6} ${h} Q ${w/2} ${h*0.85}, ${w*0.4} ${h} Q 0 ${h*0.65}, ${w*0.25} ${h*0.55} Q ${w*0.2} ${h*0.35}, ${w*0.35} ${h*0.4} Q ${w*0.3} ${h*0.2}, ${w/2} 0 Z`,
  'snowflake': (w, h) => {
    const cx = w/2, cy = h/2
    const r = Math.min(w, h) * 0.45
    let path = ''
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3 - Math.PI / 2
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += `M ${cx} ${cy} L ${x} ${y} `
      // Add branches
      const bx = cx + r*0.6 * Math.cos(angle)
      const by = cy + r*0.6 * Math.sin(angle)
      path += `M ${bx} ${by} L ${bx + r*0.25*Math.cos(angle+0.5)} ${by + r*0.25*Math.sin(angle+0.5)} `
      path += `M ${bx} ${by} L ${bx + r*0.25*Math.cos(angle-0.5)} ${by + r*0.25*Math.sin(angle-0.5)} `
    }
    return path
  },
  
  // Gear
  'gear': (w, h) => {
    const cx = w/2, cy = h/2
    const outer = Math.min(w, h) * 0.48
    const inner = outer * 0.7
    const teeth = 8
    let path = ''
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth - Math.PI/2
      const r = i % 2 === 0 ? outer : inner
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + ' Z'
  },
  'icon-settings': (w, h) => {
    const cx = w/2, cy = h/2
    const outer = Math.min(w, h) * 0.48
    const inner = outer * 0.7
    const teeth = 8
    let path = ''
    for (let i = 0; i < teeth * 2; i++) {
      const angle = (i * Math.PI) / teeth - Math.PI/2
      const r = i % 2 === 0 ? outer : inner
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      path += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    }
    return path + ' Z'
  },
  
  // Icons
  'icon-check': (w, h) => `M ${w*0.15} ${h*0.5} L ${w*0.4} ${h*0.75} L ${w*0.85} ${h*0.25}`,
  'icon-x': (w, h) => `M ${w*0.2} ${h*0.2} L ${w*0.8} ${h*0.8} M ${w*0.8} ${h*0.2} L ${w*0.2} ${h*0.8}`,
  'icon-info': (w, h) => `M ${w/2} ${h*0.15} A ${w*0.08} ${h*0.08} 0 1 1 ${w/2 + 0.01} ${h*0.15} M ${w*0.42} ${h*0.35} L ${w*0.58} ${h*0.35} L ${w*0.58} ${h*0.85} L ${w*0.42} ${h*0.85} Z`,
  'icon-warning': (w, h) => `M ${w/2} 0 L ${w} ${h} L 0 ${h} Z M ${w*0.42} ${h*0.35} L ${w*0.58} ${h*0.35} L ${w*0.56} ${h*0.6} L ${w*0.44} ${h*0.6} Z M ${w/2} ${h*0.7} A ${w*0.06} ${h*0.06} 0 1 1 ${w/2 + 0.01} ${h*0.7}`,
  'icon-question': (w, h) => `M ${w*0.3} ${h*0.3} Q ${w*0.3} ${h*0.1} ${w/2} ${h*0.1} Q ${w*0.7} ${h*0.1} ${w*0.7} ${h*0.3} Q ${w*0.7} ${h*0.45} ${w/2} ${h*0.5} L ${w/2} ${h*0.65} M ${w/2} ${h*0.8} A ${w*0.05} ${h*0.05} 0 1 1 ${w/2 + 0.01} ${h*0.8}`,
  'icon-lock': (w, h) => `M ${w*0.2} ${h*0.4} L ${w*0.2} ${h*0.3} A ${w*0.3} ${h*0.3} 0 0 1 ${w*0.8} ${h*0.3} L ${w*0.8} ${h*0.4} L ${w*0.9} ${h*0.4} L ${w*0.9} ${h} L ${w*0.1} ${h} L ${w*0.1} ${h*0.4} Z M ${w*0.45} ${h*0.6} L ${w*0.55} ${h*0.6} L ${w*0.55} ${h*0.8} L ${w*0.45} ${h*0.8} Z`,
  'icon-unlock': (w, h) => `M ${w*0.2} ${h*0.4} L ${w*0.2} ${h*0.3} A ${w*0.3} ${h*0.3} 0 0 1 ${w*0.8} ${h*0.3} L ${w*0.9} ${h*0.4} L ${w*0.9} ${h} L ${w*0.1} ${h} L ${w*0.1} ${h*0.4} Z M ${w*0.45} ${h*0.6} L ${w*0.55} ${h*0.6} L ${w*0.55} ${h*0.8} L ${w*0.45} ${h*0.8} Z`,
  'icon-home': (w, h) => `M ${w/2} 0 L ${w} ${h*0.4} L ${w*0.85} ${h*0.4} L ${w*0.85} ${h} L ${w*0.15} ${h} L ${w*0.15} ${h*0.4} L 0 ${h*0.4} Z M ${w*0.4} ${h} L ${w*0.4} ${h*0.6} L ${w*0.6} ${h*0.6} L ${w*0.6} ${h}`,
  'icon-search': (w, h) => `M ${w*0.4} ${h*0.1} A ${w*0.3} ${h*0.3} 0 1 1 ${w*0.4} ${h*0.7} A ${w*0.3} ${h*0.3} 0 1 1 ${w*0.4} ${h*0.1} M ${w*0.6} ${h*0.65} L ${w*0.9} ${h*0.95}`,
  'icon-mail': (w, h) => `M 0 ${h*0.2} L ${w} ${h*0.2} L ${w} ${h*0.8} L 0 ${h*0.8} Z M 0 ${h*0.2} L ${w/2} ${h*0.55} L ${w} ${h*0.2}`,
  'icon-phone': (w, h) => `M ${w*0.25} 0 L ${w*0.75} 0 Q ${w*0.85} 0 ${w*0.85} ${h*0.05} L ${w*0.85} ${h*0.95} Q ${w*0.85} ${h} ${w*0.75} ${h} L ${w*0.25} ${h} Q ${w*0.15} ${h} ${w*0.15} ${h*0.95} L ${w*0.15} ${h*0.05} Q ${w*0.15} 0 ${w*0.25} 0 M ${w*0.4} ${h*0.9} L ${w*0.6} ${h*0.9}`,
  'icon-user': (w, h) => `M ${w/2} ${h*0.35} A ${w*0.18} ${h*0.18} 0 1 1 ${w/2 + 0.01} ${h*0.35} M ${w*0.15} ${h} A ${w*0.35} ${h*0.35} 0 0 1 ${w*0.85} ${h}`,
  'icon-location': (w, h) => `M ${w/2} 0 A ${w*0.4} ${h*0.35} 0 0 1 ${w*0.9} ${h*0.35} Q ${w*0.9} ${h*0.6} ${w/2} ${h} Q ${w*0.1} ${h*0.6} ${w*0.1} ${h*0.35} A ${w*0.4} ${h*0.35} 0 0 1 ${w/2} 0 M ${w/2} ${h*0.25} A ${w*0.12} ${h*0.1} 0 1 1 ${w/2 + 0.01} ${h*0.25}`,
  'icon-calendar': (w, h) => `M ${w*0.1} ${h*0.15} L ${w*0.9} ${h*0.15} L ${w*0.9} ${h*0.95} L ${w*0.1} ${h*0.95} Z M ${w*0.1} ${h*0.3} L ${w*0.9} ${h*0.3} M ${w*0.25} 0 L ${w*0.25} ${h*0.2} M ${w*0.75} 0 L ${w*0.75} ${h*0.2}`,
  'icon-clock': (w, h) => `M ${w/2} ${h*0.05} A ${w*0.45} ${h*0.45} 0 1 1 ${w/2 - 0.01} ${h*0.05} M ${w/2} ${h/2} L ${w/2} ${h*0.25} M ${w/2} ${h/2} L ${w*0.7} ${h/2}`,
  'icon-play': (w, h) => `M ${w*0.2} 0 L ${w} ${h/2} L ${w*0.2} ${h} Z`,
  'icon-pause': (w, h) => `M ${w*0.15} 0 L ${w*0.4} 0 L ${w*0.4} ${h} L ${w*0.15} ${h} Z M ${w*0.6} 0 L ${w*0.85} 0 L ${w*0.85} ${h} L ${w*0.6} ${h} Z`,
  'icon-volume': (w, h) => `M 0 ${h*0.35} L ${w*0.2} ${h*0.35} L ${w*0.45} ${h*0.1} L ${w*0.45} ${h*0.9} L ${w*0.2} ${h*0.65} L 0 ${h*0.65} Z M ${w*0.55} ${h*0.35} Q ${w*0.7} ${h/2} ${w*0.55} ${h*0.65} M ${w*0.6} ${h*0.2} Q ${w*0.9} ${h/2} ${w*0.6} ${h*0.8}`,
  'icon-camera': (w, h) => `M ${w*0.1} ${h*0.25} L ${w*0.3} ${h*0.25} L ${w*0.35} ${h*0.1} L ${w*0.65} ${h*0.1} L ${w*0.7} ${h*0.25} L ${w*0.9} ${h*0.25} L ${w*0.9} ${h*0.9} L ${w*0.1} ${h*0.9} Z M ${w/2} ${h*0.4} A ${w*0.18} ${h*0.2} 0 1 1 ${w/2 + 0.01} ${h*0.4}`,
}

