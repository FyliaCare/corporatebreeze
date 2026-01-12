/**
 * Effects & Filters System
 * Professional-grade effects for the design studio
 */

// Effect Categories
export type EffectCategory = 'shadow' | 'glow' | 'blur' | 'distort' | 'color' | 'artistic' | 'stylize';

// Base Effect Interface
export interface BaseEffect {
  id: string;
  type: string;
  category: EffectCategory;
  enabled: boolean;
  blendMode: BlendMode;
  opacity: number;
}

// Blend Modes
export type BlendMode = 
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

// Shadow Effects
export interface DropShadowEffect extends BaseEffect {
  type: 'drop-shadow';
  category: 'shadow';
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
  inner: boolean;
}

export interface InnerShadowEffect extends BaseEffect {
  type: 'inner-shadow';
  category: 'shadow';
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number;
  color: string;
}

export interface LongShadowEffect extends BaseEffect {
  type: 'long-shadow';
  category: 'shadow';
  angle: number;
  length: number;
  color: string;
  fade: boolean;
}

// Glow Effects
export interface OuterGlowEffect extends BaseEffect {
  type: 'outer-glow';
  category: 'glow';
  blur: number;
  spread: number;
  color: string;
}

export interface InnerGlowEffect extends BaseEffect {
  type: 'inner-glow';
  category: 'glow';
  blur: number;
  spread: number;
  color: string;
  source: 'center' | 'edge';
}

export interface NeonGlowEffect extends BaseEffect {
  type: 'neon-glow';
  category: 'glow';
  blur: number;
  intensity: number;
  color: string;
  layers: number;
}

// Blur Effects
export interface GaussianBlurEffect extends BaseEffect {
  type: 'gaussian-blur';
  category: 'blur';
  radius: number;
}

export interface MotionBlurEffect extends BaseEffect {
  type: 'motion-blur';
  category: 'blur';
  angle: number;
  distance: number;
}

export interface RadialBlurEffect extends BaseEffect {
  type: 'radial-blur';
  category: 'blur';
  amount: number;
  centerX: number;
  centerY: number;
  quality: 'draft' | 'good' | 'best';
}

export interface ZoomBlurEffect extends BaseEffect {
  type: 'zoom-blur';
  category: 'blur';
  amount: number;
  centerX: number;
  centerY: number;
}

// Distortion Effects
export interface WaveEffect extends BaseEffect {
  type: 'wave';
  category: 'distort';
  amplitude: number;
  wavelength: number;
  type2: 'sine' | 'triangle' | 'square';
}

export interface TwirlEffect extends BaseEffect {
  type: 'twirl';
  category: 'distort';
  angle: number;
  centerX: number;
  centerY: number;
  radius: number;
}

export interface SphereEffect extends BaseEffect {
  type: 'sphere';
  category: 'distort';
  amount: number;
  centerX: number;
  centerY: number;
}

export interface RippleEffect extends BaseEffect {
  type: 'ripple';
  category: 'distort';
  amplitude: number;
  wavelength: number;
  centerX: number;
  centerY: number;
}

// Color Adjustment Effects
export interface BrightnessContrastEffect extends BaseEffect {
  type: 'brightness-contrast';
  category: 'color';
  brightness: number; // -100 to 100
  contrast: number;   // -100 to 100
}

export interface HueSaturationEffect extends BaseEffect {
  type: 'hue-saturation';
  category: 'color';
  hue: number;        // -180 to 180
  saturation: number; // -100 to 100
  lightness: number;  // -100 to 100
}

export interface ColorBalanceEffect extends BaseEffect {
  type: 'color-balance';
  category: 'color';
  cyan_red: number;     // -100 to 100
  magenta_green: number; // -100 to 100
  yellow_blue: number;   // -100 to 100
  preserveLuminosity: boolean;
}

export interface InvertEffect extends BaseEffect {
  type: 'invert';
  category: 'color';
}

export interface GrayscaleEffect extends BaseEffect {
  type: 'grayscale';
  category: 'color';
  amount: number; // 0 to 100
}

export interface SepiaEffect extends BaseEffect {
  type: 'sepia';
  category: 'color';
  amount: number; // 0 to 100
}

export interface DuotoneEffect extends BaseEffect {
  type: 'duotone';
  category: 'color';
  highlightColor: string;
  shadowColor: string;
}

export interface ColorOverlayEffect extends BaseEffect {
  type: 'color-overlay';
  category: 'color';
  color: string;
}

export interface GradientOverlayEffect extends BaseEffect {
  type: 'gradient-overlay';
  category: 'color';
  gradient: {
    type: 'linear' | 'radial';
    angle: number;
    stops: { offset: number; color: string }[];
  };
}

// Artistic Effects
export interface PixelateEffect extends BaseEffect {
  type: 'pixelate';
  category: 'artistic';
  blockSize: number;
}

export interface NoiseEffect extends BaseEffect {
  type: 'noise';
  category: 'artistic';
  amount: number;
  monochromatic: boolean;
}

export interface PosterizeEffect extends BaseEffect {
  type: 'posterize';
  category: 'artistic';
  levels: number; // 2 to 256
}

export interface EmbossEffect extends BaseEffect {
  type: 'emboss';
  category: 'artistic';
  angle: number;
  height: number;
  amount: number;
}

export interface VignetteEffect extends BaseEffect {
  type: 'vignette';
  category: 'artistic';
  amount: number;
  midpoint: number;
  roundness: number;
  feather: number;
}

export interface ChromaticAberrationEffect extends BaseEffect {
  type: 'chromatic-aberration';
  category: 'artistic';
  offset: number;
  angle: number;
}

export interface GlitchEffect extends BaseEffect {
  type: 'glitch';
  category: 'artistic';
  intensity: number;
  slices: number;
  rgbShift: number;
}

export interface HalftoneEffect extends BaseEffect {
  type: 'halftone';
  category: 'artistic';
  dotSize: number;
  angle: number;
  shape: 'circle' | 'square' | 'line';
}

// Stylize Effects
export interface StrokeEffect extends BaseEffect {
  type: 'stroke';
  category: 'stylize';
  width: number;
  color: string;
  position: 'outside' | 'inside' | 'center';
  lineCap: 'butt' | 'round' | 'square';
  lineJoin: 'miter' | 'round' | 'bevel';
  dashArray?: number[];
}

export interface OutlineEffect extends BaseEffect {
  type: 'outline';
  category: 'stylize';
  width: number;
  color: string;
  offset: number;
}

// Union type for all effects
export type Effect =
  | DropShadowEffect
  | InnerShadowEffect
  | LongShadowEffect
  | OuterGlowEffect
  | InnerGlowEffect
  | NeonGlowEffect
  | GaussianBlurEffect
  | MotionBlurEffect
  | RadialBlurEffect
  | ZoomBlurEffect
  | WaveEffect
  | TwirlEffect
  | SphereEffect
  | RippleEffect
  | BrightnessContrastEffect
  | HueSaturationEffect
  | ColorBalanceEffect
  | InvertEffect
  | GrayscaleEffect
  | SepiaEffect
  | DuotoneEffect
  | ColorOverlayEffect
  | GradientOverlayEffect
  | PixelateEffect
  | NoiseEffect
  | PosterizeEffect
  | EmbossEffect
  | VignetteEffect
  | ChromaticAberrationEffect
  | GlitchEffect
  | HalftoneEffect
  | StrokeEffect
  | OutlineEffect;

// Effect Preset
export interface EffectPreset {
  id: string;
  name: string;
  category: EffectCategory;
  effects: Effect[];
  thumbnail?: string;
}

// ============================================
// Effect Creation Functions
// ============================================

export function createDropShadow(overrides: Partial<DropShadowEffect> = {}): DropShadowEffect {
  return {
    id: generateId(),
    type: 'drop-shadow',
    category: 'shadow',
    enabled: true,
    blendMode: 'multiply',
    opacity: 75,
    offsetX: 4,
    offsetY: 4,
    blur: 8,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.5)',
    inner: false,
    ...overrides
  };
}

export function createInnerShadow(overrides: Partial<InnerShadowEffect> = {}): InnerShadowEffect {
  return {
    id: generateId(),
    type: 'inner-shadow',
    category: 'shadow',
    enabled: true,
    blendMode: 'multiply',
    opacity: 50,
    offsetX: 2,
    offsetY: 2,
    blur: 4,
    spread: 0,
    color: 'rgba(0, 0, 0, 0.5)',
    ...overrides
  };
}

export function createLongShadow(overrides: Partial<LongShadowEffect> = {}): LongShadowEffect {
  return {
    id: generateId(),
    type: 'long-shadow',
    category: 'shadow',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    angle: 45,
    length: 50,
    color: 'rgba(0, 0, 0, 0.3)',
    fade: true,
    ...overrides
  };
}

export function createOuterGlow(overrides: Partial<OuterGlowEffect> = {}): OuterGlowEffect {
  return {
    id: generateId(),
    type: 'outer-glow',
    category: 'glow',
    enabled: true,
    blendMode: 'screen',
    opacity: 75,
    blur: 10,
    spread: 0,
    color: 'rgba(255, 255, 0, 0.8)',
    ...overrides
  };
}

export function createInnerGlow(overrides: Partial<InnerGlowEffect> = {}): InnerGlowEffect {
  return {
    id: generateId(),
    type: 'inner-glow',
    category: 'glow',
    enabled: true,
    blendMode: 'screen',
    opacity: 50,
    blur: 5,
    spread: 0,
    color: 'rgba(255, 255, 255, 0.8)',
    source: 'edge',
    ...overrides
  };
}

export function createNeonGlow(overrides: Partial<NeonGlowEffect> = {}): NeonGlowEffect {
  return {
    id: generateId(),
    type: 'neon-glow',
    category: 'glow',
    enabled: true,
    blendMode: 'screen',
    opacity: 100,
    blur: 15,
    intensity: 2,
    color: '#00ff00',
    layers: 3,
    ...overrides
  };
}

export function createGaussianBlur(overrides: Partial<GaussianBlurEffect> = {}): GaussianBlurEffect {
  return {
    id: generateId(),
    type: 'gaussian-blur',
    category: 'blur',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    radius: 5,
    ...overrides
  };
}

export function createMotionBlur(overrides: Partial<MotionBlurEffect> = {}): MotionBlurEffect {
  return {
    id: generateId(),
    type: 'motion-blur',
    category: 'blur',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    angle: 0,
    distance: 10,
    ...overrides
  };
}

export function createBrightnessContrast(overrides: Partial<BrightnessContrastEffect> = {}): BrightnessContrastEffect {
  return {
    id: generateId(),
    type: 'brightness-contrast',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    brightness: 0,
    contrast: 0,
    ...overrides
  };
}

export function createHueSaturation(overrides: Partial<HueSaturationEffect> = {}): HueSaturationEffect {
  return {
    id: generateId(),
    type: 'hue-saturation',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    hue: 0,
    saturation: 0,
    lightness: 0,
    ...overrides
  };
}

export function createGrayscale(overrides: Partial<GrayscaleEffect> = {}): GrayscaleEffect {
  return {
    id: generateId(),
    type: 'grayscale',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    amount: 100,
    ...overrides
  };
}

export function createSepia(overrides: Partial<SepiaEffect> = {}): SepiaEffect {
  return {
    id: generateId(),
    type: 'sepia',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    amount: 100,
    ...overrides
  };
}

export function createInvert(overrides: Partial<InvertEffect> = {}): InvertEffect {
  return {
    id: generateId(),
    type: 'invert',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    ...overrides
  };
}

export function createColorOverlay(overrides: Partial<ColorOverlayEffect> = {}): ColorOverlayEffect {
  return {
    id: generateId(),
    type: 'color-overlay',
    category: 'color',
    enabled: true,
    blendMode: 'multiply',
    opacity: 50,
    color: '#ff0000',
    ...overrides
  };
}

export function createDuotone(overrides: Partial<DuotoneEffect> = {}): DuotoneEffect {
  return {
    id: generateId(),
    type: 'duotone',
    category: 'color',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    highlightColor: '#ffffff',
    shadowColor: '#001f3f',
    ...overrides
  };
}

export function createPixelate(overrides: Partial<PixelateEffect> = {}): PixelateEffect {
  return {
    id: generateId(),
    type: 'pixelate',
    category: 'artistic',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    blockSize: 10,
    ...overrides
  };
}

export function createNoise(overrides: Partial<NoiseEffect> = {}): NoiseEffect {
  return {
    id: generateId(),
    type: 'noise',
    category: 'artistic',
    enabled: true,
    blendMode: 'overlay',
    opacity: 30,
    amount: 10,
    monochromatic: true,
    ...overrides
  };
}

export function createVignette(overrides: Partial<VignetteEffect> = {}): VignetteEffect {
  return {
    id: generateId(),
    type: 'vignette',
    category: 'artistic',
    enabled: true,
    blendMode: 'multiply',
    opacity: 100,
    amount: 50,
    midpoint: 50,
    roundness: 0,
    feather: 50,
    ...overrides
  };
}

export function createEmboss(overrides: Partial<EmbossEffect> = {}): EmbossEffect {
  return {
    id: generateId(),
    type: 'emboss',
    category: 'artistic',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    angle: 135,
    height: 1,
    amount: 100,
    ...overrides
  };
}

export function createGlitch(overrides: Partial<GlitchEffect> = {}): GlitchEffect {
  return {
    id: generateId(),
    type: 'glitch',
    category: 'artistic',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    intensity: 5,
    slices: 10,
    rgbShift: 5,
    ...overrides
  };
}

export function createHalftone(overrides: Partial<HalftoneEffect> = {}): HalftoneEffect {
  return {
    id: generateId(),
    type: 'halftone',
    category: 'artistic',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    dotSize: 4,
    angle: 45,
    shape: 'circle',
    ...overrides
  };
}

export function createChromaticAberration(overrides: Partial<ChromaticAberrationEffect> = {}): ChromaticAberrationEffect {
  return {
    id: generateId(),
    type: 'chromatic-aberration',
    category: 'artistic',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    offset: 5,
    angle: 0,
    ...overrides
  };
}

export function createStroke(overrides: Partial<StrokeEffect> = {}): StrokeEffect {
  return {
    id: generateId(),
    type: 'stroke',
    category: 'stylize',
    enabled: true,
    blendMode: 'normal',
    opacity: 100,
    width: 2,
    color: '#000000',
    position: 'outside',
    lineCap: 'round',
    lineJoin: 'round',
    ...overrides
  };
}

// ============================================
// SVG Filter Generation
// ============================================

export function generateSVGFilterId(): string {
  return `filter-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateDropShadowFilter(effect: DropShadowEffect): string {
  return `
    <feDropShadow 
      dx="${effect.offsetX}" 
      dy="${effect.offsetY}" 
      stdDeviation="${effect.blur}" 
      flood-color="${effect.color}" 
      flood-opacity="${effect.opacity / 100}"
    />
  `;
}

export function generateGaussianBlurFilter(effect: GaussianBlurEffect): string {
  return `
    <feGaussianBlur in="SourceGraphic" stdDeviation="${effect.radius}" />
  `;
}

export function generateColorMatrixFilter(effect: GrayscaleEffect | SepiaEffect | HueSaturationEffect): string {
  if (effect.type === 'grayscale') {
    const amt = effect.amount / 100;
    return `
      <feColorMatrix type="matrix" values="
        ${0.2126 + 0.7874 * (1 - amt)} ${0.7152 - 0.7152 * (1 - amt)} ${0.0722 - 0.0722 * (1 - amt)} 0 0
        ${0.2126 - 0.2126 * (1 - amt)} ${0.7152 + 0.2848 * (1 - amt)} ${0.0722 - 0.0722 * (1 - amt)} 0 0
        ${0.2126 - 0.2126 * (1 - amt)} ${0.7152 - 0.7152 * (1 - amt)} ${0.0722 + 0.9278 * (1 - amt)} 0 0
        0 0 0 1 0
      "/>
    `;
  }
  
  if (effect.type === 'sepia') {
    const amt = effect.amount / 100;
    return `
      <feColorMatrix type="matrix" values="
        ${0.393 + 0.607 * (1 - amt)} ${0.769 - 0.769 * (1 - amt)} ${0.189 - 0.189 * (1 - amt)} 0 0
        ${0.349 - 0.349 * (1 - amt)} ${0.686 + 0.314 * (1 - amt)} ${0.168 - 0.168 * (1 - amt)} 0 0
        ${0.272 - 0.272 * (1 - amt)} ${0.534 - 0.534 * (1 - amt)} ${0.131 + 0.869 * (1 - amt)} 0 0
        0 0 0 1 0
      "/>
    `;
  }
  
  if (effect.type === 'hue-saturation') {
    const hue = effect.hue;
    const sat = 1 + effect.saturation / 100;
    const light = effect.lightness / 100;
    
    // Hue rotation
    const cos = Math.cos(hue * Math.PI / 180);
    const sin = Math.sin(hue * Math.PI / 180);
    
    return `
      <feColorMatrix type="hueRotate" values="${hue}"/>
      <feColorMatrix type="saturate" values="${sat}"/>
      <feComponentTransfer>
        <feFuncR type="linear" slope="1" intercept="${light}"/>
        <feFuncG type="linear" slope="1" intercept="${light}"/>
        <feFuncB type="linear" slope="1" intercept="${light}"/>
      </feComponentTransfer>
    `;
  }
  
  return '';
}

export function generateBrightnessContrastFilter(effect: BrightnessContrastEffect): string {
  const brightness = 1 + effect.brightness / 100;
  const contrast = 1 + effect.contrast / 100;
  const intercept = (1 - contrast) / 2;
  
  return `
    <feComponentTransfer>
      <feFuncR type="linear" slope="${contrast * brightness}" intercept="${intercept}"/>
      <feFuncG type="linear" slope="${contrast * brightness}" intercept="${intercept}"/>
      <feFuncB type="linear" slope="${contrast * brightness}" intercept="${intercept}"/>
    </feComponentTransfer>
  `;
}

export function generateInvertFilter(effect: InvertEffect): string {
  return `
    <feComponentTransfer>
      <feFuncR type="table" tableValues="1 0"/>
      <feFuncG type="table" tableValues="1 0"/>
      <feFuncB type="table" tableValues="1 0"/>
    </feComponentTransfer>
  `;
}

export function generateOuterGlowFilter(effect: OuterGlowEffect): string {
  return `
    <feGaussianBlur in="SourceAlpha" stdDeviation="${effect.blur}" result="blur"/>
    <feFlood flood-color="${effect.color}" flood-opacity="${effect.opacity / 100}"/>
    <feComposite in2="blur" operator="in"/>
    <feMorphology operator="dilate" radius="${effect.spread}"/>
    <feMerge>
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  `;
}

export function generateInnerGlowFilter(effect: InnerGlowEffect): string {
  if (effect.source === 'edge') {
    return `
      <feGaussianBlur in="SourceAlpha" stdDeviation="${effect.blur}" result="blur"/>
      <feOffset result="offsetblur"/>
      <feFlood flood-color="${effect.color}" flood-opacity="${effect.opacity / 100}"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feComposite in2="SourceAlpha" operator="in"/>
      <feMerge>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode/>
      </feMerge>
    `;
  }
  return `
    <feGaussianBlur in="SourceGraphic" stdDeviation="${effect.blur}" result="blur"/>
    <feFlood flood-color="${effect.color}" flood-opacity="${effect.opacity / 100}"/>
    <feComposite in2="SourceAlpha" operator="in"/>
    <feMerge>
      <feMergeNode in="SourceGraphic"/>
      <feMergeNode/>
    </feMerge>
  `;
}

export function generateEmbossFilter(effect: EmbossEffect): string {
  const angle = effect.angle * Math.PI / 180;
  const dx = Math.cos(angle);
  const dy = Math.sin(angle);
  
  return `
    <feConvolveMatrix 
      order="3" 
      kernelMatrix="${-2*dx} ${-dy} 0 ${-dy} 1 ${dy} 0 ${dy} ${2*dx}"
      preserveAlpha="true"
    />
    <feComponentTransfer>
      <feFuncR type="linear" slope="${effect.amount / 50}" intercept="0.5"/>
      <feFuncG type="linear" slope="${effect.amount / 50}" intercept="0.5"/>
      <feFuncB type="linear" slope="${effect.amount / 50}" intercept="0.5"/>
    </feComponentTransfer>
  `;
}

export function generateNoiseFilter(effect: NoiseEffect): string {
  return `
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise"/>
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="${effect.amount}" xChannelSelector="R" yChannelSelector="G"/>
  `;
}

// ============================================
// CSS Filter Generation
// ============================================

export function generateCSSFilter(effects: Effect[]): string {
  const filters: string[] = [];
  
  for (const effect of effects) {
    if (!effect.enabled) continue;
    
    switch (effect.type) {
      case 'gaussian-blur':
        filters.push(`blur(${effect.radius}px)`);
        break;
      case 'brightness-contrast':
        if (effect.brightness !== 0) {
          filters.push(`brightness(${1 + effect.brightness / 100})`);
        }
        if (effect.contrast !== 0) {
          filters.push(`contrast(${1 + effect.contrast / 100})`);
        }
        break;
      case 'grayscale':
        filters.push(`grayscale(${effect.amount}%)`);
        break;
      case 'sepia':
        filters.push(`sepia(${effect.amount}%)`);
        break;
      case 'invert':
        filters.push(`invert(100%)`);
        break;
      case 'hue-saturation':
        if (effect.hue !== 0) {
          filters.push(`hue-rotate(${effect.hue}deg)`);
        }
        if (effect.saturation !== 0) {
          filters.push(`saturate(${1 + effect.saturation / 100})`);
        }
        break;
      case 'drop-shadow':
        filters.push(`drop-shadow(${effect.offsetX}px ${effect.offsetY}px ${effect.blur}px ${effect.color})`);
        break;
    }
  }
  
  return filters.length > 0 ? filters.join(' ') : 'none';
}

// ============================================
// Effect Presets
// ============================================

export const EFFECT_PRESETS: EffectPreset[] = [
  {
    id: 'preset-subtle-shadow',
    name: 'Subtle Shadow',
    category: 'shadow',
    effects: [
      createDropShadow({ offsetX: 2, offsetY: 2, blur: 4, color: 'rgba(0,0,0,0.15)' })
    ]
  },
  {
    id: 'preset-hard-shadow',
    name: 'Hard Shadow',
    category: 'shadow',
    effects: [
      createDropShadow({ offsetX: 5, offsetY: 5, blur: 0, color: 'rgba(0,0,0,0.4)' })
    ]
  },
  {
    id: 'preset-floating',
    name: 'Floating',
    category: 'shadow',
    effects: [
      createDropShadow({ offsetX: 0, offsetY: 20, blur: 40, color: 'rgba(0,0,0,0.25)' })
    ]
  },
  {
    id: 'preset-neon-blue',
    name: 'Neon Blue',
    category: 'glow',
    effects: [
      createNeonGlow({ color: '#00ffff', blur: 20, intensity: 3 })
    ]
  },
  {
    id: 'preset-neon-pink',
    name: 'Neon Pink',
    category: 'glow',
    effects: [
      createNeonGlow({ color: '#ff00ff', blur: 20, intensity: 3 })
    ]
  },
  {
    id: 'preset-soft-glow',
    name: 'Soft Glow',
    category: 'glow',
    effects: [
      createOuterGlow({ blur: 15, color: 'rgba(255,255,255,0.6)' })
    ]
  },
  {
    id: 'preset-vintage',
    name: 'Vintage',
    category: 'color',
    effects: [
      createSepia({ amount: 40 }),
      createBrightnessContrast({ brightness: -5, contrast: 10 }),
      createVignette({ amount: 30 })
    ]
  },
  {
    id: 'preset-noir',
    name: 'Noir',
    category: 'color',
    effects: [
      createGrayscale({ amount: 100 }),
      createBrightnessContrast({ contrast: 30 }),
      createVignette({ amount: 50 })
    ]
  },
  {
    id: 'preset-vibrant',
    name: 'Vibrant',
    category: 'color',
    effects: [
      createHueSaturation({ saturation: 40 }),
      createBrightnessContrast({ brightness: 10, contrast: 15 })
    ]
  },
  {
    id: 'preset-muted',
    name: 'Muted',
    category: 'color',
    effects: [
      createHueSaturation({ saturation: -30 }),
      createBrightnessContrast({ brightness: 5 })
    ]
  },
  {
    id: 'preset-duotone-cyan',
    name: 'Duotone Cyan',
    category: 'color',
    effects: [
      createDuotone({ highlightColor: '#00ffff', shadowColor: '#001a33' })
    ]
  },
  {
    id: 'preset-duotone-orange',
    name: 'Duotone Orange',
    category: 'color',
    effects: [
      createDuotone({ highlightColor: '#ffcc00', shadowColor: '#660000' })
    ]
  },
  {
    id: 'preset-retro-pixel',
    name: 'Retro Pixel',
    category: 'artistic',
    effects: [
      createPixelate({ blockSize: 8 })
    ]
  },
  {
    id: 'preset-film-grain',
    name: 'Film Grain',
    category: 'artistic',
    effects: [
      createNoise({ amount: 15, monochromatic: true, opacity: 25 })
    ]
  },
  {
    id: 'preset-embossed',
    name: 'Embossed',
    category: 'artistic',
    effects: [
      createEmboss({ angle: 135, height: 2, amount: 100 })
    ]
  },
  {
    id: 'preset-glitch-mild',
    name: 'Mild Glitch',
    category: 'artistic',
    effects: [
      createGlitch({ intensity: 3, slices: 5, rgbShift: 3 })
    ]
  },
  {
    id: 'preset-glitch-heavy',
    name: 'Heavy Glitch',
    category: 'artistic',
    effects: [
      createGlitch({ intensity: 10, slices: 15, rgbShift: 10 })
    ]
  },
  {
    id: 'preset-comic',
    name: 'Comic Book',
    category: 'artistic',
    effects: [
      createHalftone({ dotSize: 3, angle: 45, shape: 'circle' }),
      createStroke({ width: 2, color: '#000000', position: 'outside' })
    ]
  },
  {
    id: 'preset-dreamy',
    name: 'Dreamy',
    category: 'blur',
    effects: [
      createGaussianBlur({ radius: 3 }),
      createBrightnessContrast({ brightness: 10 }),
      createVignette({ amount: 20, feather: 70 })
    ]
  },
  {
    id: 'preset-tilt-shift',
    name: 'Tilt Shift',
    category: 'blur',
    effects: [
      createGaussianBlur({ radius: 5 }),
      createHueSaturation({ saturation: 20 })
    ]
  }
];

// ============================================
// Effect Utilities
// ============================================

function generateId(): string {
  return `effect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getEffectsByCategory(category: EffectCategory): EffectPreset[] {
  return EFFECT_PRESETS.filter(preset => preset.category === category);
}

export function duplicateEffect(effect: Effect): Effect {
  return {
    ...effect,
    id: generateId()
  };
}

export function applyEffectsToElement(
  elementId: string,
  effects: Effect[]
): { filter: string; style: React.CSSProperties } {
  const cssFilter = generateCSSFilter(effects);
  const style: React.CSSProperties = {
    filter: cssFilter
  };
  
  // Handle blend modes
  const blendModeEffect = effects.find(e => e.blendMode !== 'normal');
  if (blendModeEffect) {
    style.mixBlendMode = blendModeEffect.blendMode as any;
  }
  
  return { filter: cssFilter, style };
}

// Effect categories metadata for UI
export const EFFECT_CATEGORIES = [
  { id: 'shadow', name: 'Shadows', icon: 'shadow' },
  { id: 'glow', name: 'Glows', icon: 'sun' },
  { id: 'blur', name: 'Blurs', icon: 'blur' },
  { id: 'distort', name: 'Distortions', icon: 'wave' },
  { id: 'color', name: 'Color Adjustments', icon: 'palette' },
  { id: 'artistic', name: 'Artistic', icon: 'brush' },
  { id: 'stylize', name: 'Stylize', icon: 'sparkles' }
] as const;

// All available effect types for quick add
export const AVAILABLE_EFFECTS = [
  { type: 'drop-shadow', name: 'Drop Shadow', category: 'shadow', create: createDropShadow },
  { type: 'inner-shadow', name: 'Inner Shadow', category: 'shadow', create: createInnerShadow },
  { type: 'long-shadow', name: 'Long Shadow', category: 'shadow', create: createLongShadow },
  { type: 'outer-glow', name: 'Outer Glow', category: 'glow', create: createOuterGlow },
  { type: 'inner-glow', name: 'Inner Glow', category: 'glow', create: createInnerGlow },
  { type: 'neon-glow', name: 'Neon Glow', category: 'glow', create: createNeonGlow },
  { type: 'gaussian-blur', name: 'Gaussian Blur', category: 'blur', create: createGaussianBlur },
  { type: 'motion-blur', name: 'Motion Blur', category: 'blur', create: createMotionBlur },
  { type: 'brightness-contrast', name: 'Brightness/Contrast', category: 'color', create: createBrightnessContrast },
  { type: 'hue-saturation', name: 'Hue/Saturation', category: 'color', create: createHueSaturation },
  { type: 'grayscale', name: 'Grayscale', category: 'color', create: createGrayscale },
  { type: 'sepia', name: 'Sepia', category: 'color', create: createSepia },
  { type: 'invert', name: 'Invert', category: 'color', create: createInvert },
  { type: 'color-overlay', name: 'Color Overlay', category: 'color', create: createColorOverlay },
  { type: 'duotone', name: 'Duotone', category: 'color', create: createDuotone },
  { type: 'pixelate', name: 'Pixelate', category: 'artistic', create: createPixelate },
  { type: 'noise', name: 'Noise', category: 'artistic', create: createNoise },
  { type: 'vignette', name: 'Vignette', category: 'artistic', create: createVignette },
  { type: 'emboss', name: 'Emboss', category: 'artistic', create: createEmboss },
  { type: 'glitch', name: 'Glitch', category: 'artistic', create: createGlitch },
  { type: 'halftone', name: 'Halftone', category: 'artistic', create: createHalftone },
  { type: 'chromatic-aberration', name: 'Chromatic Aberration', category: 'artistic', create: createChromaticAberration },
  { type: 'stroke', name: 'Stroke', category: 'stylize', create: createStroke }
] as const;
