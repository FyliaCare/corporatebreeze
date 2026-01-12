/**
 * Professional Color System
 * Advanced color management for the design studio
 */

// Color Modes
export type ColorMode = 'hex' | 'rgb' | 'hsl' | 'cmyk' | 'lab';

// Color Value Types
export interface RGBColor {
  r: number;  // 0-255
  g: number;  // 0-255
  b: number;  // 0-255
  a?: number; // 0-1
}

export interface HSLColor {
  h: number;  // 0-360
  s: number;  // 0-100
  l: number;  // 0-100
  a?: number; // 0-1
}

export interface CMYKColor {
  c: number;  // 0-100
  m: number;  // 0-100
  y: number;  // 0-100
  k: number;  // 0-100
}

export interface LABColor {
  l: number;  // 0-100
  a: number;  // -128 to 127
  b: number;  // -128 to 127
}

// Gradient Types
export interface GradientStop {
  color: string;
  position: number; // 0-100
}

export interface Gradient {
  id: string;
  name: string;
  type: 'linear' | 'radial' | 'conic' | 'diamond';
  angle?: number;
  centerX?: number;
  centerY?: number;
  stops: GradientStop[];
  spreadMethod?: 'pad' | 'reflect' | 'repeat';
}

// Color Swatch
export interface ColorSwatch {
  id: string;
  color: string;
  name: string;
  category?: string;
  isGlobal?: boolean;  // Changes affect all uses
}

// Color Palette
export interface ColorPalette {
  id: string;
  name: string;
  colors: ColorSwatch[];
  category: 'brand' | 'theme' | 'custom' | 'harmony';
}

// Color Harmony Types
export type HarmonyType = 
  | 'complementary'    // 2 colors, opposite
  | 'analogous'        // 3 colors, adjacent
  | 'triadic'          // 3 colors, evenly spaced
  | 'split-complementary'  // 3 colors
  | 'square'           // 4 colors, evenly spaced
  | 'tetradic'         // 4 colors, rectangular
  | 'monochromatic';   // Variations of one hue

// ============================================
// Color Conversion Functions
// ============================================

export function hexToRgb(hex: string): RGBColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!result) return null;
  
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] ? parseInt(result[4], 16) / 255 : 1
  };
}

export function rgbToHex(rgb: RGBColor): string {
  const toHex = (n: number) => {
    const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  if (rgb.a !== undefined && rgb.a < 1) {
    return hex + toHex(Math.round(rgb.a * 255));
  }
  return hex;
}

export function rgbToHsl(rgb: RGBColor): HSLColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgb.a
  };
}

export function hslToRgb(hsl: HSLColor): RGBColor {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsl.a
  };
}

export function rgbToCmyk(rgb: RGBColor): CMYKColor {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);
  
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  return {
    c: Math.round(((1 - r - k) / (1 - k)) * 100),
    m: Math.round(((1 - g - k) / (1 - k)) * 100),
    y: Math.round(((1 - b - k) / (1 - k)) * 100),
    k: Math.round(k * 100)
  };
}

export function cmykToRgb(cmyk: CMYKColor): RGBColor {
  const c = cmyk.c / 100;
  const m = cmyk.m / 100;
  const y = cmyk.y / 100;
  const k = cmyk.k / 100;

  return {
    r: Math.round(255 * (1 - c) * (1 - k)),
    g: Math.round(255 * (1 - m) * (1 - k)),
    b: Math.round(255 * (1 - y) * (1 - k))
  };
}

export function hexToHsl(hex: string): HSLColor | null {
  const rgb = hexToRgb(hex);
  return rgb ? rgbToHsl(rgb) : null;
}

export function hslToHex(hsl: HSLColor): string {
  const rgb = hslToRgb(hsl);
  return rgbToHex(rgb);
}

// ============================================
// Color Harmony Functions
// ============================================

export function generateHarmony(baseColor: string, type: HarmonyType): string[] {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return [baseColor];

  const colors: HSLColor[] = [];

  switch (type) {
    case 'complementary':
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 180) % 360 });
      break;

    case 'analogous':
      colors.push({ ...hsl, h: (hsl.h - 30 + 360) % 360 });
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 30) % 360 });
      break;

    case 'triadic':
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 120) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 240) % 360 });
      break;

    case 'split-complementary':
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 150) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 210) % 360 });
      break;

    case 'square':
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 90) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 180) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 270) % 360 });
      break;

    case 'tetradic':
      colors.push(hsl);
      colors.push({ ...hsl, h: (hsl.h + 60) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 180) % 360 });
      colors.push({ ...hsl, h: (hsl.h + 240) % 360 });
      break;

    case 'monochromatic':
      colors.push({ ...hsl, l: Math.min(95, hsl.l + 30) });
      colors.push({ ...hsl, l: Math.min(85, hsl.l + 15) });
      colors.push(hsl);
      colors.push({ ...hsl, l: Math.max(15, hsl.l - 15) });
      colors.push({ ...hsl, l: Math.max(5, hsl.l - 30) });
      break;

    default:
      colors.push(hsl);
  }

  return colors.map(c => hslToHex(c));
}

// ============================================
// Color Manipulation Functions
// ============================================

export function lighten(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  return hslToHex({
    ...hsl,
    l: Math.min(100, hsl.l + amount)
  });
}

export function darken(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  return hslToHex({
    ...hsl,
    l: Math.max(0, hsl.l - amount)
  });
}

export function saturate(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  return hslToHex({
    ...hsl,
    s: Math.min(100, hsl.s + amount)
  });
}

export function desaturate(color: string, amount: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  return hslToHex({
    ...hsl,
    s: Math.max(0, hsl.s - amount)
  });
}

export function adjustHue(color: string, degrees: number): string {
  const hsl = hexToHsl(color);
  if (!hsl) return color;
  
  return hslToHex({
    ...hsl,
    h: (hsl.h + degrees + 360) % 360
  });
}

export function mix(color1: string, color2: string, weight: number = 0.5): string {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return color1;
  
  return rgbToHex({
    r: Math.round(rgb1.r * (1 - weight) + rgb2.r * weight),
    g: Math.round(rgb1.g * (1 - weight) + rgb2.g * weight),
    b: Math.round(rgb1.b * (1 - weight) + rgb2.b * weight)
  });
}

export function invert(color: string): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  return rgbToHex({
    r: 255 - rgb.r,
    g: 255 - rgb.g,
    b: 255 - rgb.b
  });
}

export function grayscale(color: string): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;
  
  const gray = Math.round(rgb.r * 0.299 + rgb.g * 0.587 + rgb.b * 0.114);
  return rgbToHex({ r: gray, g: gray, b: gray });
}

// ============================================
// Contrast & Accessibility
// ============================================

export function getLuminance(color: string): number {
  const rgb = hexToRgb(color);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

export function getContrastColor(bgColor: string): string {
  const luminance = getLuminance(bgColor);
  return luminance > 0.179 ? '#000000' : '#FFFFFF';
}

export function meetsWCAG(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getContrastRatio(color1, color2);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

// ============================================
// Color Parsing & Formatting
// ============================================

export function parseColor(color: string): RGBColor | null {
  // HEX format
  if (color.startsWith('#')) {
    return hexToRgb(color);
  }
  
  // RGB/RGBA format
  const rgbaMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (rgbaMatch) {
    return {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
      a: rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
    };
  }
  
  // HSL/HSLA format
  const hslaMatch = color.match(/hsla?\((\d+),\s*(\d+)%?,\s*(\d+)%?(?:,\s*([\d.]+))?\)/);
  if (hslaMatch) {
    return hslToRgb({
      h: parseInt(hslaMatch[1]),
      s: parseInt(hslaMatch[2]),
      l: parseInt(hslaMatch[3]),
      a: hslaMatch[4] ? parseFloat(hslaMatch[4]) : 1
    });
  }
  
  return null;
}

export function formatColor(rgb: RGBColor, mode: ColorMode): string {
  switch (mode) {
    case 'hex':
      return rgbToHex(rgb);
    case 'rgb':
      return rgb.a !== undefined && rgb.a < 1
        ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`
        : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    case 'hsl':
      const hsl = rgbToHsl(rgb);
      return hsl.a !== undefined && hsl.a < 1
        ? `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a.toFixed(2)})`
        : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    case 'cmyk':
      const cmyk = rgbToCmyk(rgb);
      return `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    default:
      return rgbToHex(rgb);
  }
}

// ============================================
// Gradient Functions
// ============================================

export function createLinearGradient(colors: string[], angle: number = 90): Gradient {
  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (colors.length - 1)) * 100
  }));
  
  return {
    id: `gradient-${Date.now()}`,
    name: 'Linear Gradient',
    type: 'linear',
    angle,
    stops
  };
}

export function createRadialGradient(colors: string[], centerX: number = 50, centerY: number = 50): Gradient {
  const stops: GradientStop[] = colors.map((color, i) => ({
    color,
    position: (i / (colors.length - 1)) * 100
  }));
  
  return {
    id: `gradient-${Date.now()}`,
    name: 'Radial Gradient',
    type: 'radial',
    centerX,
    centerY,
    stops
  };
}

export function gradientToCSS(gradient: Gradient): string {
  const stopsStr = gradient.stops
    .map(s => `${s.color} ${s.position}%`)
    .join(', ');
  
  switch (gradient.type) {
    case 'linear':
      return `linear-gradient(${gradient.angle || 90}deg, ${stopsStr})`;
    case 'radial':
      return `radial-gradient(circle at ${gradient.centerX || 50}% ${gradient.centerY || 50}%, ${stopsStr})`;
    case 'conic':
      return `conic-gradient(from ${gradient.angle || 0}deg at ${gradient.centerX || 50}% ${gradient.centerY || 50}%, ${stopsStr})`;
    case 'diamond':
      // Approximation using radial
      return `radial-gradient(ellipse at ${gradient.centerX || 50}% ${gradient.centerY || 50}%, ${stopsStr})`;
    default:
      return `linear-gradient(${gradient.angle || 90}deg, ${stopsStr})`;
  }
}

// ============================================
// Preset Color Palettes
// ============================================

export const PRESET_PALETTES: ColorPalette[] = [
  // Material Design
  {
    id: 'material-primary',
    name: 'Material Design',
    category: 'theme',
    colors: [
      { id: 'md-red', color: '#F44336', name: 'Red' },
      { id: 'md-pink', color: '#E91E63', name: 'Pink' },
      { id: 'md-purple', color: '#9C27B0', name: 'Purple' },
      { id: 'md-indigo', color: '#3F51B5', name: 'Indigo' },
      { id: 'md-blue', color: '#2196F3', name: 'Blue' },
      { id: 'md-cyan', color: '#00BCD4', name: 'Cyan' },
      { id: 'md-teal', color: '#009688', name: 'Teal' },
      { id: 'md-green', color: '#4CAF50', name: 'Green' },
      { id: 'md-lime', color: '#CDDC39', name: 'Lime' },
      { id: 'md-yellow', color: '#FFEB3B', name: 'Yellow' },
      { id: 'md-amber', color: '#FFC107', name: 'Amber' },
      { id: 'md-orange', color: '#FF9800', name: 'Orange' }
    ]
  },
  // Tailwind
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'theme',
    colors: [
      { id: 'tw-slate', color: '#64748B', name: 'Slate' },
      { id: 'tw-gray', color: '#6B7280', name: 'Gray' },
      { id: 'tw-red', color: '#EF4444', name: 'Red' },
      { id: 'tw-orange', color: '#F97316', name: 'Orange' },
      { id: 'tw-amber', color: '#F59E0B', name: 'Amber' },
      { id: 'tw-yellow', color: '#EAB308', name: 'Yellow' },
      { id: 'tw-lime', color: '#84CC16', name: 'Lime' },
      { id: 'tw-green', color: '#22C55E', name: 'Green' },
      { id: 'tw-emerald', color: '#10B981', name: 'Emerald' },
      { id: 'tw-teal', color: '#14B8A6', name: 'Teal' },
      { id: 'tw-cyan', color: '#06B6D4', name: 'Cyan' },
      { id: 'tw-blue', color: '#3B82F6', name: 'Blue' },
      { id: 'tw-indigo', color: '#6366F1', name: 'Indigo' },
      { id: 'tw-violet', color: '#8B5CF6', name: 'Violet' },
      { id: 'tw-purple', color: '#A855F7', name: 'Purple' },
      { id: 'tw-pink', color: '#EC4899', name: 'Pink' },
      { id: 'tw-rose', color: '#F43F5E', name: 'Rose' }
    ]
  },
  // Pastel
  {
    id: 'pastel',
    name: 'Pastel',
    category: 'theme',
    colors: [
      { id: 'pastel-pink', color: '#FFD1DC', name: 'Pink' },
      { id: 'pastel-peach', color: '#FFDAB9', name: 'Peach' },
      { id: 'pastel-yellow', color: '#FFFACD', name: 'Yellow' },
      { id: 'pastel-mint', color: '#98FB98', name: 'Mint' },
      { id: 'pastel-sky', color: '#87CEEB', name: 'Sky' },
      { id: 'pastel-lavender', color: '#E6E6FA', name: 'Lavender' }
    ]
  },
  // Neon
  {
    id: 'neon',
    name: 'Neon',
    category: 'theme',
    colors: [
      { id: 'neon-magenta', color: '#FF00FF', name: 'Magenta' },
      { id: 'neon-cyan', color: '#00FFFF', name: 'Cyan' },
      { id: 'neon-yellow', color: '#FFFF00', name: 'Yellow' },
      { id: 'neon-green', color: '#00FF00', name: 'Green' },
      { id: 'neon-orange', color: '#FF6600', name: 'Orange' },
      { id: 'neon-pink', color: '#FF1493', name: 'Pink' }
    ]
  },
  // Earth Tones
  {
    id: 'earth',
    name: 'Earth Tones',
    category: 'theme',
    colors: [
      { id: 'earth-sand', color: '#C2B280', name: 'Sand' },
      { id: 'earth-terracotta', color: '#E2725B', name: 'Terracotta' },
      { id: 'earth-olive', color: '#808000', name: 'Olive' },
      { id: 'earth-sienna', color: '#A0522D', name: 'Sienna' },
      { id: 'earth-umber', color: '#635147', name: 'Umber' },
      { id: 'earth-sage', color: '#9CAF88', name: 'Sage' }
    ]
  },
  // Corporate
  {
    id: 'corporate',
    name: 'Corporate',
    category: 'brand',
    colors: [
      { id: 'corp-navy', color: '#001F3F', name: 'Navy' },
      { id: 'corp-charcoal', color: '#36454F', name: 'Charcoal' },
      { id: 'corp-steel', color: '#71797E', name: 'Steel' },
      { id: 'corp-silver', color: '#C0C0C0', name: 'Silver' },
      { id: 'corp-gold', color: '#CFB53B', name: 'Gold' },
      { id: 'corp-burgundy', color: '#722F37', name: 'Burgundy' }
    ]
  }
];

// ============================================
// Preset Gradients
// ============================================

export const PRESET_GRADIENTS: Gradient[] = [
  // Warm
  {
    id: 'gradient-sunset',
    name: 'Sunset',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#FF416C', position: 0 },
      { color: '#FF4B2B', position: 100 }
    ]
  },
  {
    id: 'gradient-orange-red',
    name: 'Fire',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#FF9500', position: 0 },
      { color: '#FF5E3A', position: 100 }
    ]
  },
  // Cool
  {
    id: 'gradient-ocean',
    name: 'Ocean',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#2193b0', position: 0 },
      { color: '#6dd5ed', position: 100 }
    ]
  },
  {
    id: 'gradient-sky',
    name: 'Sky',
    type: 'linear',
    angle: 180,
    stops: [
      { color: '#56CCF2', position: 0 },
      { color: '#2F80ED', position: 100 }
    ]
  },
  // Vibrant
  {
    id: 'gradient-neon',
    name: 'Neon',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#FF00FF', position: 0 },
      { color: '#00FFFF', position: 100 }
    ]
  },
  {
    id: 'gradient-purple-pink',
    name: 'Purple Pink',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#7F00FF', position: 0 },
      { color: '#E100FF', position: 100 }
    ]
  },
  // Nature
  {
    id: 'gradient-forest',
    name: 'Forest',
    type: 'linear',
    angle: 90,
    stops: [
      { color: '#134E5E', position: 0 },
      { color: '#71B280', position: 100 }
    ]
  },
  {
    id: 'gradient-spring',
    name: 'Spring',
    type: 'linear',
    angle: 45,
    stops: [
      { color: '#00C9FF', position: 0 },
      { color: '#92FE9D', position: 100 }
    ]
  },
  // Dark
  {
    id: 'gradient-midnight',
    name: 'Midnight',
    type: 'linear',
    angle: 135,
    stops: [
      { color: '#232526', position: 0 },
      { color: '#414345', position: 100 }
    ]
  },
  {
    id: 'gradient-space',
    name: 'Space',
    type: 'linear',
    angle: 180,
    stops: [
      { color: '#0F0C29', position: 0 },
      { color: '#302B63', position: 50 },
      { color: '#24243E', position: 100 }
    ]
  },
  // Radial
  {
    id: 'gradient-radial-light',
    name: 'Spotlight',
    type: 'radial',
    centerX: 50,
    centerY: 50,
    stops: [
      { color: '#FFFFFF', position: 0 },
      { color: '#E0E0E0', position: 100 }
    ]
  },
  {
    id: 'gradient-radial-warm',
    name: 'Warm Glow',
    type: 'radial',
    centerX: 50,
    centerY: 50,
    stops: [
      { color: '#FFD700', position: 0 },
      { color: '#FF8C00', position: 100 }
    ]
  }
];

// ============================================
// Color Generation Utilities
// ============================================

export function generateShades(baseColor: string, count: number = 9): string[] {
  const hsl = hexToHsl(baseColor);
  if (!hsl) return [baseColor];
  
  const shades: string[] = [];
  const step = 100 / (count + 1);
  
  for (let i = 1; i <= count; i++) {
    shades.push(hslToHex({
      h: hsl.h,
      s: hsl.s,
      l: Math.round(step * i)
    }));
  }
  
  return shades;
}

export function generateTints(baseColor: string, count: number = 5): string[] {
  const shades: string[] = [];
  for (let i = 0; i < count; i++) {
    shades.push(lighten(baseColor, (i + 1) * 10));
  }
  return shades;
}

export function generateTones(baseColor: string, count: number = 5): string[] {
  const tones: string[] = [];
  const gray = '#808080';
  
  for (let i = 0; i < count; i++) {
    const weight = (i + 1) / (count + 1);
    tones.push(mix(baseColor, gray, weight));
  }
  return tones;
}

// Generate a random pleasing color
export function generateRandomColor(): string {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 40) + 40; // 40-80%
  const l = Math.floor(Math.random() * 30) + 35; // 35-65%
  
  return hslToHex({ h, s, l });
}

// ============================================
// Color Name Detection
// ============================================

const COLOR_NAMES: Record<string, string> = {
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#FF0000': 'Red',
  '#00FF00': 'Lime',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
  '#808080': 'Gray',
  '#800000': 'Maroon',
  '#008000': 'Green',
  '#000080': 'Navy',
  '#808000': 'Olive',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#C0C0C0': 'Silver',
  '#FFA500': 'Orange',
  '#FFC0CB': 'Pink',
  '#A52A2A': 'Brown',
  '#F5F5DC': 'Beige',
  '#FFD700': 'Gold',
  '#4B0082': 'Indigo',
  '#EE82EE': 'Violet'
};

export function getColorName(hex: string): string {
  const upperHex = hex.toUpperCase();
  if (COLOR_NAMES[upperHex]) {
    return COLOR_NAMES[upperHex];
  }
  
  // Find closest named color
  let closestName = 'Custom';
  let closestDistance = Infinity;
  
  const rgb = hexToRgb(hex);
  if (!rgb) return 'Custom';
  
  for (const [namedHex, name] of Object.entries(COLOR_NAMES)) {
    const namedRgb = hexToRgb(namedHex);
    if (!namedRgb) continue;
    
    const distance = Math.sqrt(
      Math.pow(rgb.r - namedRgb.r, 2) +
      Math.pow(rgb.g - namedRgb.g, 2) +
      Math.pow(rgb.b - namedRgb.b, 2)
    );
    
    if (distance < closestDistance && distance < 100) {
      closestDistance = distance;
      closestName = name;
    }
  }
  
  return closestName;
}
