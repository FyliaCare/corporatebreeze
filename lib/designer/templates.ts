// Designer Templates and Assets

import { Template, Asset } from './types'

export const TEMPLATES: Template[] = [
  // Mockup Templates - Using real product images from Unsplash
  {
    id: 'mockup_tshirt_white',
    name: 'White T-Shirt Mockup',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop',
    width: 2400,
    height: 3000,
    elements: [],
    mockupImage: '/mockups/tshirt-white.svg',
    printArea: { x: 280, y: 320, width: 240, height: 300 }
  },
  {
    id: 'mockup_tshirt_black',
    name: 'Black T-Shirt Mockup',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=300&fit=crop',
    width: 2400,
    height: 3000,
    elements: [],
    mockupImage: '/mockups/tshirt-black.svg',
    printArea: { x: 280, y: 320, width: 240, height: 300 }
  },
  {
    id: 'mockup_mug_white',
    name: 'White Coffee Mug',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop',
    width: 2000,
    height: 2000,
    elements: [],
    mockupImage: '/mockups/mug-white.svg',
    printArea: { x: 280, y: 320, width: 240, height: 200 }
  },
  {
    id: 'mockup_mug_color',
    name: 'Colored Mug',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=400&h=300&fit=crop',
    width: 2000,
    height: 2000,
    elements: [],
    mockupImage: '/mockups/mug-white.svg',
    printArea: { x: 280, y: 320, width: 240, height: 200 }
  },
  {
    id: 'mockup_pen',
    name: 'Pen Mockup',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400&h=300&fit=crop',
    width: 3000,
    height: 1000,
    elements: [],
    mockupImage: '/mockups/pen.svg',
    printArea: { x: 200, y: 80, width: 500, height: 40 }
  },
  {
    id: 'mockup_notebook',
    name: 'Notebook Mockup',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=300&fit=crop',
    width: 2100,
    height: 2970,
    elements: [],
    mockupImage: '/mockups/notebook.svg',
    printArea: { x: 150, y: 150, width: 300, height: 400 }
  },
  {
    id: 'mockup_phone_case',
    name: 'Phone Case',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=300&fit=crop',
    width: 1500,
    height: 3000,
    elements: [],
    mockupImage: '/mockups/phone-case.svg',
    printArea: { x: 80, y: 120, width: 240, height: 560 }
  },
  {
    id: 'mockup_tote_bag',
    name: 'Tote Bag',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1597633125097-5a9ae3a8a713?w=400&h=300&fit=crop',
    width: 2400,
    height: 2400,
    elements: [],
    mockupImage: '/mockups/tote-bag.svg',
    printArea: { x: 220, y: 350, width: 360, height: 400 }
  },
  {
    id: 'mockup_pillow',
    name: 'Throw Pillow',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1629949009765-40fc74c9ec21?w=400&h=300&fit=crop',
    width: 2000,
    height: 2000,
    elements: [],
    mockupImage: '/mockups/pillow.svg',
    printArea: { x: 220, y: 280, width: 360, height: 360 }
  },
  {
    id: 'mockup_sticker',
    name: 'Sticker Sheet',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    width: 2550,
    height: 3300,
    elements: [],
    mockupImage: '/mockups/sticker.svg',
    printArea: { x: 90, y: 340, width: 145, height: 145 }
  },
  {
    id: 'mockup_hoodie',
    name: 'Hoodie Mockup',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop',
    width: 2400,
    height: 3000,
    elements: [],
    mockupImage: '/mockups/hoodie.svg',
    printArea: { x: 280, y: 350, width: 240, height: 280 }
  },
  {
    id: 'mockup_cap',
    name: 'Baseball Cap',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=300&fit=crop',
    width: 2400,
    height: 2000,
    elements: [],
    mockupImage: '/mockups/cap.svg',
    printArea: { x: 350, y: 230, width: 200, height: 100 }
  },
  {
    id: 'mockup_polo_shirt',
    name: 'Polo Shirt',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1625910513413-5fc5ac80024b?w=400&h=300&fit=crop',
    width: 2400,
    height: 3000,
    elements: [],
    mockupImage: '/mockups/tshirt-white.svg',
    printArea: { x: 320, y: 280, width: 160, height: 120 }
  },
  {
    id: 'mockup_water_bottle',
    name: 'Water Bottle',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=300&fit=crop',
    width: 1200,
    height: 2400,
    elements: [],
    mockupImage: '/mockups/mug-white.svg',
    printArea: { x: 150, y: 400, width: 200, height: 300 }
  },
  {
    id: 'mockup_lanyard',
    name: 'ID Lanyard',
    category: 'mockups',
    thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    width: 400,
    height: 1200,
    elements: [],
    mockupImage: '/mockups/pen.svg',
    printArea: { x: 50, y: 100, width: 300, height: 80 }
  },
  
  // Business Cards
  {
    id: 'bc_classic',
    name: 'Classic Business Card',
    category: 'business-cards',
    thumbnail: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=300&fit=crop',
    width: 1050,
    height: 600,
    elements: []
  },
  {
    id: 'bc_modern',
    name: 'Modern Business Card',
    category: 'business-cards',
    thumbnail: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    width: 1050,
    height: 600,
    elements: []
  },
  {
    id: 'bc_minimal',
    name: 'Minimal Business Card',
    category: 'business-cards',
    thumbnail: 'https://images.unsplash.com/photo-1594822072103-4fa15cd5a6a4?w=400&h=300&fit=crop',
    width: 1050,
    height: 600,
    elements: []
  },
  
  // Flyers & Brochures
  {
    id: 'flyer_event',
    name: 'Event Flyer',
    category: 'flyers',
    thumbnail: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
    width: 2550,
    height: 3300,
    elements: []
  },
  {
    id: 'flyer_sale',
    name: 'Sale Flyer',
    category: 'flyers',
    thumbnail: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400&h=300&fit=crop',
    width: 2550,
    height: 3300,
    elements: []
  },
  {
    id: 'brochure_trifold',
    name: 'Tri-fold Brochure',
    category: 'flyers',
    thumbnail: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=300&fit=crop',
    width: 3300,
    height: 2550,
    elements: []
  },
  
  // Banners & Signage
  {
    id: 'banner_rollup',
    name: 'Roll-up Banner',
    category: 'banners',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    width: 850,
    height: 2000,
    elements: []
  },
  {
    id: 'banner_outdoor',
    name: 'Outdoor Banner',
    category: 'banners',
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop',
    width: 2400,
    height: 800,
    elements: []
  },
  
  // Posters
  {
    id: 'poster_event',
    name: 'Event Poster',
    category: 'posters',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    width: 2400,
    height: 3600,
    elements: []
  },
  {
    id: 'poster_promo',
    name: 'Promotional Poster',
    category: 'posters',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    width: 2400,
    height: 3600,
    elements: []
  },
  
  // Logos
  {
    id: 'logo_template',
    name: 'Logo Design',
    category: 'logos',
    thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop',
    width: 1000,
    height: 1000,
    elements: []
  }
]

export const TEMPLATE_CATEGORIES = [
  { id: 'all', name: 'All Templates', icon: '📦' },
  { id: 'mockups', name: 'Product Mockups', icon: '👕' },
  { id: 'business-cards', name: 'Business Cards', icon: '💼' },
  { id: 'flyers', name: 'Flyers & Brochures', icon: '📄' },
  { id: 'banners', name: 'Banners & Signage', icon: '🪧' },
  { id: 'posters', name: 'Posters', icon: '🎭' },
  { id: 'logos', name: 'Logos', icon: '✨' }
]

export const FONTS = [
  'Inter',
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Georgia',
  'Courier New',
  'Verdana',
  'Trebuchet MS',
  'Impact',
  'Comic Sans MS',
  'Palatino',
  'Garamond',
  'Bookman',
  'Arial Black',
  'Tahoma'
]

export const FONT_WEIGHTS = [
  { value: 100, label: 'Thin' },
  { value: 200, label: 'Extra Light' },
  { value: 300, label: 'Light' },
  { value: 400, label: 'Regular' },
  { value: 500, label: 'Medium' },
  { value: 600, label: 'Semi Bold' },
  { value: 700, label: 'Bold' },
  { value: 800, label: 'Extra Bold' },
  { value: 900, label: 'Black' }
]

export const COLOR_PALETTES = [
  {
    name: 'Professional',
    colors: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE']
  },
  {
    name: 'Vibrant',
    colors: ['#DC2626', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6']
  },
  {
    name: 'Monochrome',
    colors: ['#000000', '#404040', '#808080', '#C0C0C0', '#FFFFFF']
  },
  {
    name: 'Warm Sunset',
    colors: ['#991B1B', '#DC2626', '#F97316', '#FBBF24', '#FDE047']
  },
  {
    name: 'Cool Ocean',
    colors: ['#075985', '#0284C7', '#06B6D4', '#22D3EE', '#A5F3FC']
  },
  {
    name: 'Pastel Dreams',
    colors: ['#FCA5A5', '#FCD34D', '#86EFAC', '#93C5FD', '#DDD6FE']
  },
  {
    name: 'Earth Tones',
    colors: ['#78350F', '#92400E', '#A16207', '#65A30D', '#15803D']
  },
  {
    name: 'Neon Lights',
    colors: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF0080', '#00FF80']
  }
]

export const BRAND_COLORS = [
  { name: 'Primary', color: '#3B82F6' },
  { name: 'Secondary', color: '#8B5CF6' },
  { name: 'Accent', color: '#F59E0B' },
  { name: 'Success', color: '#10B981' },
  { name: 'Danger', color: '#EF4444' },
  { name: 'Warning', color: '#F97316' },
  { name: 'Info', color: '#06B6D4' },
  { name: 'Dark', color: '#1F2937' }
]

export const ASSETS: Asset[] = [
  {
    id: 'icon_star',
    type: 'icon',
    name: 'Star',
    url: '⭐',
    category: 'shapes',
    tags: ['star', 'favorite', 'rating']
  },
  {
    id: 'icon_heart',
    type: 'icon',
    name: 'Heart',
    url: '❤️',
    category: 'shapes',
    tags: ['heart', 'love', 'favorite']
  },
  {
    id: 'icon_check',
    type: 'icon',
    name: 'Checkmark',
    url: '✓',
    category: 'symbols',
    tags: ['check', 'done', 'complete']
  },
  {
    id: 'icon_arrow',
    type: 'icon',
    name: 'Arrow',
    url: '→',
    category: 'symbols',
    tags: ['arrow', 'direction', 'next']
  }
]
