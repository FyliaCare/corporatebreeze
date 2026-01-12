/**
 * Advanced Product Mockup System
 * SVG-based realistic product mockups with design placement zones
 */

export type ProductType = 
  | 'tshirt-crew' | 'tshirt-vneck' | 'tshirt-long-sleeve'
  | 'hoodie-pullover' | 'hoodie-zip' | 'sweatshirt'
  | 'polo-shirt' | 'tank-top'
  | 'cap-baseball' | 'cap-snapback' | 'cap-trucker' | 'beanie'
  | 'mug-standard' | 'mug-tall' | 'mug-travel'
  | 'tote-bag' | 'drawstring-bag' | 'backpack'
  | 'phone-case' | 'laptop-sleeve'
  | 'poster' | 'canvas-print' | 'framed-print'
  | 'business-card' | 'letterhead' | 'envelope'
  | 'sticker' | 'badge' | 'keychain'

export interface ProductColor {
  id: string
  name: string
  hex: string
  textColor: 'light' | 'dark'
}

export interface DesignZone {
  id: string
  name: string
  x: number
  y: number
  width: number
  height: number
  rotation?: number
  curved?: boolean
  curveAmount?: number
  perspective?: {
    topScale: number
    bottomScale: number
  }
}

export interface ProductMockup {
  id: string
  name: string
  category: string
  type: ProductType
  description: string
  viewportWidth: number
  viewportHeight: number
  colors: ProductColor[]
  defaultColor: string
  designZones: DesignZone[]
  svgTemplate: string // SVG path data for product shape
  shadowSvg?: string // Optional shadow/depth SVG
  highlights?: string // Highlight overlay SVG
  tags: string[]
}

// Product color presets
export const PRODUCT_COLORS: Record<string, ProductColor[]> = {
  apparel: [
    { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
    { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
    { id: 'navy', name: 'Navy Blue', hex: '#1e3a5f', textColor: 'light' },
    { id: 'heather-gray', name: 'Heather Gray', hex: '#9ca3af', textColor: 'dark' },
    { id: 'charcoal', name: 'Charcoal', hex: '#374151', textColor: 'light' },
    { id: 'red', name: 'Red', hex: '#dc2626', textColor: 'light' },
    { id: 'royal-blue', name: 'Royal Blue', hex: '#2563eb', textColor: 'light' },
    { id: 'forest-green', name: 'Forest Green', hex: '#166534', textColor: 'light' },
    { id: 'maroon', name: 'Maroon', hex: '#7f1d1d', textColor: 'light' },
    { id: 'purple', name: 'Purple', hex: '#7c3aed', textColor: 'light' },
    { id: 'light-pink', name: 'Light Pink', hex: '#fce7f3', textColor: 'dark' },
    { id: 'cream', name: 'Cream', hex: '#fef3c7', textColor: 'dark' },
  ],
  drinkware: [
    { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
    { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
    { id: 'red', name: 'Red', hex: '#dc2626', textColor: 'light' },
    { id: 'blue', name: 'Blue', hex: '#2563eb', textColor: 'light' },
    { id: 'green', name: 'Green', hex: '#16a34a', textColor: 'light' },
    { id: 'yellow', name: 'Yellow', hex: '#facc15', textColor: 'dark' },
  ],
  accessories: [
    { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
    { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
    { id: 'navy', name: 'Navy', hex: '#1e3a5f', textColor: 'light' },
    { id: 'khaki', name: 'Khaki', hex: '#d4a574', textColor: 'dark' },
    { id: 'red', name: 'Red', hex: '#dc2626', textColor: 'light' },
    { id: 'camo', name: 'Camo Green', hex: '#4a5d23', textColor: 'light' },
  ]
}

// Comprehensive Product Mockups
export const PRODUCT_MOCKUPS: ProductMockup[] = [
  // ============ T-SHIRTS ============
  {
    id: 'tshirt-crew-front',
    name: 'Crew Neck T-Shirt (Front)',
    category: 'Apparel',
    type: 'tshirt-crew',
    description: 'Classic crew neck t-shirt, front view',
    viewportWidth: 400,
    viewportHeight: 480,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'white',
    designZones: [
      { id: 'front-center', name: 'Front Center', x: 120, y: 140, width: 160, height: 180 },
      { id: 'front-left-chest', name: 'Left Chest', x: 220, y: 120, width: 50, height: 50 },
    ],
    tags: ['apparel', 't-shirt', 'casual', 'unisex'],
    svgTemplate: `
      <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
        <!-- T-Shirt Body -->
        <path d="
          M 80 100
          C 80 90, 95 85, 120 85
          L 120 55
          C 140 35, 180 30, 200 30
          C 220 30, 260 35, 280 55
          L 280 85
          C 305 85, 320 90, 320 100
          L 355 180
          L 320 195
          L 320 420
          C 320 440, 300 450, 200 450
          C 100 450, 80 440, 80 420
          L 80 195
          L 45 180
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Left Sleeve -->
        <path d="M 80 100 L 45 180 L 20 170 L 40 90 C 50 75, 70 80, 80 100" 
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Right Sleeve -->
        <path d="M 320 100 L 355 180 L 380 170 L 360 90 C 350 75, 330 80, 320 100"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Collar -->
        <path d="M 120 55 C 140 75, 180 80, 200 80 C 220 80, 260 75, 280 55 C 260 65, 220 70, 200 70 C 180 70, 140 65, 120 55"
          fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.3"/>
        
        <!-- Sleeve Folds (Details) -->
        <path d="M 55 140 Q 60 145, 65 140" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        <path d="M 335 140 Q 340 145, 345 140" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        
        <!-- Body Folds -->
        <path d="M 150 320 Q 155 360, 150 400" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
        <path d="M 250 320 Q 245 360, 250 400" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
      </svg>
    `,
    shadowSvg: `
      <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="shirt-shadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:black;stop-opacity:0"/>
            <stop offset="100%" style="stop-color:black;stop-opacity:0.1"/>
          </linearGradient>
        </defs>
        <ellipse cx="200" cy="465" rx="120" ry="10" fill="rgba(0,0,0,0.15)"/>
      </svg>
    `
  },
  {
    id: 'tshirt-crew-back',
    name: 'Crew Neck T-Shirt (Back)',
    category: 'Apparel',
    type: 'tshirt-crew',
    description: 'Classic crew neck t-shirt, back view',
    viewportWidth: 400,
    viewportHeight: 480,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'white',
    designZones: [
      { id: 'back-center', name: 'Back Center', x: 110, y: 100, width: 180, height: 220 },
      { id: 'back-upper', name: 'Upper Back', x: 140, y: 85, width: 120, height: 40 },
    ],
    tags: ['apparel', 't-shirt', 'casual', 'unisex', 'back'],
    svgTemplate: `
      <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
        <path d="
          M 80 100
          C 80 90, 95 85, 120 85
          L 120 65
          C 140 50, 180 45, 200 45
          C 220 45, 260 50, 280 65
          L 280 85
          C 305 85, 320 90, 320 100
          L 355 180
          L 320 195
          L 320 420
          C 320 440, 300 450, 200 450
          C 100 450, 80 440, 80 420
          L 80 195
          L 45 180
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <path d="M 80 100 L 45 180 L 20 170 L 40 90 C 50 75, 70 80, 80 100" 
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <path d="M 320 100 L 355 180 L 380 170 L 360 90 C 350 75, 330 80, 320 100"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Back Collar Line -->
        <path d="M 120 65 C 140 55, 180 50, 200 50 C 220 50, 260 55, 280 65"
          fill="none" stroke="currentColor" stroke-width="1" opacity="0.15"/>
      </svg>
    `
  },
  {
    id: 'tshirt-vneck-front',
    name: 'V-Neck T-Shirt (Front)',
    category: 'Apparel',
    type: 'tshirt-vneck',
    description: 'Modern v-neck t-shirt, front view',
    viewportWidth: 400,
    viewportHeight: 480,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'white',
    designZones: [
      { id: 'front-center', name: 'Front Center', x: 120, y: 160, width: 160, height: 160 },
    ],
    tags: ['apparel', 't-shirt', 'modern', 'unisex'],
    svgTemplate: `
      <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg">
        <path d="
          M 80 100
          C 80 90, 95 85, 120 85
          L 140 55
          L 200 100
          L 260 55
          L 280 85
          C 305 85, 320 90, 320 100
          L 355 180
          L 320 195
          L 320 420
          C 320 440, 300 450, 200 450
          C 100 450, 80 440, 80 420
          L 80 195
          L 45 180
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <path d="M 80 100 L 45 180 L 20 170 L 40 90 C 50 75, 70 80, 80 100" 
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <path d="M 320 100 L 355 180 L 380 170 L 360 90 C 350 75, 330 80, 320 100"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- V-Neck -->
        <path d="M 140 55 L 200 100 L 260 55" fill="none" stroke="currentColor" stroke-width="2" opacity="0.2"/>
      </svg>
    `
  },

  // ============ HOODIES ============
  {
    id: 'hoodie-pullover-front',
    name: 'Pullover Hoodie (Front)',
    category: 'Apparel',
    type: 'hoodie-pullover',
    description: 'Classic pullover hoodie with kangaroo pocket',
    viewportWidth: 440,
    viewportHeight: 520,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'heather-gray',
    designZones: [
      { id: 'front-center', name: 'Front Center', x: 130, y: 180, width: 180, height: 140 },
      { id: 'front-left-chest', name: 'Left Chest', x: 250, y: 150, width: 55, height: 55 },
    ],
    tags: ['apparel', 'hoodie', 'streetwear', 'casual', 'winter'],
    svgTemplate: `
      <svg viewBox="0 0 440 520" xmlns="http://www.w3.org/2000/svg">
        <!-- Hood -->
        <path d="
          M 130 80
          C 130 30, 180 10, 220 10
          C 260 10, 310 30, 310 80
          L 310 120
          C 290 130, 250 135, 220 135
          C 190 135, 150 130, 130 120
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Hood Inner Shadow -->
        <path d="M 145 70 C 145 40, 180 25, 220 25 C 260 25, 295 40, 295 70 L 295 110 C 275 118, 245 122, 220 122 C 195 122, 165 118, 145 110 Z"
          fill="currentColor" opacity="0.08"/>
        
        <!-- Main Body -->
        <path d="
          M 70 140
          C 70 125, 100 115, 130 120
          L 130 80
          L 145 70
          L 145 110
          L 80 115
          L 30 210
          L 70 230
          L 70 460
          C 70 480, 100 490, 220 490
          C 340 490, 370 480, 370 460
          L 370 230
          L 410 210
          L 360 115
          L 295 110
          L 295 70
          L 310 80
          L 310 120
          C 340 115, 370 125, 370 140
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Left Sleeve -->
        <path d="M 70 140 L 30 210 L 5 200 L 35 120 C 45 100, 60 110, 70 140"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Right Sleeve -->
        <path d="M 370 140 L 410 210 L 435 200 L 405 120 C 395 100, 380 110, 370 140"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Kangaroo Pocket -->
        <path d="M 130 350 C 130 340, 150 335, 220 335 C 290 335, 310 340, 310 350 L 310 420 C 310 430, 290 435, 220 435 C 150 435, 130 430, 130 420 Z"
          fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="1" stroke-opacity="0.15"/>
        
        <!-- Drawstrings -->
        <path d="M 195 135 L 195 200" stroke="currentColor" stroke-width="2" opacity="0.2"/>
        <path d="M 245 135 L 245 200" stroke="currentColor" stroke-width="2" opacity="0.2"/>
        
        <!-- Cuff Details -->
        <rect x="5" y="195" width="25" height="20" rx="3" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1"/>
        <rect x="410" y="195" width="25" height="20" rx="3" fill="currentColor" opacity="0.05" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.1"/>
      </svg>
    `
  },
  {
    id: 'hoodie-zip-front',
    name: 'Zip-Up Hoodie (Front)',
    category: 'Apparel',
    type: 'hoodie-zip',
    description: 'Full zip hoodie with split design zones',
    viewportWidth: 440,
    viewportHeight: 520,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'navy',
    designZones: [
      { id: 'left-chest', name: 'Left Side', x: 130, y: 180, width: 80, height: 120 },
      { id: 'right-chest', name: 'Right Side', x: 230, y: 180, width: 80, height: 120 },
      { id: 'back-full', name: 'Back (Full)', x: 110, y: 150, width: 220, height: 200 },
    ],
    tags: ['apparel', 'hoodie', 'streetwear', 'athletic'],
    svgTemplate: `
      <svg viewBox="0 0 440 520" xmlns="http://www.w3.org/2000/svg">
        <!-- Hood -->
        <path d="M 130 80 C 130 30, 180 10, 220 10 C 260 10, 310 30, 310 80 L 310 120 C 290 130, 250 135, 220 135 C 190 135, 150 130, 130 120 Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <path d="M 145 70 C 145 40, 180 25, 220 25 C 260 25, 295 40, 295 70 L 295 110 C 275 118, 245 122, 220 122 C 195 122, 165 118, 145 110 Z"
          fill="currentColor" opacity="0.08"/>
        
        <!-- Main Body -->
        <path d="M 70 140 C 70 125, 100 115, 130 120 L 130 80 L 145 70 L 145 110 L 80 115 L 30 210 L 70 230 L 70 460 C 70 480, 100 490, 220 490 C 340 490, 370 480, 370 460 L 370 230 L 410 210 L 360 115 L 295 110 L 295 70 L 310 80 L 310 120 C 340 115, 370 125, 370 140 Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Sleeves -->
        <path d="M 70 140 L 30 210 L 5 200 L 35 120 C 45 100, 60 110, 70 140" class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        <path d="M 370 140 L 410 210 L 435 200 L 405 120 C 395 100, 380 110, 370 140" class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Zipper -->
        <line x1="220" y1="135" x2="220" y2="485" stroke="#a1a1aa" stroke-width="3"/>
        <line x1="220" y1="135" x2="220" y2="485" stroke="#d4d4d8" stroke-width="1"/>
        
        <!-- Zipper Pull -->
        <rect x="215" y="200" width="10" height="15" rx="2" fill="#71717a"/>
      </svg>
    `
  },

  // ============ CAPS ============
  {
    id: 'cap-baseball-front',
    name: 'Baseball Cap (Front)',
    category: 'Accessories',
    type: 'cap-baseball',
    description: 'Classic 6-panel baseball cap, front view',
    viewportWidth: 300,
    viewportHeight: 280,
    colors: PRODUCT_COLORS.accessories,
    defaultColor: 'navy',
    designZones: [
      { id: 'front-panel', name: 'Front Panel', x: 85, y: 60, width: 130, height: 80 },
    ],
    tags: ['accessories', 'cap', 'hat', 'sports', 'casual'],
    svgTemplate: `
      <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
        <!-- Brim Shadow -->
        <ellipse cx="150" cy="175" rx="90" ry="15" fill="rgba(0,0,0,0.2)"/>
        
        <!-- Cap Crown -->
        <path d="
          M 50 120
          C 50 50, 100 20, 150 20
          C 200 20, 250 50, 250 120
          L 250 150
          C 250 160, 230 165, 150 165
          C 70 165, 50 160, 50 150
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Panel Lines -->
        <path d="M 150 20 L 150 165" stroke="currentColor" stroke-width="1" opacity="0.1"/>
        <path d="M 100 30 Q 90 90, 95 165" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        <path d="M 200 30 Q 210 90, 205 165" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        
        <!-- Button Top -->
        <circle cx="150" cy="22" r="6" fill="currentColor" opacity="0.3"/>
        
        <!-- Brim -->
        <path d="
          M 50 150
          C 50 140, 70 135, 150 135
          C 230 135, 250 140, 250 150
          L 270 185
          C 270 200, 220 215, 150 215
          C 80 215, 30 200, 30 185
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Brim Top Surface -->
        <path d="M 50 150 C 50 140, 70 135, 150 135 C 230 135, 250 140, 250 150"
          fill="currentColor" opacity="0.05"/>
      </svg>
    `
  },
  {
    id: 'cap-snapback-side',
    name: 'Snapback Cap (Side)',
    category: 'Accessories',
    type: 'cap-snapback',
    description: 'Flat brim snapback cap, side view',
    viewportWidth: 320,
    viewportHeight: 260,
    colors: PRODUCT_COLORS.accessories,
    defaultColor: 'black',
    designZones: [
      { id: 'side-panel', name: 'Side Panel', x: 120, y: 45, width: 100, height: 70 },
    ],
    tags: ['accessories', 'cap', 'hat', 'streetwear', 'hip-hop'],
    svgTemplate: `
      <svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg">
        <!-- Cap Crown -->
        <path d="
          M 80 130
          C 80 40, 140 15, 200 15
          C 260 15, 280 60, 280 130
          L 280 145
          C 280 155, 240 160, 180 160
          C 100 160, 80 155, 80 145
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Panel Seams -->
        <path d="M 180 15 L 180 160" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        
        <!-- Button -->
        <circle cx="180" cy="18" r="5" fill="currentColor" opacity="0.3"/>
        
        <!-- Flat Brim -->
        <path d="
          M 80 145
          L 30 155
          L 20 175
          L 60 180
          C 60 180, 100 165, 180 165
          C 220 165, 280 155, 280 145
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Brim Underside (darker) -->
        <path d="M 30 155 L 20 175 L 60 180 C 60 175, 50 165, 30 155"
          fill="currentColor" opacity="0.15"/>
        
        <!-- Snapback Closure -->
        <path d="M 270 130 C 285 135, 290 145, 285 155" stroke="#71717a" stroke-width="2"/>
      </svg>
    `
  },
  {
    id: 'beanie-front',
    name: 'Beanie (Front)',
    category: 'Accessories',
    type: 'beanie',
    description: 'Knit beanie with cuff, front view',
    viewportWidth: 280,
    viewportHeight: 260,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'charcoal',
    designZones: [
      { id: 'cuff-center', name: 'Cuff Center', x: 75, y: 145, width: 130, height: 45 },
    ],
    tags: ['accessories', 'beanie', 'hat', 'winter', 'knit'],
    svgTemplate: `
      <svg viewBox="0 0 280 260" xmlns="http://www.w3.org/2000/svg">
        <!-- Main Beanie -->
        <path d="
          M 40 140
          C 40 50, 80 15, 140 15
          C 200 15, 240 50, 240 140
          L 240 190
          C 240 200, 200 210, 140 210
          C 80 210, 40 200, 40 190
          Z"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Knit Texture Lines -->
        <path d="M 70 60 Q 140 55, 210 60" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        <path d="M 55 90 Q 140 82, 225 90" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        <path d="M 45 120 Q 140 110, 235 120" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>
        
        <!-- Ribbed Cuff -->
        <path d="
          M 40 140
          L 40 190
          C 40 200, 80 210, 140 210
          C 200 210, 240 200, 240 190
          L 240 140
          C 240 150, 200 158, 140 158
          C 80 158, 40 150, 40 140
          Z"
          fill="currentColor" opacity="0.08" stroke="currentColor" stroke-width="0.5" stroke-opacity="0.2"/>
        
        <!-- Cuff Rib Lines -->
        ${Array.from({length: 12}, (_, i) => 
          `<line x1="${55 + i * 15}" y1="145" x2="${55 + i * 15}" y2="205" stroke="currentColor" stroke-width="0.5" opacity="0.1"/>`
        ).join('')}
      </svg>
    `
  },

  // ============ MUGS ============
  {
    id: 'mug-standard-front',
    name: 'Coffee Mug (Front)',
    category: 'Drinkware',
    type: 'mug-standard',
    description: '11oz ceramic mug, front view',
    viewportWidth: 340,
    viewportHeight: 320,
    colors: PRODUCT_COLORS.drinkware,
    defaultColor: 'white',
    designZones: [
      { id: 'wrap-area', name: 'Wrap Area', x: 70, y: 80, width: 160, height: 140, curved: true, curveAmount: 0.15 },
    ],
    tags: ['drinkware', 'mug', 'ceramic', 'coffee', 'gift'],
    svgTemplate: `
      <svg viewBox="0 0 340 320" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="150" cy="290" rx="80" ry="12" fill="rgba(0,0,0,0.15)"/>
        
        <!-- Mug Body -->
        <path d="
          M 50 60
          L 50 250
          C 50 275, 80 285, 150 285
          C 220 285, 250 275, 250 250
          L 250 60
          C 250 50, 220 45, 150 45
          C 80 45, 50 50, 50 60
          Z"
          class="product-body" stroke="#d1d5db" stroke-width="1.5"/>
        
        <!-- Top Rim -->
        <ellipse cx="150" cy="60" rx="100" ry="15" fill="currentColor" stroke="#d1d5db" stroke-width="1"/>
        <ellipse cx="150" cy="60" rx="85" ry="12" fill="currentColor" opacity="0.95"/>
        
        <!-- Inner Shadow -->
        <ellipse cx="150" cy="60" rx="80" ry="10" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Handle -->
        <path d="
          M 250 100
          C 290 100, 310 130, 310 175
          C 310 220, 290 250, 250 250
          M 250 120
          C 275 120, 290 145, 290 175
          C 290 205, 275 230, 250 230"
          fill="none" stroke="currentColor" stroke-width="20" stroke-linecap="round"/>
        <path d="
          M 250 100
          C 290 100, 310 130, 310 175
          C 310 220, 290 250, 250 250"
          fill="none" stroke="#d1d5db" stroke-width="1.5"/>
        <path d="
          M 250 120
          C 275 120, 290 145, 290 175
          C 290 205, 275 230, 250 230"
          fill="none" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Highlight -->
        <path d="M 80 80 Q 85 165, 80 250" stroke="white" stroke-width="8" opacity="0.3" stroke-linecap="round"/>
      </svg>
    `
  },
  {
    id: 'mug-travel',
    name: 'Travel Mug',
    category: 'Drinkware',
    type: 'mug-travel',
    description: 'Insulated travel mug with lid',
    viewportWidth: 280,
    viewportHeight: 380,
    colors: PRODUCT_COLORS.drinkware,
    defaultColor: 'white',
    designZones: [
      { id: 'body-wrap', name: 'Body Wrap', x: 60, y: 120, width: 140, height: 180, curved: true, curveAmount: 0.1 },
    ],
    tags: ['drinkware', 'travel', 'insulated', 'tumbler'],
    svgTemplate: `
      <svg viewBox="0 0 280 380" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="140" cy="360" rx="55" ry="10" fill="rgba(0,0,0,0.15)"/>
        
        <!-- Lid -->
        <path d="
          M 75 40
          L 75 80
          C 75 90, 100 95, 140 95
          C 180 95, 205 90, 205 80
          L 205 40
          C 205 25, 180 15, 140 15
          C 100 15, 75 25, 75 40
          Z"
          fill="#404040" stroke="#333" stroke-width="1"/>
        
        <!-- Lid Top -->
        <ellipse cx="140" cy="40" rx="65" ry="20" fill="#505050" stroke="#333" stroke-width="1"/>
        
        <!-- Drink Opening -->
        <ellipse cx="140" cy="35" rx="20" ry="8" fill="#333"/>
        
        <!-- Body -->
        <path d="
          M 70 95
          L 60 340
          C 60 355, 95 360, 140 360
          C 185 360, 220 355, 220 340
          L 210 95
          C 210 85, 180 80, 140 80
          C 100 80, 70 85, 70 95
          Z"
          class="product-body" stroke="#d1d5db" stroke-width="1.5"/>
        
        <!-- Body Bands -->
        <path d="M 65 130 Q 140 125, 215 130" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        <path d="M 62 300 Q 140 295, 218 300" stroke="currentColor" stroke-width="0.5" opacity="0.15"/>
        
        <!-- Highlight -->
        <path d="M 90 110 Q 88 225, 85 330" stroke="white" stroke-width="6" opacity="0.25" stroke-linecap="round"/>
      </svg>
    `
  },

  // ============ BAGS ============
  {
    id: 'tote-bag-front',
    name: 'Canvas Tote Bag',
    category: 'Bags',
    type: 'tote-bag',
    description: 'Natural canvas tote bag, front view',
    viewportWidth: 360,
    viewportHeight: 420,
    colors: [
      { id: 'natural', name: 'Natural', hex: '#f5f0e6', textColor: 'dark' },
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
      { id: 'navy', name: 'Navy', hex: '#1e3a5f', textColor: 'light' },
      { id: 'red', name: 'Red', hex: '#dc2626', textColor: 'light' },
    ],
    defaultColor: 'natural',
    designZones: [
      { id: 'front-center', name: 'Front Center', x: 80, y: 140, width: 200, height: 180 },
    ],
    tags: ['bags', 'tote', 'eco-friendly', 'shopping', 'canvas'],
    svgTemplate: `
      <svg viewBox="0 0 360 420" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="180" cy="400" rx="100" ry="12" fill="rgba(0,0,0,0.12)"/>
        
        <!-- Handles -->
        <path d="M 100 100 C 100 50, 130 30, 130 30 L 145 30 C 145 30, 115 50, 115 100"
          fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
        <path d="M 260 100 C 260 50, 230 30, 230 30 L 215 30 C 215 30, 245 50, 245 100"
          fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/>
        
        <!-- Handle Outlines -->
        <path d="M 100 100 C 100 50, 130 30, 130 30" fill="none" stroke="#d1d5db" stroke-width="1"/>
        <path d="M 115 100 C 115 50, 145 30, 145 30" fill="none" stroke="#d1d5db" stroke-width="1"/>
        <path d="M 260 100 C 260 50, 230 30, 230 30" fill="none" stroke="#d1d5db" stroke-width="1"/>
        <path d="M 245 100 C 245 50, 215 30, 215 30" fill="none" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Bag Body -->
        <path d="
          M 50 100
          L 50 370
          C 50 385, 80 395, 180 395
          C 280 395, 310 385, 310 370
          L 310 100
          C 310 90, 280 85, 180 85
          C 80 85, 50 90, 50 100
          Z"
          class="product-body" stroke="#d1d5db" stroke-width="1.5"/>
        
        <!-- Top Opening -->
        <path d="M 50 100 C 50 110, 80 115, 180 115 C 280 115, 310 110, 310 100"
          fill="currentColor" opacity="0.05" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Canvas Texture Lines -->
        <path d="M 70 150 L 70 370" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
        <path d="M 290 150 L 290 370" stroke="currentColor" stroke-width="0.3" opacity="0.1"/>
      </svg>
    `
  },
  {
    id: 'drawstring-bag',
    name: 'Drawstring Bag',
    category: 'Bags',
    type: 'drawstring-bag',
    description: 'Polyester drawstring backpack',
    viewportWidth: 320,
    viewportHeight: 400,
    colors: PRODUCT_COLORS.apparel,
    defaultColor: 'black',
    designZones: [
      { id: 'front-center', name: 'Front Center', x: 70, y: 100, width: 180, height: 200 },
    ],
    tags: ['bags', 'drawstring', 'backpack', 'gym', 'sports'],
    svgTemplate: `
      <svg viewBox="0 0 320 400" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="160" cy="380" rx="85" ry="12" fill="rgba(0,0,0,0.15)"/>
        
        <!-- Drawstrings -->
        <path d="M 50 80 L 30 350 L 50 365" fill="none" stroke="#888" stroke-width="3"/>
        <path d="M 270 80 L 290 350 L 270 365" fill="none" stroke="#888" stroke-width="3"/>
        
        <!-- Bag Body -->
        <path d="
          M 50 60
          C 50 50, 90 45, 160 45
          C 230 45, 270 50, 270 60
          L 270 340
          C 270 365, 220 375, 160 375
          C 100 375, 50 365, 50 340
          Z"
          class="product-body" stroke="#d1d5db" stroke-width="1.5"/>
        
        <!-- Gathered Top -->
        <path d="M 50 60 C 50 75, 90 85, 160 85 C 230 85, 270 75, 270 60"
          fill="currentColor" opacity="0.1" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Drawstring Holes -->
        <circle cx="70" cy="70" r="5" fill="#555"/>
        <circle cx="250" cy="70" r="5" fill="#555"/>
        
        <!-- Reinforced Corners -->
        <path d="M 50 340 L 30 365 L 55 375" fill="currentColor" opacity="0.2"/>
        <path d="M 270 340 L 290 365 L 265 375" fill="currentColor" opacity="0.2"/>
      </svg>
    `
  },

  // ============ PHONE CASES ============
  {
    id: 'phone-case-iphone',
    name: 'iPhone Case',
    category: 'Tech',
    type: 'phone-case',
    description: 'Slim phone case for iPhone',
    viewportWidth: 220,
    viewportHeight: 440,
    colors: [
      { id: 'clear', name: 'Clear', hex: '#f8fafc', textColor: 'dark' },
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
      { id: 'pink', name: 'Pink', hex: '#f9a8d4', textColor: 'dark' },
      { id: 'blue', name: 'Blue', hex: '#93c5fd', textColor: 'dark' },
    ],
    defaultColor: 'clear',
    designZones: [
      { id: 'back-full', name: 'Back Full', x: 25, y: 40, width: 170, height: 320 },
    ],
    tags: ['tech', 'phone', 'case', 'iphone', 'accessory'],
    svgTemplate: `
      <svg viewBox="0 0 220 440" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <rect x="30" y="410" width="160" height="15" rx="7" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Phone Case Body -->
        <rect x="20" y="20" width="180" height="380" rx="35" ry="35"
          class="product-body" stroke="#d1d5db" stroke-width="2"/>
        
        <!-- Camera Cutout -->
        <rect x="35" y="35" width="70" height="90" rx="15" fill="#1a1a1a"/>
        <circle cx="55" cy="60" r="12" fill="#333"/>
        <circle cx="90" cy="60" r="12" fill="#333"/>
        <circle cx="55" cy="95" r="12" fill="#333"/>
        <circle cx="90" cy="95" r="5" fill="#333"/>
        
        <!-- Side Buttons -->
        <rect x="0" y="120" width="4" height="30" rx="2" fill="#888"/>
        <rect x="0" y="170" width="4" height="50" rx="2" fill="#888"/>
        <rect x="216" y="160" width="4" height="40" rx="2" fill="#888"/>
        
        <!-- Case Edge Detail -->
        <rect x="20" y="20" width="180" height="380" rx="35" ry="35"
          fill="none" stroke="currentColor" stroke-width="1" opacity="0.1"/>
      </svg>
    `
  },

  // ============ PRINT PRODUCTS ============
  {
    id: 'poster-portrait',
    name: 'Portrait Poster',
    category: 'Print',
    type: 'poster',
    description: '18x24 inch portrait poster',
    viewportWidth: 360,
    viewportHeight: 480,
    colors: [
      { id: 'white', name: 'White Paper', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'cream', name: 'Cream Paper', hex: '#fffef5', textColor: 'dark' },
      { id: 'kraft', name: 'Kraft Paper', hex: '#c4a77d', textColor: 'dark' },
    ],
    defaultColor: 'white',
    designZones: [
      { id: 'full-bleed', name: 'Full Bleed', x: 20, y: 20, width: 320, height: 420 },
    ],
    tags: ['print', 'poster', 'wall art', 'portrait'],
    svgTemplate: `
      <svg viewBox="0 0 360 480" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <rect x="30" y="30" width="320" height="430" fill="rgba(0,0,0,0.15)" rx="2"/>
        
        <!-- Poster -->
        <rect x="20" y="20" width="320" height="420" rx="2"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Paper Texture (subtle) -->
        <rect x="20" y="20" width="320" height="420" rx="2"
          fill="url(#paper-texture)" opacity="0.03"/>
        
        <defs>
          <pattern id="paper-texture" width="4" height="4" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.5" fill="currentColor"/>
            <circle cx="3" cy="3" r="0.5" fill="currentColor"/>
          </pattern>
        </defs>
      </svg>
    `
  },
  {
    id: 'framed-print',
    name: 'Framed Print',
    category: 'Print',
    type: 'framed-print',
    description: 'Gallery framed print with mat',
    viewportWidth: 400,
    viewportHeight: 500,
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
    ],
    defaultColor: 'white',
    designZones: [
      { id: 'print-area', name: 'Print Area', x: 65, y: 65, width: 270, height: 350 },
    ],
    tags: ['print', 'framed', 'gallery', 'wall art'],
    svgTemplate: `
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <!-- Wall Shadow -->
        <rect x="35" y="35" width="345" height="445" fill="rgba(0,0,0,0.12)" rx="2"/>
        
        <!-- Frame -->
        <rect x="20" y="20" width="360" height="460" rx="3"
          fill="#2d2d2d" stroke="#1a1a1a" stroke-width="2"/>
        
        <!-- Frame Inner Bevel -->
        <rect x="30" y="30" width="340" height="440" rx="2"
          fill="#3d3d3d"/>
        
        <!-- Mat -->
        <rect x="40" y="40" width="320" height="420" rx="1"
          fill="#fafafa" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Print Area -->
        <rect x="65" y="65" width="270" height="350"
          class="product-body" stroke="#e5e7eb" stroke-width="1"/>
        
        <!-- Mat Shadow -->
        <path d="M 65 65 L 65 415 L 335 415 L 335 65"
          fill="none" stroke="rgba(0,0,0,0.08)" stroke-width="3"/>
      </svg>
    `
  },
  {
    id: 'business-card',
    name: 'Business Card',
    category: 'Print',
    type: 'business-card',
    description: 'Standard 3.5x2 inch business card',
    viewportWidth: 420,
    viewportHeight: 280,
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'cream', name: 'Cream', hex: '#fffef5', textColor: 'dark' },
      { id: 'black', name: 'Black', hex: '#1a1a1a', textColor: 'light' },
      { id: 'kraft', name: 'Kraft', hex: '#c4a77d', textColor: 'dark' },
    ],
    defaultColor: 'white',
    designZones: [
      { id: 'full', name: 'Full Card', x: 20, y: 20, width: 350, height: 200 },
    ],
    tags: ['print', 'business card', 'stationery', 'corporate'],
    svgTemplate: `
      <svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg">
        <!-- Stack Effect -->
        <rect x="35" y="38" width="350" height="200" rx="8" fill="#e5e7eb"/>
        <rect x="30" y="33" width="350" height="200" rx="8" fill="#f1f5f9"/>
        <rect x="25" y="28" width="350" height="200" rx="8" fill="#f8fafc"/>
        
        <!-- Main Card -->
        <rect x="20" y="20" width="350" height="200" rx="8"
          class="product-body" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Subtle Shine -->
        <rect x="20" y="20" width="350" height="100" rx="8"
          fill="url(#card-shine)" opacity="0.05"/>
        
        <defs>
          <linearGradient id="card-shine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:white;stop-opacity:1"/>
            <stop offset="100%" style="stop-color:white;stop-opacity:0"/>
          </linearGradient>
        </defs>
      </svg>
    `
  },

  // ============ STICKERS & BADGES ============
  {
    id: 'sticker-circle',
    name: 'Circle Sticker',
    category: 'Stickers',
    type: 'sticker',
    description: '3 inch circle sticker',
    viewportWidth: 240,
    viewportHeight: 240,
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'clear', name: 'Clear', hex: '#f8fafc', textColor: 'dark' },
    ],
    defaultColor: 'white',
    designZones: [
      { id: 'full', name: 'Full Sticker', x: 25, y: 25, width: 190, height: 190 },
    ],
    tags: ['sticker', 'circle', 'round', 'decal'],
    svgTemplate: `
      <svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="125" cy="125" rx="95" ry="95" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Sticker -->
        <circle cx="120" cy="120" r="95" class="product-body" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Peel Effect -->
        <path d="M 200 160 Q 220 140, 210 115 Q 205 130, 200 160"
          fill="#f1f5f9" stroke="#d1d5db" stroke-width="0.5"/>
      </svg>
    `
  },
  {
    id: 'sticker-rounded-rect',
    name: 'Rectangle Sticker',
    category: 'Stickers',
    type: 'sticker',
    description: 'Rounded rectangle sticker',
    viewportWidth: 360,
    viewportHeight: 240,
    colors: [
      { id: 'white', name: 'White', hex: '#FFFFFF', textColor: 'dark' },
      { id: 'clear', name: 'Clear', hex: '#f8fafc', textColor: 'dark' },
    ],
    defaultColor: 'white',
    designZones: [
      { id: 'full', name: 'Full Sticker', x: 25, y: 25, width: 310, height: 170 },
    ],
    tags: ['sticker', 'rectangle', 'decal', 'label'],
    svgTemplate: `
      <svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <rect x="28" y="28" width="310" height="175" rx="20" fill="rgba(0,0,0,0.1)"/>
        
        <!-- Sticker -->
        <rect x="20" y="20" width="310" height="175" rx="20"
          class="product-body" stroke="#d1d5db" stroke-width="1"/>
        
        <!-- Peel Effect -->
        <path d="M 310 165 Q 335 150, 325 125 Q 318 142, 310 165"
          fill="#f1f5f9" stroke="#d1d5db" stroke-width="0.5"/>
      </svg>
    `
  },
];

// Category groupings
export const MOCKUP_CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '📦' },
  { id: 'apparel', name: 'Apparel', icon: '👕', types: ['tshirt-crew', 'tshirt-vneck', 'tshirt-long-sleeve', 'hoodie-pullover', 'hoodie-zip', 'sweatshirt', 'polo-shirt', 'tank-top'] },
  { id: 'accessories', name: 'Accessories', icon: '🧢', types: ['cap-baseball', 'cap-snapback', 'cap-trucker', 'beanie'] },
  { id: 'drinkware', name: 'Drinkware', icon: '☕', types: ['mug-standard', 'mug-tall', 'mug-travel'] },
  { id: 'bags', name: 'Bags', icon: '👜', types: ['tote-bag', 'drawstring-bag', 'backpack'] },
  { id: 'tech', name: 'Tech', icon: '📱', types: ['phone-case', 'laptop-sleeve'] },
  { id: 'print', name: 'Print', icon: '🖼️', types: ['poster', 'canvas-print', 'framed-print', 'business-card', 'letterhead', 'envelope'] },
  { id: 'stickers', name: 'Stickers', icon: '🏷️', types: ['sticker', 'badge', 'keychain'] },
]

// Helper function to get mockups by category
export function getMockupsByCategory(categoryId: string): ProductMockup[] {
  if (categoryId === 'all') return PRODUCT_MOCKUPS
  const category = MOCKUP_CATEGORIES.find(c => c.id === categoryId)
  if (!category || !category.types) return PRODUCT_MOCKUPS
  return PRODUCT_MOCKUPS.filter(m => category.types!.includes(m.type))
}

// Helper function to render SVG with product color
export function renderMockupSVG(mockup: ProductMockup, color: string): string {
  const colorObj = mockup.colors.find(c => c.id === color) || mockup.colors[0]
  return mockup.svgTemplate
    .replace(/class="product-body"/g, `fill="${colorObj.hex}" class="product-body"`)
    .replace(/currentColor/g, colorObj.textColor === 'light' ? '#ffffff' : '#1a1a1a')
}

// Helper to calculate design placement on curved surfaces
export function calculateCurvedPlacement(
  zone: DesignZone, 
  designWidth: number, 
  designHeight: number
): { transform: string; clipPath: string } {
  if (!zone.curved) {
    return { transform: '', clipPath: '' }
  }
  
  const curve = zone.curveAmount || 0.1
  // For curved surfaces, apply a slight perspective and curve
  return {
    transform: `perspective(500px) rotateY(${curve * 15}deg)`,
    clipPath: `polygon(
      ${curve * 10}% 0%, 
      100% ${curve * 5}%, 
      100% ${100 - curve * 5}%, 
      ${curve * 10}% 100%
    )`
  }
}
