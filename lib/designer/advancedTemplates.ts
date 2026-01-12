/**
 * Advanced Template System
 * Comprehensive template library with industry-specific designs
 */

import { CanvasElement } from './types'

// Template metadata
export interface AdvancedTemplate {
  id: string
  name: string
  description: string
  category: TemplateCategory
  subcategory?: string
  industry?: Industry
  thumbnail: string // URL or base64
  preview?: string // Larger preview image
  width: number
  height: number
  elements: CanvasElement[]
  tags: string[]
  isPremium: boolean
  isNew: boolean
  isTrending: boolean
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime: string // e.g., "5 mins"
  downloads: number
  rating: number
  author: string
  createdAt: string
  updatedAt: string
  colors: string[] // Primary colors used
  fonts: string[] // Fonts used
  printArea?: { x: number; y: number; width: number; height: number }
  mockupImage?: string
}

export type TemplateCategory = 
  | 'business'
  | 'social-media'
  | 'marketing'
  | 'print'
  | 'branding'
  | 'events'
  | 'education'
  | 'ecommerce'
  | 'mockups'
  | 'presentations'
  | 'documents'
  | 'web';

export type Industry =
  | 'technology'
  | 'healthcare'
  | 'finance'
  | 'education'
  | 'retail'
  | 'food-beverage'
  | 'real-estate'
  | 'fitness'
  | 'beauty'
  | 'automotive'
  | 'hospitality'
  | 'legal'
  | 'nonprofit'
  | 'creative';

export interface TemplateCollection {
  id: string
  name: string
  description: string
  templates: string[] // Template IDs
  thumbnail: string
  isPremium: boolean
}

export interface TemplateFilter {
  category?: TemplateCategory
  industry?: Industry
  isPremium?: boolean
  isNew?: boolean
  isTrending?: boolean
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  minRating?: number
  tags?: string[]
  searchQuery?: string
}

// Category definitions with subcategories
export const TEMPLATE_CATEGORIES_ADVANCED = [
  {
    id: 'business' as TemplateCategory,
    name: 'Business',
    icon: '💼',
    description: 'Professional business materials',
    subcategories: [
      { id: 'business-cards', name: 'Business Cards' },
      { id: 'letterheads', name: 'Letterheads' },
      { id: 'invoices', name: 'Invoices' },
      { id: 'proposals', name: 'Proposals' },
      { id: 'reports', name: 'Reports' },
      { id: 'presentations', name: 'Presentations' }
    ]
  },
  {
    id: 'social-media' as TemplateCategory,
    name: 'Social Media',
    icon: '📱',
    description: 'Social media content',
    subcategories: [
      { id: 'instagram-post', name: 'Instagram Post' },
      { id: 'instagram-story', name: 'Instagram Story' },
      { id: 'instagram-reel', name: 'Instagram Reel Cover' },
      { id: 'facebook-post', name: 'Facebook Post' },
      { id: 'facebook-cover', name: 'Facebook Cover' },
      { id: 'twitter-post', name: 'Twitter Post' },
      { id: 'twitter-header', name: 'Twitter Header' },
      { id: 'linkedin-post', name: 'LinkedIn Post' },
      { id: 'linkedin-banner', name: 'LinkedIn Banner' },
      { id: 'youtube-thumbnail', name: 'YouTube Thumbnail' },
      { id: 'pinterest-pin', name: 'Pinterest Pin' },
      { id: 'tiktok-video', name: 'TikTok Video Cover' }
    ]
  },
  {
    id: 'marketing' as TemplateCategory,
    name: 'Marketing',
    icon: '📊',
    description: 'Marketing materials',
    subcategories: [
      { id: 'flyers', name: 'Flyers' },
      { id: 'brochures', name: 'Brochures' },
      { id: 'posters', name: 'Posters' },
      { id: 'banners', name: 'Banners' },
      { id: 'email-headers', name: 'Email Headers' },
      { id: 'ads', name: 'Advertisements' },
      { id: 'infographics', name: 'Infographics' }
    ]
  },
  {
    id: 'print' as TemplateCategory,
    name: 'Print Materials',
    icon: '🖨️',
    description: 'Print-ready designs',
    subcategories: [
      { id: 'postcards', name: 'Postcards' },
      { id: 'greeting-cards', name: 'Greeting Cards' },
      { id: 'invitations', name: 'Invitations' },
      { id: 'menus', name: 'Menus' },
      { id: 'catalogs', name: 'Catalogs' },
      { id: 'labels', name: 'Labels' },
      { id: 'stickers', name: 'Stickers' },
      { id: 'booklets', name: 'Booklets' }
    ]
  },
  {
    id: 'branding' as TemplateCategory,
    name: 'Branding',
    icon: '✨',
    description: 'Brand identity materials',
    subcategories: [
      { id: 'logos', name: 'Logos' },
      { id: 'brand-kits', name: 'Brand Kits' },
      { id: 'style-guides', name: 'Style Guides' },
      { id: 'mood-boards', name: 'Mood Boards' }
    ]
  },
  {
    id: 'events' as TemplateCategory,
    name: 'Events',
    icon: '🎉',
    description: 'Event materials',
    subcategories: [
      { id: 'tickets', name: 'Tickets' },
      { id: 'badges', name: 'Badges' },
      { id: 'programs', name: 'Programs' },
      { id: 'banners', name: 'Event Banners' },
      { id: 'signage', name: 'Signage' }
    ]
  },
  {
    id: 'mockups' as TemplateCategory,
    name: 'Product Mockups',
    icon: '🎨',
    description: 'Product visualization',
    subcategories: [
      { id: 'apparel', name: 'Apparel' },
      { id: 'packaging', name: 'Packaging' },
      { id: 'stationery', name: 'Stationery' },
      { id: 'devices', name: 'Devices' },
      { id: 'merchandise', name: 'Merchandise' }
    ]
  },
  {
    id: 'ecommerce' as TemplateCategory,
    name: 'E-Commerce',
    icon: '🛍️',
    description: 'Online store graphics',
    subcategories: [
      { id: 'product-images', name: 'Product Images' },
      { id: 'banners', name: 'Store Banners' },
      { id: 'promo-graphics', name: 'Promo Graphics' },
      { id: 'packaging', name: 'Packaging Labels' }
    ]
  }
]

// Industry-specific templates
export const INDUSTRIES = [
  { id: 'technology' as Industry, name: 'Technology', icon: '💻' },
  { id: 'healthcare' as Industry, name: 'Healthcare', icon: '🏥' },
  { id: 'finance' as Industry, name: 'Finance', icon: '💰' },
  { id: 'education' as Industry, name: 'Education', icon: '🎓' },
  { id: 'retail' as Industry, name: 'Retail', icon: '🛒' },
  { id: 'food-beverage' as Industry, name: 'Food & Beverage', icon: '🍔' },
  { id: 'real-estate' as Industry, name: 'Real Estate', icon: '🏠' },
  { id: 'fitness' as Industry, name: 'Fitness', icon: '💪' },
  { id: 'beauty' as Industry, name: 'Beauty', icon: '💄' },
  { id: 'automotive' as Industry, name: 'Automotive', icon: '🚗' },
  { id: 'hospitality' as Industry, name: 'Hospitality', icon: '🏨' },
  { id: 'legal' as Industry, name: 'Legal', icon: '⚖️' },
  { id: 'nonprofit' as Industry, name: 'Non-Profit', icon: '❤️' },
  { id: 'creative' as Industry, name: 'Creative', icon: '🎨' }
]

// Pre-built template library
export const ADVANCED_TEMPLATES: AdvancedTemplate[] = [
  // Business Cards
  {
    id: 'bc-modern-tech',
    name: 'Modern Tech Business Card',
    description: 'Sleek and professional business card for tech companies',
    category: 'business',
    subcategory: 'business-cards',
    industry: 'technology',
    thumbnail: '💼',
    width: 1050,
    height: 600,
    elements: [],
    tags: ['business card', 'modern', 'tech', 'professional', 'minimalist'],
    isPremium: false,
    isNew: true,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '5 mins',
    downloads: 12543,
    rating: 4.8,
    author: 'Design Team',
    createdAt: '2026-01-01',
    updatedAt: '2026-01-10',
    colors: ['#3B82F6', '#1E40AF', '#FFFFFF', '#F3F4F6'],
    fonts: ['Inter', 'Poppins']
  },
  {
    id: 'bc-elegant-law',
    name: 'Elegant Law Firm Card',
    description: 'Sophisticated business card for legal professionals',
    category: 'business',
    subcategory: 'business-cards',
    industry: 'legal',
    thumbnail: '⚖️',
    width: 1050,
    height: 600,
    elements: [],
    tags: ['business card', 'elegant', 'law', 'professional', 'gold'],
    isPremium: true,
    isNew: false,
    isTrending: true,
    difficulty: 'intermediate',
    estimatedTime: '10 mins',
    downloads: 8234,
    rating: 4.9,
    author: 'Premium Studio',
    createdAt: '2025-12-15',
    updatedAt: '2026-01-05',
    colors: ['#1F2937', '#D4AF37', '#FFFFFF'],
    fonts: ['Playfair Display', 'Lato']
  },
  
  // Instagram Posts
  {
    id: 'ig-food-promo',
    name: 'Restaurant Promo Post',
    description: 'Eye-catching Instagram post for food businesses',
    category: 'social-media',
    subcategory: 'instagram-post',
    industry: 'food-beverage',
    thumbnail: '🍔',
    width: 1080,
    height: 1080,
    elements: [],
    tags: ['instagram', 'food', 'restaurant', 'promo', 'vibrant'],
    isPremium: false,
    isNew: true,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '8 mins',
    downloads: 25431,
    rating: 4.7,
    author: 'Social Media Team',
    createdAt: '2026-01-08',
    updatedAt: '2026-01-10',
    colors: ['#EF4444', '#F59E0B', '#FFFFFF', '#1F2937'],
    fonts: ['Montserrat', 'Open Sans']
  },
  {
    id: 'ig-fitness-quote',
    name: 'Fitness Motivation Post',
    description: 'Motivational quote post for fitness brands',
    category: 'social-media',
    subcategory: 'instagram-post',
    industry: 'fitness',
    thumbnail: '💪',
    width: 1080,
    height: 1080,
    elements: [],
    tags: ['instagram', 'fitness', 'motivation', 'quote', 'bold'],
    isPremium: false,
    isNew: false,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '5 mins',
    downloads: 18762,
    rating: 4.6,
    author: 'Fitness Creative',
    createdAt: '2025-12-20',
    updatedAt: '2026-01-01',
    colors: ['#10B981', '#059669', '#FFFFFF', '#111827'],
    fonts: ['Bebas Neue', 'Roboto']
  },
  
  // Marketing Materials
  {
    id: 'flyer-real-estate',
    name: 'Modern Real Estate Flyer',
    description: 'Professional property listing flyer',
    category: 'marketing',
    subcategory: 'flyers',
    industry: 'real-estate',
    thumbnail: '🏠',
    width: 2550,
    height: 3300,
    elements: [],
    tags: ['flyer', 'real estate', 'property', 'modern', 'professional'],
    isPremium: true,
    isNew: true,
    isTrending: true,
    difficulty: 'intermediate',
    estimatedTime: '15 mins',
    downloads: 9876,
    rating: 4.9,
    author: 'Real Estate Design Co',
    createdAt: '2026-01-05',
    updatedAt: '2026-01-09',
    colors: ['#3B82F6', '#1E40AF', '#F3F4F6', '#1F2937'],
    fonts: ['Raleway', 'Lato']
  },
  {
    id: 'poster-event-concert',
    name: 'Concert Event Poster',
    description: 'Vibrant poster for music events',
    category: 'marketing',
    subcategory: 'posters',
    industry: 'creative',
    thumbnail: '🎭',
    width: 2400,
    height: 3600,
    elements: [],
    tags: ['poster', 'event', 'concert', 'music', 'vibrant'],
    isPremium: false,
    isNew: false,
    isTrending: true,
    difficulty: 'advanced',
    estimatedTime: '20 mins',
    downloads: 15234,
    rating: 4.8,
    author: 'Event Design Studio',
    createdAt: '2025-11-15',
    updatedAt: '2026-01-03',
    colors: ['#8B5CF6', '#EC4899', '#F59E0B', '#1F2937'],
    fonts: ['Bebas Neue', 'Oswald', 'Roboto']
  },
  
  // Social Media Stories
  {
    id: 'ig-story-beauty',
    name: 'Beauty Product Story',
    description: 'Elegant Instagram story for beauty brands',
    category: 'social-media',
    subcategory: 'instagram-story',
    industry: 'beauty',
    thumbnail: '💄',
    width: 1080,
    height: 1920,
    elements: [],
    tags: ['instagram', 'story', 'beauty', 'elegant', 'minimal'],
    isPremium: true,
    isNew: true,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '7 mins',
    downloads: 31245,
    rating: 4.9,
    author: 'Beauty Collective',
    createdAt: '2026-01-07',
    updatedAt: '2026-01-10',
    colors: ['#EC4899', '#F9A8D4', '#FFFFFF', '#FDF2F8'],
    fonts: ['Playfair Display', 'Montserrat']
  },
  
  // E-commerce
  {
    id: 'ecom-sale-banner',
    name: 'Flash Sale Banner',
    description: 'Attention-grabbing sale banner for online stores',
    category: 'ecommerce',
    subcategory: 'banners',
    industry: 'retail',
    thumbnail: '🛍️',
    width: 1920,
    height: 600,
    elements: [],
    tags: ['banner', 'sale', 'ecommerce', 'promo', 'discount'],
    isPremium: false,
    isNew: false,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '10 mins',
    downloads: 22341,
    rating: 4.7,
    author: 'E-Commerce Templates',
    createdAt: '2025-12-01',
    updatedAt: '2026-01-02',
    colors: ['#EF4444', '#DC2626', '#FEE2E2', '#1F2937'],
    fonts: ['Impact', 'Roboto']
  },
  
  // Logos
  {
    id: 'logo-startup-tech',
    name: 'Tech Startup Logo',
    description: 'Modern minimalist logo for tech startups',
    category: 'branding',
    subcategory: 'logos',
    industry: 'technology',
    thumbnail: '✨',
    width: 1000,
    height: 1000,
    elements: [],
    tags: ['logo', 'tech', 'startup', 'modern', 'minimalist'],
    isPremium: true,
    isNew: true,
    isTrending: true,
    difficulty: 'advanced',
    estimatedTime: '30 mins',
    downloads: 7856,
    rating: 4.9,
    author: 'Brand Masters',
    createdAt: '2026-01-03',
    updatedAt: '2026-01-09',
    colors: ['#3B82F6', '#1E40AF', '#FFFFFF'],
    fonts: ['Montserrat', 'Inter']
  },
  
  // Product Mockups
  {
    id: 'mockup-tshirt-streetwear',
    name: 'Streetwear T-Shirt Mockup',
    description: 'Urban streetwear t-shirt mockup',
    category: 'mockups',
    subcategory: 'apparel',
    industry: 'retail',
    thumbnail: '👕',
    width: 2400,
    height: 3000,
    elements: [],
    tags: ['mockup', 'tshirt', 'apparel', 'streetwear', 'fashion'],
    isPremium: false,
    isNew: false,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '10 mins',
    downloads: 34562,
    rating: 4.8,
    author: 'Mockup Factory',
    createdAt: '2025-10-15',
    updatedAt: '2026-01-01',
    colors: ['#1F2937', '#FFFFFF'],
    fonts: [],
    mockupImage: '/mockups/tshirt-streetwear.svg',
    printArea: { x: 280, y: 320, width: 240, height: 300 }
  },
  {
    id: 'mockup-coffee-cup',
    name: 'Premium Coffee Cup Mockup',
    description: 'High-quality coffee cup mockup for cafes',
    category: 'mockups',
    subcategory: 'packaging',
    industry: 'food-beverage',
    thumbnail: '☕',
    width: 2000,
    height: 2000,
    elements: [],
    tags: ['mockup', 'coffee', 'cup', 'packaging', 'cafe'],
    isPremium: true,
    isNew: true,
    isTrending: true,
    difficulty: 'beginner',
    estimatedTime: '8 mins',
    downloads: 19234,
    rating: 4.9,
    author: 'Cafe Creative',
    createdAt: '2026-01-06',
    updatedAt: '2026-01-10',
    colors: ['#78350F', '#FFFFFF'],
    fonts: [],
    mockupImage: '/mockups/coffee-cup.svg',
    printArea: { x: 280, y: 320, width: 240, height: 200 }
  },
  
  // YouTube Thumbnails
  {
    id: 'yt-tech-review',
    name: 'Tech Review Thumbnail',
    description: 'Eye-catching thumbnail for tech review videos',
    category: 'social-media',
    subcategory: 'youtube-thumbnail',
    industry: 'technology',
    thumbnail: '📺',
    width: 1280,
    height: 720,
    elements: [],
    tags: ['youtube', 'thumbnail', 'tech', 'review', 'bold'],
    isPremium: false,
    isNew: true,
    isTrending: true,
    difficulty: 'intermediate',
    estimatedTime: '12 mins',
    downloads: 27654,
    rating: 4.8,
    author: 'YouTube Creators',
    createdAt: '2026-01-04',
    updatedAt: '2026-01-09',
    colors: ['#EF4444', '#3B82F6', '#FFFFFF', '#111827'],
    fonts: ['Impact', 'Roboto Condensed']
  },
  
  // Email Headers
  {
    id: 'email-newsletter-health',
    name: 'Healthcare Newsletter Header',
    description: 'Professional email header for healthcare newsletters',
    category: 'marketing',
    subcategory: 'email-headers',
    industry: 'healthcare',
    thumbnail: '🏥',
    width: 1200,
    height: 400,
    elements: [],
    tags: ['email', 'newsletter', 'healthcare', 'medical', 'professional'],
    isPremium: true,
    isNew: false,
    isTrending: false,
    difficulty: 'beginner',
    estimatedTime: '8 mins',
    downloads: 5432,
    rating: 4.6,
    author: 'Healthcare Design',
    createdAt: '2025-12-10',
    updatedAt: '2025-12-28',
    colors: ['#06B6D4', '#0891B2', '#FFFFFF', '#F0FDFA'],
    fonts: ['Lato', 'Open Sans']
  }
]

// Template collections/bundles
export const TEMPLATE_COLLECTIONS: TemplateCollection[] = [
  {
    id: 'startup-essentials',
    name: 'Startup Essentials Pack',
    description: 'Complete branding pack for startups',
    templates: ['bc-modern-tech', 'logo-startup-tech', 'ig-food-promo'],
    thumbnail: '🚀',
    isPremium: true
  },
  {
    id: 'social-media-bundle',
    name: 'Social Media Content Bundle',
    description: '30+ social media templates for all platforms',
    templates: ['ig-food-promo', 'ig-fitness-quote', 'ig-story-beauty', 'yt-tech-review'],
    thumbnail: '📱',
    isPremium: true
  },
  {
    id: 'restaurant-marketing',
    name: 'Restaurant Marketing Kit',
    description: 'Everything you need for restaurant marketing',
    templates: ['ig-food-promo', 'flyer-real-estate', 'mockup-coffee-cup'],
    thumbnail: '🍔',
    isPremium: false
  }
]

// Template search and filter functions
export function filterTemplates(
  templates: AdvancedTemplate[],
  filter: TemplateFilter
): AdvancedTemplate[] {
  return templates.filter(template => {
    if (filter.category && template.category !== filter.category) return false
    if (filter.industry && template.industry !== filter.industry) return false
    if (filter.isPremium !== undefined && template.isPremium !== filter.isPremium) return false
    if (filter.isNew !== undefined && template.isNew !== filter.isNew) return false
    if (filter.isTrending !== undefined && template.isTrending !== filter.isTrending) return false
    if (filter.difficulty && template.difficulty !== filter.difficulty) return false
    if (filter.minRating && template.rating < filter.minRating) return false
    
    if (filter.tags && filter.tags.length > 0) {
      const hasAllTags = filter.tags.every(tag => 
        template.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
      )
      if (!hasAllTags) return false
    }
    
    if (filter.searchQuery) {
      const query = filter.searchQuery.toLowerCase()
      const matchesSearch = 
        template.name.toLowerCase().includes(query) ||
        template.description.toLowerCase().includes(query) ||
        template.tags.some(tag => tag.toLowerCase().includes(query))
      if (!matchesSearch) return false
    }
    
    return true
  })
}

export function sortTemplates(
  templates: AdvancedTemplate[],
  sortBy: 'popular' | 'newest' | 'rating' | 'name'
): AdvancedTemplate[] {
  const sorted = [...templates]
  
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.downloads - a.downloads)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return sorted
  }
}

export function searchTemplates(
  templates: AdvancedTemplate[],
  query: string
): AdvancedTemplate[] {
  if (!query.trim()) return templates
  
  const lowerQuery = query.toLowerCase()
  return templates.filter(template =>
    template.name.toLowerCase().includes(lowerQuery) ||
    template.description.toLowerCase().includes(lowerQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    template.category.toLowerCase().includes(lowerQuery) ||
    template.industry?.toLowerCase().includes(lowerQuery)
  )
}

export function getTemplatesByCategory(
  templates: AdvancedTemplate[],
  category: TemplateCategory
): AdvancedTemplate[] {
  return templates.filter(t => t.category === category)
}

export function getTemplatesByIndustry(
  templates: AdvancedTemplate[],
  industry: Industry
): AdvancedTemplate[] {
  return templates.filter(t => t.industry === industry)
}

export function getTrendingTemplates(
  templates: AdvancedTemplate[],
  limit: number = 10
): AdvancedTemplate[] {
  return templates
    .filter(t => t.isTrending)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, limit)
}

export function getNewTemplates(
  templates: AdvancedTemplate[],
  limit: number = 10
): AdvancedTemplate[] {
  return templates
    .filter(t => t.isNew)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

export function getPremiumTemplates(templates: AdvancedTemplate[]): AdvancedTemplate[] {
  return templates.filter(t => t.isPremium)
}

export function getFreeTemplates(templates: AdvancedTemplate[]): AdvancedTemplate[] {
  return templates.filter(t => !t.isPremium)
}

// Export everything
export default {
  TEMPLATE_CATEGORIES_ADVANCED,
  INDUSTRIES,
  ADVANCED_TEMPLATES,
  TEMPLATE_COLLECTIONS,
  filterTemplates,
  sortTemplates,
  searchTemplates,
  getTemplatesByCategory,
  getTemplatesByIndustry,
  getTrendingTemplates,
  getNewTemplates,
  getPremiumTemplates,
  getFreeTemplates
}
