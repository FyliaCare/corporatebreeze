/**
 * Asset Library System
 * Professional asset management for the design studio
 */

// Asset Types
export type AssetType = 'image' | 'icon' | 'illustration' | 'shape' | 'template' | 'pattern' | 'texture' | 'photo';

// Asset Categories
export interface AssetCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

// Individual Asset
export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  category: string;
  subcategory?: string;
  thumbnail: string;  // URL or data URI
  source: string;     // Full resolution URL or SVG data
  width: number;
  height: number;
  tags: string[];
  premium: boolean;
  license: 'free' | 'premium' | 'attribution';
  author?: string;
  downloads?: number;
}

// Asset Collection
export interface AssetCollection {
  id: string;
  name: string;
  description?: string;
  assets: Asset[];
  thumbnail: string;
  tags: string[];
}

// Asset Categories
export const ASSET_CATEGORIES: AssetCategory[] = [
  { id: 'all', name: 'All Assets', icon: '📦' },
  { id: 'icons', name: 'Icons', icon: '🎯' },
  { id: 'illustrations', name: 'Illustrations', icon: '🎨' },
  { id: 'photos', name: 'Photos', icon: '📷' },
  { id: 'shapes', name: 'Shapes', icon: '⬡' },
  { id: 'patterns', name: 'Patterns', icon: '🔲' },
  { id: 'textures', name: 'Textures', icon: '🧱' },
  { id: 'templates', name: 'Templates', icon: '📄' },
  { id: 'elements', name: 'UI Elements', icon: '🖼️' },
  { id: 'arrows', name: 'Arrows', icon: '➡️' },
  { id: 'badges', name: 'Badges & Labels', icon: '🏷️' },
  { id: 'social', name: 'Social Icons', icon: '📱' },
];

// Icon Categories for filtering
export const ICON_CATEGORIES = [
  { id: 'all', name: 'All Icons' },
  { id: 'business', name: 'Business' },
  { id: 'communication', name: 'Communication' },
  { id: 'design', name: 'Design' },
  { id: 'devices', name: 'Devices' },
  { id: 'ecommerce', name: 'E-Commerce' },
  { id: 'education', name: 'Education' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'files', name: 'Files & Folders' },
  { id: 'finance', name: 'Finance' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'health', name: 'Health' },
  { id: 'navigation', name: 'Navigation' },
  { id: 'social', name: 'Social' },
  { id: 'travel', name: 'Travel' },
  { id: 'weather', name: 'Weather' },
  { id: 'ui', name: 'UI Elements' },
];

// Built-in SVG Icons Library
export const BUILTIN_ICONS: Asset[] = [
  // Business Icons
  { id: 'icon-briefcase', name: 'Briefcase', type: 'icon', category: 'icons', subcategory: 'business', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>', width: 24, height: 24, tags: ['work', 'job', 'business', 'office'], premium: false, license: 'free' },
  { id: 'icon-building', name: 'Building', type: 'icon', category: 'icons', subcategory: 'business', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="2" width="16" height="20"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/></svg>', width: 24, height: 24, tags: ['office', 'company', 'business', 'building'], premium: false, license: 'free' },
  { id: 'icon-chart', name: 'Chart', type: 'icon', category: 'icons', subcategory: 'business', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>', width: 24, height: 24, tags: ['chart', 'graph', 'statistics', 'data'], premium: false, license: 'free' },
  { id: 'icon-dollar', name: 'Dollar', type: 'icon', category: 'icons', subcategory: 'finance', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>', width: 24, height: 24, tags: ['money', 'dollar', 'currency', 'finance'], premium: false, license: 'free' },
  { id: 'icon-users', name: 'Users', type: 'icon', category: 'icons', subcategory: 'business', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>', width: 24, height: 24, tags: ['team', 'group', 'people', 'users'], premium: false, license: 'free' },
  
  // Communication Icons  
  { id: 'icon-mail', name: 'Mail', type: 'icon', category: 'icons', subcategory: 'communication', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>', width: 24, height: 24, tags: ['email', 'message', 'envelope', 'mail'], premium: false, license: 'free' },
  { id: 'icon-phone', name: 'Phone', type: 'icon', category: 'icons', subcategory: 'communication', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>', width: 24, height: 24, tags: ['call', 'phone', 'telephone', 'contact'], premium: false, license: 'free' },
  { id: 'icon-message', name: 'Message', type: 'icon', category: 'icons', subcategory: 'communication', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>', width: 24, height: 24, tags: ['chat', 'message', 'comment', 'talk'], premium: false, license: 'free' },
  { id: 'icon-bell', name: 'Bell', type: 'icon', category: 'icons', subcategory: 'communication', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>', width: 24, height: 24, tags: ['notification', 'alert', 'bell', 'alarm'], premium: false, license: 'free' },
  
  // Design Icons
  { id: 'icon-pen', name: 'Pen Tool', type: 'icon', category: 'icons', subcategory: 'design', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>', width: 24, height: 24, tags: ['pen', 'draw', 'design', 'tool'], premium: false, license: 'free' },
  { id: 'icon-brush', name: 'Brush', type: 'icon', category: 'icons', subcategory: 'design', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 114.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 00-3-3.02z"/></svg>', width: 24, height: 24, tags: ['paint', 'brush', 'art', 'design'], premium: false, license: 'free' },
  { id: 'icon-palette', name: 'Palette', type: 'icon', category: 'icons', subcategory: 'design', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="13.5" cy="6.5" r="2"/><circle cx="17.5" cy="10.5" r="2"/><circle cx="8.5" cy="7.5" r="2"/><circle cx="6.5" cy="12.5" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/></svg>', width: 24, height: 24, tags: ['colors', 'palette', 'paint', 'design'], premium: false, license: 'free' },
  { id: 'icon-layers', name: 'Layers', type: 'icon', category: 'icons', subcategory: 'design', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>', width: 24, height: 24, tags: ['layers', 'stack', 'design', 'organize'], premium: false, license: 'free' },
  { id: 'icon-grid', name: 'Grid', type: 'icon', category: 'icons', subcategory: 'design', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', width: 24, height: 24, tags: ['grid', 'layout', 'gallery', 'view'], premium: false, license: 'free' },
  
  // Navigation Icons
  { id: 'icon-home', name: 'Home', type: 'icon', category: 'icons', subcategory: 'navigation', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>', width: 24, height: 24, tags: ['home', 'house', 'main', 'start'], premium: false, license: 'free' },
  { id: 'icon-search', name: 'Search', type: 'icon', category: 'icons', subcategory: 'navigation', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>', width: 24, height: 24, tags: ['search', 'find', 'magnify', 'look'], premium: false, license: 'free' },
  { id: 'icon-settings', name: 'Settings', type: 'icon', category: 'icons', subcategory: 'navigation', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>', width: 24, height: 24, tags: ['settings', 'gear', 'cog', 'options'], premium: false, license: 'free' },
  { id: 'icon-menu', name: 'Menu', type: 'icon', category: 'icons', subcategory: 'navigation', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>', width: 24, height: 24, tags: ['menu', 'hamburger', 'navigation', 'bars'], premium: false, license: 'free' },
  
  // Social Icons
  { id: 'icon-heart', name: 'Heart', type: 'icon', category: 'icons', subcategory: 'social', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>', width: 24, height: 24, tags: ['heart', 'love', 'like', 'favorite'], premium: false, license: 'free' },
  { id: 'icon-star', name: 'Star', type: 'icon', category: 'icons', subcategory: 'social', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>', width: 24, height: 24, tags: ['star', 'favorite', 'rating', 'bookmark'], premium: false, license: 'free' },
  { id: 'icon-share', name: 'Share', type: 'icon', category: 'icons', subcategory: 'social', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>', width: 24, height: 24, tags: ['share', 'send', 'forward', 'social'], premium: false, license: 'free' },
  { id: 'icon-thumb-up', name: 'Thumbs Up', type: 'icon', category: 'icons', subcategory: 'social', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>', width: 24, height: 24, tags: ['like', 'thumbs up', 'approve', 'good'], premium: false, license: 'free' },

  // E-Commerce Icons
  { id: 'icon-cart', name: 'Shopping Cart', type: 'icon', category: 'icons', subcategory: 'ecommerce', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>', width: 24, height: 24, tags: ['cart', 'shopping', 'buy', 'ecommerce'], premium: false, license: 'free' },
  { id: 'icon-tag', name: 'Tag', type: 'icon', category: 'icons', subcategory: 'ecommerce', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>', width: 24, height: 24, tags: ['tag', 'label', 'price', 'sale'], premium: false, license: 'free' },
  { id: 'icon-gift', name: 'Gift', type: 'icon', category: 'icons', subcategory: 'ecommerce', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>', width: 24, height: 24, tags: ['gift', 'present', 'box', 'surprise'], premium: false, license: 'free' },
  { id: 'icon-package', name: 'Package', type: 'icon', category: 'icons', subcategory: 'ecommerce', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>', width: 24, height: 24, tags: ['package', 'box', 'shipping', 'delivery'], premium: false, license: 'free' },
  
  // Files & Folders
  { id: 'icon-file', name: 'File', type: 'icon', category: 'icons', subcategory: 'files', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>', width: 24, height: 24, tags: ['file', 'document', 'page', 'paper'], premium: false, license: 'free' },
  { id: 'icon-folder', name: 'Folder', type: 'icon', category: 'icons', subcategory: 'files', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>', width: 24, height: 24, tags: ['folder', 'directory', 'storage', 'organize'], premium: false, license: 'free' },
  { id: 'icon-image', name: 'Image', type: 'icon', category: 'icons', subcategory: 'files', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>', width: 24, height: 24, tags: ['image', 'photo', 'picture', 'gallery'], premium: false, license: 'free' },
  { id: 'icon-download', name: 'Download', type: 'icon', category: 'icons', subcategory: 'files', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>', width: 24, height: 24, tags: ['download', 'save', 'arrow', 'get'], premium: false, license: 'free' },
  { id: 'icon-upload', name: 'Upload', type: 'icon', category: 'icons', subcategory: 'files', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>', width: 24, height: 24, tags: ['upload', 'send', 'arrow', 'share'], premium: false, license: 'free' },
  
  // Arrows & Direction
  { id: 'icon-arrow-right', name: 'Arrow Right', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>', width: 24, height: 24, tags: ['arrow', 'right', 'next', 'forward'], premium: false, license: 'free' },
  { id: 'icon-arrow-left', name: 'Arrow Left', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>', width: 24, height: 24, tags: ['arrow', 'left', 'back', 'previous'], premium: false, license: 'free' },
  { id: 'icon-arrow-up', name: 'Arrow Up', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>', width: 24, height: 24, tags: ['arrow', 'up', 'top', 'upload'], premium: false, license: 'free' },
  { id: 'icon-arrow-down', name: 'Arrow Down', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>', width: 24, height: 24, tags: ['arrow', 'down', 'bottom', 'download'], premium: false, license: 'free' },
  { id: 'icon-chevron-right', name: 'Chevron Right', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>', width: 24, height: 24, tags: ['chevron', 'right', 'next', 'expand'], premium: false, license: 'free' },
  { id: 'icon-chevron-down', name: 'Chevron Down', type: 'icon', category: 'icons', subcategory: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>', width: 24, height: 24, tags: ['chevron', 'down', 'expand', 'dropdown'], premium: false, license: 'free' },
  
  // Media & Controls
  { id: 'icon-play', name: 'Play', type: 'icon', category: 'icons', subcategory: 'media', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>', width: 24, height: 24, tags: ['play', 'video', 'start', 'media'], premium: false, license: 'free' },
  { id: 'icon-pause', name: 'Pause', type: 'icon', category: 'icons', subcategory: 'media', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>', width: 24, height: 24, tags: ['pause', 'stop', 'hold', 'media'], premium: false, license: 'free' },
  { id: 'icon-volume', name: 'Volume', type: 'icon', category: 'icons', subcategory: 'media', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>', width: 24, height: 24, tags: ['volume', 'sound', 'audio', 'speaker'], premium: false, license: 'free' },
  { id: 'icon-camera', name: 'Camera', type: 'icon', category: 'icons', subcategory: 'media', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>', width: 24, height: 24, tags: ['camera', 'photo', 'picture', 'capture'], premium: false, license: 'free' },
  
  // UI Elements
  { id: 'icon-check', name: 'Check', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>', width: 24, height: 24, tags: ['check', 'done', 'complete', 'tick'], premium: false, license: 'free' },
  { id: 'icon-x', name: 'Close', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>', width: 24, height: 24, tags: ['close', 'x', 'cancel', 'remove'], premium: false, license: 'free' },
  { id: 'icon-plus', name: 'Plus', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>', width: 24, height: 24, tags: ['plus', 'add', 'new', 'create'], premium: false, license: 'free' },
  { id: 'icon-minus', name: 'Minus', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>', width: 24, height: 24, tags: ['minus', 'remove', 'subtract', 'decrease'], premium: false, license: 'free' },
  { id: 'icon-info', name: 'Info', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>', width: 24, height: 24, tags: ['info', 'information', 'help', 'about'], premium: false, license: 'free' },
  { id: 'icon-alert', name: 'Alert', type: 'icon', category: 'icons', subcategory: 'ui', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>', width: 24, height: 24, tags: ['alert', 'warning', 'danger', 'caution'], premium: false, license: 'free' },
  
  // Weather
  { id: 'icon-sun', name: 'Sun', type: 'icon', category: 'icons', subcategory: 'weather', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>', width: 24, height: 24, tags: ['sun', 'sunny', 'day', 'weather'], premium: false, license: 'free' },
  { id: 'icon-moon', name: 'Moon', type: 'icon', category: 'icons', subcategory: 'weather', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>', width: 24, height: 24, tags: ['moon', 'night', 'dark', 'weather'], premium: false, license: 'free' },
  { id: 'icon-cloud', name: 'Cloud', type: 'icon', category: 'icons', subcategory: 'weather', thumbnail: '', source: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>', width: 24, height: 24, tags: ['cloud', 'weather', 'storage', 'sky'], premium: false, license: 'free' },
];

// Built-in decorative shapes
export const BUILTIN_SHAPES: Asset[] = [
  { id: 'shape-badge-1', name: 'Badge Circle', type: 'shape', category: 'badges', thumbnail: '', source: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/><circle cx="50" cy="50" r="40" fill="none" stroke="white" stroke-width="2"/></svg>', width: 100, height: 100, tags: ['badge', 'circle', 'sticker', 'label'], premium: false, license: 'free' },
  { id: 'shape-badge-2', name: 'Badge Star', type: 'shape', category: 'badges', thumbnail: '', source: '<svg viewBox="0 0 100 100"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="currentColor"/></svg>', width: 100, height: 100, tags: ['badge', 'star', 'award', 'label'], premium: false, license: 'free' },
  { id: 'shape-banner-1', name: 'Banner Ribbon', type: 'shape', category: 'badges', thumbnail: '', source: '<svg viewBox="0 0 200 60"><path d="M10,10 L30,30 L30,50 L10,30 L10,10 Z" fill="currentColor" opacity="0.7"/><path d="M190,10 L170,30 L170,50 L190,30 L190,10 Z" fill="currentColor" opacity="0.7"/><rect x="20" y="10" width="160" height="40" fill="currentColor"/></svg>', width: 200, height: 60, tags: ['banner', 'ribbon', 'label', 'tag'], premium: false, license: 'free' },
  { id: 'shape-speech-bubble', name: 'Speech Bubble', type: 'shape', category: 'elements', thumbnail: '', source: '<svg viewBox="0 0 100 80"><path d="M10,10 Q10,0 20,0 L80,0 Q90,0 90,10 L90,50 Q90,60 80,60 L30,60 L15,75 L20,60 L20,60 Q10,60 10,50 Z" fill="currentColor"/></svg>', width: 100, height: 80, tags: ['speech', 'bubble', 'chat', 'comment'], premium: false, license: 'free' },
  { id: 'shape-arrow-1', name: 'Arrow Block', type: 'shape', category: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 100 50"><polygon points="0,15 60,15 60,0 100,25 60,50 60,35 0,35" fill="currentColor"/></svg>', width: 100, height: 50, tags: ['arrow', 'direction', 'pointer', 'right'], premium: false, license: 'free' },
  { id: 'shape-arrow-circle', name: 'Arrow Circle', type: 'shape', category: 'arrows', thumbnail: '', source: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="currentColor"/><polygon points="30,50 55,30 55,42 75,42 75,58 55,58 55,70" fill="white"/></svg>', width: 100, height: 100, tags: ['arrow', 'circle', 'next', 'button'], premium: false, license: 'free' },
  { id: 'shape-hexagon', name: 'Hexagon', type: 'shape', category: 'shapes', thumbnail: '', source: '<svg viewBox="0 0 100 90"><polygon points="25,0 75,0 100,45 75,90 25,90 0,45" fill="currentColor"/></svg>', width: 100, height: 90, tags: ['hexagon', 'polygon', 'shape', 'geometric'], premium: false, license: 'free' },
  { id: 'shape-diamond', name: 'Diamond', type: 'shape', category: 'shapes', thumbnail: '', source: '<svg viewBox="0 0 100 100"><polygon points="50,0 100,50 50,100 0,50" fill="currentColor"/></svg>', width: 100, height: 100, tags: ['diamond', 'rhombus', 'shape', 'geometric'], premium: false, license: 'free' },
  { id: 'shape-heart', name: 'Heart', type: 'shape', category: 'shapes', thumbnail: '', source: '<svg viewBox="0 0 100 100"><path d="M50,90 L15,55 C-10,30 15,0 50,25 C85,0 110,30 85,55 Z" fill="currentColor"/></svg>', width: 100, height: 100, tags: ['heart', 'love', 'valentine', 'shape'], premium: false, license: 'free' },
  { id: 'shape-cloud', name: 'Cloud', type: 'shape', category: 'shapes', thumbnail: '', source: '<svg viewBox="0 0 100 60"><path d="M25,55 C10,55 0,45 0,35 C0,25 10,15 20,15 C20,5 35,0 50,5 C65,0 80,5 85,15 C95,15 100,25 100,35 C100,50 85,55 75,55 Z" fill="currentColor"/></svg>', width: 100, height: 60, tags: ['cloud', 'weather', 'sky', 'shape'], premium: false, license: 'free' },
];

// Asset Search
export function searchAssets(assets: Asset[], query: string): Asset[] {
  const lowerQuery = query.toLowerCase();
  return assets.filter(asset => 
    asset.name.toLowerCase().includes(lowerQuery) ||
    asset.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    asset.category.toLowerCase().includes(lowerQuery) ||
    (asset.subcategory && asset.subcategory.toLowerCase().includes(lowerQuery))
  );
}

// Filter assets by category
export function filterAssetsByCategory(assets: Asset[], category: string): Asset[] {
  if (category === 'all') return assets;
  return assets.filter(asset => 
    asset.category === category || asset.subcategory === category
  );
}

// Filter assets by type
export function filterAssetsByType(assets: Asset[], type: AssetType): Asset[] {
  return assets.filter(asset => asset.type === type);
}

// Get all available assets
export function getAllBuiltinAssets(): Asset[] {
  return [...BUILTIN_ICONS, ...BUILTIN_SHAPES];
}

// Export default
export default {
  ASSET_CATEGORIES,
  ICON_CATEGORIES,
  BUILTIN_ICONS,
  BUILTIN_SHAPES,
  searchAssets,
  filterAssetsByCategory,
  filterAssetsByType,
  getAllBuiltinAssets
};
