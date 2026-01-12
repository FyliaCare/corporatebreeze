/**
 * Advanced Typography System
 * Professional text features for the design studio
 */

// Text Style Presets
export interface TextStylePreset {
  id: string;
  name: string;
  category: 'heading' | 'body' | 'display' | 'decorative' | 'special';
  style: TextStyle;
}

// Text Style
export interface TextStyle {
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  fontStyle: 'normal' | 'italic' | 'oblique';
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  textTransform: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  textDecoration: 'none' | 'underline' | 'overline' | 'line-through';
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  backgroundColor?: string;
  textShadow?: string;
  webkitTextStroke?: string;
}

// Character Style (for individual character formatting)
export interface CharacterStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: 'normal' | 'italic';
  color?: string;
  backgroundColor?: string;
  letterSpacing?: number;
  baselineShift?: number;
  textDecoration?: string;
  superscript?: boolean;
  subscript?: boolean;
}

// Paragraph Style
export interface ParagraphStyle {
  textAlign: 'left' | 'center' | 'right' | 'justify';
  lineHeight: number;
  paragraphSpacing: number;
  firstLineIndent: number;
  marginLeft: number;
  marginRight: number;
  bulletStyle?: 'none' | 'disc' | 'circle' | 'square' | 'decimal' | 'alpha' | 'roman';
  bulletColor?: string;
  dropCap?: boolean;
  dropCapLines?: number;
}

// Text Effect
export interface TextEffect {
  type: 'shadow' | 'outline' | 'glow' | '3d' | 'gradient' | 'pattern' | 'neon';
  enabled: boolean;
}

export interface TextShadowEffect extends TextEffect {
  type: 'shadow';
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
}

export interface TextOutlineEffect extends TextEffect {
  type: 'outline';
  width: number;
  color: string;
}

export interface TextGlowEffect extends TextEffect {
  type: 'glow';
  blur: number;
  color: string;
  spread: number;
}

export interface Text3DEffect extends TextEffect {
  type: '3d';
  depth: number;
  angle: number;
  color: string;
}

export interface TextGradientEffect extends TextEffect {
  type: 'gradient';
  gradientType: 'linear' | 'radial';
  angle: number;
  colors: string[];
  stops: number[];
}

export interface TextNeonEffect extends TextEffect {
  type: 'neon';
  color: string;
  intensity: number;
  flicker?: boolean;
}

// Text on Path
export interface TextPathConfig {
  enabled: boolean;
  pathType: 'circle' | 'arc' | 'wave' | 'bezier' | 'custom';
  pathData?: string;
  offset: number;
  align: 'start' | 'center' | 'end';
  reverse: boolean;
  // Circle/Arc specific
  radius?: number;
  startAngle?: number;
  endAngle?: number;
  // Wave specific
  amplitude?: number;
  wavelength?: number;
  phase?: number;
}

// OpenType Features
export interface OpenTypeFeatures {
  liga: boolean;  // Standard Ligatures
  dlig: boolean;  // Discretionary Ligatures
  hlig: boolean;  // Historical Ligatures
  calt: boolean;  // Contextual Alternates
  salt: boolean;  // Stylistic Alternates
  ss01: boolean;  // Stylistic Set 1
  ss02: boolean;  // Stylistic Set 2
  ss03: boolean;  // Stylistic Set 3
  smcp: boolean;  // Small Caps
  c2sc: boolean;  // Caps to Small Caps
  onum: boolean;  // Oldstyle Numerals
  lnum: boolean;  // Lining Numerals
  tnum: boolean;  // Tabular Numerals
  pnum: boolean;  // Proportional Numerals
  frac: boolean;  // Fractions
  ordn: boolean;  // Ordinals
  zero: boolean;  // Slashed Zero
  swsh: boolean;  // Swash
  kern: boolean;  // Kerning
}

// ============================================
// Font Collections
// ============================================

export const FONT_CATEGORIES = [
  { id: 'serif', name: 'Serif', icon: 'serif' },
  { id: 'sans-serif', name: 'Sans Serif', icon: 'sans' },
  { id: 'display', name: 'Display', icon: 'display' },
  { id: 'handwriting', name: 'Handwriting', icon: 'script' },
  { id: 'monospace', name: 'Monospace', icon: 'mono' }
] as const;

export const PREMIUM_FONTS = [
  // Serif
  { family: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900] },
  { family: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { family: 'Cormorant Garamond', category: 'serif', weights: [300, 400, 500, 600, 700] },
  { family: 'Crimson Pro', category: 'serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Source Serif Pro', category: 'serif', weights: [200, 300, 400, 600, 700, 900] },
  { family: 'Libre Baskerville', category: 'serif', weights: [400, 700] },
  { family: 'EB Garamond', category: 'serif', weights: [400, 500, 600, 700, 800] },
  
  // Sans Serif
  { family: 'Inter', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Poppins', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Montserrat', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Open Sans', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800] },
  { family: 'Roboto', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900] },
  { family: 'Lato', category: 'sans-serif', weights: [100, 300, 400, 700, 900] },
  { family: 'Nunito', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Raleway', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Work Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'DM Sans', category: 'sans-serif', weights: [400, 500, 700] },
  { family: 'Space Grotesk', category: 'sans-serif', weights: [300, 400, 500, 600, 700] },
  
  // Display
  { family: 'Abril Fatface', category: 'display', weights: [400] },
  { family: 'Bebas Neue', category: 'display', weights: [400] },
  { family: 'Anton', category: 'display', weights: [400] },
  { family: 'Oswald', category: 'display', weights: [200, 300, 400, 500, 600, 700] },
  { family: 'Righteous', category: 'display', weights: [400] },
  { family: 'Lobster', category: 'display', weights: [400] },
  { family: 'Permanent Marker', category: 'display', weights: [400] },
  { family: 'Titan One', category: 'display', weights: [400] },
  { family: 'Bangers', category: 'display', weights: [400] },
  { family: 'Bungee', category: 'display', weights: [400] },
  
  // Handwriting
  { family: 'Dancing Script', category: 'handwriting', weights: [400, 500, 600, 700] },
  { family: 'Pacifico', category: 'handwriting', weights: [400] },
  { family: 'Great Vibes', category: 'handwriting', weights: [400] },
  { family: 'Sacramento', category: 'handwriting', weights: [400] },
  { family: 'Satisfy', category: 'handwriting', weights: [400] },
  { family: 'Caveat', category: 'handwriting', weights: [400, 500, 600, 700] },
  { family: 'Kalam', category: 'handwriting', weights: [300, 400, 700] },
  { family: 'Indie Flower', category: 'handwriting', weights: [400] },
  
  // Monospace
  { family: 'JetBrains Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700, 800] },
  { family: 'Fira Code', category: 'monospace', weights: [300, 400, 500, 600, 700] },
  { family: 'Source Code Pro', category: 'monospace', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'IBM Plex Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700] },
  { family: 'Roboto Mono', category: 'monospace', weights: [100, 200, 300, 400, 500, 600, 700] }
];

// ============================================
// Text Style Presets
// ============================================

export const TEXT_STYLE_PRESETS: TextStylePreset[] = [
  // Headings
  {
    id: 'heading-1',
    name: 'Heading 1',
    category: 'heading',
    style: {
      fontFamily: 'Inter',
      fontSize: 48,
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: 1.2,
      letterSpacing: -0.02,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#1a1a1a'
    }
  },
  {
    id: 'heading-2',
    name: 'Heading 2',
    category: 'heading',
    style: {
      fontFamily: 'Inter',
      fontSize: 36,
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: 1.3,
      letterSpacing: -0.01,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#1a1a1a'
    }
  },
  {
    id: 'heading-3',
    name: 'Heading 3',
    category: 'heading',
    style: {
      fontFamily: 'Inter',
      fontSize: 28,
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#1a1a1a'
    }
  },
  // Body
  {
    id: 'body-large',
    name: 'Body Large',
    category: 'body',
    style: {
      fontFamily: 'Inter',
      fontSize: 18,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#333333'
    }
  },
  {
    id: 'body-regular',
    name: 'Body',
    category: 'body',
    style: {
      fontFamily: 'Inter',
      fontSize: 16,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#333333'
    }
  },
  {
    id: 'body-small',
    name: 'Body Small',
    category: 'body',
    style: {
      fontFamily: 'Inter',
      fontSize: 14,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.5,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#555555'
    }
  },
  {
    id: 'caption',
    name: 'Caption',
    category: 'body',
    style: {
      fontFamily: 'Inter',
      fontSize: 12,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0.01,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#666666'
    }
  },
  // Display
  {
    id: 'display-hero',
    name: 'Hero Display',
    category: 'display',
    style: {
      fontFamily: 'Playfair Display',
      fontSize: 72,
      fontWeight: 700,
      fontStyle: 'normal',
      lineHeight: 1.1,
      letterSpacing: -0.03,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#1a1a1a'
    }
  },
  {
    id: 'display-bold',
    name: 'Bold Statement',
    category: 'display',
    style: {
      fontFamily: 'Bebas Neue',
      fontSize: 64,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.0,
      letterSpacing: 0.05,
      wordSpacing: 0,
      textTransform: 'uppercase',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#1a1a1a'
    }
  },
  {
    id: 'display-elegant',
    name: 'Elegant',
    category: 'display',
    style: {
      fontFamily: 'Cormorant Garamond',
      fontSize: 56,
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.2,
      letterSpacing: 0.02,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#2c2c2c'
    }
  },
  // Decorative
  {
    id: 'script-fancy',
    name: 'Fancy Script',
    category: 'decorative',
    style: {
      fontFamily: 'Great Vibes',
      fontSize: 48,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#8B5CF6'
    }
  },
  {
    id: 'handwritten',
    name: 'Handwritten',
    category: 'decorative',
    style: {
      fontFamily: 'Caveat',
      fontSize: 32,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.5,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#374151'
    }
  },
  {
    id: 'playful',
    name: 'Playful',
    category: 'decorative',
    style: {
      fontFamily: 'Bangers',
      fontSize: 42,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.2,
      letterSpacing: 0.03,
      wordSpacing: 0,
      textTransform: 'uppercase',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#F59E0B'
    }
  },
  // Special
  {
    id: 'label-uppercase',
    name: 'Label',
    category: 'special',
    style: {
      fontFamily: 'Inter',
      fontSize: 11,
      fontWeight: 600,
      fontStyle: 'normal',
      lineHeight: 1.4,
      letterSpacing: 0.1,
      wordSpacing: 0,
      textTransform: 'uppercase',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#666666'
    }
  },
  {
    id: 'code',
    name: 'Code',
    category: 'special',
    style: {
      fontFamily: 'JetBrains Mono',
      fontSize: 14,
      fontWeight: 400,
      fontStyle: 'normal',
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'left',
      color: '#1e293b',
      backgroundColor: '#f1f5f9'
    }
  },
  {
    id: 'quote',
    name: 'Quote',
    category: 'special',
    style: {
      fontFamily: 'Lora',
      fontSize: 24,
      fontWeight: 400,
      fontStyle: 'italic',
      lineHeight: 1.6,
      letterSpacing: 0,
      wordSpacing: 0,
      textTransform: 'none',
      textDecoration: 'none',
      textAlign: 'center',
      color: '#374151'
    }
  }
];

// ============================================
// Text Path Generation
// ============================================

export function generateCirclePath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number = 0,
  endAngle: number = 360
): string {
  const start = polarToCartesian(centerX, centerY, radius, endAngle);
  const end = polarToCartesian(centerX, centerY, radius, startAngle);
  
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  
  if (endAngle - startAngle >= 360) {
    // Full circle
    return `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 1 ${centerX - radius} ${centerY}`;
  }
  
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

export function generateArcPath(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  
  const largeArcFlag = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const sweepFlag = endAngle > startAngle ? 1 : 0;
  
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

export function generateWavePath(
  startX: number,
  startY: number,
  width: number,
  amplitude: number = 20,
  wavelength: number = 100,
  phase: number = 0
): string {
  const points: string[] = [];
  const steps = Math.ceil(width / 5);
  
  for (let i = 0; i <= steps; i++) {
    const x = startX + (i / steps) * width;
    const y = startY + amplitude * Math.sin((2 * Math.PI * (x - startX) / wavelength) + phase);
    
    if (i === 0) {
      points.push(`M ${x} ${y}`);
    } else {
      points.push(`L ${x} ${y}`);
    }
  }
  
  return points.join(' ');
}

export function generateBezierPath(
  points: { x: number; y: number }[]
): string {
  if (points.length < 2) return '';
  
  let path = `M ${points[0].x} ${points[0].y}`;
  
  if (points.length === 2) {
    path += ` L ${points[1].x} ${points[1].y}`;
  } else if (points.length === 3) {
    path += ` Q ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y}`;
  } else if (points.length === 4) {
    path += ` C ${points[1].x} ${points[1].y} ${points[2].x} ${points[2].y} ${points[3].x} ${points[3].y}`;
  } else {
    // Use cubic bezier through all points
    for (let i = 1; i < points.length - 2; i++) {
      const cp1 = {
        x: points[i].x + (points[i + 1].x - points[i - 1].x) / 4,
        y: points[i].y + (points[i + 1].y - points[i - 1].y) / 4
      };
      const cp2 = {
        x: points[i + 1].x - (points[i + 2].x - points[i].x) / 4,
        y: points[i + 1].y - (points[i + 2].y - points[i].y) / 4
      };
      path += ` C ${cp1.x} ${cp1.y} ${cp2.x} ${cp2.y} ${points[i + 1].x} ${points[i + 1].y}`;
    }
  }
  
  return path;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
): { x: number; y: number } {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// ============================================
// Text Effect CSS Generation
// ============================================

export function generateTextShadowCSS(shadows: TextShadowEffect[]): string {
  return shadows
    .filter(s => s.enabled)
    .map(s => `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.color}`)
    .join(', ');
}

export function generateTextOutlineCSS(outline: TextOutlineEffect): string {
  if (!outline.enabled) return '';
  return `${outline.width}px ${outline.color}`;
}

export function generateTextGlowCSS(glow: TextGlowEffect): string {
  if (!glow.enabled) return '';
  // Multiple shadow layers for glow effect
  const layers: string[] = [];
  for (let i = 1; i <= 3; i++) {
    layers.push(`0 0 ${glow.blur * i}px ${glow.color}`);
  }
  return layers.join(', ');
}

export function generate3DTextCSS(effect: Text3DEffect): string {
  if (!effect.enabled) return '';
  
  const shadows: string[] = [];
  const angleRad = effect.angle * Math.PI / 180;
  
  for (let i = 1; i <= effect.depth; i++) {
    const x = Math.cos(angleRad) * i;
    const y = Math.sin(angleRad) * i;
    shadows.push(`${x}px ${y}px 0 ${effect.color}`);
  }
  
  return shadows.join(', ');
}

export function generateNeonTextCSS(effect: TextNeonEffect): string {
  if (!effect.enabled) return '';
  
  const layers: string[] = [];
  const baseBlur = 5;
  
  for (let i = 1; i <= effect.intensity; i++) {
    layers.push(`0 0 ${baseBlur * i}px ${effect.color}`);
    layers.push(`0 0 ${baseBlur * i * 2}px ${effect.color}`);
  }
  
  return layers.join(', ');
}

export function generateGradientTextCSS(effect: TextGradientEffect): string {
  if (!effect.enabled) return '';
  
  const colorStops = effect.colors.map((color, i) => {
    const stop = effect.stops[i] !== undefined ? effect.stops[i] : (i / (effect.colors.length - 1)) * 100;
    return `${color} ${stop}%`;
  }).join(', ');
  
  if (effect.gradientType === 'linear') {
    return `linear-gradient(${effect.angle}deg, ${colorStops})`;
  } else {
    return `radial-gradient(circle, ${colorStops})`;
  }
}

// ============================================
// OpenType Feature CSS
// ============================================

export function generateOpenTypeFeaturesCSS(features: Partial<OpenTypeFeatures>): string {
  const featureStrings: string[] = [];
  
  const featureMap: Record<keyof OpenTypeFeatures, string> = {
    liga: '"liga"',
    dlig: '"dlig"',
    hlig: '"hlig"',
    calt: '"calt"',
    salt: '"salt"',
    ss01: '"ss01"',
    ss02: '"ss02"',
    ss03: '"ss03"',
    smcp: '"smcp"',
    c2sc: '"c2sc"',
    onum: '"onum"',
    lnum: '"lnum"',
    tnum: '"tnum"',
    pnum: '"pnum"',
    frac: '"frac"',
    ordn: '"ordn"',
    zero: '"zero"',
    swsh: '"swsh"',
    kern: '"kern"'
  };
  
  for (const [key, value] of Object.entries(features)) {
    if (featureMap[key as keyof OpenTypeFeatures]) {
      featureStrings.push(`${featureMap[key as keyof OpenTypeFeatures]} ${value ? 'on' : 'off'}`);
    }
  }
  
  return featureStrings.join(', ');
}

// ============================================
// Default OpenType Features
// ============================================

export const defaultOpenTypeFeatures: OpenTypeFeatures = {
  liga: true,
  dlig: false,
  hlig: false,
  calt: true,
  salt: false,
  ss01: false,
  ss02: false,
  ss03: false,
  smcp: false,
  c2sc: false,
  onum: false,
  lnum: true,
  tnum: false,
  pnum: true,
  frac: false,
  ordn: false,
  zero: false,
  swsh: false,
  kern: true
};

// ============================================
// Text Style Utilities
// ============================================

export function applyTextStyle(baseStyle: Partial<TextStyle>, preset: TextStylePreset): TextStyle {
  return {
    ...preset.style,
    ...baseStyle
  };
}

export function getPresetsByCategory(category: TextStylePreset['category']): TextStylePreset[] {
  return TEXT_STYLE_PRESETS.filter(p => p.category === category);
}

export function getFontsByCategory(category: string): typeof PREMIUM_FONTS {
  return PREMIUM_FONTS.filter(f => f.category === category);
}

// ============================================
// SVG Text on Path Component
// ============================================

export interface TextOnPathProps {
  text: string;
  pathConfig: TextPathConfig;
  style: Partial<TextStyle>;
  width: number;
  height: number;
}

export function generateTextOnPathSVG(props: TextOnPathProps): string {
  const { text, pathConfig, style, width, height } = props;
  
  let pathD = '';
  const pathId = `textPath-${Date.now()}`;
  
  switch (pathConfig.pathType) {
    case 'circle':
      pathD = generateCirclePath(
        width / 2,
        height / 2,
        pathConfig.radius || Math.min(width, height) / 3,
        pathConfig.startAngle || 0,
        pathConfig.endAngle || 360
      );
      break;
    case 'arc':
      pathD = generateArcPath(
        width / 2,
        height / 2,
        pathConfig.radius || Math.min(width, height) / 3,
        pathConfig.startAngle || -90,
        pathConfig.endAngle || 90
      );
      break;
    case 'wave':
      pathD = generateWavePath(
        0,
        height / 2,
        width,
        pathConfig.amplitude || 20,
        pathConfig.wavelength || 100,
        pathConfig.phase || 0
      );
      break;
    case 'custom':
      pathD = pathConfig.pathData || '';
      break;
  }
  
  if (pathConfig.reverse) {
    // Would need to reverse the path - simplified here
  }
  
  const textAnchor = pathConfig.align === 'start' ? 'start' : pathConfig.align === 'end' ? 'end' : 'middle';
  const startOffset = pathConfig.align === 'start' ? '0%' : pathConfig.align === 'end' ? '100%' : '50%';
  
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="${pathId}" d="${pathD}" fill="none" />
      </defs>
      <text
        font-family="${style.fontFamily || 'Inter'}"
        font-size="${style.fontSize || 16}"
        font-weight="${style.fontWeight || 400}"
        fill="${style.color || '#000000'}"
        text-anchor="${textAnchor}"
      >
        <textPath href="#${pathId}" startOffset="${startOffset}">
          ${text}
        </textPath>
      </text>
    </svg>
  `;
}

// ============================================
// Text Measurement
// ============================================

export function measureText(
  text: string,
  fontFamily: string,
  fontSize: number,
  fontWeight: number = 400
): { width: number; height: number } {
  if (typeof document === 'undefined') {
    // Server-side estimation
    const avgCharWidth = fontSize * 0.6;
    return {
      width: text.length * avgCharWidth,
      height: fontSize * 1.2
    };
  }
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    return { width: text.length * fontSize * 0.6, height: fontSize * 1.2 };
  }
  
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  
  return {
    width: metrics.width,
    height: fontSize * 1.2
  };
}

// ============================================
// Text Fit Utilities
// ============================================

export function calculateFitFontSize(
  text: string,
  containerWidth: number,
  containerHeight: number,
  fontFamily: string,
  fontWeight: number = 400,
  minSize: number = 8,
  maxSize: number = 200
): number {
  let low = minSize;
  let high = maxSize;
  let bestFit = minSize;
  
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const { width, height } = measureText(text, fontFamily, mid, fontWeight);
    
    if (width <= containerWidth && height <= containerHeight) {
      bestFit = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  return bestFit;
}
