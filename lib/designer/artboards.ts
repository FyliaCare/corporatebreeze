/**
 * Artboards & Pages System
 * Professional multi-artboard management like Illustrator/Figma
 */

import { CanvasElement, CanvasState } from './types';

// Artboard definition
export interface Artboard {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;  // Position in the infinite canvas
  y: number;
  backgroundColor: string;
  elements: string[];  // Element IDs belonging to this artboard
  order: number;  // Display order in the artboard list
  isLocked: boolean;
  isVisible: boolean;
}

// Page definition (collection of artboards)
export interface Page {
  id: string;
  name: string;
  artboards: Artboard[];
  order: number;
}

// Document structure
export interface Document {
  id: string;
  name: string;
  pages: Page[];
  activePageId: string;
  activeArtboardId: string | null;
  created: Date;
  modified: Date;
}

// Common artboard presets
export interface ArtboardPreset {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  description?: string;
}

// Preset categories
export const ARTBOARD_CATEGORIES = [
  { id: 'social', name: 'Social Media', icon: '📱' },
  { id: 'print', name: 'Print', icon: '🖨️' },
  { id: 'web', name: 'Web', icon: '🌐' },
  { id: 'device', name: 'Devices', icon: '💻' },
  { id: 'presentation', name: 'Presentation', icon: '📊' },
  { id: 'video', name: 'Video', icon: '🎬' },
  { id: 'custom', name: 'Custom', icon: '✏️' }
] as const;

// Common artboard presets
export const ARTBOARD_PRESETS: ArtboardPreset[] = [
  // Social Media
  { id: 'instagram-post', name: 'Instagram Post', category: 'social', width: 1080, height: 1080, description: 'Square post' },
  { id: 'instagram-story', name: 'Instagram Story', category: 'social', width: 1080, height: 1920, description: 'Full screen vertical' },
  { id: 'instagram-reel', name: 'Instagram Reel', category: 'social', width: 1080, height: 1920, description: '9:16 video' },
  { id: 'facebook-post', name: 'Facebook Post', category: 'social', width: 1200, height: 630, description: 'Link preview' },
  { id: 'facebook-cover', name: 'Facebook Cover', category: 'social', width: 820, height: 312, description: 'Profile cover' },
  { id: 'twitter-post', name: 'Twitter/X Post', category: 'social', width: 1200, height: 675, description: 'Image post' },
  { id: 'twitter-header', name: 'Twitter/X Header', category: 'social', width: 1500, height: 500, description: 'Profile header' },
  { id: 'linkedin-post', name: 'LinkedIn Post', category: 'social', width: 1200, height: 627, description: 'Feed post' },
  { id: 'linkedin-cover', name: 'LinkedIn Cover', category: 'social', width: 1584, height: 396, description: 'Profile cover' },
  { id: 'youtube-thumbnail', name: 'YouTube Thumbnail', category: 'social', width: 1280, height: 720, description: 'Video thumbnail' },
  { id: 'tiktok-video', name: 'TikTok Video', category: 'social', width: 1080, height: 1920, description: 'Full screen vertical' },
  { id: 'pinterest-pin', name: 'Pinterest Pin', category: 'social', width: 1000, height: 1500, description: '2:3 ratio' },
  
  // Print
  { id: 'a4', name: 'A4', category: 'print', width: 2480, height: 3508, description: '210 × 297 mm at 300 DPI' },
  { id: 'a3', name: 'A3', category: 'print', width: 3508, height: 4961, description: '297 × 420 mm at 300 DPI' },
  { id: 'a5', name: 'A5', category: 'print', width: 1748, height: 2480, description: '148 × 210 mm at 300 DPI' },
  { id: 'letter', name: 'US Letter', category: 'print', width: 2550, height: 3300, description: '8.5 × 11 in at 300 DPI' },
  { id: 'legal', name: 'US Legal', category: 'print', width: 2550, height: 4200, description: '8.5 × 14 in at 300 DPI' },
  { id: 'tabloid', name: 'Tabloid', category: 'print', width: 3300, height: 5100, description: '11 × 17 in at 300 DPI' },
  { id: 'business-card', name: 'Business Card', category: 'print', width: 1050, height: 600, description: '3.5 × 2 in at 300 DPI' },
  { id: 'postcard', name: 'Postcard', category: 'print', width: 1800, height: 1200, description: '6 × 4 in at 300 DPI' },
  { id: 'flyer', name: 'Flyer', category: 'print', width: 2550, height: 3300, description: 'Standard flyer' },
  { id: 'poster-18x24', name: 'Poster 18×24', category: 'print', width: 5400, height: 7200, description: '18 × 24 in at 300 DPI' },
  { id: 'poster-24x36', name: 'Poster 24×36', category: 'print', width: 7200, height: 10800, description: '24 × 36 in at 300 DPI' },
  
  // Web
  { id: 'web-1920', name: 'Web 1920×1080', category: 'web', width: 1920, height: 1080, description: 'Full HD desktop' },
  { id: 'web-1440', name: 'Web 1440×900', category: 'web', width: 1440, height: 900, description: 'Standard desktop' },
  { id: 'web-1366', name: 'Web 1366×768', category: 'web', width: 1366, height: 768, description: 'Laptop' },
  { id: 'web-banner-728', name: 'Leaderboard', category: 'web', width: 728, height: 90, description: 'Ad banner' },
  { id: 'web-banner-300', name: 'Medium Rectangle', category: 'web', width: 300, height: 250, description: 'Ad banner' },
  { id: 'web-banner-160', name: 'Wide Skyscraper', category: 'web', width: 160, height: 600, description: 'Sidebar ad' },
  { id: 'email-header', name: 'Email Header', category: 'web', width: 600, height: 200, description: 'Newsletter header' },
  { id: 'favicon', name: 'Favicon', category: 'web', width: 512, height: 512, description: 'Website icon' },
  
  // Devices
  { id: 'iphone-15-pro', name: 'iPhone 15 Pro', category: 'device', width: 1179, height: 2556, description: '393 × 852 @3x' },
  { id: 'iphone-se', name: 'iPhone SE', category: 'device', width: 750, height: 1334, description: '375 × 667 @2x' },
  { id: 'ipad-pro-12', name: 'iPad Pro 12.9"', category: 'device', width: 2048, height: 2732, description: '1024 × 1366 @2x' },
  { id: 'ipad-10', name: 'iPad 10th Gen', category: 'device', width: 1640, height: 2360, description: '820 × 1180 @2x' },
  { id: 'android-phone', name: 'Android Phone', category: 'device', width: 1080, height: 2340, description: 'Standard Android' },
  { id: 'android-tablet', name: 'Android Tablet', category: 'device', width: 1600, height: 2560, description: '10" tablet' },
  { id: 'macbook-pro', name: 'MacBook Pro', category: 'device', width: 2880, height: 1800, description: '15" Retina' },
  { id: 'imac-24', name: 'iMac 24"', category: 'device', width: 4480, height: 2520, description: '4.5K Retina' },
  { id: 'apple-watch', name: 'Apple Watch', category: 'device', width: 396, height: 484, description: '45mm' },
  
  // Presentation
  { id: 'presentation-16-9', name: 'Presentation 16:9', category: 'presentation', width: 1920, height: 1080, description: 'Widescreen' },
  { id: 'presentation-4-3', name: 'Presentation 4:3', category: 'presentation', width: 1024, height: 768, description: 'Standard' },
  { id: 'keynote', name: 'Keynote', category: 'presentation', width: 1920, height: 1080, description: 'Apple Keynote' },
  { id: 'powerpoint', name: 'PowerPoint', category: 'presentation', width: 1920, height: 1080, description: 'Microsoft PPT' },
  
  // Video
  { id: 'video-4k', name: '4K UHD', category: 'video', width: 3840, height: 2160, description: '16:9 Ultra HD' },
  { id: 'video-1080p', name: '1080p Full HD', category: 'video', width: 1920, height: 1080, description: '16:9 Full HD' },
  { id: 'video-720p', name: '720p HD', category: 'video', width: 1280, height: 720, description: '16:9 HD' },
  { id: 'video-vertical', name: 'Vertical Video', category: 'video', width: 1080, height: 1920, description: '9:16 Stories/Reels' },
  { id: 'video-square', name: 'Square Video', category: 'video', width: 1080, height: 1080, description: '1:1 Square' },
];

// Artboard Manager
export class ArtboardManager {
  // Create a new artboard
  static createArtboard(
    name: string,
    width: number,
    height: number,
    x: number = 0,
    y: number = 0,
    backgroundColor: string = '#FFFFFF'
  ): Artboard {
    return {
      id: `artboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      width,
      height,
      x,
      y,
      backgroundColor,
      elements: [],
      order: 0,
      isLocked: false,
      isVisible: true
    };
  }

  // Create artboard from preset
  static createFromPreset(preset: ArtboardPreset, x: number = 0, y: number = 0): Artboard {
    return this.createArtboard(preset.name, preset.width, preset.height, x, y);
  }

  // Create a new page
  static createPage(name: string): Page {
    return {
      id: `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      artboards: [],
      order: 0
    };
  }

  // Create a new document
  static createDocument(name: string): Document {
    const page = this.createPage('Page 1');
    return {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      pages: [page],
      activePageId: page.id,
      activeArtboardId: null,
      created: new Date(),
      modified: new Date()
    };
  }

  // Get presets by category
  static getPresetsByCategory(category: string): ArtboardPreset[] {
    return ARTBOARD_PRESETS.filter(p => p.category === category);
  }

  // Duplicate artboard
  static duplicateArtboard(artboard: Artboard, offsetX: number = 50, offsetY: number = 0): Artboard {
    return {
      ...artboard,
      id: `artboard-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: `${artboard.name} copy`,
      x: artboard.x + artboard.width + offsetX,
      y: artboard.y + offsetY,
      elements: [], // Elements need to be duplicated separately
    };
  }

  // Calculate optimal position for new artboard
  static calculateNextPosition(artboards: Artboard[], newWidth: number, gap: number = 50): { x: number; y: number } {
    if (artboards.length === 0) {
      return { x: 0, y: 0 };
    }

    // Find rightmost artboard
    const rightmost = artboards.reduce((max, ab) => {
      const right = ab.x + ab.width;
      return right > max.right ? { artboard: ab, right } : max;
    }, { artboard: artboards[0], right: artboards[0].x + artboards[0].width });

    return {
      x: rightmost.right + gap,
      y: rightmost.artboard.y
    };
  }

  // Check if a point is inside an artboard
  static isPointInArtboard(artboard: Artboard, x: number, y: number): boolean {
    return (
      x >= artboard.x &&
      x <= artboard.x + artboard.width &&
      y >= artboard.y &&
      y <= artboard.y + artboard.height
    );
  }

  // Find artboard containing a point
  static findArtboardAtPoint(artboards: Artboard[], x: number, y: number): Artboard | null {
    return artboards.find(ab => this.isPointInArtboard(ab, x, y)) || null;
  }

  // Check if element is within artboard bounds
  static isElementInArtboard(
    artboard: Artboard, 
    elementX: number, 
    elementY: number, 
    elementWidth: number, 
    elementHeight: number
  ): boolean {
    // Element center is inside artboard
    const centerX = elementX + elementWidth / 2;
    const centerY = elementY + elementHeight / 2;
    return this.isPointInArtboard(artboard, centerX, centerY);
  }

  // Get bounding box for all artboards
  static getArtboardsBoundingBox(artboards: Artboard[]): { 
    x: number; 
    y: number; 
    width: number; 
    height: number 
  } {
    if (artboards.length === 0) {
      return { x: 0, y: 0, width: 0, height: 0 };
    }

    const minX = Math.min(...artboards.map(ab => ab.x));
    const minY = Math.min(...artboards.map(ab => ab.y));
    const maxX = Math.max(...artboards.map(ab => ab.x + ab.width));
    const maxY = Math.max(...artboards.map(ab => ab.y + ab.height));

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  // Arrange artboards in a grid
  static arrangeArtboardsGrid(
    artboards: Artboard[], 
    columns: number = 3, 
    gap: number = 50
  ): Artboard[] {
    return artboards.map((artboard, index) => {
      const row = Math.floor(index / columns);
      const col = index % columns;
      
      // Calculate position based on row and column
      // This is simplified - ideally should account for varying sizes
      const x = col * (artboard.width + gap);
      const y = row * (artboard.height + gap);

      return { ...artboard, x, y };
    });
  }

  // Arrange artboards horizontally
  static arrangeArtboardsHorizontal(artboards: Artboard[], gap: number = 50): Artboard[] {
    let currentX = 0;
    return artboards.map(artboard => {
      const newArtboard = { ...artboard, x: currentX, y: 0 };
      currentX += artboard.width + gap;
      return newArtboard;
    });
  }

  // Arrange artboards vertically
  static arrangeArtboardsVertical(artboards: Artboard[], gap: number = 50): Artboard[] {
    let currentY = 0;
    return artboards.map(artboard => {
      const newArtboard = { ...artboard, x: 0, y: currentY };
      currentY += artboard.height + gap;
      return newArtboard;
    });
  }

  // Resize artboard (maintaining or not maintaining aspect ratio)
  static resizeArtboard(
    artboard: Artboard,
    newWidth: number,
    newHeight: number,
    maintainAspectRatio: boolean = false
  ): Artboard {
    if (maintainAspectRatio) {
      const aspectRatio = artboard.width / artboard.height;
      if (newWidth / newHeight > aspectRatio) {
        newWidth = newHeight * aspectRatio;
      } else {
        newHeight = newWidth / aspectRatio;
      }
    }

    return {
      ...artboard,
      width: Math.max(1, Math.round(newWidth)),
      height: Math.max(1, Math.round(newHeight))
    };
  }

  // Export artboard configuration for saving
  static exportArtboardConfig(artboard: Artboard): string {
    return JSON.stringify(artboard);
  }

  // Import artboard configuration
  static importArtboardConfig(config: string): Artboard | null {
    try {
      return JSON.parse(config) as Artboard;
    } catch {
      return null;
    }
  }

  // Generate thumbnail bounds for artboard preview
  static getThumbnailBounds(artboard: Artboard, maxSize: number = 150): {
    width: number;
    height: number;
    scale: number;
  } {
    const scale = Math.min(maxSize / artboard.width, maxSize / artboard.height);
    return {
      width: artboard.width * scale,
      height: artboard.height * scale,
      scale
    };
  }
}

// Export zoom utilities for multi-artboard navigation
export const ArtboardNavigation = {
  // Calculate zoom to fit all artboards
  zoomToFitAll(artboards: Artboard[], viewportWidth: number, viewportHeight: number, padding: number = 50): {
    zoom: number;
    panX: number;
    panY: number;
  } {
    const bounds = ArtboardManager.getArtboardsBoundingBox(artboards);
    
    const availableWidth = viewportWidth - padding * 2;
    const availableHeight = viewportHeight - padding * 2;
    
    const zoomX = availableWidth / bounds.width;
    const zoomY = availableHeight / bounds.height;
    const zoom = Math.min(zoomX, zoomY, 1); // Cap at 100%
    
    const panX = (viewportWidth - bounds.width * zoom) / 2 - bounds.x * zoom;
    const panY = (viewportHeight - bounds.height * zoom) / 2 - bounds.y * zoom;
    
    return { zoom, panX, panY };
  },

  // Calculate zoom to fit single artboard
  zoomToFitArtboard(artboard: Artboard, viewportWidth: number, viewportHeight: number, padding: number = 50): {
    zoom: number;
    panX: number;
    panY: number;
  } {
    const availableWidth = viewportWidth - padding * 2;
    const availableHeight = viewportHeight - padding * 2;
    
    const zoomX = availableWidth / artboard.width;
    const zoomY = availableHeight / artboard.height;
    const zoom = Math.min(zoomX, zoomY, 1);
    
    const panX = (viewportWidth - artboard.width * zoom) / 2 - artboard.x * zoom;
    const panY = (viewportHeight - artboard.height * zoom) / 2 - artboard.y * zoom;
    
    return { zoom, panX, panY };
  },

  // Zoom to fit selected artboards
  zoomToFitSelected(artboards: Artboard[], viewportWidth: number, viewportHeight: number, padding: number = 50): {
    zoom: number;
    panX: number;
    panY: number;
  } {
    if (artboards.length === 0) {
      return { zoom: 1, panX: 0, panY: 0 };
    }
    
    if (artboards.length === 1) {
      return this.zoomToFitArtboard(artboards[0], viewportWidth, viewportHeight, padding);
    }
    
    return this.zoomToFitAll(artboards, viewportWidth, viewportHeight, padding);
  },

  // Calculate actual zoom percentage display
  getZoomPercentage(zoom: number): string {
    return `${Math.round(zoom * 100)}%`;
  }
};

// Export default utilities
export default {
  ArtboardManager,
  ArtboardNavigation,
  ARTBOARD_PRESETS,
  ARTBOARD_CATEGORIES
};
