'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Palette, Save, Download, Upload, RotateCw, Trash2, Type, LayoutDashboard,
  Image as ImageIcon, Layers, AlignLeft, AlignCenter, AlignRight, Bell,
  Bold, Italic, Underline, ZoomIn, ZoomOut, Grid, Eye, ShoppingCart,
  Undo, Redo, Copy, Scissors, ChevronLeft, ChevronRight, MoreVertical,
  Sparkles, Layout, Circle, Square, Triangle, Star, Heart, ShoppingBag,
  FileText, Package, Move, Maximize2, Minimize2, User, CreditCard, Settings,
  MessageSquare, Plus, Search, X, ChevronDown, Check, Lock, Unlock, EyeOff,
  Pen, Droplet, Crop, Eraser, Wand2, Sliders, Coffee, Shirt, BookOpen, Ruler,
  Hand, MousePointer2, Hexagon, PenTool, Pipette, PaintBucket, LayoutGrid,
  SunMedium, Moon, Monitor, Smartphone, Tablet, PanelLeftClose, PanelRightClose,
  PanelLeft, PanelRight, Printer, Share2, FileDown, Folder, FolderOpen,
  RotateCcw, FlipHorizontal, FlipVertical, ArrowUp, ArrowDown, Group, Ungroup,
  AlignStartVertical, AlignEndVertical, AlignCenterHorizontal, AlignCenterVertical,
  AlignStartHorizontal, AlignEndHorizontal, Baseline, SquareStack, GitBranch, Minus, ArrowRight, FileImage, FileCode,
  Clipboard, Sun, CloudSun, Waves, Palette as PaletteIcon, Brush, Sparkle, Info
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import { CanvasElement, CanvasState, SelectionState, Point, Template, PathPoint, PathProperties, FreehandProperties } from '@/lib/designer/types'
import { ElementManager, TransformUtils } from '@/lib/designer/elementManager'
import { HistoryManager, CommandFactory } from '@/lib/designer/historyManager'
import { TEMPLATES, TEMPLATE_CATEGORIES, FONTS, FONT_WEIGHTS, COLOR_PALETTES, BRAND_COLORS } from '@/lib/designer/templates'
import { MOCKUP_TEMPLATES, MockupFilter, MockupProjection, MockupTemplate } from '@/lib/designer/mockup'
import { PRODUCT_MOCKUPS, MOCKUP_CATEGORIES, getMockupsByCategory, renderMockupSVG, ProductMockup, ProductColor } from '@/lib/designer/productMockups'
import { ALL_SHAPES, SHAPE_CATEGORIES, getShapesByCategory, getShapeById, SVG_PATHS, ShapeDefinition } from '@/lib/designer/shapes'
import { 
  DrawingState, 
  defaultDrawingState, 
  pathPointsToSVG, 
  smoothFreehandPoints, 
  simplifyPath,
  createPathElement,
  createFreehandElement,
  calculateSymmetricHandles 
} from '@/lib/designer/drawingTools'
import {
  Effect,
  EffectCategory,
  EffectPreset,
  BlendMode,
  EFFECT_PRESETS,
  EFFECT_CATEGORIES,
  AVAILABLE_EFFECTS,
  generateCSSFilter,
  createDropShadow,
  createInnerShadow,
  createOuterGlow,
  createInnerGlow,
  createNeonGlow,
  createGaussianBlur,
  createMotionBlur,
  createBrightnessContrast,
  createHueSaturation,
  createGrayscale,
  createSepia,
  createInvert,
  createColorOverlay,
  createDuotone,
  createPixelate,
  createNoise,
  createVignette,
  createEmboss,
  createGlitch,
  createHalftone,
  createChromaticAberration,
  createStroke,
  duplicateEffect
} from '@/lib/designer/effects'
import {
  TEXT_STYLE_PRESETS,
  PREMIUM_FONTS,
  FONT_CATEGORIES,
  TextStylePreset,
  TextPathConfig,
  OpenTypeFeatures,
  defaultOpenTypeFeatures,
  generateCirclePath,
  generateArcPath,
  generateWavePath,
  generateOpenTypeFeaturesCSS
} from '@/lib/designer/typography'
import {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  rgbToCmyk,
  cmykToRgb,
  generateHarmony,
  HarmonyType,
  lighten,
  darken,
  saturate,
  desaturate,
  getContrastColor,
  getContrastRatio,
  meetsWCAG,
  PRESET_PALETTES,
  PRESET_GRADIENTS,
  gradientToCSS,
  generateShades,
  getColorName,
  ColorPalette,
  Gradient
} from '@/lib/designer/colorSystem'
import {
  Artboard,
  Page as ArtboardPage,
  ArtboardManager,
  ArtboardNavigation,
  ARTBOARD_PRESETS,
  ARTBOARD_CATEGORIES
} from '@/lib/designer/artboards'
import {
  Asset,
  AssetType,
  AssetCategory,
  ASSET_CATEGORIES,
  ICON_CATEGORIES,
  BUILTIN_ICONS,
  BUILTIN_SHAPES,
  searchAssets,
  filterAssetsByCategory,
  getAllBuiltinAssets
} from '@/lib/designer/assetLibrary'
import {
  TransformOrigin,
  TransformOriginPreset,
  SkewConfig,
  TRANSFORM_ORIGIN_PRESETS,
  getTransformOriginPoint,
  transformOriginToCSS,
  rotateAroundPoint,
  snapRotation,
  flipHorizontal,
  flipVertical,
  alignElements,
  alignElementsVertical,
  distributeElements,
  getBoundingBox,
  snapToGrid,
  nudgeElement,
  setExactPosition,
  roundPosition,
  findSmartGuides,
  SmartGuide,
  ROTATION_PRESETS,
  SCALE_PRESETS
} from '@/lib/designer/transformTools'
import {
  AdvancedTemplate,
  TemplateCategory,
  Industry,
  TemplateFilter,
  TEMPLATE_CATEGORIES_ADVANCED,
  INDUSTRIES,
  ADVANCED_TEMPLATES,
  TEMPLATE_COLLECTIONS,
  filterTemplates,
  sortTemplates,
  searchTemplates,
  getTrendingTemplates,
  getNewTemplates
} from '@/lib/designer/advancedTemplates'

export default function DesignerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)

  // Canvas state
  const [canvas, setCanvas] = useState<CanvasState>({
    width: 1200,
    height: 800,
    backgroundColor: '#FFFFFF',
    zoom: 1,
    gridSize: 20,
    showGrid: false,
    snapToGrid: false,
    gridColor: '#E2E8F0',
    gridOpacity: 0.5,
    elements: []
  })

  // Selection state
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: [],
    isDragging: false,
    isResizing: false,
    isRotating: false
  })

  // Interaction state
  const [dragState, setDragState] = useState<{
    elementId: string | null
    startX: number
    startY: number
    elementStartX: number
    elementStartY: number
  } | null>(null)

  const [resizeState, setResizeState] = useState<{
    elementId: string | null
    handle: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w' | null
    startX: number
    startY: number
    startTransform: any
  } | null>(null)

  // History manager
  const historyRef = useRef(new HistoryManager())
  const [historyState, setHistoryState] = useState(historyRef.current.getState())

  // UI state
  const [activeTool, setActiveTool] = useState<'select' | 'text' | 'shape' | 'image' | 'pen' | 'gradient' | 'eyedropper' | 'crop' | 'eraser' | 'hand' | 'zoom' | 'freehand' | 'pencil' | 'brush'>('select')
  const [activePanel, setActivePanel] = useState<'templates' | 'elements' | 'assets' | 'layers' | 'effects' | 'mockups' | 'colors' | 'grid' | 'export' | 'shapes' | 'artboards'>('elements')
  const [showTemplates, setShowTemplates] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showRulers, setShowRulers] = useState(true)
  const [showGuides, setShowGuides] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [showLeftPanel, setShowLeftPanel] = useState(true)
  const [showRightPanel, setShowRightPanel] = useState(true)
  const [viewMode, setViewMode] = useState<'design' | 'preview' | 'mockup'>('design')
  const [guides, setGuides] = useState<Array<{id: string; type: 'horizontal' | 'vertical'; position: number}>>([
    { id: 'guide-v-center', type: 'vertical', position: canvas.width / 2 },
    { id: 'guide-h-center', type: 'horizontal', position: canvas.height / 2 }
  ])
  const [selectionBox, setSelectionBox] = useState({
    active: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  const [editingTextId, setEditingTextId] = useState<string | null>(null)
  const [editingTextValue, setEditingTextValue] = useState('')
  const [recentColors, setRecentColors] = useState<string[]>(['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444'])
  const [renamingLayerId, setRenamingLayerId] = useState<string | null>(null)
  const [renamingLayerValue, setRenamingLayerValue] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set())
  const [alignToCanvas, setAlignToCanvas] = useState(false)
  const [guideDragState, setGuideDragState] = useState<{
    guideId: string | null
    startPosition: number
  } | null>(null)
  const [selectedMockup, setSelectedMockup] = useState<string | null>(null)
  const [mockupCategory, setMockupCategory] = useState<string>('all')
  const [selectedMockupColor, setSelectedMockupColor] = useState<string>('white')
  const [showMockupPreview, setShowMockupPreview] = useState(false)
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const [exportOptions, setExportOptions] = useState<{ format: 'png' | 'jpg' | 'svg' | 'pdf'; quality: number; width: number; height: number; transparent: boolean }>({
    format: 'png',
    quality: 90,
    width: canvas.width,
    height: canvas.height,
    transparent: true
  })
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [isSpacePressed, setIsSpacePressed] = useState(false)
  const [colorMode, setColorMode] = useState<'hex' | 'rgb' | 'hsl' | 'cmyk'>('hex')
  const [currentColor, setCurrentColor] = useState('#3B82F6')
  const [colorHistory, setColorHistory] = useState<string[]>(['#3B82F6', '#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#EC4899', '#06B6D4', '#F97316', '#6366F1', '#14B8A6'])
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [projectName, setProjectName] = useState('Untitled Design')
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const hasUnsavedChanges = useRef(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; type: 'canvas' | 'element'; elementId?: string } | null>(null)

  // Drawing Tools State
  const [drawingState, setDrawingState] = useState<DrawingState>(defaultDrawingState)
  const [penToolPoints, setPenToolPoints] = useState<PathPoint[]>([])
  const [freehandPoints, setFreehandPoints] = useState<Point[]>([])
  const [isDrawingFreehand, setIsDrawingFreehand] = useState(false)
  const [currentStrokeColor, setCurrentStrokeColor] = useState('#000000')
  const [currentStrokeWidth, setCurrentStrokeWidth] = useState(2)
  const [currentFillColor, setCurrentFillColor] = useState('#3B82F6')
  const [brushSettings, setBrushSettings] = useState({
    size: 10,
    hardness: 100,
    opacity: 100,
    smoothing: 0.5
  })

  // Effects System State
  const [elementEffects, setElementEffects] = useState<Map<string, Effect[]>>(new Map())
  const [activeEffectCategory, setActiveEffectCategory] = useState<EffectCategory>('shadow')
  const [effectsPanelExpanded, setEffectsPanelExpanded] = useState<Set<string>>(new Set())
  const [showEffectPresets, setShowEffectPresets] = useState(true)
  const [copiedEffects, setCopiedEffects] = useState<Effect[] | null>(null)

  // Shapes Library State
  const [shapeCategory, setShapeCategory] = useState<string>('all')
  const [quickShapeColor, setQuickShapeColor] = useState('#3B82F6')

  // Get effects for an element
  const getElementEffects = useCallback((elementId: string): Effect[] => {
    return elementEffects.get(elementId) || []
  }, [elementEffects])

  // Add effect to element
  const addEffectToElement = useCallback((elementId: string, effect: Effect) => {
    setElementEffects(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(elementId) || []
      newMap.set(elementId, [...current, effect])
      return newMap
    })
    hasUnsavedChanges.current = true
    setSaveStatus('unsaved')
  }, [])

  // Update effect on element
  const updateElementEffect = useCallback((elementId: string, effectId: string, updates: Partial<Effect>) => {
    setElementEffects(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(elementId) || []
      const updated = current.map(e => e.id === effectId ? { ...e, ...updates } as Effect : e)
      newMap.set(elementId, updated)
      return newMap
    })
    hasUnsavedChanges.current = true
    setSaveStatus('unsaved')
  }, [])

  // Remove effect from element
  const removeEffectFromElement = useCallback((elementId: string, effectId: string) => {
    setElementEffects(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(elementId) || []
      newMap.set(elementId, current.filter(e => e.id !== effectId))
      return newMap
    })
    hasUnsavedChanges.current = true
    setSaveStatus('unsaved')
  }, [])

  // Toggle effect enabled state
  const toggleEffectEnabled = useCallback((elementId: string, effectId: string) => {
    setElementEffects(prev => {
      const newMap = new Map(prev)
      const current = newMap.get(elementId) || []
      const updated = current.map(e => e.id === effectId ? { ...e, enabled: !e.enabled } : e)
      newMap.set(elementId, updated)
      return newMap
    })
  }, [])

  // Reorder effects for element
  const reorderElementEffects = useCallback((elementId: string, fromIndex: number, toIndex: number) => {
    setElementEffects(prev => {
      const newMap = new Map(prev)
      const current = [...(newMap.get(elementId) || [])]
      const [moved] = current.splice(fromIndex, 1)
      current.splice(toIndex, 0, moved)
      newMap.set(elementId, current)
      return newMap
    })
  }, [])

  // Apply preset to selection
  const applyPresetToSelection = useCallback((preset: EffectPreset) => {
    if (selection.selectedIds.length === 0) return
    
    selection.selectedIds.forEach(id => {
      preset.effects.forEach(effect => {
        addEffectToElement(id, duplicateEffect(effect))
      })
    })
    toast.success(`Applied "${preset.name}" preset`)
  }, [selection.selectedIds, addEffectToElement])

  // Copy effects from selected element
  const copyEffectsFromSelection = useCallback(() => {
    if (selection.selectedIds.length !== 1) return
    const effects = getElementEffects(selection.selectedIds[0])
    if (effects.length === 0) {
      toast.error('No effects to copy')
      return
    }
    setCopiedEffects(effects.map(e => duplicateEffect(e)))
    toast.success(`Copied ${effects.length} effect(s)`)
  }, [selection.selectedIds, getElementEffects])

  // Paste effects to selection
  const pasteEffectsToSelection = useCallback(() => {
    if (!copiedEffects || selection.selectedIds.length === 0) return
    
    selection.selectedIds.forEach(id => {
      copiedEffects.forEach(effect => {
        addEffectToElement(id, duplicateEffect(effect))
      })
    })
    toast.success(`Pasted ${copiedEffects.length} effect(s) to ${selection.selectedIds.length} element(s)`)
  }, [copiedEffects, selection.selectedIds, addEffectToElement])

  // Clear effects from selection
  const clearEffectsFromSelection = useCallback(() => {
    if (selection.selectedIds.length === 0) return
    
    setElementEffects(prev => {
      const newMap = new Map(prev)
      selection.selectedIds.forEach(id => {
        newMap.set(id, [])
      })
      return newMap
    })
    toast.success('Effects cleared')
  }, [selection.selectedIds])

  // Typography State
  const [activeTextStyleCategory, setActiveTextStyleCategory] = useState<'heading' | 'body' | 'display' | 'decorative' | 'special'>('heading')
  const [activeFontCategory, setActiveFontCategory] = useState<string>('sans-serif')
  const [showTextPresets, setShowTextPresets] = useState(true)
  const [textPathEnabled, setTextPathEnabled] = useState(false)
  const [textPathConfig, setTextPathConfig] = useState<TextPathConfig>({
    enabled: false,
    pathType: 'arc',
    offset: 0,
    align: 'center',
    reverse: false,
    radius: 150,
    startAngle: -90,
    endAngle: 90,
    amplitude: 20,
    wavelength: 100,
    phase: 0
  })
  const [openTypeFeatures, setOpenTypeFeatures] = useState<OpenTypeFeatures>(defaultOpenTypeFeatures)
  const [showAdvancedTypography, setShowAdvancedTypography] = useState(false)

  // === Professional Color System State ===
  const [activeHarmony, setActiveHarmony] = useState<HarmonyType>('complementary')
  const [harmonyColors, setHarmonyColors] = useState<string[]>([])
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette | null>(null)
  const [customPalettes, setCustomPalettes] = useState<ColorPalette[]>([])
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null)
  const [showColorDetails, setShowColorDetails] = useState(false)
  const [colorShades, setColorShades] = useState<string[]>([])
  
  // === Artboards & Pages State ===
  const [artboards, setArtboards] = useState<Artboard[]>(() => [
    ArtboardManager.createArtboard('Artboard 1', canvas.width, canvas.height, 0, 0, canvas.backgroundColor)
  ])
  const [activeArtboardId, setActiveArtboardId] = useState<string | null>(null)
  const [artboardCategory, setArtboardCategory] = useState<string>('social')
  const [showArtboardPanel, setShowArtboardPanel] = useState(false)
  const [artboardGridView, setArtboardGridView] = useState(false)
  
  // Create new artboard from preset
  const createArtboardFromPreset = useCallback((presetId: string) => {
    const preset = ARTBOARD_PRESETS.find(p => p.id === presetId)
    if (!preset) return
    
    const position = ArtboardManager.calculateNextPosition(artboards, preset.width)
    const newArtboard = ArtboardManager.createFromPreset(preset, position.x, position.y)
    newArtboard.order = artboards.length
    
    setArtboards(prev => [...prev, newArtboard])
    setActiveArtboardId(newArtboard.id)
    toast.success(`Created artboard: ${preset.name}`)
  }, [artboards])
  
  // Duplicate artboard
  const duplicateArtboard = useCallback((artboardId: string) => {
    const artboard = artboards.find(ab => ab.id === artboardId)
    if (!artboard) return
    
    const newArtboard = ArtboardManager.duplicateArtboard(artboard)
    newArtboard.order = artboards.length
    
    setArtboards(prev => [...prev, newArtboard])
    setActiveArtboardId(newArtboard.id)
    toast.success(`Duplicated artboard: ${newArtboard.name}`)
  }, [artboards])
  
  // Delete artboard
  const deleteArtboard = useCallback((artboardId: string) => {
    if (artboards.length <= 1) {
      toast.error('Cannot delete the last artboard')
      return
    }
    
    setArtboards(prev => prev.filter(ab => ab.id !== artboardId))
    if (activeArtboardId === artboardId) {
      setActiveArtboardId(artboards[0].id !== artboardId ? artboards[0].id : artboards[1]?.id || null)
    }
    toast.success('Artboard deleted')
  }, [artboards, activeArtboardId])
  
  // Rename artboard
  const renameArtboard = useCallback((artboardId: string, newName: string) => {
    setArtboards(prev => prev.map(ab => 
      ab.id === artboardId ? { ...ab, name: newName } : ab
    ))
  }, [])
  
  // Resize artboard
  const resizeArtboard = useCallback((artboardId: string, width: number, height: number) => {
    setArtboards(prev => prev.map(ab => 
      ab.id === artboardId ? { ...ab, width, height } : ab
    ))
  }, [])
  
  // Navigate to artboard
  const navigateToArtboard = useCallback((artboardId: string) => {
    const artboard = artboards.find(ab => ab.id === artboardId)
    if (!artboard || !canvasContainerRef.current) return
    
    const container = canvasContainerRef.current
    const { zoom: newZoom, panX, panY } = ArtboardNavigation.zoomToFitArtboard(
      artboard, 
      container.clientWidth, 
      container.clientHeight
    )
    
    setCanvas(prev => ({ ...prev, zoom: newZoom }))
    setPanOffset({ x: panX, y: panY })
    setActiveArtboardId(artboardId)
  }, [artboards])
  
  // === Asset Library State ===
  const [assetCategory, setAssetCategory] = useState<string>('all')
  const [assetIconCategory, setAssetIconCategory] = useState<string>('all')
  const [assetSearchQuery, setAssetSearchQuery] = useState<string>('')
  const [assetViewMode, setAssetViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [favoriteAssets, setFavoriteAssets] = useState<string[]>([])
  const [recentlyUsedAssets, setRecentlyUsedAssets] = useState<string[]>([])
  
  // Filter assets based on search and category
  const getFilteredAssets = useCallback(() => {
    let assets = getAllBuiltinAssets()
    
    // Filter by category
    if (assetCategory !== 'all') {
      assets = filterAssetsByCategory(assets, assetCategory)
    }
    
    // Filter icons by subcategory
    if (assetCategory === 'icons' && assetIconCategory !== 'all') {
      assets = assets.filter(a => a.subcategory === assetIconCategory)
    }
    
    // Filter by search query
    if (assetSearchQuery.trim()) {
      assets = searchAssets(assets, assetSearchQuery)
    }
    
    return assets
  }, [assetCategory, assetIconCategory, assetSearchQuery])
  
  // Add asset to canvas
  const addAssetToCanvas = useCallback((asset: Asset) => {
    const scaledWidth = asset.width * 2 // Scale up for visibility
    const scaledHeight = asset.height * 2
    const centerX = (canvas.width / 2) - (scaledWidth / 2)
    const centerY = (canvas.height / 2) - (scaledHeight / 2)
    
    if (asset.type === 'icon' || asset.type === 'shape') {
      // Create SVG element - store as custom shape
      const newElement: CanvasElement = {
        id: ElementManager.generateId(),
        type: 'shape',
        name: asset.name,
        transform: {
          x: centerX,
          y: centerY,
          width: scaledWidth,
          height: scaledHeight,
          rotation: 0,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 1,
        visible: true,
        locked: false,
        zIndex: canvas.elements.length,
        shape: {
          shapeType: 'rectangle' as const,
          fill: currentFillColor,
          stroke: 'transparent',
          strokeWidth: 0,
          cornerRadius: 0
        },
        // Store the SVG data as custom property
        customSvg: asset.source.replace(/stroke="currentColor"/g, `stroke="${currentFillColor}"`).replace(/fill="currentColor"/g, `fill="${currentFillColor}"`)
      }
      
      const newCanvas = ElementManager.addElement(canvas, newElement)
      setCanvas(newCanvas)
      
      setSelection({
        selectedIds: [newElement.id],
        isDragging: false,
        isResizing: false,
        isRotating: false
      })
      
      // Track recently used
      setRecentlyUsedAssets(prev => {
        const filtered = prev.filter(id => id !== asset.id)
        return [asset.id, ...filtered].slice(0, 20)
      })
      
      toast.success(`Added ${asset.name} to canvas`)
    } else if (asset.type === 'image' || asset.type === 'photo') {
      // For images/photos
      const newElement: CanvasElement = {
        id: ElementManager.generateId(),
        type: 'image',
        name: asset.name,
        transform: {
          x: centerX,
          y: centerY,
          width: asset.width,
          height: asset.height,
          rotation: 0,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 1,
        visible: true,
        locked: false,
        zIndex: canvas.elements.length,
        image: {
          src: asset.source,
          objectFit: 'cover',
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0,
          opacity: 100
        }
      }
      
      const newCanvas = ElementManager.addElement(canvas, newElement)
      setCanvas(newCanvas)
      
      setSelection({
        selectedIds: [newElement.id],
        isDragging: false,
        isResizing: false,
        isRotating: false
      })
      
      toast.success(`Added ${asset.name} to canvas`)
    }
  }, [canvas, currentFillColor])
  
  // Toggle favorite asset
  const toggleFavoriteAsset = useCallback((assetId: string) => {
    setFavoriteAssets(prev => {
      if (prev.includes(assetId)) {
        return prev.filter(id => id !== assetId)
      } else {
        return [...prev, assetId]
      }
    })
  }, [])

  // === Advanced Template System State ===
  const [templateCategory, setTemplateCategory] = useState<TemplateCategory | 'all'>('all')
  const [templateIndustry, setTemplateIndustry] = useState<Industry | 'all'>('all')
  const [templateSearchQuery, setTemplateSearchQuery] = useState<string>('')
  const [templateSortBy, setTemplateSortBy] = useState<'popular' | 'newest' | 'rating' | 'name'>('popular')
  const [templateViewMode, setTemplateViewMode] = useState<'grid' | 'list'>('grid')
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [showTrendingOnly, setShowTrendingOnly] = useState(false)
  const [showNewOnly, setShowNewOnly] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<AdvancedTemplate | null>(null)
  const [templateDifficulty, setTemplateDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all')
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>([])
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)
  
  // Get filtered templates
  const getFilteredTemplates = useCallback(() => {
    const filter: TemplateFilter = {
      category: templateCategory !== 'all' ? templateCategory : undefined,
      industry: templateIndustry !== 'all' ? templateIndustry : undefined,
      isPremium: showPremiumOnly ? true : undefined,
      isTrending: showTrendingOnly ? true : undefined,
      isNew: showNewOnly ? true : undefined,
      difficulty: templateDifficulty !== 'all' ? templateDifficulty : undefined,
      searchQuery: templateSearchQuery
    }
    
    let filtered = filterTemplates(ADVANCED_TEMPLATES, filter)
    filtered = sortTemplates(filtered, templateSortBy)
    return filtered
  }, [templateCategory, templateIndustry, templateSearchQuery, templateSortBy, showPremiumOnly, showTrendingOnly, showNewOnly, templateDifficulty])
  
  // Apply template to canvas
  const applyTemplate = useCallback((template: AdvancedTemplate) => {
    // Create starter elements based on template type
    const starterElements: CanvasElement[] = []
    
    // Add background if template has colors
    if (template.colors && template.colors.length > 0) {
      starterElements.push({
        id: ElementManager.generateId(),
        type: 'shape',
        name: 'Background',
        transform: {
          x: 0,
          y: 0,
          width: template.width,
          height: template.height,
          rotation: 0,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 1,
        visible: true,
        locked: false,
        zIndex: 0,
        shape: {
          shapeType: 'rectangle',
          fill: template.colors[0],
          stroke: 'transparent',
          strokeWidth: 0,
          cornerRadius: 0
        }
      })
    }
    
    // Add title text
    starterElements.push({
      id: ElementManager.generateId(),
      type: 'text',
      name: 'Title',
      transform: {
        x: 50,
        y: 50,
        width: template.width - 100,
        height: 100,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: starterElements.length,
      text: {
        content: template.name,
        fontSize: template.category === 'business' ? 24 : 48,
        fontFamily: template.fonts?.[0] || 'Inter',
        fontWeight: 700,
        fontStyle: 'normal',
        textDecoration: 'none',
        color: template.colors && template.colors.length > 1 ? template.colors[1] : '#000000',
        textAlign: 'left',
        lineHeight: 1.2,
        letterSpacing: 0
      }
    })
    
    // Add subtitle/description text
    if (template.description) {
      starterElements.push({
        id: ElementManager.generateId(),
        type: 'text',
        name: 'Description',
        transform: {
          x: 50,
          y: 170,
          width: template.width - 100,
          height: 60,
          rotation: 0,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 1,
        visible: true,
        locked: false,
        zIndex: starterElements.length,
        text: {
          content: template.description,
          fontSize: 16,
          fontFamily: template.fonts?.[0] || 'Inter',
          fontWeight: 400,
          fontStyle: 'normal',
          textDecoration: 'none',
          color: template.colors && template.colors.length > 1 ? template.colors[1] : '#666666',
          textAlign: 'left',
          lineHeight: 1.5,
          letterSpacing: 0
        }
      })
    }
    
    // Add accent shape/decoration
    if (template.colors && template.colors.length > 2) {
      starterElements.push({
        id: ElementManager.generateId(),
        type: 'shape',
        name: 'Accent',
        transform: {
          x: template.width - 150,
          y: template.height - 150,
          width: 120,
          height: 120,
          rotation: 45,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 0.3,
        visible: true,
        locked: false,
        zIndex: starterElements.length,
        shape: {
          shapeType: 'circle',
          fill: template.colors[2],
          stroke: 'transparent',
          strokeWidth: 0,
          cornerRadius: 0
        }
      })
    }
    
    // Merge template elements with starter elements
    const finalElements = template.elements.length > 0 
      ? [...template.elements] 
      : starterElements
    
    // Update canvas dimensions and elements
    setCanvas(prev => ({
      ...prev,
      width: template.width,
      height: template.height,
      backgroundColor: template.colors?.[0] || prev.backgroundColor,
      elements: finalElements
    }))
    
    setSelection({
      selectedIds: [],
      isDragging: false,
      isResizing: false,
      isRotating: false
    })
    
    // Clear history and add initial state
    historyRef.current.clear()
    setHistoryState(historyRef.current.getState())
    
    toast.success(`Applied template: ${template.name}`)
    setSelectedTemplate(null)
    setShowTemplatePreview(false)
    setActivePanel('elements')
  }, [])
  
  // Toggle favorite template
  const toggleFavoriteTemplate = useCallback((templateId: string) => {
    setFavoriteTemplates(prev => {
      if (prev.includes(templateId)) {
        return prev.filter(id => id !== templateId)
      } else {
        return [...prev, templateId]
      }
    })
  }, [])

  // Generate harmony colors when base color changes
  const generateHarmonyColors = useCallback((baseColor: string, harmonyType: HarmonyType) => {
    const colors = generateHarmony(baseColor, harmonyType)
    setHarmonyColors(colors)
    return colors
  }, [])
  
  // Add color to recent colors
  const addRecentColor = useCallback((color: string) => {
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color)
      return [color, ...filtered].slice(0, 16)
    })
  }, [])
  
  // Apply gradient to selected element
  const applyGradientToElement = useCallback((gradient: Gradient) => {
    if (selection.selectedIds.length === 0) return
    
    const cssGradient = gradientToCSS(gradient)
    selection.selectedIds.forEach(id => {
      const element = ElementManager.getElement(canvas, id)
      if (element?.type === 'shape' && element.shape) {
        const newCanvas = ElementManager.updateElement(canvas, id, {
          shape: {
            ...element.shape,
            fill: cssGradient
          }
        })
        setCanvas(newCanvas)
      }
    })
    toast.success('Gradient applied')
  }, [selection.selectedIds, canvas])
  
  // Update element fill color
  const updateElementFillColor = useCallback((color: string) => {
    if (selection.selectedIds.length === 0) {
      setCurrentFillColor(color)
      return
    }
    
    selection.selectedIds.forEach(id => {
      const element = ElementManager.getElement(canvas, id)
      if (!element) return
      
      if (element.type === 'shape' && element.shape) {
        const newCanvas = ElementManager.updateElement(canvas, id, {
          shape: {
            ...element.shape,
            fill: color
          }
        })
        setCanvas(newCanvas)
      } else if (element.type === 'text' && element.text) {
        const newCanvas = ElementManager.updateElement(canvas, id, {
          text: {
            ...element.text,
            color: color
          }
        })
        setCanvas(newCanvas)
      }
    })
  }, [selection.selectedIds, canvas])

  // Apply text style preset to selected text elements
  const applyTextStylePreset = useCallback((preset: TextStylePreset) => {
    if (selection.selectedIds.length === 0) return

    selection.selectedIds.forEach(id => {
      const element = ElementManager.getElement(canvas, id)
      if (element?.type === 'text' && element.text) {
        // Map fontStyle safely
        let fontStyle: 'normal' | 'italic' = 'normal'
        if (preset.style.fontStyle === 'italic' || preset.style.fontStyle === 'oblique') {
          fontStyle = 'italic'
        }
        
        // Map textDecoration safely
        let textDecoration: 'none' | 'underline' | 'line-through' = 'none'
        if (preset.style.textDecoration === 'underline') textDecoration = 'underline'
        else if (preset.style.textDecoration === 'line-through') textDecoration = 'line-through'
        
        const newCanvas = ElementManager.updateElement(canvas, id, {
          text: {
            ...element.text,
            fontFamily: preset.style.fontFamily,
            fontSize: preset.style.fontSize,
            fontWeight: preset.style.fontWeight,
            fontStyle,
            lineHeight: preset.style.lineHeight,
            textAlign: preset.style.textAlign,
            textDecoration,
            color: preset.style.color
          }
        })
        setCanvas(newCanvas)
      }
    })
    toast.success(`Applied "${preset.name}" style`)
  }, [selection.selectedIds, canvas])

  const handleAddGuide = (type: 'horizontal' | 'vertical') => {
    const position = type === 'vertical' ? canvas.width / 2 : canvas.height / 2
    const oldGuides = guides
    const newGuides = [...guides, { id: `${type}-${Date.now()}`, type, position }]
    
    // Simple history tracking using style command
    const command: any = {
      type: 'style',
      elementIds: [],
      beforeState: { guides: oldGuides },
      afterState: { guides: newGuides },
      timestamp: Date.now()
    }
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    setGuides(newGuides)
    toast.success(`${type === 'vertical' ? 'Vertical' : 'Horizontal'} guide added`)
  }

  const handleGuideMouseDown = (e: React.MouseEvent, guideId: string) => {
    e.stopPropagation()
    const guide = guides.find(g => g.id === guideId)
    if (!guide) return
    
    setGuideDragState({
      guideId,
      startPosition: guide.position
    })
  }

  const handleRemoveGuide = (guideId: string) => {
    const oldGuides = guides
    const newGuides = guides.filter(g => g.id !== guideId)
    
    // Simple history tracking
    const command: any = {
      type: 'style',
      elementIds: [],
      beforeState: { guides: oldGuides },
      afterState: { guides: newGuides },
      timestamp: Date.now()
    }
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    setGuides(newGuides)
    toast.success('Guide removed')
  }

  const handleClearGuides = () => {
    if (guides.length === 0) return
    
    const oldGuides = guides
    const command: any = {
      type: 'style',
      elementIds: [],
      beforeState: { guides: oldGuides },
      afterState: { guides: [] },
      timestamp: Date.now()
    }
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    setGuides([])
    toast.success('All guides cleared')
  }

  const handleCommitTextEdit = () => {
    if (!editingTextId) return
    const element = ElementManager.getElement(canvas, editingTextId)
    if (!element || !element.text) {
      setEditingTextId(null)
      return
    }

    const updated = ElementManager.updateElement(canvas, editingTextId, {
      text: { ...element.text, content: editingTextValue }
    })
    setCanvas(updated)
    setEditingTextId(null)
  }

  const applyColorToSelection = (color: string) => {
    if (!selection.selectedIds.length) {
      setCanvas({ ...canvas, backgroundColor: color })
      return
    }

    const updates = selection.selectedIds.map(id => {
      const el = ElementManager.getElement(canvas, id)
      if (!el) return null

      if (el.type === 'text' && el.text) {
        return { id, data: { text: { ...el.text, color } } }
      }
      if (el.type === 'shape' && el.shape) {
        return { id, data: { shape: { ...el.shape, fill: color } } }
      }
      return null
    }).filter(Boolean) as { id: string; data: Partial<CanvasElement> }[]

    if (updates.length) {
      const updatedCanvas = ElementManager.updateElements(canvas, updates)
      setCanvas(updatedCanvas)
    }

    if (!recentColors.includes(color)) {
      setRecentColors([color, ...recentColors.slice(0, 9)])
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement
    if (target?.dataset?.elementId) return
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = (e.clientX - rect.left) / canvas.zoom
    const y = (e.clientY - rect.top) / canvas.zoom
    
    // Handle pen tool click
    if (activeTool === 'pen') {
      handlePenToolClick(e)
      return
    }
    
    // Handle freehand drawing start
    if (activeTool === 'freehand' || activeTool === 'pencil') {
      handleFreehandStart(e)
      return
    }
    
    // Default selection box behavior
    setSelectionBox({ active: true, startX: x, startY: y, x, y, width: 0, height: 0 })
    setSelection({ ...selection, selectedIds: [] })
  }

  // Stats for navigation
  const [stats, setStats] = useState({
    cartItems: 0,
    activeProjects: 3,
    activeOrders: 3
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        handleUndo()
      }
      
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) {
        e.preventDefault()
        handleRedo()
      }
      
      if (e.key === 'Delete' && selection.selectedIds.length > 0) {
        e.preventDefault()
        handleDeleteSelected()
      }
      
      if (e.ctrlKey && e.key === 'c' && selection.selectedIds.length > 0) {
        e.preventDefault()
        handleCopy()
      }
      
      if (e.ctrlKey && e.key === 'v') {
        e.preventDefault()
        handlePaste()
      }
      
      if (e.ctrlKey && e.key === 'd' && selection.selectedIds.length > 0) {
        e.preventDefault()
        handleDuplicate()
      }
      
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        handleSave(true)
      }

      if (e.ctrlKey && e.key === 'g' && !e.shiftKey) {
        e.preventDefault()
        handleGroup()
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'G') {
        e.preventDefault()
        handleUngroup()
      }

      if (e.key === '?' && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        setShowShortcutsModal(true)
      }

      if (e.key === 'Escape') {
        if (contextMenu) {
          e.preventDefault()
          closeContextMenu()
        } else if (showShortcutsModal) {
          e.preventDefault()
          setShowShortcutsModal(false)
        }
      }

      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key) && selection.selectedIds.length > 0) {
        e.preventDefault()
        const step = e.shiftKey ? 10 : 1
        let dx = 0, dy = 0
        
        switch (e.key) {
          case 'ArrowLeft': dx = -step; break
          case 'ArrowRight': dx = step; break
          case 'ArrowUp': dy = -step; break
          case 'ArrowDown': dy = step; break
        }
        
        const beforeCanvas = canvas
        const newCanvas = TransformUtils.moveElements(canvas, selection.selectedIds, dx, dy)
        setCanvas(newCanvas)
        
        const command = CommandFactory.createMoveCommand(selection.selectedIds, beforeCanvas, newCanvas)
        historyRef.current.addCommand(command)
        setHistoryState(historyRef.current.getState())
      }

      if (e.key === ' ' && !isSpacePressed) {
        e.preventDefault()
        setIsSpacePressed(true)
      }
      
      // Tool shortcuts
      if (e.key === 'v' || e.key === 'V') {
        setActiveTool('select')
      }
      if (e.key === 'p' || e.key === 'P') {
        setActiveTool('pen')
      }
      if (e.key === 'b' || e.key === 'B') {
        setActiveTool('freehand')
      }
      
      // Escape to cancel drawing
      if (e.key === 'Escape') {
        if (penToolPoints.length > 0 || isDrawingFreehand) {
          handleCancelDrawing()
        } else {
          setSelection({ ...selection, selectedIds: [] })
        }
      }
      
      // Enter to complete pen tool path
      if (e.key === 'Enter' && penToolPoints.length >= 2) {
        handlePenToolComplete(e.shiftKey) // Shift+Enter closes the path
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        setIsSpacePressed(false)
        setIsPanning(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [canvas, selection, showShortcutsModal, isSpacePressed])

  const handleUndo = () => {
    const command = historyRef.current.undo()
    if (!command) return

    // Apply undo based on command type
    let newCanvas = canvas
    
    switch (command.type) {
      case 'add':
        newCanvas = ElementManager.deleteElements(canvas, command.elementIds)
        break
      case 'delete':
        if (command.beforeState) {
          command.beforeState.forEach((el: CanvasElement) => {
            newCanvas = ElementManager.addElement(newCanvas, el)
          })
        }
        break
      case 'move':
      case 'resize':
      case 'rotate':
      case 'style':
        if (command.beforeState) {
          const updates = command.beforeState.map((state: any) => ({
            id: state.id,
            data: state
          }))
          newCanvas = ElementManager.updateElements(canvas, updates)
        }
        break
    }

    setCanvas(newCanvas)
    setHistoryState(historyRef.current.getState())
    toast.success('Undone', { icon: '↶' })
  }

  const handleRedo = () => {
    const command = historyRef.current.redo()
    if (!command) return

    // Apply redo based on command type
    let newCanvas = canvas
    
    switch (command.type) {
      case 'add':
        if (command.afterState) {
          command.afterState.forEach((el: CanvasElement) => {
            newCanvas = ElementManager.addElement(newCanvas, el)
          })
        }
        break
      case 'delete':
        newCanvas = ElementManager.deleteElements(canvas, command.elementIds)
        break
      case 'move':
      case 'resize':
      case 'rotate':
      case 'style':
        if (command.afterState) {
          const updates = command.afterState.map((state: any) => ({
            id: state.id,
            data: state
          }))
          newCanvas = ElementManager.updateElements(canvas, updates)
        }
        break
    }

    setCanvas(newCanvas)
    setHistoryState(historyRef.current.getState())
    toast.success('Redone', { icon: '↷' })
  }

  const handleAddText = () => {
    const newElement: CanvasElement = {
      id: ElementManager.generateId(),
      type: 'text',
      name: 'Text',
      transform: {
        x: canvas.width / 2 - 100,
        y: canvas.height / 2 - 20,
        width: 200,
        height: 40,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: canvas.elements.length,
      text: {
        content: 'Double click to edit',
        fontSize: 24,
        fontFamily: 'Inter',
        fontWeight: 400,
        fontStyle: 'normal',
        textDecoration: 'none',
        textAlign: 'left',
        lineHeight: 1.5,
        letterSpacing: 0,
        color: '#000000'
      }
    }

    const beforeCanvas = canvas
    const newCanvas = ElementManager.addElement(canvas, newElement)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [newElement.id] })

    const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Text added', { icon: '✏️' })
  }

  const handleAddImage = (src: string) => {
    // Create image element to get natural dimensions
    const img = new Image()
    img.onload = () => {
      // Scale image to fit canvas while maintaining aspect ratio
      let width = img.naturalWidth
      let height = img.naturalHeight
      const maxWidth = canvas.width * 0.5
      const maxHeight = canvas.height * 0.5
      
      if (width > maxWidth) {
        height = height * (maxWidth / width)
        width = maxWidth
      }
      if (height > maxHeight) {
        width = width * (maxHeight / height)
        height = maxHeight
      }

      const newElement: CanvasElement = {
        id: ElementManager.generateId(),
        type: 'image',
        name: 'Image',
        transform: {
          x: canvas.width / 2 - width / 2,
          y: canvas.height / 2 - height / 2,
          width,
          height,
          rotation: 0,
          scaleX: 1,
          scaleY: 1
        },
        opacity: 1,
        visible: true,
        locked: false,
        zIndex: canvas.elements.length,
        image: {
          src,
          objectFit: 'cover',
          brightness: 100,
          contrast: 100,
          saturation: 100,
          blur: 0,
          opacity: 100
        }
      }

      const beforeCanvas = canvas
      const newCanvas = ElementManager.addElement(canvas, newElement)
      setCanvas(newCanvas)
      setSelection({ ...selection, selectedIds: [newElement.id] })

      const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
      historyRef.current.addCommand(command)
      setHistoryState(historyRef.current.getState())

      toast.success('Image added', { icon: '🖼️' })
    }
    img.src = src
  }

  const handleAddShape = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'polygon' | 'line' | 'arrow', options?: { fill?: string; stroke?: string; width?: number; height?: number }) => {
    const defaultSizes: Record<string, { width: number; height: number }> = {
      rectangle: { width: 120, height: 80 },
      circle: { width: 100, height: 100 },
      triangle: { width: 100, height: 87 },
      star: { width: 100, height: 100 },
      polygon: { width: 100, height: 100 },
      line: { width: 150, height: 4 },
      arrow: { width: 150, height: 40 }
    }
    const size = defaultSizes[shapeType] || { width: 100, height: 100 }
    
    const newElement: CanvasElement = {
      id: ElementManager.generateId(),
      type: 'shape',
      name: shapeType.charAt(0).toUpperCase() + shapeType.slice(1),
      transform: {
        x: canvas.width / 2 - (options?.width || size.width) / 2,
        y: canvas.height / 2 - (options?.height || size.height) / 2,
        width: options?.width || size.width,
        height: options?.height || size.height,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: canvas.elements.length,
      shape: {
        shapeType,
        fill: options?.fill || '#3B82F6',
        stroke: options?.stroke || '#1E40AF',
        strokeWidth: 2,
        cornerRadius: shapeType === 'rectangle' ? 8 : 0,
        points: shapeType === 'star' ? 5 : shapeType === 'polygon' ? 6 : undefined
      }
    }

    const beforeCanvas = canvas
    const newCanvas = ElementManager.addElement(canvas, newElement)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [newElement.id] })

    const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Shape added', { icon: '🔷' })
  }

  // Add shape from comprehensive shapes library
  const handleAddShapeFromLibrary = (shape: ShapeDefinition) => {
    // Map shape IDs to their base shape types
    const shapeTypeMap: Record<string, 'rectangle' | 'circle' | 'triangle' | 'star' | 'polygon' | 'line' | 'arrow'> = {
      'rectangle': 'rectangle',
      'rounded-rectangle': 'rectangle',
      'square': 'rectangle',
      'rounded-square': 'rectangle',
      'circle': 'circle',
      'ellipse': 'circle',
      'oval': 'circle',
      'ring': 'circle',
      'half-circle': 'circle',
      'quarter-circle': 'circle',
      'arc': 'circle',
      'triangle': 'triangle',
      'right-triangle': 'triangle',
      'equilateral-triangle': 'triangle',
      'isosceles-triangle': 'triangle',
      'star-4': 'star',
      'star-5': 'star',
      'star-6': 'star',
      'star-8': 'star',
      'star-12': 'star',
      'burst-8': 'star',
      'burst-12': 'star',
      'burst-16': 'star',
      'explosion': 'star',
      'seal': 'star',
      'line': 'line',
      'line-dashed': 'line',
      'line-dotted': 'line',
      'line-double': 'line',
      'line-wavy': 'line',
      'line-zigzag': 'line',
      'arrow-right': 'arrow',
      'arrow-left': 'arrow',
      'arrow-up': 'arrow',
      'arrow-down': 'arrow',
      'arrow-double': 'arrow',
      'arrow-double-vertical': 'arrow',
      'arrow-curved-right': 'arrow',
      'arrow-curved-left': 'arrow',
      'arrow-u-turn': 'arrow',
      'arrow-circular': 'arrow',
      'arrow-chevron': 'arrow',
      'arrow-chevron-double': 'arrow',
      'arrow-striped': 'arrow',
      'arrow-notched': 'arrow',
      'arrow-pentagon': 'arrow',
      'arrow-bent-up': 'arrow',
      'arrow-bent-down': 'arrow',
      'pentagon': 'polygon',
      'hexagon': 'polygon',
      'heptagon': 'polygon',
      'octagon': 'polygon',
      'nonagon': 'polygon',
      'decagon': 'polygon',
      'diamond': 'polygon',
      'parallelogram': 'rectangle',
      'trapezoid': 'rectangle',
      'rhombus': 'polygon',
      'cross': 'rectangle',
      'plus': 'rectangle',
      // Callouts - render as rectangles with rounded corners
      'callout-rectangle': 'rectangle',
      'callout-rounded': 'rectangle',
      'callout-oval': 'circle',
      'callout-cloud': 'circle',
      'thought-bubble': 'circle',
      'speech-bubble-left': 'rectangle',
      'speech-bubble-right': 'rectangle',
      'shout': 'star',
      // Flowchart shapes
      'process': 'rectangle',
      'decision': 'polygon',
      'terminator': 'rectangle',
      'data': 'rectangle',
      'document': 'rectangle',
      'database': 'rectangle',
      // Badges
      'badge-circle': 'circle',
      'badge-star': 'star',
      'badge-shield': 'polygon',
      'badge-ribbon': 'rectangle',
      'badge-banner': 'rectangle',
      'badge-hexagon': 'polygon',
      'badge-diamond': 'polygon',
      'badge-seal': 'star',
      'badge-pentagon': 'polygon',
      'badge-square': 'rectangle',
      // Frames
      'frame-simple': 'rectangle',
      'frame-double': 'rectangle',
      'frame-shadow': 'rectangle',
      'frame-rounded': 'rectangle',
      'frame-ornate': 'rectangle',
      'frame-polaroid': 'rectangle',
      'frame-film-strip': 'rectangle',
      'frame-stamp': 'rectangle',
      // Banners
      'banner-horizontal': 'rectangle',
      'banner-wave': 'rectangle',
      'banner-curved': 'rectangle',
      'banner-scroll': 'rectangle',
      'banner-corner': 'rectangle',
      'banner-diagonal': 'rectangle',
      'banner-bookmark': 'rectangle',
      'ribbon': 'rectangle',
      // Decorative
      'heart': 'circle',
      'cloud': 'circle',
      'lightning': 'polygon',
      'raindrop': 'circle',
      'snowflake': 'star',
      'flower': 'star',
      'leaf': 'circle',
      'music-note': 'rectangle',
      'sparkle': 'star',
      'sun': 'star',
      'spiral': 'circle',
      'wave': 'rectangle',
      'yin-yang': 'circle',
      'eye': 'circle',
      'lips': 'circle',
      'footprint': 'circle',
      'paw-print': 'circle',
      // Icons
      'icon-check': 'rectangle',
      'icon-x': 'rectangle',
      'icon-info': 'circle',
      'icon-warning': 'triangle',
      'icon-question': 'circle',
      'icon-lock': 'rectangle',
      'icon-unlock': 'rectangle',
      'icon-home': 'polygon',
      'icon-settings': 'circle',
      'icon-search': 'circle',
      'icon-mail': 'rectangle',
      'icon-phone': 'rectangle',
      'icon-user': 'circle',
      'icon-location': 'polygon',
      'icon-calendar': 'rectangle',
      'icon-clock': 'circle',
      'icon-play': 'triangle',
      'icon-pause': 'rectangle',
      'icon-volume': 'polygon',
      'icon-camera': 'rectangle'
    }

    // Determine the base shape type
    let shapeType: 'rectangle' | 'circle' | 'triangle' | 'star' | 'polygon' | 'line' | 'arrow' = shapeTypeMap[shape.id] || 'rectangle'

    // Handle special cases by category - more specific matching
    if (shape.category === 'arrows') {
      shapeType = shape.id.includes('line') ? 'line' : 'arrow'
    } else if (shape.category === 'decorative') {
      if (shape.id.includes('star') || shape.id.includes('burst') || shape.id.includes('sparkle') || shape.id.includes('snowflake') || shape.id.includes('sun') || shape.id.includes('flower')) {
        shapeType = 'star'
      }
    }

    // Get dimensions from shape definition or use defaults
    const width = shape.defaultWidth || 100
    const height = shape.defaultHeight || 100

    // Determine corner radius and polygon points based on shape
    let cornerRadius = 0
    let points: number | undefined = shape.points

    if (shape.id.includes('rounded')) {
      cornerRadius = Math.min(width, height) * 0.2
    }

    // Set polygon/star points for specific shapes if not already defined
    if (!points) {
      const shapePoints: Record<string, number> = {
        // Polygons
        'pentagon': 5, 'hexagon': 6, 'heptagon': 7, 'octagon': 8, 'nonagon': 9, 'decagon': 10,
        'diamond': 4, 'rhombus': 4,
        'badge-pentagon': 5, 'badge-hexagon': 6, 'badge-diamond': 4, 'icon-home': 5,
        // Stars
        'star-4': 4, 'star-5': 5, 'star-6': 6, 'star-8': 8, 'star-12': 12,
        'burst-8': 8, 'burst-12': 12, 'burst-16': 16,
        'badge-star': 5, 'badge-seal': 8, 'sparkle': 4,
        'snowflake': 6, 'flower': 6, 'sun': 12
      }
      if (shapePoints[shape.id]) {
        points = shapePoints[shape.id]
      }
    }

    const newElement: CanvasElement = {
      id: ElementManager.generateId(),
      type: 'shape',
      name: shape.name,
      transform: {
        x: canvas.width / 2 - width / 2,
        y: canvas.height / 2 - height / 2,
        width,
        height,
        rotation: 0,
        scaleX: 1,
        scaleY: 1
      },
      opacity: 1,
      visible: true,
      locked: false,
      zIndex: canvas.elements.length,
      shape: {
        shapeType,
        fill: quickShapeColor,
        stroke: darken(quickShapeColor, 20),
        strokeWidth: 2,
        cornerRadius,
        points,
        customShapeId: shape.id // Store original shape ID for custom SVG path lookup
      }
    }

    const newCanvas = ElementManager.addElement(canvas, newElement)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [newElement.id] })

    const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success(`Added ${shape.name}`, { icon: shape.icon })
  }

  // ============================================
  // DRAWING TOOL HANDLERS
  // ============================================

  // Start pen tool drawing - adds a point on click
  const handlePenToolClick = (e: React.MouseEvent) => {
    if (activeTool !== 'pen') return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / canvas.zoom
    const y = (e.clientY - rect.top) / canvas.zoom
    
    const newPoint: PathPoint = {
      x,
      y,
      type: 'corner'
    }
    
    // If holding Shift, make smooth point with automatic handles
    if (e.shiftKey && penToolPoints.length >= 1) {
      const prevPoint = penToolPoints[penToolPoints.length - 1]
      const handles = calculateSymmetricHandles(
        penToolPoints.length >= 2 ? penToolPoints[penToolPoints.length - 2] : prevPoint,
        prevPoint,
        newPoint,
        0.3
      )
      // Update previous point with handles
      const updatedPrevPoint = { ...prevPoint, handleOut: handles.handleOut }
      const updatedPoints = [...penToolPoints.slice(0, -1), updatedPrevPoint]
      newPoint.handleIn = handles.handleIn
      newPoint.type = 'smooth'
      setPenToolPoints([...updatedPoints, newPoint])
    } else {
      setPenToolPoints([...penToolPoints, newPoint])
    }
    
    setDrawingState({ ...drawingState, isDrawing: true, tool: 'pen' })
  }
  
  // Complete pen tool path - double click or close path
  const handlePenToolComplete = (close: boolean = false) => {
    if (penToolPoints.length < 2) {
      setPenToolPoints([])
      setDrawingState(defaultDrawingState)
      return
    }
    
    const pathProps: PathProperties = {
      points: penToolPoints,
      closed: close,
      fill: close ? currentFillColor : 'none',
      stroke: currentStrokeColor,
      strokeWidth: currentStrokeWidth,
      strokeLineCap: 'round',
      strokeLineJoin: 'round',
      fillRule: 'nonzero'
    }
    
    const newElement = createPathElement(pathProps, { x: 0, y: 0 })
    newElement.zIndex = canvas.elements.length
    
    const newCanvas = ElementManager.addElement(canvas, newElement)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [newElement.id] })
    
    const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    // Reset pen tool
    setPenToolPoints([])
    setDrawingState(defaultDrawingState)
    
    toast.success('Path created', { icon: '✏️' })
  }
  
  // Start freehand drawing
  const handleFreehandStart = (e: React.MouseEvent) => {
    if (activeTool !== 'freehand' && activeTool !== 'pencil') return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / canvas.zoom
    const y = (e.clientY - rect.top) / canvas.zoom
    
    setFreehandPoints([{ x, y }])
    setIsDrawingFreehand(true)
    setDrawingState({ ...drawingState, isDrawing: true, tool: 'freehand' })
  }
  
  // Continue freehand drawing
  const handleFreehandMove = (e: React.MouseEvent) => {
    if (!isDrawingFreehand) return
    
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = (e.clientX - rect.left) / canvas.zoom
    const y = (e.clientY - rect.top) / canvas.zoom
    
    setFreehandPoints(prev => [...prev, { x, y }])
  }
  
  // End freehand drawing
  const handleFreehandEnd = () => {
    if (!isDrawingFreehand || freehandPoints.length < 3) {
      setFreehandPoints([])
      setIsDrawingFreehand(false)
      setDrawingState(defaultDrawingState)
      return
    }
    
    // Simplify the path to reduce point count
    const simplified = simplifyPath(freehandPoints, 2)
    
    const freehandProps: FreehandProperties = {
      points: simplified,
      smoothing: brushSettings.smoothing,
      stroke: currentStrokeColor,
      strokeWidth: currentStrokeWidth,
      strokeLineCap: 'round'
    }
    
    const newElement = createFreehandElement(freehandProps, { x: 0, y: 0 })
    newElement.zIndex = canvas.elements.length
    
    const newCanvas = ElementManager.addElement(canvas, newElement)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [newElement.id] })
    
    const command = CommandFactory.createAddCommand([newElement.id], newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    // Reset freehand
    setFreehandPoints([])
    setIsDrawingFreehand(false)
    setDrawingState(defaultDrawingState)
    
    toast.success('Freehand path created', { icon: '🖌️' })
  }
  
  // Cancel current drawing
  const handleCancelDrawing = () => {
    setPenToolPoints([])
    setFreehandPoints([])
    setIsDrawingFreehand(false)
    setDrawingState(defaultDrawingState)
  }

  const handleDeleteSelected = () => {
    if (selection.selectedIds.length === 0) return

    const beforeCanvas = canvas
    const command = CommandFactory.createDeleteCommand(selection.selectedIds, beforeCanvas)
    
    const newCanvas = ElementManager.deleteElements(canvas, selection.selectedIds)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: [] })

    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Deleted', { icon: '🗑️' })
  }

  const clipboard = useRef<CanvasElement[]>([])

  const handleCopy = () => {
    const elements = ElementManager.getElements(canvas, selection.selectedIds)
    clipboard.current = elements
    toast.success('Copied', { icon: '📋' })
  }

  const handlePaste = () => {
    if (clipboard.current.length === 0) return

    const newIds: string[] = []
    let newCanvas = canvas

    clipboard.current.forEach(el => {
      const newId = ElementManager.generateId()
      newIds.push(newId)
      
      const newElement: CanvasElement = {
        ...el,
        id: newId,
        name: `${el.name} Copy`,
        transform: {
          ...el.transform,
          x: el.transform.x + 20,
          y: el.transform.y + 20
        }
      }
      
      newCanvas = ElementManager.addElement(newCanvas, newElement)
    })

    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: newIds })

    const command = CommandFactory.createAddCommand(newIds, newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Pasted', { icon: '📄' })
  }

  const handleDuplicate = () => {
    const { canvas: newCanvas, newIds } = ElementManager.duplicateElements(canvas, selection.selectedIds)
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: newIds })

    const command = CommandFactory.createAddCommand(newIds, newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Duplicated', { icon: '📑' })
  }

  const handleGroup = () => {
    if (selection.selectedIds.length < 2) {
      toast.error('Select at least 2 elements to group')
      return
    }

    const beforeCanvas = canvas
    const { canvas: newCanvas, groupId } = ElementManager.groupElements(canvas, selection.selectedIds)
    
    if (groupId) {
      setCanvas(newCanvas)
      setSelection({ ...selection, selectedIds: [groupId] })
      setExpandedGroups(new Set([...expandedGroups, groupId]))
      
      const command = CommandFactory.createAddCommand([groupId], newCanvas)
      command.beforeState = beforeCanvas.elements.filter(el => selection.selectedIds.includes(el.id))
      historyRef.current.addCommand(command)
      setHistoryState(historyRef.current.getState())
      
      toast.success('Elements grouped', { icon: '📦' })
    }
  }

  const handleUngroup = () => {
    const selectedElement = ElementManager.getElement(canvas, selection.selectedIds[0])
    if (!selectedElement || selectedElement.type !== 'group') {
      toast.error('Select a group to ungroup')
      return
    }

    const beforeCanvas = canvas
    const newCanvas = ElementManager.ungroupElements(canvas, selectedElement.id)
    const childIds = selectedElement.childIds || []
    
    setCanvas(newCanvas)
    setSelection({ ...selection, selectedIds: childIds })
    setExpandedGroups(prev => {
      const next = new Set(prev)
      next.delete(selectedElement.id)
      return next
    })
    
    const command = CommandFactory.createDeleteCommand([selectedElement.id], beforeCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())
    
    toast.success('Group ungrouped', { icon: '📂' })
  }

  const toggleGroupExpanded = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev)
      if (next.has(groupId)) {
        next.delete(groupId)
      } else {
        next.add(groupId)
      }
      return next
    })
  }

  // Context menu handlers
  const handleContextMenu = (e: React.MouseEvent, elementId?: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (elementId) {
      // If clicking on an element, select it if not already selected
      if (!selection.selectedIds.includes(elementId)) {
        setSelection({ ...selection, selectedIds: [elementId] })
      }
      setContextMenu({ x: e.clientX, y: e.clientY, type: 'element', elementId })
    } else {
      setContextMenu({ x: e.clientX, y: e.clientY, type: 'canvas' })
    }
  }

  const closeContextMenu = () => {
    setContextMenu(null)
  }

  const handleBringForward = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    const element = ElementManager.getElement(canvas, elementId)
    if (!element) return

    const maxZIndex = Math.max(...canvas.elements.map(el => el.zIndex))
    if (element.zIndex < maxZIndex) {
      const newCanvas = ElementManager.updateElement(canvas, elementId, { zIndex: element.zIndex + 1 })
      setCanvas(newCanvas)
      toast.success('Brought forward')
    }
    closeContextMenu()
  }

  const handleSendBackward = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    const element = ElementManager.getElement(canvas, elementId)
    if (!element) return

    if (element.zIndex > 0) {
      const newCanvas = ElementManager.updateElement(canvas, elementId, { zIndex: element.zIndex - 1 })
      setCanvas(newCanvas)
      toast.success('Sent backward')
    }
    closeContextMenu()
  }

  const handleBringToFront = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    const maxZIndex = Math.max(...canvas.elements.map(el => el.zIndex))
    const newCanvas = ElementManager.updateElement(canvas, elementId, { zIndex: maxZIndex + 1 })
    setCanvas(newCanvas)
    toast.success('Brought to front')
    closeContextMenu()
  }

  const handleSendToBack = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    // Shift all other elements up and set this one to 0
    let newCanvas = canvas
    canvas.elements.forEach(el => {
      if (el.id !== elementId && el.zIndex >= 0) {
        newCanvas = ElementManager.updateElement(newCanvas, el.id, { zIndex: el.zIndex + 1 })
      }
    })
    newCanvas = ElementManager.updateElement(newCanvas, elementId, { zIndex: 0 })
    setCanvas(newCanvas)
    toast.success('Sent to back')
    closeContextMenu()
  }

  const handleToggleLock = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    const element = ElementManager.getElement(canvas, elementId)
    if (!element) return

    const newCanvas = ElementManager.updateElement(canvas, elementId, { locked: !element.locked })
    setCanvas(newCanvas)
    toast.success(element.locked ? 'Element unlocked' : 'Element locked', { icon: element.locked ? '🔓' : '🔒' })
    closeContextMenu()
  }

  const handleToggleVisibility = () => {
    if (selection.selectedIds.length === 0) return
    const elementId = selection.selectedIds[0]
    const element = ElementManager.getElement(canvas, elementId)
    if (!element) return

    const newCanvas = ElementManager.updateElement(canvas, elementId, { visible: !element.visible })
    setCanvas(newCanvas)
    toast.success(element.visible ? 'Element hidden' : 'Element shown', { icon: element.visible ? '👁️‍🗨️' : '👁️' })
    closeContextMenu()
  }

  const handleSave = useCallback((showToast = true) => {
    setSaveStatus('saving')
    
    const project = {
      id: localStorage.getItem('current_design_id') || 'project_' + Date.now(),
      name: projectName,
      canvas,
      guides,
      createdAt: localStorage.getItem('current_design_created') || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft'
    }

    localStorage.setItem('current_design', JSON.stringify(project))
    localStorage.setItem('current_design_id', project.id)
    localStorage.setItem('current_design_created', project.createdAt)
    
    setSaveStatus('saved')
    setLastSaved(new Date())
    hasUnsavedChanges.current = false
    
    if (showToast) {
      toast.success('Design saved!', { icon: '💾' })
    }
  }, [canvas, guides, projectName])

  // Load saved design on mount
  useEffect(() => {
    const savedDesign = localStorage.getItem('current_design')
    if (savedDesign) {
      try {
        const project = JSON.parse(savedDesign)
        if (project.canvas) {
          setCanvas(project.canvas)
        }
        if (project.guides) {
          setGuides(project.guides)
        }
        if (project.name) {
          setProjectName(project.name)
        }
        setLastSaved(new Date(project.updatedAt))
        toast.success('Previous design loaded', { icon: '📂' })
      } catch (e) {
        console.error('Failed to load saved design:', e)
      }
    }
  }, [])

  // Mark as unsaved when canvas changes
  useEffect(() => {
    hasUnsavedChanges.current = true
    setSaveStatus('unsaved')
  }, [canvas.elements, canvas.backgroundColor, canvas.width, canvas.height])

  // Autosave every 30 seconds if there are unsaved changes
  useEffect(() => {
    const autosaveInterval = setInterval(() => {
      if (hasUnsavedChanges.current) {
        handleSave(false) // Silent save
      }
    }, 30000) // 30 seconds

    return () => clearInterval(autosaveInterval)
  }, [handleSave])

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.current) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [])

  const handleExport = async (format?: 'png' | 'jpg' | 'svg' | 'pdf') => {
    const targetFormat = format ?? exportOptions.format
    const width = exportOptions.width || canvas.width
    const height = exportOptions.height || canvas.height
    const quality = exportOptions.quality / 100
    const transparent = targetFormat !== 'jpg' && exportOptions.transparent

    try {
      toast.loading(`Exporting ${width}x${height} ${targetFormat.toUpperCase()}...`, { icon: '📥' })

      if (targetFormat === 'svg') {
        await exportAsSVG(width, height, transparent)
      } else if (targetFormat === 'pdf') {
        await exportAsPDF(width, height, transparent)
      } else {
        await exportAsImage(targetFormat, width, height, quality, transparent)
      }

      toast.success(`Design exported as ${targetFormat.toUpperCase()}!`, { icon: '✅' })
    } catch (error) {
      console.error('Export error:', error)
      toast.error('Export failed. Please try again.')
    }
  }

  const exportAsImage = async (format: 'png' | 'jpg', width: number, height: number, quality: number, transparent: boolean) => {
    // Create offscreen canvas
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = width
    exportCanvas.height = height
    const ctx = exportCanvas.getContext('2d')
    if (!ctx) throw new Error('Failed to get canvas context')

    // Fill background
    if (!transparent || format === 'jpg') {
      ctx.fillStyle = canvas.backgroundColor
      ctx.fillRect(0, 0, width, height)
    }

    // Scale for export dimensions
    const scaleX = width / canvas.width
    const scaleY = height / canvas.height
    ctx.scale(scaleX, scaleY)

    // Render all visible elements (sync version - images loaded separately)
    for (const element of canvas.elements) {
      if (element.visible === false) continue

      const { x, y, width: w, height: h, rotation } = element.transform

      ctx.save()
      ctx.translate(x + w / 2, y + h / 2)
      ctx.rotate((rotation || 0) * Math.PI / 180)

      if (element.type === 'text' && element.text) {
        ctx.font = `${element.text.fontWeight || 400} ${element.text.fontSize}px ${element.text.fontFamily}`
        ctx.fillStyle = element.text.color
        ctx.textAlign = (element.text.textAlign as CanvasTextAlign) || 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(element.text.content, 0, 0)
      } else if (element.type === 'shape' && element.shape) {
        ctx.fillStyle = element.shape.fill || '#000000'
        if (element.shape.stroke) {
          ctx.strokeStyle = element.shape.stroke
          ctx.lineWidth = element.shape.strokeWidth || 1
        }

        const shapeType = element.shape.shapeType
        if (shapeType === 'rectangle') {
          ctx.fillRect(-w / 2, -h / 2, w, h)
          if (element.shape.stroke) {
            ctx.strokeRect(-w / 2, -h / 2, w, h)
          }
        } else if (shapeType === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, Math.min(w, h) / 2, 0, Math.PI * 2)
          ctx.fill()
          if (element.shape.stroke) ctx.stroke()
        } else if (shapeType === 'triangle') {
          ctx.beginPath()
          ctx.moveTo(0, -h / 2)
          ctx.lineTo(-w / 2, h / 2)
          ctx.lineTo(w / 2, h / 2)
          ctx.closePath()
          ctx.fill()
          if (element.shape.stroke) ctx.stroke()
        }
      } else if (element.type === 'image' && element.image?.src) {
        try {
          const img = new window.Image()
          img.crossOrigin = 'anonymous'
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve()
            img.onerror = () => reject(new Error('Image load failed'))
            img.src = element.image!.src
          })
          ctx.drawImage(img, -w / 2, -h / 2, w, h)
        } catch (e) {
          console.warn('Failed to load image for export:', e)
        }
      }

      ctx.restore()
    }

    // Convert to blob and download
    const blob = await new Promise<Blob>((resolve, reject) => {
      exportCanvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Failed to create blob')),
        format === 'jpg' ? 'image/jpeg' : 'image/png',
        quality
      )
    })

    downloadBlob(blob, `design.${format}`)
  }

  const exportAsSVG = async (width: number, height: number, transparent: boolean) => {
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${canvas.width} ${canvas.height}">`

    // Background
    if (!transparent) {
      svg += `<rect width="${canvas.width}" height="${canvas.height}" fill="${canvas.backgroundColor}"/>`
    }

    // Render elements
    canvas.elements.forEach(element => {
      if (element.visible === false) return

      const { x, y, width: w, height: h, rotation } = element.transform
      const cx = x + w / 2
      const cy = y + h / 2
      const transform = `translate(${cx}, ${cy}) rotate(${rotation || 0})`

      if (element.type === 'text' && element.text) {
        const anchor = element.text.textAlign === 'center' ? 'middle' : element.text.textAlign === 'right' ? 'end' : 'start'
        svg += `<text transform="${transform}" font-family="${element.text.fontFamily}" font-size="${element.text.fontSize}" font-weight="${element.text.fontWeight || 400}" fill="${element.text.color}" text-anchor="${anchor}" dominant-baseline="middle">${escapeXml(element.text.content)}</text>`
      } else if (element.type === 'shape' && element.shape) {
        const fillAttr = `fill="${element.shape.fill || '#000000'}"`
        const strokeAttr = element.shape.stroke ? `stroke="${element.shape.stroke}" stroke-width="${element.shape.strokeWidth || 1}"` : ''
        const shapeType = element.shape.shapeType

        if (shapeType === 'rectangle') {
          svg += `<rect transform="${transform}" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" ${fillAttr} ${strokeAttr}/>`
        } else if (shapeType === 'circle') {
          const r = Math.min(w, h) / 2
          svg += `<circle transform="${transform}" cx="0" cy="0" r="${r}" ${fillAttr} ${strokeAttr}/>`
        } else if (shapeType === 'triangle') {
          const points = `0,${-h / 2} ${-w / 2},${h / 2} ${w / 2},${h / 2}`
          svg += `<polygon transform="${transform}" points="${points}" ${fillAttr} ${strokeAttr}/>`
        }
      } else if (element.type === 'image' && element.image?.src) {
        svg += `<image transform="${transform}" x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" href="${escapeXml(element.image.src)}"/>`
      }
    })

    svg += '</svg>'

    const blob = new Blob([svg], { type: 'image/svg+xml' })
    downloadBlob(blob, 'design.svg')
  }

  const escapeXml = (str: string) => {
    return str.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;'
        case '>': return '&gt;'
        case '&': return '&amp;'
        case "'": return '&apos;'
        case '"': return '&quot;'
        default: return c
      }
    })
  }

  const exportAsPDF = async (width: number, height: number, transparent: boolean) => {
    // For PDF, we'll export as PNG first, then embed in a simple PDF
    // This is a simplified approach - for production, use jsPDF library
    await exportAsImage('png', width, height, 1, transparent)
    toast('PDF export uses PNG format. For advanced PDF features, integrate jsPDF library.', { icon: 'ℹ️' })
  }

  const downloadBlob = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleZoom = (delta: number) => {
    const newZoom = Math.max(0.1, Math.min(4, canvas.zoom + delta))
    setCanvas({ ...canvas, zoom: newZoom })
  }

  const setZoomLevel = (zoom: number) => {
    const newZoom = Math.max(0.1, Math.min(4, zoom))
    setCanvas({ ...canvas, zoom: newZoom })
  }

  const handleFitToScreen = () => {
    if (!canvasContainerRef.current) return
    const container = canvasContainerRef.current
    const containerWidth = container.clientWidth - 100
    const containerHeight = container.clientHeight - 100
    const scaleX = containerWidth / canvas.width
    const scaleY = containerHeight / canvas.height
    const newZoom = Math.min(scaleX, scaleY, 1)
    setCanvas({ ...canvas, zoom: newZoom })
    setPanOffset({ x: 0, y: 0 })
  }

  const handleActualSize = () => {
    setCanvas({ ...canvas, zoom: 1 })
    setPanOffset({ x: 0, y: 0 })
  }

  const handleZoomToSelection = () => {
    if (selection.selectedIds.length === 0 || !canvasContainerRef.current) return
    const selectedElements = ElementManager.getElements(canvas, selection.selectedIds)
    if (selectedElements.length === 0) return
    
    // Calculate bounding box of selected elements
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    selectedElements.forEach(el => {
      minX = Math.min(minX, el.transform.x)
      minY = Math.min(minY, el.transform.y)
      maxX = Math.max(maxX, el.transform.x + el.transform.width)
      maxY = Math.max(maxY, el.transform.y + el.transform.height)
    })
    
    const selectionWidth = maxX - minX
    const selectionHeight = maxY - minY
    const container = canvasContainerRef.current
    const containerWidth = container.clientWidth - 200
    const containerHeight = container.clientHeight - 200
    const scaleX = containerWidth / selectionWidth
    const scaleY = containerHeight / selectionHeight
    const newZoom = Math.min(scaleX, scaleY, 2)
    
    setCanvas({ ...canvas, zoom: newZoom })
    
    // Center on selection
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2
    const offsetX = (container.clientWidth / 2) - (centerX * newZoom)
    const offsetY = (container.clientHeight / 2) - (centerY * newZoom)
    setPanOffset({ x: offsetX, y: offsetY })
  }

  const handleAlign = (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    if (selection.selectedIds.length === 0) return

    const beforeCanvas = canvas
    const newCanvas = TransformUtils.alignElements(canvas, selection.selectedIds, alignment, alignToCanvas ? 'canvas' : 'selection')
    setCanvas(newCanvas)

    const command = CommandFactory.createMoveCommand(selection.selectedIds, beforeCanvas, newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    const alignTarget = alignToCanvas ? 'canvas' : 'selection'
    toast.success(`Aligned to ${alignTarget}`, { icon: '📐' })
  }

  const handleDistribute = (direction: 'horizontal' | 'vertical') => {
    if (selection.selectedIds.length < 3) {
      toast.error('Select at least 3 elements to distribute')
      return
    }

    const beforeCanvas = canvas
    const newCanvas = TransformUtils.distributeElements(canvas, selection.selectedIds, direction)
    setCanvas(newCanvas)

    const command = CommandFactory.createMoveCommand(selection.selectedIds, beforeCanvas, newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success(`Distributed ${direction}ly`, { icon: '↔️' })
  }

  const handleReorder = (direction: 'front' | 'forward' | 'backward' | 'back') => {
    if (selection.selectedIds.length !== 1) return

    const beforeCanvas = canvas
    const newCanvas = ElementManager.reorderElement(canvas, selection.selectedIds[0], direction)
    setCanvas(newCanvas)

    const command = CommandFactory.createReorderCommand(beforeCanvas, newCanvas)
    historyRef.current.addCommand(command)
    setHistoryState(historyRef.current.getState())

    toast.success('Reordered', { icon: '🔄' })
  }

  const toggleElementVisibility = (id: string) => {
    const element = ElementManager.getElement(canvas, id)
    if (!element) return

    const newCanvas = ElementManager.updateElement(canvas, id, { visible: !element.visible })
    setCanvas(newCanvas)
  }

  const toggleElementLock = (id: string) => {
    const element = ElementManager.getElement(canvas, id)
    if (!element) return

    const newCanvas = ElementManager.updateElement(canvas, id, { locked: !element.locked })
    setCanvas(newCanvas)
  }

  const loadTemplate = (template: Template) => {
    // Check if this is a mockup template
    if (template.category === 'mockups' && template.printArea) {
      // For mockups, set canvas to print area dimensions
      // This is the area where the design will be printed
      setCanvas({
        ...canvas,
        width: template.printArea.width * 4, // Scale up for better detail
        height: template.printArea.height * 4,
        backgroundColor: '#FFFFFF',
        elements: []
      })
      
      // Find corresponding product mockup for preview
      const mockupMatch = PRODUCT_MOCKUPS.find(m => 
        m.name.toLowerCase().includes(template.name.toLowerCase().replace(' mockup', '').trim()) ||
        template.id.includes(m.id.toLowerCase())
      )
      
      if (mockupMatch) {
        setSelectedMockup(mockupMatch.id)
        setShowMockupPreview(true)
      }
      
      setShowTemplates(false)
      setSelection({ ...selection, selectedIds: [] })
      historyRef.current.clear()
      setHistoryState(historyRef.current.getState())
      toast.success(`${template.name} ready! Design your print here`, { icon: '🎨' })
    } else {
      // Regular template
      setCanvas({
        ...canvas,
        width: template.width,
        height: template.height,
        elements: template.elements || []
      })
      setShowTemplates(false)
      setSelection({ ...selection, selectedIds: [] })
      historyRef.current.clear()
      setHistoryState(historyRef.current.getState())
      toast.success('Template loaded!', { icon: '📄' })
    }
  }

  // Mouse event handlers for drag and resize
  const handleMouseDown = (e: React.MouseEvent, elementId: string, handle?: 'nw' | 'ne' | 'sw' | 'se' | 'n' | 's' | 'e' | 'w') => {
    e.stopPropagation()
    
    const element = ElementManager.getElement(canvas, elementId)
    if (!element || element.locked) return

    if (handle) {
      // Resize mode
      setResizeState({
        elementId,
        handle,
        startX: e.clientX,
        startY: e.clientY,
        startTransform: { ...element.transform }
      })
      setSelection({ ...selection, selectedIds: [elementId], isResizing: true })
    } else {
      // Drag mode
      setDragState({
        elementId,
        startX: e.clientX,
        startY: e.clientY,
        elementStartX: element.transform.x,
        elementStartY: element.transform.y
      })
      setSelection({ ...selection, selectedIds: [elementId], isDragging: true })
    }
  }

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (guideDragState && guideDragState.guideId) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return

      const guide = guides.find(g => g.id === guideDragState.guideId)
      if (!guide) return

      let newPosition: number
      if (guide.type === 'vertical') {
        newPosition = (e.clientX - rect.left) / canvas.zoom
      } else {
        newPosition = (e.clientY - rect.top) / canvas.zoom
      }

      // Snap to grid if enabled
      if (canvas.snapToGrid) {
        newPosition = TransformUtils.snapToGrid(newPosition, canvas.gridSize)
      }

      const newGuides = guides.map(g => 
        g.id === guideDragState.guideId ? { ...g, position: newPosition } : g
      )
      setGuides(newGuides)
      return
    }

    if (dragState && dragState.elementId) {
      const elementId = dragState.elementId
      const dx = (e.clientX - dragState.startX) / canvas.zoom
      const dy = (e.clientY - dragState.startY) / canvas.zoom

      let newX = dragState.elementStartX + dx
      let newY = dragState.elementStartY + dy

      if (canvas.snapToGrid) {
        newX = TransformUtils.snapToGrid(newX, canvas.gridSize)
        newY = TransformUtils.snapToGrid(newY, canvas.gridSize)
      }

      if (showGuides) {
        const guideSnapThreshold = 6
        guides.forEach(guide => {
          if (guide.type === 'vertical' && Math.abs(newX - guide.position) <= guideSnapThreshold) {
            newX = guide.position
          }
          if (guide.type === 'horizontal' && Math.abs(newY - guide.position) <= guideSnapThreshold) {
            newY = guide.position
          }
        })
      }

      const newCanvas = ElementManager.updateElement(canvas, elementId, {
        transform: {
          ...ElementManager.getElement(canvas, elementId)!.transform,
          x: newX,
          y: newY
        }
      })
      setCanvas(newCanvas)
    }

    if (resizeState && resizeState.handle) {
      const element = ElementManager.getElement(canvas, resizeState.elementId!)
      if (!element) return

      const dx = (e.clientX - resizeState.startX) / canvas.zoom
      const dy = (e.clientY - resizeState.startY) / canvas.zoom

      const newTransform = TransformUtils.resizeElement(
        { ...element, transform: resizeState.startTransform },
        resizeState.handle,
        dx,
        dy,
        e.shiftKey // Maintain aspect ratio when shift is held
      )

      const newCanvas = ElementManager.updateElement(canvas, resizeState.elementId!, {
        transform: newTransform
      })
      setCanvas(newCanvas)
    }

    if (selectionBox.active) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (!rect) return
      const x = (e.clientX - rect.left) / canvas.zoom
      const y = (e.clientY - rect.top) / canvas.zoom
      const width = x - selectionBox.startX
      const height = y - selectionBox.startY
      setSelectionBox({
        ...selectionBox,
        x: Math.min(selectionBox.startX, x),
        y: Math.min(selectionBox.startY, y),
        width: Math.abs(width),
        height: Math.abs(height),
      })
    }
  }, [dragState, resizeState, canvas, guides, showGuides, selectionBox])

  const handleMouseUp = useCallback(() => {
    if (guideDragState) {
      const guide = guides.find(g => g.id === guideDragState.guideId)
      if (guide) {
        // Check if guide was dragged outside canvas bounds (remove it)
        const rect = canvasRef.current?.getBoundingClientRect()
        if (rect) {
          const isOutside = guide.type === 'vertical' 
            ? guide.position < -20 || guide.position > canvas.width + 20
            : guide.position < -20 || guide.position > canvas.height + 20
          
          if (isOutside) {
            handleRemoveGuide(guide.id)
          } else if (Math.abs(guide.position - guideDragState.startPosition) > 1) {
            // Add to history only if position changed significantly
            const oldGuides = guides.map(g => 
              g.id === guideDragState.guideId 
                ? { ...g, position: guideDragState.startPosition } 
                : g
            )
            const command: any = {
              type: 'style',
              elementIds: [],
              beforeState: { guides: oldGuides },
              afterState: { guides },
              timestamp: Date.now()
            }
            historyRef.current.addCommand(command)
            setHistoryState(historyRef.current.getState())
          }
        }
      }
      setGuideDragState(null)
    }

    if (dragState) {
      setDragState(null)
      setSelection({ ...selection, isDragging: false })
    }
    if (resizeState) {
      setResizeState(null)
      setSelection({ ...selection, isResizing: false })
    }

    if (selectionBox.active) {
      const selectedIds = canvas.elements
        .filter(el => !el.locked)
        .filter(el => {
          const bounds = TransformUtils.getElementBounds(el)
          return (
            bounds.x < selectionBox.x + selectionBox.width &&
            bounds.x + bounds.width > selectionBox.x &&
            bounds.y < selectionBox.y + selectionBox.height &&
            bounds.y + bounds.height > selectionBox.y
          )
        })
        .map(el => el.id)

      setSelection({ ...selection, selectedIds })
      setSelectionBox({ active: false, startX: 0, startY: 0, x: 0, y: 0, width: 0, height: 0 })
    }
  }, [dragState, resizeState, selection, canvas, selectionBox])

  useEffect(() => {
    if (dragState || resizeState || selectionBox.active || guideDragState) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [dragState, resizeState, selectionBox.active, guideDragState, handleMouseMove, handleMouseUp])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading designer...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  const selectedElements = ElementManager.getElements(canvas, selection.selectedIds)
  const selectedElement = selectedElements.length === 1 ? selectedElements[0] : null
  
  // Get current fill color from selected element
  const getSelectedFillColor = () => {
    if (!selectedElement) return currentFillColor
    if (selectedElement.type === 'shape' && selectedElement.shape) {
      return selectedElement.shape.fill
    }
    if (selectedElement.type === 'text' && selectedElement.text) {
      return selectedElement.text.color
    }
    return currentFillColor
  }

  return (
    <div className="h-screen bg-slate-900 flex overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 z-50">
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CB</span>
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Corporate Breeze
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </Link>
            <Link href="/dashboard/shop" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <ShoppingBag className="w-5 h-5" />
              <span>Shop</span>
            </Link>
            <Link href="/dashboard/orders" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <Package className="w-5 h-5" />
              <span>Orders</span>
              {stats.activeOrders > 0 && (
                <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{stats.activeOrders}</span>
              )}
            </Link>
            <Link href="/dashboard/designer" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl font-medium transition-all">
              <Palette className="w-5 h-5" />
              <span>Designer</span>
              <span className="ml-auto bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-0.5 rounded-full">New</span>
            </Link>
            <Link href="/dashboard/cart" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {stats.cartItems > 0 && (
                <span className="ml-auto bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">{stats.cartItems}</span>
              )}
            </Link>
            <Link href="/dashboard/chat" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <MessageSquare className="w-5 h-5" />
              <span>Support</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account</p>
            <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <Link href="/dashboard/billing" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <CreditCard className="w-5 h-5" />
              <span>Billing</span>
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white shadow-sm">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
            </div>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Designer Area */}
      <div className={`flex-1 min-w-0 flex flex-col ${darkMode ? 'bg-slate-900' : 'bg-slate-100'}`}>
        
        {/* Professional Menu Bar */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-900'} border-b px-2 py-1 flex items-center justify-between z-50`}>
          {/* Left: Menu Items */}
          <div className="flex items-center gap-1">
            {/* File Menu */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                File
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>New Design</span>
                    <span className="text-xs text-slate-500">Ctrl+N</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Open...</span>
                    <span className="text-xs text-slate-500">Ctrl+O</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => handleSave(true)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Save</span>
                    <span className="text-xs text-slate-500">Ctrl+S</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Save As...</span>
                    <span className="text-xs text-slate-500">Ctrl+Shift+S</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => setActivePanel('export')} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Export...</span>
                    <span className="text-xs text-slate-500">Ctrl+E</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                    Print...
                  </button>
                </div>
              </div>
            </div>

            {/* Edit Menu */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                Edit
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  <button onClick={handleUndo} disabled={!historyState.canUndo} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between disabled:opacity-50">
                    <span>Undo</span>
                    <span className="text-xs text-slate-500">Ctrl+Z</span>
                  </button>
                  <button onClick={handleRedo} disabled={!historyState.canRedo} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between disabled:opacity-50">
                    <span>Redo</span>
                    <span className="text-xs text-slate-500">Ctrl+Y</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={handleCopy} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Copy</span>
                    <span className="text-xs text-slate-500">Ctrl+C</span>
                  </button>
                  <button onClick={handlePaste} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Paste</span>
                    <span className="text-xs text-slate-500">Ctrl+V</span>
                  </button>
                  <button onClick={handleDuplicate} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Duplicate</span>
                    <span className="text-xs text-slate-500">Ctrl+D</span>
                  </button>
                  <button onClick={handleDeleteSelected} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Delete</span>
                    <span className="text-xs text-slate-500">Del</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => setSelection({...selection, selectedIds: canvas.elements.map(e => e.id)})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Select All</span>
                    <span className="text-xs text-slate-500">Ctrl+A</span>
                  </button>
                </div>
              </div>
            </div>

            {/* View Menu */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                View
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  <button onClick={() => setCanvas({...canvas, zoom: Math.min(canvas.zoom + 0.25, 5)})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Zoom In</span>
                    <span className="text-xs text-slate-500">Ctrl++</span>
                  </button>
                  <button onClick={() => setCanvas({...canvas, zoom: Math.max(canvas.zoom - 0.25, 0.1)})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Zoom Out</span>
                    <span className="text-xs text-slate-500">Ctrl+-</span>
                  </button>
                  <button onClick={() => setCanvas({...canvas, zoom: 1})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Zoom to 100%</span>
                    <span className="text-xs text-slate-500">Ctrl+1</span>
                  </button>
                  <button onClick={() => setCanvas({...canvas, zoom: canvas.zoom})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Fit to Window</span>
                    <span className="text-xs text-slate-500">Ctrl+0</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => setShowRulers(!showRulers)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {showRulers && <Check className="w-4 h-4" />}
                      <span className={!showRulers ? 'ml-6' : ''}>Rulers</span>
                    </span>
                    <span className="text-xs text-slate-500">Ctrl+R</span>
                  </button>
                  <button onClick={() => setShowGuides(!showGuides)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {showGuides && <Check className="w-4 h-4" />}
                      <span className={!showGuides ? 'ml-6' : ''}>Guides</span>
                    </span>
                  </button>
                  <button onClick={() => setCanvas({...canvas, showGrid: !canvas.showGrid})} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      {canvas.showGrid && <Check className="w-4 h-4" />}
                      <span className={!canvas.showGrid ? 'ml-6' : ''}>Grid</span>
                    </span>
                    <span className="text-xs text-slate-500">Ctrl+&apos;</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => setShowLeftPanel(!showLeftPanel)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                    {showLeftPanel && <Check className="w-4 h-4" />}
                    <span className={!showLeftPanel ? 'ml-6' : ''}>Left Panel</span>
                  </button>
                  <button onClick={() => setShowRightPanel(!showRightPanel)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                    {showRightPanel && <Check className="w-4 h-4" />}
                    <span className={!showRightPanel ? 'ml-6' : ''}>Right Panel</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={() => setDarkMode(!darkMode)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center gap-2">
                    {darkMode ? <Moon className="w-4 h-4" /> : <SunMedium className="w-4 h-4" />}
                    <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Object Menu */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                Object
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  <button onClick={handleGroup} disabled={selection.selectedIds.length < 2} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between disabled:opacity-50">
                    <span>Group</span>
                    <span className="text-xs text-slate-500">Ctrl+G</span>
                  </button>
                  <button onClick={handleUngroup} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Ungroup</span>
                    <span className="text-xs text-slate-500">Ctrl+Shift+G</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={handleBringToFront} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Bring to Front</span>
                    <span className="text-xs text-slate-500">Ctrl+Shift+]</span>
                  </button>
                  <button onClick={handleBringForward} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Bring Forward</span>
                    <span className="text-xs text-slate-500">Ctrl+]</span>
                  </button>
                  <button onClick={handleSendBackward} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Send Backward</span>
                    <span className="text-xs text-slate-500">Ctrl+[</span>
                  </button>
                  <button onClick={handleSendToBack} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Send to Back</span>
                    <span className="text-xs text-slate-500">Ctrl+Shift+[</span>
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button onClick={handleToggleLock} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Lock/Unlock</span>
                    <span className="text-xs text-slate-500">Ctrl+L</span>
                  </button>
                  <button onClick={handleToggleVisibility} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Hide/Show</span>
                    <span className="text-xs text-slate-500">Ctrl+H</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Help Menu */}
            <div className="relative group">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 rounded transition-colors">
                Help
              </button>
              <div className="absolute left-0 top-full mt-1 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="py-1">
                  <button onClick={() => setShowShortcutsModal(true)} className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white flex items-center justify-between">
                    <span>Keyboard Shortcuts</span>
                    <span className="text-xs text-slate-500">?</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                    Documentation
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                    Video Tutorials
                  </button>
                  <hr className="my-1 border-slate-700" />
                  <button className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white">
                    About Design Studio
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Project Name */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="bg-slate-700 text-white text-sm px-3 py-1 rounded border border-slate-600 focus:border-blue-500 focus:outline-none min-w-[200px] text-center"
            />
            <div className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs ${
              saveStatus === 'saved' ? 'text-green-400' : 
              saveStatus === 'saving' ? 'text-blue-400' : 'text-amber-400'
            }`}>
              {saveStatus === 'saving' && <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />}
              {saveStatus === 'saved' && <Check className="w-3 h-3" />}
              {saveStatus === 'unsaved' && <div className="w-2 h-2 bg-amber-400 rounded-full" />}
              <span>{saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Saved' : 'Unsaved'}</span>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}
            >
              {darkMode ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setShowLeftPanel(!showLeftPanel)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Toggle Left Panel"
            >
              {showLeftPanel ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setShowRightPanel(!showRightPanel)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
              title="Toggle Right Panel"
            >
              {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
            </button>
            <div className="w-px h-5 bg-slate-700" />
            <button 
              onClick={() => handleSave(true)}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
            <button 
              onClick={() => setActivePanel('export')}
              className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-medium rounded transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Export
            </button>
          </div>
        </div>

        {/* Secondary Toolbar */}
        <div className={`${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b px-4 py-2 flex items-center justify-between z-40`}>
          <div className="flex items-center gap-4">
            {/* Tool Selection */}
            <div className={`flex items-center gap-0.5 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg p-1`}>
              {[
                { id: 'select', icon: MousePointer2, label: 'Select (V)' },
                { id: 'hand', icon: Hand, label: 'Hand (H)' },
                { id: 'zoom', icon: ZoomIn, label: 'Zoom (Z)' },
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setActiveTool(tool.id as any)}
                  className={`p-2 rounded transition-colors ${
                    activeTool === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-slate-600 hover:bg-white'
                  }`}
                  title={tool.label}
                >
                  <tool.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

            {/* Creation Tools */}
            <div className={`flex items-center gap-0.5 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg p-1`}>
              {[
                { id: 'text', icon: Type, label: 'Text (T)', action: handleAddText },
                { id: 'shape', icon: Square, label: 'Shape (R)', action: () => setActivePanel('shapes') },
                { id: 'pen', icon: PenTool, label: 'Pen Tool (P)' },
                { id: 'freehand', icon: Pen, label: 'Freehand (B)' },
                { id: 'image', icon: ImageIcon, label: 'Image (I)' },
              ].map(tool => (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id as any)
                    if (tool.action) tool.action()
                  }}
                  className={`p-2 rounded transition-colors ${
                    activeTool === tool.id 
                      ? 'bg-blue-600 text-white' 
                      : darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-600' : 'text-slate-600 hover:bg-white'
                  }`}
                  title={tool.label}
                >
                  <tool.icon className="w-4 h-4" />
                </button>
              ))}
            </div>

            <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />

            {/* Drawing Tool Options - Show when pen or freehand is active */}
            {(activeTool === 'pen' || activeTool === 'freehand') && (
              <>
                <div className={`flex items-center gap-2 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg px-3 py-1.5`}>
                  {/* Stroke Color */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Stroke:</span>
                    <input
                      type="color"
                      value={currentStrokeColor}
                      onChange={(e) => setCurrentStrokeColor(e.target.value)}
                      className="w-6 h-6 rounded border-0 cursor-pointer"
                      title="Stroke Color"
                    />
                  </div>
                  
                  {/* Stroke Width */}
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Width:</span>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={currentStrokeWidth}
                      onChange={(e) => setCurrentStrokeWidth(parseInt(e.target.value))}
                      className="w-16"
                      title="Stroke Width"
                    />
                    <span className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{currentStrokeWidth}px</span>
                  </div>

                  {/* Fill Color (pen tool only) */}
                  {activeTool === 'pen' && (
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Fill:</span>
                      <input
                        type="color"
                        value={currentFillColor}
                        onChange={(e) => setCurrentFillColor(e.target.value)}
                        className="w-6 h-6 rounded border-0 cursor-pointer"
                        title="Fill Color"
                      />
                    </div>
                  )}

                  {/* Smoothing (freehand only) */}
                  {activeTool === 'freehand' && (
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Smooth:</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={brushSettings.smoothing * 100}
                        onChange={(e) => setBrushSettings({...brushSettings, smoothing: parseInt(e.target.value) / 100})}
                        className="w-12"
                        title="Smoothing"
                      />
                    </div>
                  )}
                </div>

                {/* Pen Tool Tips */}
                {activeTool === 'pen' && penToolPoints.length > 0 && (
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-purple-500/20 text-purple-300' : 'bg-purple-100 text-purple-700'}`}>
                    <span className="text-xs font-medium">{penToolPoints.length} points</span>
                    <span className="text-xs">| Enter: Complete | Shift+Enter: Close path | Esc: Cancel</span>
                  </div>
                )}

                <div className={`w-px h-6 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
              </>
            )}

            {/* Edit Tools */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleUndo}
                disabled={!historyState.canUndo}
                className={`p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Undo (Ctrl+Z)"
              >
                <Undo className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={!historyState.canRedo}
                className={`p-2 rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                  darkMode ? 'text-slate-400 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:bg-slate-100'
                }`}
                title="Redo (Ctrl+Y)"
              >
                <Redo className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selection.selectedIds.length > 0 && (
              <>
                {/* Alignment Tools */}
                <div className={`flex items-center gap-0.5 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg p-1`}>
                  <button onClick={() => handleAlign('left')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Left">
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleAlign('center')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Center">
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleAlign('right')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Right">
                    <AlignRight className="w-4 h-4" />
                  </button>
                  <div className={`w-px h-4 ${darkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
                  <button onClick={() => handleAlign('top')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Top">
                    <AlignStartVertical className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleAlign('middle')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Middle">
                    <AlignCenterVertical className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleAlign('bottom')} className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-slate-600 text-slate-400 hover:text-white' : 'hover:bg-white text-slate-600'}`} title="Align Bottom">
                    <AlignEndVertical className="w-4 h-4" />
                  </button>
                </div>
              </>
            )}

            {/* Zoom Controls */}
            <div className={`flex items-center gap-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'} rounded-lg px-2 py-1`}>
              <button 
                onClick={() => setCanvas({...canvas, zoom: Math.max(0.1, canvas.zoom - 0.25)})}
                className={`p-1 rounded ${darkMode ? 'hover:bg-slate-600 text-slate-400' : 'hover:bg-white text-slate-600'}`}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className={`text-xs font-medium min-w-[50px] text-center ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                {Math.round(canvas.zoom * 100)}%
              </span>
              <button 
                onClick={() => setCanvas({...canvas, zoom: Math.min(5, canvas.zoom + 0.25)})}
                className={`p-1 rounded ${darkMode ? 'hover:bg-slate-600 text-slate-400' : 'hover:bg-white text-slate-600'}`}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Canvas Size Display */}
            <div className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
              {canvas.width} × {canvas.height} px
            </div>
          </div>
        </div>

        {/* Main Content Area - to be continued with canvas */}
        <div className="flex-1 flex overflow-hidden min-h-0">
          {/* Left Tools Panel */}
          {showLeftPanel && (
            <div className={`w-16 flex-shrink-0 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'} border-r flex flex-col items-center py-4 gap-2`}>
              {/* Panel Tabs (Vertical) */}
              {[
                { id: 'elements', icon: Layout, label: 'Elements' },
                { id: 'templates', icon: LayoutGrid, label: 'Templates' },
                { id: 'shapes', icon: Hexagon, label: 'Shapes' },
                { id: 'assets', icon: ImageIcon, label: 'Assets' },
                { id: 'layers', icon: Layers, label: 'Layers' },
                { id: 'mockups', icon: Package, label: 'Mockups' },
                { id: 'colors', icon: Palette, label: 'Colors' },
                { id: 'effects', icon: Wand2, label: 'Effects' },
                { id: 'grid', icon: Grid, label: 'Grid' },
                { id: 'export', icon: Download, label: 'Export' },
              ].map(panel => (
                <button
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id as any)}
                  className={`w-12 h-12 flex flex-col items-center justify-center rounded-lg transition-all ${
                    activePanel === panel.id 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : darkMode 
                        ? 'text-slate-400 hover:text-white hover:bg-slate-700' 
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
                  }`}
                  title={panel.label}
                >
                  <panel.icon className="w-5 h-5" />
                  <span className="text-[9px] mt-0.5 font-medium">{panel.label.substring(0, 6)}</span>
                </button>
              ))}
            </div>
          )}

          {/* Left Panel Content */}
          {showLeftPanel && (
            <div className={`w-72 flex-shrink-0 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-r overflow-y-auto`}>
              <div className="p-4 space-y-4">
                {/* Panel Header */}
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                    {activePanel === 'elements' && 'Elements'}
                    {activePanel === 'templates' && 'Templates'}
                    {activePanel === 'shapes' && 'Shapes'}
                    {activePanel === 'assets' && 'Assets'}
                    {activePanel === 'layers' && 'Layers'}
                    {activePanel === 'mockups' && 'Mockups'}
                    {activePanel === 'colors' && 'Colors'}
                    {activePanel === 'effects' && 'Effects'}
                    {activePanel === 'grid' && 'Grid Settings'}
                    {activePanel === 'export' && 'Export'}
                    {activePanel === 'artboards' && 'Artboards'}
                  </h3>
                  <button 
                    onClick={() => setShowLeftPanel(false)}
                    className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Elements Panel */}
                {activePanel === 'elements' && (
                  <div className="space-y-3">
                    <button
                      onClick={handleAddText}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3 transition-colors`}
                    >
                      <Type className="w-5 h-5" />
                      <span>Add Text</span>
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleAddShape('rectangle')} className={`p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex flex-col items-center gap-2`}>
                        <Square className="w-6 h-6" />
                        <span className="text-xs">Rectangle</span>
                      </button>
                      <button onClick={() => handleAddShape('circle')} className={`p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex flex-col items-center gap-2`}>
                        <Circle className="w-6 h-6" />
                        <span className="text-xs">Circle</span>
                      </button>
                      <button onClick={() => handleAddShape('triangle')} className={`p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex flex-col items-center gap-2`}>
                        <Triangle className="w-6 h-6" />
                        <span className="text-xs">Triangle</span>
                      </button>
                      <button onClick={() => handleAddShape('star')} className={`p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex flex-col items-center gap-2`}>
                        <Star className="w-6 h-6" />
                        <span className="text-xs">Star</span>
                      </button>
                    </div>
                    <label className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3 cursor-pointer transition-colors`}>
                      <Upload className="w-5 h-5" />
                      <span>Upload Image</span>
                      <input type="file" accept="image/*" onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onload = (evt) => {
                            if (evt.target?.result) {
                              handleAddImage(evt.target.result as string)
                            }
                          }
                          reader.readAsDataURL(file)
                        }
                      }} className="hidden" />
                    </label>
                  </div>
                )}

                {/* Shapes Panel - Comprehensive Library */}
                {activePanel === 'shapes' && (
                  <div className="space-y-3">
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-1">
                      {SHAPE_CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setShapeCategory(cat.id)}
                          className={`px-2 py-1 text-[10px] rounded-lg transition-colors ${
                            shapeCategory === cat.id
                              ? 'bg-blue-500 text-white'
                              : darkMode 
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span className="mr-1">{cat.icon}</span>
                          {cat.name}
                        </button>
                      ))}
                    </div>
                    
                    {/* Shapes Grid */}
                    <div className="grid grid-cols-4 gap-1.5 max-h-[400px] overflow-y-auto pr-1">
                      {getShapesByCategory(shapeCategory).map(shape => (
                        <button
                          key={shape.id}
                          onClick={() => handleAddShapeFromLibrary(shape)}
                          title={shape.name}
                          className={`p-2 rounded-lg border transition-all hover:scale-105 ${
                            darkMode 
                              ? 'border-slate-600 hover:bg-slate-700 hover:border-blue-500 text-slate-300' 
                              : 'border-slate-200 hover:bg-blue-50 hover:border-blue-300 text-slate-700'
                          } flex flex-col items-center gap-1`}
                        >
                          <div className="w-8 h-8 flex items-center justify-center text-xl">
                            {shape.icon}
                          </div>
                          <span className="text-[9px] truncate w-full text-center">{shape.name}</span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Quick Colors */}
                    <div className={`pt-2 border-t ${darkMode ? 'border-slate-700' : 'border-slate-200'}`}>
                      <p className={`text-[10px] mb-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Quick Fill Color</p>
                      <div className="flex flex-wrap gap-1">
                        {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899', '#06B6D4', '#1F2937', '#FFFFFF'].map(color => (
                          <button
                            key={color}
                            onClick={() => setQuickShapeColor(color)}
                            className={`w-6 h-6 rounded-md border-2 transition-transform hover:scale-110 ${
                              quickShapeColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Layers Panel */}
                {activePanel === 'layers' && (
                  <div className="space-y-3">
                    {/* Layer Actions Bar */}
                    <div className="flex items-center gap-1 pb-2 border-b border-slate-200 dark:border-slate-700">
                      <button
                        onClick={handleGroup}
                        disabled={selection.selectedIds.length < 2}
                        className={`p-1.5 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400 disabled:text-slate-600' : 'hover:bg-slate-100 text-slate-600 disabled:text-slate-300'} disabled:cursor-not-allowed`}
                        title="Group (Ctrl+G)"
                      >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleUngroup}
                        disabled={selection.selectedIds.length !== 1}
                        className={`p-1.5 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400 disabled:text-slate-600' : 'hover:bg-slate-100 text-slate-600 disabled:text-slate-300'} disabled:cursor-not-allowed`}
                        title="Ungroup (Ctrl+Shift+G)"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <div className={`w-px h-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                      <button
                        onClick={() => {
                          selection.selectedIds.forEach(id => {
                            const el = canvas.elements.find(e => e.id === id)
                            if (el) {
                              const maxZ = Math.max(...canvas.elements.map(e => e.zIndex))
                              const newCanvas = ElementManager.updateElement(canvas, id, { zIndex: maxZ + 1 })
                              setCanvas(newCanvas)
                            }
                          })
                        }}
                        disabled={selection.selectedIds.length === 0}
                        className={`p-1.5 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400 disabled:text-slate-600' : 'hover:bg-slate-100 text-slate-600 disabled:text-slate-300'} disabled:cursor-not-allowed`}
                        title="Bring to Front"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          selection.selectedIds.forEach(id => {
                            const el = canvas.elements.find(e => e.id === id)
                            if (el) {
                              const minZ = Math.min(...canvas.elements.map(e => e.zIndex))
                              const newCanvas = ElementManager.updateElement(canvas, id, { zIndex: minZ - 1 })
                              setCanvas(newCanvas)
                            }
                          })
                        }}
                        disabled={selection.selectedIds.length === 0}
                        className={`p-1.5 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400 disabled:text-slate-600' : 'hover:bg-slate-100 text-slate-600 disabled:text-slate-300'} disabled:cursor-not-allowed`}
                        title="Send to Back"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                      <div className={`w-px h-4 ${darkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                      <button
                        onClick={handleDeleteSelected}
                        disabled={selection.selectedIds.length === 0}
                        className={`p-1.5 rounded text-red-500 ${darkMode ? 'hover:bg-slate-700 disabled:text-slate-600' : 'hover:bg-red-50 disabled:text-slate-300'} disabled:cursor-not-allowed`}
                        title="Delete (Del)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {canvas.elements.length === 0 ? (
                      <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Layers className="w-10 h-10 mx-auto mb-2 opacity-40" />
                        <p className="text-sm">No layers yet</p>
                        <p className="text-xs mt-1">Add elements to see them here</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {canvas.elements
                          .slice()
                          .sort((a, b) => b.zIndex - a.zIndex)
                          .map((element, index) => {
                            const isSelected = selection.selectedIds.includes(element.id)
                            const isPath = element.type === 'path'
                            
                            return (
                              <div
                                key={element.id}
                                draggable
                                onDragStart={(e) => {
                                  e.dataTransfer.setData('elementId', element.id)
                                  e.dataTransfer.effectAllowed = 'move'
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault()
                                  e.dataTransfer.dropEffect = 'move'
                                }}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  const draggedId = e.dataTransfer.getData('elementId')
                                  if (draggedId && draggedId !== element.id) {
                                    // Swap z-indexes
                                    const draggedEl = canvas.elements.find(el => el.id === draggedId)
                                    if (draggedEl) {
                                      const tempZ = draggedEl.zIndex
                                      let newCanvas = ElementManager.updateElement(canvas, draggedId, { zIndex: element.zIndex })
                                      newCanvas = ElementManager.updateElement(newCanvas, element.id, { zIndex: tempZ })
                                      setCanvas(newCanvas)
                                    }
                                  }
                                }}
                                className={`group p-2 rounded-lg border transition-all cursor-pointer ${
                                  isSelected
                                    ? darkMode 
                                      ? 'border-blue-500 bg-blue-500/20' 
                                      : 'border-blue-500 bg-blue-50'
                                    : darkMode
                                      ? 'border-slate-700 hover:border-slate-600 hover:bg-slate-700/50'
                                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                } ${!element.visible ? 'opacity-50' : ''}`}
                                onClick={(e) => {
                                  if (e.ctrlKey || e.metaKey) {
                                    // Toggle selection
                                    if (isSelected) {
                                      setSelection({ ...selection, selectedIds: selection.selectedIds.filter(id => id !== element.id) })
                                    } else {
                                      setSelection({ ...selection, selectedIds: [...selection.selectedIds, element.id] })
                                    }
                                  } else if (e.shiftKey && selection.selectedIds.length > 0) {
                                    // Range selection
                                    const sortedElements = canvas.elements.slice().sort((a, b) => b.zIndex - a.zIndex)
                                    const firstSelectedIdx = sortedElements.findIndex(el => selection.selectedIds.includes(el.id))
                                    const currentIdx = sortedElements.findIndex(el => el.id === element.id)
                                    const start = Math.min(firstSelectedIdx, currentIdx)
                                    const end = Math.max(firstSelectedIdx, currentIdx)
                                    const rangeIds = sortedElements.slice(start, end + 1).map(el => el.id)
                                    setSelection({ ...selection, selectedIds: rangeIds })
                                  } else {
                                    setSelection({ ...selection, selectedIds: [element.id] })
                                  }
                                }}
                                onDoubleClick={() => {
                                  if (element.type === 'text' && element.text) {
                                    setEditingTextId(element.id)
                                    setEditingTextValue(element.text.content)
                                  }
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  {/* Thumbnail/Icon */}
                                  <div className={`w-10 h-10 rounded flex-shrink-0 flex items-center justify-center overflow-hidden ${
                                    darkMode ? 'bg-slate-600' : 'bg-slate-100'
                                  }`}>
                                    {element.type === 'text' && <Type className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />}
                                    {element.type === 'shape' && (
                                      <div 
                                        className="w-6 h-6 rounded"
                                        style={{ 
                                          backgroundColor: element.shape?.fill,
                                          border: `2px solid ${element.shape?.stroke}`
                                        }}
                                      />
                                    )}
                                    {element.type === 'image' && element.image && (
                                      <img src={element.image.src} alt="" className="w-full h-full object-cover" />
                                    )}
                                    {element.type === 'group' && <Layers className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />}
                                    {isPath && <PenTool className={`w-5 h-5 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`} />}
                                  </div>
                                  
                                  {/* Info */}
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium truncate ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                                      {element.name || (element.type === 'text' ? element.text?.content.substring(0, 15) : element.type)}
                                    </p>
                                    <div className={`flex items-center gap-2 text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                      <span>{Math.round(element.transform.width)} × {Math.round(element.transform.height)}</span>
                                      {element.opacity < 1 && (
                                        <span className="text-orange-500">{Math.round(element.opacity * 100)}%</span>
                                      )}
                                    </div>
                                  </div>
                                  
                                  {/* Actions */}
                                  <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const newCanvas = ElementManager.updateElement(canvas, element.id, { visible: !element.visible })
                                        setCanvas(newCanvas)
                                      }}
                                      className={`p-1 rounded transition-colors ${
                                        element.visible 
                                          ? 'text-blue-500 hover:bg-blue-500/20' 
                                          : `${darkMode ? 'text-slate-500 hover:bg-slate-600' : 'text-slate-400 hover:bg-slate-200'}`
                                      }`}
                                      title={element.visible ? 'Hide' : 'Show'}
                                    >
                                      {element.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        const newCanvas = ElementManager.updateElement(canvas, element.id, { locked: !element.locked })
                                        setCanvas(newCanvas)
                                      }}
                                      className={`p-1 rounded transition-colors ${
                                        element.locked 
                                          ? 'text-orange-500 hover:bg-orange-500/20' 
                                          : `${darkMode ? 'text-slate-500 hover:bg-slate-600' : 'text-slate-400 hover:bg-slate-200'}`
                                      }`}
                                      title={element.locked ? 'Unlock' : 'Lock'}
                                    >
                                      {element.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                    </button>
                                  </div>
                                </div>
                                
                                {/* Opacity Slider - show when selected */}
                                {isSelected && (
                                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Opacity</span>
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={element.opacity * 100}
                                        onChange={(e) => {
                                          const newCanvas = ElementManager.updateElement(canvas, element.id, { opacity: parseInt(e.target.value) / 100 })
                                          setCanvas(newCanvas)
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="flex-1 h-1"
                                      />
                                      <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                                        {Math.round(element.opacity * 100)}%
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                      </div>
                    )}
                    
                    {/* Selection Info */}
                    {selection.selectedIds.length > 1 && (
                      <div className={`mt-3 p-2 rounded-lg ${darkMode ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'}`}>
                        <p className={`text-xs font-medium ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                          {selection.selectedIds.length} layers selected
                        </p>
                        <p className={`text-xs mt-0.5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                          Press Ctrl+G to group
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Grid Settings Panel */}
                {activePanel === 'grid' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Show Grid</span>
                      <button
                        onClick={() => setCanvas({ ...canvas, showGrid: !canvas.showGrid })}
                        className={`w-10 h-6 rounded-full transition-colors ${canvas.showGrid ? 'bg-blue-500' : 'bg-slate-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${canvas.showGrid ? 'translate-x-5' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Snap to Grid</span>
                      <button
                        onClick={() => setCanvas({ ...canvas, snapToGrid: !canvas.snapToGrid })}
                        className={`w-10 h-6 rounded-full transition-colors ${canvas.snapToGrid ? 'bg-blue-500' : 'bg-slate-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform ${canvas.snapToGrid ? 'translate-x-5' : 'translate-x-1'}`}></div>
                      </button>
                    </div>
                    <div>
                      <label className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Grid Size</label>
                      <input
                        type="range"
                        min="5"
                        max="50"
                        value={canvas.gridSize}
                        onChange={(e) => setCanvas({ ...canvas, gridSize: parseInt(e.target.value) })}
                        className="w-full mt-1"
                      />
                      <div className={`text-xs text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{canvas.gridSize}px</div>
                    </div>
                  </div>
                )}

                {/* Export Panel */}
                {activePanel === 'export' && (
                  <div className="space-y-3">
                    <button
                      onClick={() => handleExport('png')}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3`}
                    >
                      <FileImage className="w-5 h-5" />
                      <span>Export as PNG</span>
                    </button>
                    <button
                      onClick={() => handleExport('jpg')}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3`}
                    >
                      <FileImage className="w-5 h-5" />
                      <span>Export as JPG</span>
                    </button>
                    <button
                      onClick={() => handleExport('svg')}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3`}
                    >
                      <FileCode className="w-5 h-5" />
                      <span>Export as SVG</span>
                    </button>
                    <button
                      onClick={() => handleExport('pdf')}
                      className={`w-full p-3 rounded-lg border ${darkMode ? 'border-slate-600 hover:bg-slate-700 text-slate-300' : 'border-slate-200 hover:bg-slate-50 text-slate-700'} flex items-center gap-3`}
                    >
                      <FileText className="w-5 h-5" />
                      <span>Export as PDF</span>
                    </button>
                  </div>
                )}

                {/* Artboards Panel */}
                {activePanel === 'artboards' && (
                  <div className="space-y-4">
                    {/* Current Artboards */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          Artboards ({artboards.length})
                        </label>
                        <button
                          onClick={() => setShowArtboardPanel(!showArtboardPanel)}
                          className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Artboard List */}
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {artboards.map((artboard, idx) => (
                          <div
                            key={artboard.id}
                            onClick={() => navigateToArtboard(artboard.id)}
                            className={`p-2 rounded-lg cursor-pointer transition-all ${
                              activeArtboardId === artboard.id
                                ? 'bg-blue-500 text-white'
                                : darkMode
                                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                  : 'bg-white hover:bg-slate-50 text-slate-700'
                            } border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  className={`w-8 h-6 rounded border flex items-center justify-center text-[8px] font-bold ${
                                    activeArtboardId === artboard.id 
                                      ? 'bg-blue-400 border-blue-300' 
                                      : 'bg-slate-200 border-slate-300'
                                  }`}
                                  style={{ aspectRatio: `${artboard.width}/${artboard.height}` }}
                                >
                                  {idx + 1}
                                </div>
                                <div>
                                  <div className="text-xs font-medium">{artboard.name}</div>
                                  <div className={`text-[10px] ${activeArtboardId === artboard.id ? 'text-blue-200' : darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                    {artboard.width} × {artboard.height}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    duplicateArtboard(artboard.id)
                                  }}
                                  className={`p-1 rounded opacity-60 hover:opacity-100 ${
                                    activeArtboardId === artboard.id ? 'hover:bg-blue-400' : darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-200'
                                  }`}
                                  title="Duplicate"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                {artboards.length > 1 && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      deleteArtboard(artboard.id)
                                    }}
                                    className={`p-1 rounded opacity-60 hover:opacity-100 ${
                                      activeArtboardId === artboard.id ? 'hover:bg-red-400' : 'hover:bg-red-100'
                                    }`}
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* New Artboard Presets */}
                    <div>
                      <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        New Artboard
                      </label>
                      
                      {/* Category Tabs */}
                      <div className="flex flex-wrap gap-1 mt-2 mb-3">
                        {ARTBOARD_CATEGORIES.map(category => (
                          <button
                            key={category.id}
                            onClick={() => setArtboardCategory(category.id)}
                            className={`px-2 py-1 text-[10px] rounded-md transition-colors ${
                              artboardCategory === category.id
                                ? 'bg-blue-500 text-white'
                                : darkMode
                                  ? 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {category.icon} {category.name}
                          </button>
                        ))}
                      </div>
                      
                      {/* Preset Grid */}
                      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {ARTBOARD_PRESETS.filter(p => p.category === artboardCategory).map(preset => (
                          <button
                            key={preset.id}
                            onClick={() => createArtboardFromPreset(preset.id)}
                            className={`p-2 rounded-lg text-left transition-all hover:scale-105 ${
                              darkMode
                                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                                : 'bg-white hover:bg-slate-50 text-slate-700'
                            } border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div 
                                className={`w-6 h-6 rounded border ${darkMode ? 'bg-slate-600 border-slate-500' : 'bg-slate-100 border-slate-200'} flex items-center justify-center`}
                                style={{ 
                                  aspectRatio: `${preset.width}/${preset.height}`,
                                  maxWidth: '24px',
                                  maxHeight: '24px'
                                }}
                              >
                                <div 
                                  className={`${darkMode ? 'bg-blue-400' : 'bg-blue-500'}`}
                                  style={{
                                    width: Math.min(preset.width / Math.max(preset.width, preset.height) * 16, 16),
                                    height: Math.min(preset.height / Math.max(preset.width, preset.height) * 16, 16)
                                  }}
                                />
                              </div>
                              <div className="text-[10px] font-medium truncate flex-1">{preset.name}</div>
                            </div>
                            <div className={`text-[9px] ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                              {preset.width} × {preset.height}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                      <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-blue-700'}`}>💡 Quick Tips</p>
                      <ul className={`text-xs space-y-1 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <li>• Click an artboard to navigate to it</li>
                        <li>• Double-click to rename</li>
                        <li>• Use presets for common sizes</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Colors Panel */}
                {activePanel === 'colors' && (
                  <div className="space-y-4">
                    {/* Color Mode Tabs */}
                    <div className="flex gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-700/50">
                      {(['rgb', 'hsl', 'cmyk'] as const).map(mode => (
                        <button
                          key={mode}
                          onClick={() => setColorMode(mode)}
                          className={`flex-1 px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                            colorMode === mode
                              ? 'bg-white dark:bg-slate-600 text-blue-600 dark:text-blue-400 shadow-sm'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                          }`}
                        >
                          {mode.toUpperCase()}
                        </button>
                      ))}
                    </div>

                    {/* Current Color Display */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-white'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div 
                            className="w-12 h-12 rounded-lg shadow-inner border-2 border-white"
                            style={{ backgroundColor: getSelectedFillColor() }}
                          />
                          <input
                            type="color"
                            value={getSelectedFillColor()}
                            onChange={(e) => {
                              const color = e.target.value
                              addRecentColor(color)
                              generateHarmonyColors(color, activeHarmony)
                              setColorShades(generateShades(color, 9))
                              updateElementFillColor(color)
                            }}
                            className="absolute inset-0 opacity-0 cursor-pointer"
                          />
                        </div>
                        <div className="flex-1">
                          <div className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                            {getColorName(getSelectedFillColor())}
                          </div>
                          <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {getSelectedFillColor()}
                          </div>
                          {showColorDetails && (
                            <div className={`text-xs mt-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                              {colorMode === 'rgb' && (() => {
                                const rgb = hexToRgb(getSelectedFillColor())
                                return rgb ? `RGB(${rgb.r}, ${rgb.g}, ${rgb.b})` : ''
                              })()}
                              {colorMode === 'hsl' && (() => {
                                const hsl = hexToHsl(getSelectedFillColor())
                                return hsl ? `HSL(${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)` : ''
                              })()}
                              {colorMode === 'cmyk' && (() => {
                                const rgb = hexToRgb(getSelectedFillColor())
                                if (!rgb) return ''
                                const cmyk = rgbToCmyk(rgb)
                                return `CMYK(${Math.round(cmyk.c)}%, ${Math.round(cmyk.m)}%, ${Math.round(cmyk.y)}%, ${Math.round(cmyk.k)}%)`
                              })()}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setShowColorDetails(!showColorDetails)}
                          className={`p-1.5 rounded-lg ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'}`}
                        >
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Accessibility Info */}
                      {showColorDetails && (
                        <div className={`mt-3 pt-3 border-t ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}>
                          <div className="flex items-center justify-between text-xs">
                            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Contrast with white:</span>
                            <span className={`font-semibold ${
                              meetsWCAG(getSelectedFillColor(), '#FFFFFF', 'AA') 
                                ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {getContrastRatio(getSelectedFillColor(), '#FFFFFF').toFixed(2)}:1
                              {meetsWCAG(getSelectedFillColor(), '#FFFFFF', 'AA') ? ' ✓ AA' : ' ✗'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs mt-1">
                            <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>Contrast with black:</span>
                            <span className={`font-semibold ${
                              meetsWCAG(getSelectedFillColor(), '#000000', 'AA') 
                                ? 'text-green-500' : 'text-red-500'
                            }`}>
                              {getContrastRatio(getSelectedFillColor(), '#000000').toFixed(2)}:1
                              {meetsWCAG(getSelectedFillColor(), '#000000', 'AA') ? ' ✓ AA' : ' ✗'}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Color Shades */}
                    {colorShades.length > 0 && (
                      <div>
                        <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Shades</label>
                        <div className="flex gap-1 mt-2">
                          {colorShades.map((shade, idx) => (
                            <button
                              key={idx}
                              onClick={() => {
                                addRecentColor(shade)
                                updateElementFillColor(shade)
                              }}
                              className="flex-1 h-6 rounded transition-transform hover:scale-110"
                              style={{ backgroundColor: shade }}
                              title={shade}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Color Harmony */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Color Harmony</label>
                        <select
                          value={activeHarmony}
                          onChange={(e) => {
                            const harmony = e.target.value as HarmonyType
                            setActiveHarmony(harmony)
                            generateHarmonyColors(getSelectedFillColor(), harmony)
                          }}
                          className={`text-xs px-2 py-1 rounded-lg border ${
                            darkMode 
                              ? 'bg-slate-700 border-slate-600 text-slate-300' 
                              : 'bg-white border-slate-200 text-slate-700'
                          }`}
                        >
                          <option value="complementary">Complementary</option>
                          <option value="analogous">Analogous</option>
                          <option value="triadic">Triadic</option>
                          <option value="split-complementary">Split-Complementary</option>
                          <option value="square">Square</option>
                          <option value="tetradic">Tetradic</option>
                          <option value="monochromatic">Monochromatic</option>
                        </select>
                      </div>
                      <div className="flex gap-1">
                        {harmonyColors.map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              addRecentColor(color)
                              updateElementFillColor(color)
                              generateHarmonyColors(color, activeHarmony)
                              setColorShades(generateShades(color, 9))
                            }}
                            className={`flex-1 h-8 rounded-lg transition-transform hover:scale-105 ${
                              idx === 0 ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Canvas Background */}
                    <div>
                      <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Canvas Background</label>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {['#FFFFFF', '#F8FAFC', '#1E293B', '#0F172A', '#FAFAF9', '#FEF2F2', '#F0FDF4', '#EFF6FF'].map(color => (
                          <button
                            key={color}
                            onClick={() => setCanvas({ ...canvas, backgroundColor: color })}
                            className={`w-8 h-8 rounded-lg border-2 transition-transform hover:scale-110 ${canvas.backgroundColor === color ? 'border-blue-500' : darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Recent Colors */}
                    <div>
                      <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Recent Colors</label>
                      <div className="flex gap-1 mt-2 flex-wrap">
                        {(recentColors.length > 0 ? recentColors : ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899']).map((color, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              updateElementFillColor(color)
                              generateHarmonyColors(color, activeHarmony)
                              setColorShades(generateShades(color, 9))
                            }}
                            className={`w-6 h-6 rounded-lg border transition-transform hover:scale-110 ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Preset Palettes */}
                    <div>
                      <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Color Palettes</label>
                      <div className="space-y-2 mt-2">
                        {PRESET_PALETTES.map(palette => (
                          <div 
                            key={palette.id}
                            className={`p-2 rounded-lg cursor-pointer transition-all ${
                              selectedPalette?.id === palette.id
                                ? 'ring-2 ring-blue-500'
                                : ''
                            } ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                            onClick={() => setSelectedPalette(palette)}
                          >
                            <div className={`text-xs font-medium mb-1.5 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                              {palette.name}
                            </div>
                            <div className="flex gap-1">
                              {palette.colors.slice(0, 8).map((swatch, idx) => (
                                <button
                                  key={idx}
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addRecentColor(swatch.color)
                                    updateElementFillColor(swatch.color)
                                  }}
                                  className="flex-1 h-5 rounded transition-transform hover:scale-110"
                                  style={{ backgroundColor: swatch.color }}
                                  title={swatch.name}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gradients */}
                    <div>
                      <label className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Gradients</label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {PRESET_GRADIENTS.map(gradient => (
                          <button
                            key={gradient.id}
                            onClick={() => {
                              setSelectedGradient(gradient)
                              applyGradientToElement(gradient)
                            }}
                            className={`h-10 rounded-lg transition-all hover:scale-105 border ${
                              selectedGradient?.id === gradient.id
                                ? 'ring-2 ring-blue-500'
                                : darkMode ? 'border-slate-600' : 'border-slate-200'
                            }`}
                            style={{ background: gradientToCSS(gradient) }}
                            title={gradient.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const currentColor = getSelectedFillColor()
                          const lighter = lighten(currentColor, 0.1)
                          updateElementFillColor(lighter)
                          addRecentColor(lighter)
                        }}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        ☀️ Lighten
                      </button>
                      <button
                        onClick={() => {
                          const currentColor = getSelectedFillColor()
                          const darker = darken(currentColor, 0.1)
                          updateElementFillColor(darker)
                          addRecentColor(darker)
                        }}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        🌙 Darken
                      </button>
                      <button
                        onClick={() => {
                          const currentColor = getSelectedFillColor()
                          const saturated = saturate(currentColor, 0.2)
                          updateElementFillColor(saturated)
                          addRecentColor(saturated)
                        }}
                        className={`flex-1 px-2 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                          darkMode 
                            ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        }`}
                      >
                        🎨 Saturate
                      </button>
                    </div>
                  </div>
                )}

                {/* Mockups Panel */}
                {activePanel === 'mockups' && (
                  <div className="space-y-4">
                    {/* Intro */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-pink-900/50' : 'bg-gradient-to-r from-purple-50 to-pink-50'} border ${darkMode ? 'border-purple-800' : 'border-purple-200'}`}>
                      <h4 className={`text-sm font-bold mb-1 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>🎨 Product Mockup Preview</h4>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        Create your design on the canvas, then select a product below to see how it will look printed!
                      </p>
                    </div>
                    
                    {/* Category Tabs */}
                    <div className="space-y-2">
                      <label className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Product Category</label>
                      <div className="flex flex-wrap gap-1">
                        {MOCKUP_CATEGORIES.map(category => (
                          <button
                            key={category.id}
                            onClick={() => setMockupCategory(category.id)}
                            className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                              mockupCategory === category.id
                                ? 'bg-purple-500 text-white'
                                : darkMode
                                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {category.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mockup Grid */}
                    <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
                      {getMockupsByCategory(mockupCategory).map(mockup => (
                        <button
                          key={mockup.id}
                          onClick={() => {
                            setSelectedMockup(mockup.id)
                            setSelectedMockupColor(mockup.colors[0].id)
                            setShowMockupPreview(true)
                          }}
                          className={`group relative rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                            selectedMockup === mockup.id
                              ? 'border-purple-500 ring-2 ring-purple-200'
                              : darkMode
                                ? 'border-slate-600 hover:border-slate-500'
                                : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {/* SVG Preview */}
                          <div 
                            className="w-full aspect-square bg-gradient-to-br from-slate-50 to-slate-100 p-2 flex items-center justify-center"
                            dangerouslySetInnerHTML={{ 
                              __html: renderMockupSVG(mockup, mockup.colors[0].id)
                                .replace(/width="\d+"/, 'width="100%"')
                                .replace(/height="\d+"/, 'height="100%"')
                            }}
                          />
                          
                          {/* Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}>
                            <div className="absolute bottom-0 left-0 right-0 p-2">
                              <p className="text-white text-xs font-medium truncate">{mockup.name}</p>
                              <p className="text-white/70 text-[10px]">{mockup.colors.length} colors</p>
                            </div>
                          </div>
                          
                          {/* Preview Badge */}
                          <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-purple-500 text-white text-[8px] font-bold rounded">
                            PREVIEW
                          </div>
                        </button>
                      ))}
                    </div>

                    {/* How it Works */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                      <p className={`text-xs font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-blue-700'}`}>📋 How to use:</p>
                      <ol className={`text-xs space-y-1.5 ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        <li className="flex items-start gap-2">
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${darkMode ? 'bg-slate-600 text-white' : 'bg-blue-200 text-blue-700'}`}>1</span>
                          <span>Create your logo/design on the canvas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${darkMode ? 'bg-slate-600 text-white' : 'bg-blue-200 text-blue-700'}`}>2</span>
                          <span>Click a product to preview your design</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${darkMode ? 'bg-slate-600 text-white' : 'bg-blue-200 text-blue-700'}`}>3</span>
                          <span>Choose product color & export mockup</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${darkMode ? 'bg-slate-600 text-white' : 'bg-blue-200 text-blue-700'}`}>4</span>
                          <span>Submit for print approval!</span>
                        </li>
                      </ol>
                    </div>
                  </div>
                )}

                {/* Effects Panel - Enhanced */}
                {activePanel === 'effects' && (
                  <div className="space-y-3">
                    {/* Selection Info */}
                    {selection.selectedIds.length === 0 ? (
                      <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-amber-50'}`}>
                        <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-amber-700'}`}>
                          ⚠️ Select an element to apply effects
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Applied Effects */}
                        {selection.selectedIds.length === 1 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Applied Effects</span>
                              <div className="flex gap-1">
                                <button
                                  onClick={copyEffectsFromSelection}
                                  className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                                  title="Copy effects"
                                >
                                  <Copy className="w-3 h-3" />
                                </button>
                                {copiedEffects && (
                                  <button
                                    onClick={pasteEffectsToSelection}
                                    className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700 text-slate-400' : 'hover:bg-slate-100 text-slate-500'}`}
                                    title="Paste effects"
                                  >
                                    <Clipboard className="w-3 h-3" />
                                  </button>
                                )}
                                <button
                                  onClick={clearEffectsFromSelection}
                                  className={`p-1 rounded ${darkMode ? 'hover:bg-slate-700 text-red-400' : 'hover:bg-slate-100 text-red-500'}`}
                                  title="Clear all effects"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Effects list for selected element */}
                            <div className="space-y-1 max-h-48 overflow-y-auto">
                              {getElementEffects(selection.selectedIds[0]).map((effect, idx) => (
                                <div
                                  key={effect.id}
                                  className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-white'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => toggleEffectEnabled(selection.selectedIds[0], effect.id)}
                                        className={`w-4 h-4 rounded flex items-center justify-center ${
                                          effect.enabled 
                                            ? 'bg-blue-500 text-white' 
                                            : darkMode ? 'bg-slate-600' : 'bg-slate-200'
                                        }`}
                                      >
                                        {effect.enabled && <Check className="w-3 h-3" />}
                                      </button>
                                      <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                                        {effect.type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => setEffectsPanelExpanded(prev => {
                                          const newSet = new Set(prev)
                                          if (newSet.has(effect.id)) newSet.delete(effect.id)
                                          else newSet.add(effect.id)
                                          return newSet
                                        })}
                                        className={`p-1 rounded ${darkMode ? 'hover:bg-slate-600' : 'hover:bg-slate-100'}`}
                                      >
                                        <ChevronDown className={`w-3 h-3 transition-transform ${effectsPanelExpanded.has(effect.id) ? 'rotate-180' : ''}`} />
                                      </button>
                                      <button
                                        onClick={() => removeEffectFromElement(selection.selectedIds[0], effect.id)}
                                        className={`p-1 rounded ${darkMode ? 'hover:bg-slate-600 text-red-400' : 'hover:bg-slate-100 text-red-500'}`}
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  {/* Effect Controls */}
                                  {effectsPanelExpanded.has(effect.id) && (
                                    <div className="mt-2 pt-2 border-t space-y-2 ${darkMode ? 'border-slate-600' : 'border-slate-200'}">
                                      {/* Common: Opacity */}
                                      <div className="flex items-center gap-2">
                                        <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Opacity</span>
                                        <input
                                          type="range"
                                          min="0"
                                          max="100"
                                          value={effect.opacity}
                                          onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { opacity: parseInt(e.target.value) })}
                                          className="flex-1 h-1"
                                        />
                                        <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{effect.opacity}%</span>
                                      </div>
                                      
                                      {/* Drop Shadow specific */}
                                      {effect.type === 'drop-shadow' && (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Offset X</span>
                                            <input
                                              type="range"
                                              min="-50"
                                              max="50"
                                              value={(effect as any).offsetX}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { offsetX: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).offsetX}px</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Offset Y</span>
                                            <input
                                              type="range"
                                              min="-50"
                                              max="50"
                                              value={(effect as any).offsetY}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { offsetY: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).offsetY}px</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Blur</span>
                                            <input
                                              type="range"
                                              min="0"
                                              max="50"
                                              value={(effect as any).blur}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { blur: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).blur}px</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Color</span>
                                            <input
                                              type="color"
                                              value={(effect as any).color?.replace(/rgba?\([^)]+\)/, '#000000') || '#000000'}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { color: e.target.value } as any)}
                                              className="w-8 h-6 rounded cursor-pointer"
                                            />
                                          </div>
                                        </>
                                      )}
                                      
                                      {/* Gaussian Blur specific */}
                                      {effect.type === 'gaussian-blur' && (
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Radius</span>
                                          <input
                                            type="range"
                                            min="0"
                                            max="50"
                                            value={(effect as any).radius}
                                            onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { radius: parseInt(e.target.value) } as any)}
                                            className="flex-1 h-1"
                                          />
                                          <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).radius}px</span>
                                        </div>
                                      )}
                                      
                                      {/* Brightness/Contrast specific */}
                                      {effect.type === 'brightness-contrast' && (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Brightness</span>
                                            <input
                                              type="range"
                                              min="-100"
                                              max="100"
                                              value={(effect as any).brightness}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { brightness: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).brightness}</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Contrast</span>
                                            <input
                                              type="range"
                                              min="-100"
                                              max="100"
                                              value={(effect as any).contrast}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { contrast: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).contrast}</span>
                                          </div>
                                        </>
                                      )}
                                      
                                      {/* Hue/Saturation specific */}
                                      {effect.type === 'hue-saturation' && (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Hue</span>
                                            <input
                                              type="range"
                                              min="-180"
                                              max="180"
                                              value={(effect as any).hue}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { hue: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).hue}°</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Saturation</span>
                                            <input
                                              type="range"
                                              min="-100"
                                              max="100"
                                              value={(effect as any).saturation}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { saturation: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).saturation}</span>
                                          </div>
                                        </>
                                      )}
                                      
                                      {/* Outer/Inner Glow specific */}
                                      {(effect.type === 'outer-glow' || effect.type === 'inner-glow' || effect.type === 'neon-glow') && (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Blur</span>
                                            <input
                                              type="range"
                                              min="0"
                                              max="50"
                                              value={(effect as any).blur}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { blur: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).blur}px</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Color</span>
                                            <input
                                              type="color"
                                              value={(effect as any).color || '#ffff00'}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { color: e.target.value } as any)}
                                              className="w-8 h-6 rounded cursor-pointer"
                                            />
                                          </div>
                                        </>
                                      )}
                                      
                                      {/* Grayscale/Sepia specific */}
                                      {(effect.type === 'grayscale' || effect.type === 'sepia') && (
                                        <div className="flex items-center gap-2">
                                          <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Amount</span>
                                          <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={(effect as any).amount}
                                            onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { amount: parseInt(e.target.value) } as any)}
                                            className="flex-1 h-1"
                                          />
                                          <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).amount}%</span>
                                        </div>
                                      )}
                                      
                                      {/* Vignette specific */}
                                      {effect.type === 'vignette' && (
                                        <>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Amount</span>
                                            <input
                                              type="range"
                                              min="0"
                                              max="100"
                                              value={(effect as any).amount}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { amount: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).amount}%</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <span className={`text-xs w-16 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Feather</span>
                                            <input
                                              type="range"
                                              min="0"
                                              max="100"
                                              value={(effect as any).feather}
                                              onChange={(e) => updateElementEffect(selection.selectedIds[0], effect.id, { feather: parseInt(e.target.value) } as any)}
                                              className="flex-1 h-1"
                                            />
                                            <span className={`text-xs w-8 text-right ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{(effect as any).feather}%</span>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                              
                              {getElementEffects(selection.selectedIds[0]).length === 0 && (
                                <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-400'} text-center py-2`}>
                                  No effects applied
                                </p>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Category Tabs */}
                        <div className={`flex overflow-x-auto gap-1 pb-2 scrollbar-thin ${darkMode ? 'scrollbar-thumb-slate-600' : 'scrollbar-thumb-slate-300'}`}>
                          {EFFECT_CATEGORIES.map(cat => (
                            <button
                              key={cat.id}
                              onClick={() => setActiveEffectCategory(cat.id as EffectCategory)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                activeEffectCategory === cat.id
                                  ? 'bg-blue-500 text-white'
                                  : darkMode 
                                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' 
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {cat.name}
                            </button>
                          ))}
                        </div>

                        {/* Quick Add Effects */}
                        <div className="space-y-2">
                          <span className={`text-xs font-semibold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Add Effect</span>
                          <div className="grid grid-cols-2 gap-1">
                            {AVAILABLE_EFFECTS.filter(e => e.category === activeEffectCategory).map(effectDef => (
                              <button
                                key={effectDef.type}
                                onClick={() => {
                                  selection.selectedIds.forEach(id => {
                                    addEffectToElement(id, effectDef.create())
                                  })
                                  toast.success(`Added ${effectDef.name}`)
                                }}
                                className={`p-2 rounded-lg text-xs text-left ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'}`}
                              >
                                <div className="flex items-center gap-2">
                                  <Wand2 className="w-3 h-3 text-blue-500" />
                                  <span>{effectDef.name}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Presets Toggle */}
                        <button
                          onClick={() => setShowEffectPresets(!showEffectPresets)}
                          className={`w-full flex items-center justify-between p-2 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                        >
                          <span className="text-xs font-semibold">Effect Presets</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showEffectPresets ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Effect Presets */}
                        {showEffectPresets && (
                          <div className="space-y-2">
                            {/* Filter by category */}
                            <div className="grid grid-cols-2 gap-2">
                              {EFFECT_PRESETS.filter(p => p.category === activeEffectCategory).slice(0, 6).map(preset => (
                                <button
                                  key={preset.id}
                                  onClick={() => applyPresetToSelection(preset)}
                                  className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-slate-50'} border ${darkMode ? 'border-slate-600' : 'border-slate-200'} group`}
                                >
                                  {/* Preview */}
                                  <div className={`w-full h-12 rounded mb-2 ${darkMode ? 'bg-slate-600' : 'bg-slate-100'} flex items-center justify-center overflow-hidden`}>
                                    <div 
                                      className="w-8 h-8 rounded bg-blue-500"
                                      style={{ filter: generateCSSFilter(preset.effects) }}
                                    />
                                  </div>
                                  <span className={`text-xs ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{preset.name}</span>
                                </button>
                              ))}
                            </div>
                            
                            {EFFECT_PRESETS.filter(p => p.category === activeEffectCategory).length === 0 && (
                              <p className={`text-xs text-center py-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                                No presets for this category
                              </p>
                            )}
                          </div>
                        )}

                        {/* All Presets Quick Access */}
                        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gradient-to-r from-purple-900/50 to-blue-900/50' : 'bg-gradient-to-r from-purple-50 to-blue-50'}`}>
                          <span className={`text-xs font-semibold ${darkMode ? 'text-white' : 'text-purple-700'}`}>🎨 Popular Presets</span>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {EFFECT_PRESETS.slice(0, 8).map(preset => (
                              <button
                                key={preset.id}
                                onClick={() => applyPresetToSelection(preset)}
                                className={`px-2 py-1 rounded text-[10px] ${darkMode ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-600' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                              >
                                {preset.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Advanced Templates Panel */}
                {activePanel === 'templates' && (
                  <div className="space-y-3">
                    {/* Search Bar */}
                    <div className={`relative`}>
                      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="text"
                        placeholder="Search templates..."
                        value={templateSearchQuery}
                        onChange={(e) => setTemplateSearchQuery(e.target.value)}
                        className={`w-full pl-9 pr-4 py-2 rounded-lg text-sm ${darkMode ? 'bg-slate-700 border-slate-600 text-white placeholder:text-slate-400' : 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400'} border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                      {templateSearchQuery && (
                        <button
                          onClick={() => setTemplateSearchQuery('')}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {/* Quick Filters & View Toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowTrendingOnly(!showTrendingOnly)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            showTrendingOnly
                              ? 'bg-orange-500 text-white'
                              : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          🔥 Trending
                        </button>
                        <button
                          onClick={() => setShowNewOnly(!showNewOnly)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            showNewOnly
                              ? 'bg-green-500 text-white'
                              : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          ✨ New
                        </button>
                        <button
                          onClick={() => setShowPremiumOnly(!showPremiumOnly)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            showPremiumOnly
                              ? 'bg-purple-500 text-white'
                              : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          👑 Premium
                        </button>
                      </div>
                      
                      <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                        <button
                          onClick={() => setTemplateViewMode('grid')}
                          className={`p-1.5 rounded ${templateViewMode === 'grid' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-slate-900 shadow') : (darkMode ? 'text-slate-400' : 'text-slate-500')}`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setTemplateViewMode('list')}
                          className={`p-1.5 rounded ${templateViewMode === 'list' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-slate-900 shadow') : (darkMode ? 'text-slate-400' : 'text-slate-500')}`}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Sort & Filter */}
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={templateSortBy}
                        onChange={(e) => setTemplateSortBy(e.target.value as any)}
                        className={`px-2 py-1.5 rounded-lg text-xs ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'} border`}
                      >
                        <option value="popular">Most Popular</option>
                        <option value="newest">Newest First</option>
                        <option value="rating">Highest Rated</option>
                        <option value="name">A to Z</option>
                      </select>
                      
                      <select
                        value={templateDifficulty}
                        onChange={(e) => setTemplateDifficulty(e.target.value as any)}
                        className={`px-2 py-1.5 rounded-lg text-xs ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'} border`}
                      >
                        <option value="all">All Levels</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    
                    {/* Category Tabs */}
                    <div className="space-y-1">
                      <label className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Category</label>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => setTemplateCategory('all')}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            templateCategory === 'all'
                              ? 'bg-blue-500 text-white'
                              : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          All
                        </button>
                        {TEMPLATE_CATEGORIES_ADVANCED.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => setTemplateCategory(cat.id)}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                              templateCategory === cat.id
                                ? 'bg-blue-500 text-white'
                                : darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className="mr-1">{cat.icon}</span>
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Industry Filter */}
                    <div className="space-y-1">
                      <label className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Industry</label>
                      <select
                        value={templateIndustry}
                        onChange={(e) => setTemplateIndustry(e.target.value as any)}
                        className={`w-full px-3 py-2 rounded-lg text-sm ${darkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-white border-slate-200 text-slate-900'} border`}
                      >
                        <option value="all">All Industries</option>
                        {INDUSTRIES.map(industry => (
                          <option key={industry.id} value={industry.id}>
                            {industry.icon} {industry.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Favorites */}
                    {favoriteTemplates.length > 0 && (
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-amber-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-amber-500 fill-current" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Favorite Templates</span>
                        </div>
                        <div className="space-y-1">
                          {favoriteTemplates.slice(0, 3).map(templateId => {
                            const template = ADVANCED_TEMPLATES.find(t => t.id === templateId)
                            if (!template) return null
                            return (
                              <button
                                key={template.id}
                                onClick={() => {
                                  setSelectedTemplate(template)
                                  setShowTemplatePreview(true)
                                }}
                                className={`w-full p-2 rounded-lg text-left ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-slate-50'} transition-colors`}
                              >
                                <p className={`text-xs font-medium ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{template.name}</p>
                                <p className={`text-[10px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{template.category}</p>
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Templates Grid/List */}
                    <div className={`rounded-lg p-2 ${darkMode ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {getFilteredTemplates().length} templates
                        </span>
                      </div>
                      
                      {templateViewMode === 'grid' ? (
                        <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto scrollbar-thin">
                          {getFilteredTemplates().map(template => (
                            <div
                              key={template.id}
                              className={`group relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                                darkMode 
                                  ? 'bg-slate-700 hover:bg-slate-600 hover:ring-2 hover:ring-blue-500' 
                                  : 'bg-white hover:bg-slate-100 hover:ring-2 hover:ring-blue-500'
                              } shadow-sm`}
                              onClick={() => {
                                setSelectedTemplate(template)
                                setShowTemplatePreview(true)
                              }}
                            >
                              {/* Thumbnail */}
                              <div className={`aspect-video flex items-center justify-center text-4xl ${darkMode ? 'bg-slate-600' : 'bg-slate-100'}`}>
                                {template.thumbnail}
                              </div>
                              
                              {/* Content */}
                              <div className="p-2">
                                <div className="flex items-start justify-between mb-1">
                                  <h4 className={`text-xs font-medium line-clamp-2 flex-1 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                    {template.name}
                                  </h4>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleFavoriteTemplate(template.id)
                                    }}
                                    className={`ml-1 ${
                                      favoriteTemplates.includes(template.id)
                                        ? 'text-amber-500'
                                        : darkMode ? 'text-slate-400 hover:text-amber-500' : 'text-slate-400 hover:text-amber-500'
                                    }`}
                                  >
                                    <Star className={`w-3 h-3 ${favoriteTemplates.includes(template.id) ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
                                
                                {/* Meta */}
                                <div className="flex items-center gap-2 text-[10px]">
                                  <span className={`flex items-center gap-0.5 ${darkMode ? 'text-amber-400' : 'text-amber-600'}`}>
                                    ⭐ {template.rating}
                                  </span>
                                  <span className={darkMode ? 'text-slate-400' : 'text-slate-500'}>
                                    {template.downloads.toLocaleString()} uses
                                  </span>
                                  {template.isPremium && (
                                    <span className="px-1 py-0.5 rounded bg-purple-500 text-white">👑</span>
                                  )}
                                  {template.isNew && (
                                    <span className="px-1 py-0.5 rounded bg-green-500 text-white">NEW</span>
                                  )}
                                </div>
                                
                                {/* Quick Apply Button */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    applyTemplate(template)
                                  }}
                                  className={`w-full mt-2 px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                                    darkMode
                                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                                      : 'bg-blue-500 hover:bg-blue-600 text-white'
                                  }`}
                                >
                                  Use Template
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin">
                          {getFilteredTemplates().map(template => (
                            <div
                              key={template.id}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                darkMode 
                                  ? 'hover:bg-slate-600' 
                                  : 'hover:bg-slate-100'
                              }`}
                              onClick={() => {
                                setSelectedTemplate(template)
                                setShowTemplatePreview(true)
                              }}
                            >
                              <div className={`w-16 h-12 flex-shrink-0 rounded flex items-center justify-center text-2xl ${darkMode ? 'bg-slate-600' : 'bg-slate-100'}`}>
                                {template.thumbnail}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-medium truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {template.name}
                                </h4>
                                <p className={`text-xs truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {template.category} • ⭐ {template.rating}
                                </p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  applyTemplate(template)
                                }}
                                className={`px-3 py-1 rounded text-xs font-medium ${
                                  darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
                                }`}
                              >
                                Use
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {getFilteredTemplates().length === 0 && (
                        <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <Layout className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No templates found</p>
                          <p className="text-xs mt-1">Try adjusting your filters</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Template Collections */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                      <h4 className={`text-xs font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        📦 Template Collections
                      </h4>
                      <div className="space-y-1">
                        {TEMPLATE_COLLECTIONS.slice(0, 3).map(collection => (
                          <button
                            key={collection.id}
                            className={`w-full p-2 rounded-lg text-left transition-colors ${
                              darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{collection.thumbnail}</span>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {collection.name}
                                  {collection.isPremium && <span className="ml-1">👑</span>}
                                </p>
                                <p className={`text-[10px] truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  {collection.templates.length} templates
                                </p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Tips */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        💡 Click a template to preview, or click "Use Template" to apply directly to your canvas.
                      </p>
                    </div>
                  </div>
                )}

                {/* Assets Panel - Enhanced Asset Library */}
                {activePanel === 'assets' && (
                  <div className="space-y-3">
                    {/* Search Bar */}
                    <div className="relative">
                      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                      <input
                        type="text"
                        placeholder="Search assets..."
                        value={assetSearchQuery}
                        onChange={(e) => setAssetSearchQuery(e.target.value)}
                        className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm ${
                          darkMode 
                            ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
                            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                        } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                      {assetSearchQuery && (
                        <button
                          onClick={() => setAssetSearchQuery('')}
                          className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-slate-400 hover:text-slate-300' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    {/* View Toggle & Upload */}
                    <div className="flex items-center justify-between">
                      <div className={`flex rounded-lg p-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                        <button
                          onClick={() => setAssetViewMode('grid')}
                          className={`p-1.5 rounded ${assetViewMode === 'grid' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-slate-900 shadow') : (darkMode ? 'text-slate-400' : 'text-slate-500')}`}
                        >
                          <Grid className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setAssetViewMode('list')}
                          className={`p-1.5 rounded ${assetViewMode === 'list' ? (darkMode ? 'bg-slate-600 text-white' : 'bg-white text-slate-900 shadow') : (darkMode ? 'text-slate-400' : 'text-slate-500')}`}
                        >
                          <AlignLeft className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <label className={`p-2 rounded-lg cursor-pointer transition-colors ${darkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                        <Upload className="w-4 h-4" />
                        <input type="file" accept="image/*" multiple onChange={(e) => {
                          const files = e.target.files
                          if (files) {
                            Array.from(files).forEach(file => {
                              const reader = new FileReader()
                              reader.onload = (evt) => {
                                if (evt.target?.result) {
                                  handleAddImage(evt.target.result as string)
                                }
                              }
                              reader.readAsDataURL(file)
                            })
                          }
                        }} className="hidden" />
                      </label>
                    </div>
                    
                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-1">
                      {ASSET_CATEGORIES.slice(0, 8).map(category => (
                        <button
                          key={category.id}
                          onClick={() => setAssetCategory(category.id)}
                          className={`px-2 py-1 text-xs rounded-full transition-colors ${
                            assetCategory === category.id
                              ? 'bg-blue-500 text-white'
                              : darkMode
                                ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          <span className="mr-1">{category.icon}</span>
                          {category.name}
                        </button>
                      ))}
                    </div>
                    
                    {/* Icon Subcategory Filter */}
                    {assetCategory === 'icons' && (
                      <div>
                        <select
                          value={assetIconCategory}
                          onChange={(e) => setAssetIconCategory(e.target.value)}
                          className={`w-full p-2 rounded-lg text-sm ${
                            darkMode
                              ? 'bg-slate-700 border-slate-600 text-white'
                              : 'bg-white border-slate-300 text-slate-900'
                          } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                          {ICON_CATEGORIES.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                          ))}
                        </select>
                      </div>
                    )}
                    
                    {/* Favorites Section */}
                    {favoriteAssets.length > 0 && (
                      <div className={`p-2 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-amber-50'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-amber-500" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Favorites</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {favoriteAssets.slice(0, 8).map(assetId => {
                            const asset = getAllBuiltinAssets().find(a => a.id === assetId)
                            if (!asset) return null
                            return (
                              <button
                                key={asset.id}
                                onClick={() => addAssetToCanvas(asset)}
                                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-slate-100'} transition-colors`}
                                title={asset.name}
                              >
                                <div 
                                  className="w-6 h-6"
                                  style={{ color: darkMode ? '#94A3B8' : '#475569' }}
                                  dangerouslySetInnerHTML={{ __html: asset.source }}
                                />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Assets Grid/List */}
                    <div className={`rounded-lg p-2 ${darkMode ? 'bg-slate-700/30' : 'bg-slate-50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          {getFilteredAssets().length} assets
                        </span>
                      </div>
                      
                      {assetViewMode === 'grid' ? (
                        <div className="grid grid-cols-4 gap-2 max-h-[400px] overflow-y-auto scrollbar-thin">
                          {getFilteredAssets().map(asset => (
                            <div
                              key={asset.id}
                              className={`group relative p-2 rounded-lg cursor-pointer transition-all ${
                                darkMode 
                                  ? 'bg-slate-700 hover:bg-slate-600 hover:ring-2 hover:ring-blue-500' 
                                  : 'bg-white hover:bg-slate-100 hover:ring-2 hover:ring-blue-500'
                              } shadow-sm`}
                              onClick={() => addAssetToCanvas(asset)}
                              title={asset.name}
                            >
                              <div 
                                className="w-full aspect-square flex items-center justify-center"
                                style={{ color: darkMode ? '#94A3B8' : '#475569' }}
                                dangerouslySetInnerHTML={{ __html: asset.source }}
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavoriteAsset(asset.id)
                                }}
                                className={`absolute top-1 right-1 p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity ${
                                  favoriteAssets.includes(asset.id)
                                    ? 'text-amber-500'
                                    : darkMode ? 'text-slate-400 hover:text-amber-500' : 'text-slate-400 hover:text-amber-500'
                                }`}
                              >
                                <Star className={`w-3 h-3 ${favoriteAssets.includes(asset.id) ? 'fill-current' : ''}`} />
                              </button>
                              <p className={`text-[10px] text-center mt-1 truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                {asset.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-1 max-h-[400px] overflow-y-auto scrollbar-thin">
                          {getFilteredAssets().map(asset => (
                            <div
                              key={asset.id}
                              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                                darkMode 
                                  ? 'hover:bg-slate-600' 
                                  : 'hover:bg-slate-100'
                              }`}
                              onClick={() => addAssetToCanvas(asset)}
                            >
                              <div 
                                className="w-8 h-8 flex-shrink-0"
                                style={{ color: darkMode ? '#94A3B8' : '#475569' }}
                                dangerouslySetInnerHTML={{ __html: asset.source }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className={`text-sm truncate ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{asset.name}</p>
                                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{asset.type}</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleFavoriteAsset(asset.id)
                                }}
                                className={`p-1 rounded ${
                                  favoriteAssets.includes(asset.id)
                                    ? 'text-amber-500'
                                    : darkMode ? 'text-slate-400 hover:text-amber-500' : 'text-slate-400 hover:text-amber-500'
                                }`}
                              >
                                <Star className={`w-4 h-4 ${favoriteAssets.includes(asset.id) ? 'fill-current' : ''}`} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {getFilteredAssets().length === 0 && (
                        <div className={`text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">No assets found</p>
                          <p className="text-xs mt-1">Try a different search or category</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Quick Shapes Section */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                      <p className={`text-xs font-medium mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Quick Shapes</p>
                      <div className="grid grid-cols-4 gap-2">
                        {BUILTIN_SHAPES.slice(0, 8).map(shape => (
                          <button
                            key={shape.id}
                            onClick={() => addAssetToCanvas(shape)}
                            className={`p-2 rounded-lg transition-colors ${
                              darkMode 
                                ? 'bg-slate-600 hover:bg-slate-500' 
                                : 'bg-white hover:bg-slate-50'
                            }`}
                            title={shape.name}
                          >
                            <div 
                              className="w-full aspect-square flex items-center justify-center"
                              style={{ color: darkMode ? '#94A3B8' : '#475569' }}
                              dangerouslySetInnerHTML={{ __html: shape.source }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Recently Used */}
                    {recentlyUsedAssets.length > 0 && (
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-slate-100'}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <RotateCcw className="w-4 h-4 text-blue-500" />
                          <span className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Recently Used</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {recentlyUsedAssets.slice(0, 8).map(assetId => {
                            const asset = getAllBuiltinAssets().find(a => a.id === assetId)
                            if (!asset) return null
                            return (
                              <button
                                key={asset.id}
                                onClick={() => addAssetToCanvas(asset)}
                                className={`p-2 rounded-lg ${darkMode ? 'bg-slate-600 hover:bg-slate-500' : 'bg-white hover:bg-slate-100'} transition-colors`}
                                title={asset.name}
                              >
                                <div 
                                  className="w-6 h-6"
                                  style={{ color: darkMode ? '#94A3B8' : '#475569' }}
                                  dangerouslySetInnerHTML={{ __html: asset.source }}
                                />
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Tips */}
                    <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700/50' : 'bg-blue-50'}`}>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-blue-700'}`}>
                        💡 Click an asset to add it to canvas. Use ⭐ to favorite assets for quick access.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Canvas Area */}
          <div 
            className="flex-1 bg-slate-100 overflow-hidden relative" 
            ref={canvasContainerRef}
            style={{ cursor: isSpacePressed || isPanning ? 'grab' : 'default' }}
            onWheel={(e) => {
              if (e.ctrlKey || e.metaKey) {
                e.preventDefault()
                const delta = -e.deltaY * 0.001
                handleZoom(delta)
              }
            }}
            onMouseDown={(e) => {
              if (isSpacePressed && e.button === 0) {
                e.preventDefault()
                setIsPanning(true)
                setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y })
              }
            }}
            onMouseMove={(e) => {
              if (isPanning) {
                setPanOffset({
                  x: e.clientX - panStart.x,
                  y: e.clientY - panStart.y
                })
              }
              // Handle freehand drawing
              if (isDrawingFreehand) {
                handleFreehandMove(e)
              }
            }}
            onMouseUp={() => {
              if (isPanning) {
                setIsPanning(false)
              }
              // Complete freehand drawing
              if (isDrawingFreehand) {
                handleFreehandEnd()
              }
            }}
            onMouseLeave={() => {
              // Complete freehand drawing when leaving canvas
              if (isDrawingFreehand) {
                handleFreehandEnd()
              }
            }}
          >
            {/* Horizontal Ruler */}
            {showRulers && (
              <div className="sticky top-0 left-0 h-6 bg-slate-200 border-b border-slate-300 flex items-center z-10 ml-6">
                <div className="flex-1 relative" style={{ marginLeft: '48px' }}>
                  {Array.from({ length: Math.ceil(canvas.width / 100) + 1 }).map((_, i) => (
                    <div key={i} className="absolute flex flex-col items-center" style={{ left: `${i * 100 * canvas.zoom}px` }}>
                      <div className="text-xs text-slate-500 font-mono">{i * 100}</div>
                      <div className="w-px h-2 bg-slate-400"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex min-h-full">
              {/* Vertical Ruler */}
              {showRulers && (
                <div className="sticky left-0 top-0 w-6 bg-slate-200 border-r border-slate-300 flex flex-col items-center z-10">
                  <div className="flex-1 relative" style={{ marginTop: '24px' }}>
                    {Array.from({ length: Math.ceil(canvas.height / 100) + 1 }).map((_, i) => (
                      <div key={i} className="absolute flex items-center" style={{ top: `${i * 100 * canvas.zoom}px` }}>
                        <div className="text-xs text-slate-500 font-mono transform -rotate-90 origin-center">{i * 100}</div>
                        <div className="h-px w-2 bg-slate-400"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main Canvas */}
              <div 
                className="flex-1 flex items-center justify-center p-12"
                style={{
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
                  transition: isPanning ? 'none' : 'transform 0.1s ease'
                }}
              >
                <div
                  ref={canvasRef}
                  className="bg-white shadow-2xl relative"
                  onMouseDown={handleCanvasMouseDown}
                  onContextMenu={(e) => handleContextMenu(e)}
                  style={{
                    width: canvas.width * canvas.zoom,
                    height: canvas.height * canvas.zoom,
                    backgroundImage: canvas.showGrid
                      ? (() => {
                          const color = canvas.gridColor || '#E2E8F0'
                          const opacity = canvas.gridOpacity !== undefined ? canvas.gridOpacity : 0.5
                          // Convert hex to rgba
                          const r = parseInt(color.slice(1, 3), 16)
                          const g = parseInt(color.slice(3, 5), 16)
                          const b = parseInt(color.slice(5, 7), 16)
                          const rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`
                          return `
                            linear-gradient(to right, ${rgba} 1px, transparent 1px),
                            linear-gradient(to bottom, ${rgba} 1px, transparent 1px)
                          `
                        })()
                      : 'none',
                    backgroundSize: canvas.showGrid
                      ? `${canvas.gridSize * canvas.zoom}px ${canvas.gridSize * canvas.zoom}px`
                      : 'auto',
                    backgroundColor: canvas.backgroundColor
                  }}
                >
                {showGuides && guides.map(guide => (
                  <div
                    key={guide.id}
                    className="absolute cursor-move group hover:bg-emerald-400 transition-colors"
                    style={guide.type === 'vertical'
                      ? { 
                          left: guide.position * canvas.zoom - 2, 
                          top: 0, 
                          width: 5, 
                          height: '100%',
                          backgroundColor: guideDragState?.guideId === guide.id ? 'rgb(16 185 129)' : 'rgb(16 185 129 / 0.4)'
                        }
                      : { 
                          top: guide.position * canvas.zoom - 2, 
                          left: 0, 
                          height: 5, 
                          width: '100%',
                          backgroundColor: guideDragState?.guideId === guide.id ? 'rgb(16 185 129)' : 'rgb(16 185 129 / 0.4)'
                        }
                    }
                    onMouseDown={(e) => handleGuideMouseDown(e, guide.id)}
                    title={`Drag to reposition or drag outside to remove (${guide.type} guide at ${Math.round(guide.position)})`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-emerald-600 text-white text-xs px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap">
                        {Math.round(guide.position)}px
                      </div>
                    </div>
                  </div>
                ))}

                {selectionBox.active && (
                  <div
                    className="absolute border-2 border-blue-400/70 bg-blue-200/10 pointer-events-none"
                    style={{
                      left: selectionBox.x * canvas.zoom,
                      top: selectionBox.y * canvas.zoom,
                      width: selectionBox.width * canvas.zoom,
                      height: selectionBox.height * canvas.zoom
                    }}
                  />
                )}

                {/* Pen Tool Preview */}
                {activeTool === 'pen' && penToolPoints.length > 0 && (
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width={canvas.width * canvas.zoom}
                    height={canvas.height * canvas.zoom}
                    style={{ overflow: 'visible' }}
                  >
                    {/* Draw the path so far */}
                    <path
                      d={penToolPoints.map((p, i) => {
                        if (i === 0) return `M ${p.x * canvas.zoom} ${p.y * canvas.zoom}`
                        const prev = penToolPoints[i - 1]
                        if (prev.handleOut && p.handleIn) {
                          return `C ${prev.handleOut.x * canvas.zoom} ${prev.handleOut.y * canvas.zoom} ${p.handleIn.x * canvas.zoom} ${p.handleIn.y * canvas.zoom} ${p.x * canvas.zoom} ${p.y * canvas.zoom}`
                        }
                        return `L ${p.x * canvas.zoom} ${p.y * canvas.zoom}`
                      }).join(' ')}
                      fill="none"
                      stroke={currentStrokeColor}
                      strokeWidth={currentStrokeWidth}
                      strokeDasharray="5,5"
                    />
                    {/* Draw points */}
                    {penToolPoints.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x * canvas.zoom}
                          cy={p.y * canvas.zoom}
                          r={4}
                          fill="white"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          className="cursor-pointer"
                        />
                        {/* Draw handles for smooth points */}
                        {p.handleIn && (
                          <>
                            <line
                              x1={p.x * canvas.zoom}
                              y1={p.y * canvas.zoom}
                              x2={p.handleIn.x * canvas.zoom}
                              y2={p.handleIn.y * canvas.zoom}
                              stroke="#8B5CF6"
                              strokeWidth={1}
                            />
                            <circle
                              cx={p.handleIn.x * canvas.zoom}
                              cy={p.handleIn.y * canvas.zoom}
                              r={3}
                              fill="#8B5CF6"
                            />
                          </>
                        )}
                        {p.handleOut && (
                          <>
                            <line
                              x1={p.x * canvas.zoom}
                              y1={p.y * canvas.zoom}
                              x2={p.handleOut.x * canvas.zoom}
                              y2={p.handleOut.y * canvas.zoom}
                              stroke="#8B5CF6"
                              strokeWidth={1}
                            />
                            <circle
                              cx={p.handleOut.x * canvas.zoom}
                              cy={p.handleOut.y * canvas.zoom}
                              r={3}
                              fill="#8B5CF6"
                            />
                          </>
                        )}
                      </g>
                    ))}
                  </svg>
                )}

                {/* Freehand Drawing Preview */}
                {isDrawingFreehand && freehandPoints.length > 1 && (
                  <svg
                    className="absolute inset-0 pointer-events-none"
                    width={canvas.width * canvas.zoom}
                    height={canvas.height * canvas.zoom}
                    style={{ overflow: 'visible' }}
                  >
                    <path
                      d={freehandPoints.map((p, i) => 
                        `${i === 0 ? 'M' : 'L'} ${p.x * canvas.zoom} ${p.y * canvas.zoom}`
                      ).join(' ')}
                      fill="none"
                      stroke={currentStrokeColor}
                      strokeWidth={currentStrokeWidth}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}

                {/* Render canvas elements */}
                {canvas.elements
                  .filter(el => el.visible)
                  .sort((a, b) => a.zIndex - b.zIndex)
                  .map(element => {
                    const isSelected = selection.selectedIds.includes(element.id)
                    const elementEffectsList = getElementEffects(element.id)
                    const cssFilterValue = elementEffectsList.length > 0 ? generateCSSFilter(elementEffectsList) : 'none'
                    return (
                      <div
                        key={element.id}
                        data-element-id={element.id}
                        className={`absolute group ${!element.locked ? 'cursor-move' : 'cursor-not-allowed'} ${isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                        style={{
                          left: element.transform.x * canvas.zoom,
                          top: element.transform.y * canvas.zoom,
                          width: element.transform.width * canvas.zoom,
                          height: element.transform.height * canvas.zoom,
                          transform: `rotate(${element.transform.rotation}deg)`,
                          opacity: element.opacity,
                          pointerEvents: element.locked ? 'none' : 'auto',
                          filter: cssFilterValue
                        }}
                        onMouseDown={(e) => {
                          if (!element.locked && editingTextId !== element.id) {
                            handleMouseDown(e, element.id)
                          }
                        }}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (!element.locked) {
                            setSelection({ ...selection, selectedIds: [element.id] })
                          }
                        }}
                        onDoubleClick={(e) => {
                          if (element.type === 'text' && element.text && !element.locked) {
                            e.stopPropagation()
                            setEditingTextId(element.id)
                            setEditingTextValue(element.text.content)
                            setSelection({ ...selection, selectedIds: [element.id] })
                          }
                        }}
                        onContextMenu={(e) => handleContextMenu(e, element.id)}
                      >
                        {element.type === 'text' && element.text && (
                          editingTextId === element.id ? (
                            <div className="relative">
                              {/* Floating text toolbar */}
                              <div className="absolute -top-14 left-0 bg-white shadow-lg rounded-lg border border-slate-200 px-2 py-1.5 flex items-center gap-1 z-50">
                                <button
                                  onClick={() => {
                                    const isBold = element.text!.fontWeight >= 700
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, fontWeight: isBold ? 400 : 700 }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.fontWeight >= 700
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Bold (Ctrl+B)"
                                >
                                  <Bold className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const isItalic = element.text!.fontStyle === 'italic'
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, fontStyle: isItalic ? 'normal' : 'italic' }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.fontStyle === 'italic'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Italic (Ctrl+I)"
                                >
                                  <Italic className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const isUnderline = element.text!.textDecoration === 'underline'
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, textDecoration: isUnderline ? 'none' : 'underline' }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.textDecoration === 'underline'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Underline (Ctrl+U)"
                                >
                                  <Underline className="w-3.5 h-3.5" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                <button
                                  onClick={() => {
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, textAlign: 'left' }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.textAlign === 'left'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Align Left"
                                >
                                  <AlignLeft className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, textAlign: 'center' }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.textAlign === 'center'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Align Center"
                                >
                                  <AlignCenter className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => {
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, textAlign: 'right' }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className={`p-1.5 rounded transition-colors ${
                                    element.text.textAlign === 'right'
                                      ? 'bg-blue-100 text-blue-700'
                                      : 'hover:bg-slate-100 text-slate-600'
                                  }`}
                                  title="Align Right"
                                >
                                  <AlignRight className="w-3.5 h-3.5" />
                                </button>
                                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                <select
                                  value={element.text.fontSize}
                                  onChange={(e) => {
                                    const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                      text: { ...element.text!, fontSize: parseFloat(e.target.value) }
                                    })
                                    setCanvas(newCanvas)
                                  }}
                                  className="text-xs px-2 py-1 border border-slate-200 rounded hover:bg-slate-50"
                                  title="Font Size"
                                >
                                  {[8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96].map(size => (
                                    <option key={size} value={size}>{size}px</option>
                                  ))}
                                </select>
                              </div>
                              
                              <textarea
                                className="absolute inset-0 w-full h-full bg-white/90 border-2 border-blue-400 rounded p-2 text-slate-900 text-base focus:outline-none resize-none"
                                style={{
                                  fontSize: element.text.fontSize,
                                  fontFamily: element.text.fontFamily,
                                  fontWeight: element.text.fontWeight,
                                  fontStyle: element.text.fontStyle,
                                  textDecoration: element.text.textDecoration,
                                  textAlign: element.text.textAlign,
                                  lineHeight: element.text.lineHeight,
                                  color: element.text.color
                                }}
                                value={editingTextValue}
                                autoFocus
                                onChange={(e) => setEditingTextValue(e.target.value)}
                                onBlur={handleCommitTextEdit}
                                onKeyDown={(e) => {
                                  if (e.key === 'Escape') {
                                    setEditingTextId(null)
                                  }
                                  if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                    handleCommitTextEdit()
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            <div
                              style={{
                                fontSize: element.text.fontSize * canvas.zoom,
                                fontFamily: element.text.fontFamily,
                                fontWeight: element.text.fontWeight,
                                fontStyle: element.text.fontStyle,
                                textDecoration: element.text.textDecoration,
                                textAlign: element.text.textAlign,
                                lineHeight: element.text.lineHeight,
                                letterSpacing: element.text.letterSpacing,
                                color: element.text.color,
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <div className="prose" style={{ transform: `scale(${canvas.zoom})`, transformOrigin: 'top left' }}>
                                {element.text.content}
                              </div>
                            </div>
                          )
                        )}

                        {element.type === 'shape' && element.shape && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${element.transform.width} ${element.transform.height}`}
                            preserveAspectRatio="none"
                            style={{ overflow: 'visible' }}
                          >
                            {/* Custom SVG Path shapes (icons, callouts, decorative, etc.) */}
                            {element.shape.customShapeId && SVG_PATHS[element.shape.customShapeId] && (
                              <path
                                d={SVG_PATHS[element.shape.customShapeId](element.transform.width, element.transform.height)}
                                fill={element.shape.fill}
                                stroke={element.shape.stroke}
                                strokeWidth={element.shape.strokeWidth}
                                strokeLinejoin="round"
                                strokeLinecap="round"
                              />
                            )}
                            {/* Rectangle - only if no custom path */}
                            {element.shape.shapeType === 'rectangle' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (
                              <rect
                                x={element.shape.strokeWidth / 2}
                                y={element.shape.strokeWidth / 2}
                                width={element.transform.width - element.shape.strokeWidth}
                                height={element.transform.height - element.shape.strokeWidth}
                                rx={element.shape.cornerRadius || 0}
                                fill={element.shape.fill}
                                stroke={element.shape.stroke}
                                strokeWidth={element.shape.strokeWidth}
                              />
                            )}
                            {/* Circle/Ellipse - only if no custom path */}
                            {element.shape.shapeType === 'circle' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (
                              <ellipse
                                cx={element.transform.width / 2}
                                cy={element.transform.height / 2}
                                rx={element.transform.width / 2 - element.shape.strokeWidth / 2}
                                ry={element.transform.height / 2 - element.shape.strokeWidth / 2}
                                fill={element.shape.fill}
                                stroke={element.shape.stroke}
                                strokeWidth={element.shape.strokeWidth}
                              />
                            )}
                            {/* Triangle - only if no custom path */}
                            {element.shape.shapeType === 'triangle' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (
                              <polygon
                                points={`${element.transform.width / 2},${element.shape.strokeWidth} ${element.transform.width - element.shape.strokeWidth},${element.transform.height - element.shape.strokeWidth} ${element.shape.strokeWidth},${element.transform.height - element.shape.strokeWidth}`}
                                fill={element.shape.fill}
                                stroke={element.shape.stroke}
                                strokeWidth={element.shape.strokeWidth}
                                strokeLinejoin="round"
                              />
                            )}
                            {/* Star - only if no custom path */}
                            {element.shape.shapeType === 'star' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (() => {
                              const cx = element.transform.width / 2
                              const cy = element.transform.height / 2
                              const points = element.shape.points || 5
                              const outerR = Math.min(cx, cy) - element.shape.strokeWidth
                              const innerR = outerR * 0.4
                              let starPoints = ''
                              for (let i = 0; i < points * 2; i++) {
                                const r = i % 2 === 0 ? outerR : innerR
                                const angle = (i * Math.PI) / points - Math.PI / 2
                                starPoints += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `
                              }
                              return (
                                <polygon
                                  points={starPoints.trim()}
                                  fill={element.shape.fill}
                                  stroke={element.shape.stroke}
                                  strokeWidth={element.shape.strokeWidth}
                                  strokeLinejoin="round"
                                />
                              )
                            })()}
                            {/* Polygon (pentagon, hexagon, etc.) - only if no custom path */}
                            {element.shape.shapeType === 'polygon' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (() => {
                              const cx = element.transform.width / 2
                              const cy = element.transform.height / 2
                              const sides = element.shape.points || 6
                              const r = Math.min(cx, cy) - element.shape.strokeWidth
                              let polyPoints = ''
                              for (let i = 0; i < sides; i++) {
                                const angle = (i * 2 * Math.PI) / sides - Math.PI / 2
                                polyPoints += `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)} `
                              }
                              return (
                                <polygon
                                  points={polyPoints.trim()}
                                  fill={element.shape.fill}
                                  stroke={element.shape.stroke}
                                  strokeWidth={element.shape.strokeWidth}
                                  strokeLinejoin="round"
                                />
                              )
                            })()}
                            {/* Line - only if no custom path */}
                            {element.shape.shapeType === 'line' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (
                              <line
                                x1={element.shape.strokeWidth}
                                y1={element.transform.height / 2}
                                x2={element.transform.width - element.shape.strokeWidth}
                                y2={element.transform.height / 2}
                                stroke={element.shape.stroke || element.shape.fill}
                                strokeWidth={element.shape.strokeWidth || 2}
                                strokeLinecap="round"
                              />
                            )}
                            {/* Arrow - only if no custom path */}
                            {element.shape.shapeType === 'arrow' && (!element.shape.customShapeId || !SVG_PATHS[element.shape.customShapeId]) && (() => {
                              const w = element.transform.width
                              const h = element.transform.height
                              const sw = element.shape.strokeWidth
                              const arrowPath = `M ${sw} ${h * 0.35} L ${w * 0.65} ${h * 0.35} L ${w * 0.65} ${sw} L ${w - sw} ${h / 2} L ${w * 0.65} ${h - sw} L ${w * 0.65} ${h * 0.65} L ${sw} ${h * 0.65} Z`
                              return (
                                <path
                                  d={arrowPath}
                                  fill={element.shape.fill}
                                  stroke={element.shape.stroke}
                                  strokeWidth={element.shape.strokeWidth}
                                  strokeLinejoin="round"
                                />
                              )
                            })()}
                          </svg>
                        )}

                        {/* Path Element Rendering */}
                        {element.type === 'path' && element.path && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${element.transform.width} ${element.transform.height}`}
                            preserveAspectRatio="none"
                            style={{ overflow: 'visible' }}
                          >
                            <path
                              d={pathPointsToSVG(element.path)}
                              fill={element.path.fill}
                              stroke={element.path.stroke}
                              strokeWidth={element.path.strokeWidth / canvas.zoom}
                              strokeLinecap={element.path.strokeLineCap}
                              strokeLinejoin={element.path.strokeLineJoin}
                              fillRule={element.path.fillRule}
                              strokeDasharray={element.path.strokeDashArray?.join(' ')}
                            />
                          </svg>
                        )}

                        {/* Freehand Element Rendering */}
                        {element.type === 'path' && element.freehand && (
                          <svg
                            width="100%"
                            height="100%"
                            viewBox={`0 0 ${element.transform.width} ${element.transform.height}`}
                            preserveAspectRatio="none"
                            style={{ overflow: 'visible' }}
                          >
                            <path
                              d={element.freehand.points.map((p, i) => 
                                `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
                              ).join(' ')}
                              fill="none"
                              stroke={element.freehand.stroke}
                              strokeWidth={element.freehand.strokeWidth / canvas.zoom}
                              strokeLinecap={element.freehand.strokeLineCap}
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}

                        {/* Resize Handles - only show for selected elements */}
                        {isSelected && !element.locked && (
                          <>
                            {/* Corner handles */}
                            <div
                              className="absolute -top-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-nw-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'nw')}
                            />
                            <div
                              className="absolute -top-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-ne-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'ne')}
                            />
                            <div
                              className="absolute -bottom-1 -left-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-sw-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'sw')}
                            />
                            <div
                              className="absolute -bottom-1 -right-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-se-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'se')}
                            />
                            
                            {/* Edge handles */}
                            <div
                              className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-n-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'n')}
                            />
                            <div
                              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-s-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 's')}
                            />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 -left-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-w-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'w')}
                            />
                            <div
                              className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 bg-white border-2 border-blue-500 rounded-full cursor-e-resize hover:scale-125 transition-transform"
                              onMouseDown={(e) => handleMouseDown(e, element.id, 'e')}
                            />

                            {/* Rotation handle */}
                            <div
                              className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-grab hover:scale-110 transition-transform shadow-lg"
                              title="Rotate"
                            >
                              <RotateCw className="w-3 h-3" />
                            </div>
                          </>
                        )}

                        {element.locked && (
                          <div className="absolute top-1 right-1 p-1 bg-red-500 rounded text-white shadow-lg">
                            <Lock className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )
                  })}

                {/* Selection overlay would go here */}
                </div>
              </div>
            </div>
          </div>

          {/* Right Properties Panel */}
          {showRightPanel && (
          <div className="w-80 flex-shrink-0 bg-white border-l border-slate-200 overflow-y-auto">
            <div className="p-4">
              <div className="flex gap-2 mb-4 overflow-x-auto">
                <button
                  onClick={() => setActivePanel('elements')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'elements' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Properties
                </button>
                <button
                  onClick={() => setActivePanel('layers')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'layers' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Layers
                </button>
                <button
                  onClick={() => setActivePanel('colors')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'colors' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Colors
                </button>
                <button
                  onClick={() => setActivePanel('shapes')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'shapes' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Shapes
                </button>
                <button
                  onClick={() => setActivePanel('export')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'export' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Export
                </button>
                <button
                  onClick={() => setActivePanel('effects')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'effects' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Effects
                </button>
                <button
                  onClick={() => setActivePanel('mockups')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'mockups' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Mockups
                </button>
                <button
                  onClick={() => setActivePanel('grid')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setActivePanel('artboards')}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${activePanel === 'artboards' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  Artboards
                </button>
              </div>

              {activePanel === 'colors' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Advanced Color Picker
                    </h3>
                  </div>

                  {/* Current Color Display */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-white shadow-lg"
                        style={{ backgroundColor: currentColor }}
                      ></div>
                      <div className="flex-1">
                        <label className="text-xs font-semibold text-slate-600 mb-1 block">Current Color</label>
                        <div className="text-lg font-mono font-bold text-slate-900">{currentColor}</div>
                      </div>
                    </div>

                    {/* Color Input Modes */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => setColorMode('hex')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          colorMode === 'hex' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        HEX
                      </button>
                      <button
                        onClick={() => setColorMode('rgb')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          colorMode === 'rgb' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        RGB
                      </button>
                      <button
                        onClick={() => setColorMode('hsl')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          colorMode === 'hsl' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        HSL
                      </button>
                    </div>

                    {/* Color Inputs */}
                    {colorMode === 'hex' && (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={currentColor}
                          onChange={(e) => {
                            const val = e.target.value
                            if (/^#[0-9A-Fa-f]{0,6}$/.test(val)) {
                              setCurrentColor(val)
                            }
                          }}
                          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="#000000"
                        />
                        <input
                          type="color"
                          value={currentColor}
                          onChange={(e) => setCurrentColor(e.target.value)}
                          className="w-12 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                        />
                      </div>
                    )}

                    {colorMode === 'rgb' && (
                      <div className="space-y-2">
                        {(() => {
                          const hex = currentColor.replace('#', '')
                          const r = parseInt(hex.slice(0, 2), 16) || 0
                          const g = parseInt(hex.slice(2, 4), 16) || 0
                          const b = parseInt(hex.slice(4, 6), 16) || 0
                          const toHex = (n: number) => n.toString(16).padStart(2, '0')
                          return (
                            <>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-red-600">R</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="255"
                                  value={r}
                                  onChange={(e) => setCurrentColor(`#${toHex(parseInt(e.target.value))}${toHex(g)}${toHex(b)}`)}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="255"
                                  value={r}
                                  onChange={(e) => setCurrentColor(`#${toHex(parseInt(e.target.value) || 0)}${toHex(g)}${toHex(b)}`)}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-green-600">G</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="255"
                                  value={g}
                                  onChange={(e) => setCurrentColor(`#${toHex(r)}${toHex(parseInt(e.target.value))}${toHex(b)}`)}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="255"
                                  value={g}
                                  onChange={(e) => setCurrentColor(`#${toHex(r)}${toHex(parseInt(e.target.value) || 0)}${toHex(b)}`)}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-blue-600">B</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="255"
                                  value={b}
                                  onChange={(e) => setCurrentColor(`#${toHex(r)}${toHex(g)}${toHex(parseInt(e.target.value))}`)}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="255"
                                  value={b}
                                  onChange={(e) => setCurrentColor(`#${toHex(r)}${toHex(g)}${toHex(parseInt(e.target.value) || 0)}`)}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    {colorMode === 'hsl' && (
                      <div className="space-y-2">
                        {(() => {
                          // Simple HSL conversion
                          const hex = currentColor.replace('#', '')
                          const r = parseInt(hex.slice(0, 2), 16) / 255
                          const g = parseInt(hex.slice(2, 4), 16) / 255
                          const b = parseInt(hex.slice(4, 6), 16) / 255
                          const max = Math.max(r, g, b)
                          const min = Math.min(r, g, b)
                          const l = (max + min) / 2
                          let h = 0, s = 0
                          if (max !== min) {
                            const d = max - min
                            s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
                            if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
                            else if (max === g) h = ((b - r) / d + 2) / 6
                            else h = ((r - g) / d + 4) / 6
                          }
                          const hslToHex = (h: number, s: number, l: number) => {
                            let r, g, b
                            if (s === 0) {
                              r = g = b = l
                            } else {
                              const hue2rgb = (p: number, q: number, t: number) => {
                                if (t < 0) t += 1
                                if (t > 1) t -= 1
                                if (t < 1/6) return p + (q - p) * 6 * t
                                if (t < 1/2) return q
                                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
                                return p
                              }
                              const q = l < 0.5 ? l * (1 + s) : l + s - l * s
                              const p = 2 * l - q
                              r = hue2rgb(p, q, h + 1/3)
                              g = hue2rgb(p, q, h)
                              b = hue2rgb(p, q, h - 1/3)
                            }
                            const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0')
                            return `#${toHex(r)}${toHex(g)}${toHex(b)}`
                          }
                          return (
                            <>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-purple-600">H</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="360"
                                  value={Math.round(h * 360)}
                                  onChange={(e) => setCurrentColor(hslToHex(parseInt(e.target.value) / 360, s, l))}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="360"
                                  value={Math.round(h * 360)}
                                  onChange={(e) => setCurrentColor(hslToHex((parseInt(e.target.value) || 0) / 360, s, l))}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-pink-600">S</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={Math.round(s * 100)}
                                  onChange={(e) => setCurrentColor(hslToHex(h, parseInt(e.target.value) / 100, l))}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={Math.round(s * 100)}
                                  onChange={(e) => setCurrentColor(hslToHex(h, (parseInt(e.target.value) || 0) / 100, l))}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                              <div className="flex items-center gap-2">
                                <label className="w-6 text-xs font-semibold text-cyan-600">L</label>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={Math.round(l * 100)}
                                  onChange={(e) => setCurrentColor(hslToHex(h, s, parseInt(e.target.value) / 100))}
                                  className="flex-1"
                                />
                                <input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={Math.round(l * 100)}
                                  onChange={(e) => setCurrentColor(hslToHex(h, s, (parseInt(e.target.value) || 0) / 100))}
                                  className="w-16 px-2 py-1 border border-slate-200 rounded text-xs text-center"
                                />
                              </div>
                            </>
                          )
                        })()}
                      </div>
                    )}

                    {/* Apply Button */}
                    <button
                      onClick={() => {
                        applyColorToSelection(currentColor)
                        if (!colorHistory.includes(currentColor)) {
                          setColorHistory([currentColor, ...colorHistory.slice(0, 9)])
                        }
                      }}
                      disabled={selection.selectedIds.length === 0}
                      className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Apply to Selection
                    </button>
                  </div>

                  {/* Color History */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Color History</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {colorHistory.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentColor(color)}
                          className="aspect-square rounded-lg border-2 border-slate-200 hover:border-blue-400 hover:scale-110 transition-all shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Brand Colors */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Brand Colors</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {BRAND_COLORS.map((brand) => (
                        <button
                          key={brand.name}
                          onClick={() => setCurrentColor(brand.color)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-slate-200 hover:border-slate-400 transition-all hover:shadow-md"
                          style={{ background: `linear-gradient(135deg, ${brand.color} 0%, ${brand.color}dd 100%)` }}
                        >
                          <div className="w-4 h-4 rounded-full bg-white/30 border border-white/50"></div>
                          <span className="text-xs font-semibold text-white drop-shadow-md">{brand.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Palettes */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-slate-700">Color Palettes</h4>
                    {COLOR_PALETTES.map((palette) => (
                      <div key={palette.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-slate-600">{palette.name}</span>
                        </div>
                        <div className="flex gap-1.5">
                          {palette.colors.map((color, idx) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentColor(color)}
                              className="flex-1 aspect-square rounded-lg border-2 border-slate-200 hover:border-blue-400 transition-all hover:scale-110 shadow-sm"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activePanel === 'export' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Export Options
                    </h3>
                    <p className="text-xs text-slate-500">Choose format, size, and background for export.</p>
                  </div>

                  {/* Formats */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Format</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {(['png', 'jpg', 'svg', 'pdf'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setExportOptions({ ...exportOptions, format: fmt })}
                          className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${
                            exportOptions.format === fmt ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-700 hover:border-blue-200'
                          }`}
                        >
                          {fmt.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-700">Dimensions (px)</h4>
                      <button
                        onClick={() => setExportOptions({ ...exportOptions, width: canvas.width, height: canvas.height })}
                        className="text-[11px] font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Use Canvas Size
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] text-slate-500">Width</label>
                        <input
                          type="number"
                          min={50}
                          value={exportOptions.width}
                          onChange={(e) => setExportOptions({ ...exportOptions, width: parseInt(e.target.value) || canvas.width })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-slate-500">Height</label>
                        <input
                          type="number"
                          min={50}
                          value={exportOptions.height}
                          onChange={(e) => setExportOptions({ ...exportOptions, height: parseInt(e.target.value) || canvas.height })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quality */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-slate-700">Quality</h4>
                      <span className="text-[11px] text-slate-500">{exportOptions.quality}%</span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={100}
                      value={exportOptions.quality}
                      onChange={(e) => setExportOptions({ ...exportOptions, quality: parseInt(e.target.value) })}
                      className="w-full"
                      disabled={exportOptions.format === 'svg' || exportOptions.format === 'pdf'}
                    />
                    {(exportOptions.format === 'svg' || exportOptions.format === 'pdf') && (
                      <p className="text-[11px] text-slate-500">Quality not applicable for {exportOptions.format.toUpperCase()} exports.</p>
                    )}
                  </div>

                  {/* Background */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-700">Background</h4>
                    <label className={`flex items-center justify-between px-3 py-2 rounded-lg border ${exportOptions.format === 'jpg' ? 'border-slate-200 bg-slate-50 cursor-not-allowed opacity-70' : 'border-slate-200'}`}>
                      <span className="text-sm text-slate-700">Transparent background</span>
                      <input
                        type="checkbox"
                        checked={exportOptions.transparent && exportOptions.format !== 'jpg'}
                        onChange={(e) => setExportOptions({ ...exportOptions, transparent: e.target.checked })}
                        disabled={exportOptions.format === 'jpg'}
                        className="h-4 w-4"
                      />
                    </label>
                    {exportOptions.format === 'jpg' && (
                      <p className="text-[11px] text-slate-500">JPG does not support transparency.</p>
                    )}
                  </div>

                  <button
                    onClick={() => handleExport()}
                    className="w-full px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
                  >
                    Export {exportOptions.format.toUpperCase()}
                  </button>
                </div>
              )}

              {activePanel === 'mockups' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Product Mockups
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">Preview your design on realistic product shapes</p>
                  </div>

                  {/* Category Filter */}
                  <div className="flex gap-1.5 flex-wrap pb-2">
                    {MOCKUP_CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setMockupCategory(category.id)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                          mockupCategory === category.id 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md' 
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mockup Grid */}
                  <div className="grid grid-cols-2 gap-3 max-h-[450px] overflow-y-auto pr-1">
                    {getMockupsByCategory(mockupCategory).map(mockup => {
                      const isSelected = selectedMockup === mockup.id
                      const colorObj = mockup.colors.find(c => c.id === (isSelected ? selectedMockupColor : mockup.defaultColor)) || mockup.colors[0]
                      
                      return (
                        <button
                          key={mockup.id}
                          onClick={() => {
                            setSelectedMockup(mockup.id)
                            setSelectedMockupColor(mockup.defaultColor)
                            toast.success(`${mockup.name} selected`, { icon: '✨' })
                          }}
                          className={`p-2 border-2 rounded-xl transition-all group relative overflow-hidden ${
                            isSelected 
                              ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg' 
                              : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                          }`}
                        >
                          {/* SVG Mockup Preview */}
                          <div 
                            className="w-full aspect-square mb-2 flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg overflow-hidden relative"
                            dangerouslySetInnerHTML={{ 
                              __html: renderMockupSVG(mockup, isSelected ? selectedMockupColor : mockup.defaultColor)
                            }}
                          />
                          
                          {/* Name & Category */}
                          <div className="text-xs font-semibold text-slate-700 group-hover:text-purple-600 truncate">{mockup.name}</div>
                          <div className="flex items-center justify-between mt-0.5">
                            <span className="text-[10px] text-slate-400">{mockup.category}</span>
                            <span className="text-[10px] text-slate-400">{mockup.designZones.length} zone{mockup.designZones.length > 1 ? 's' : ''}</span>
                          </div>
                          
                          {/* Selected Indicator */}
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 bg-purple-500 text-white rounded-full p-1 shadow-md">
                              <Check className="w-3 h-3" />
                            </div>
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {/* Selected Mockup Details */}
                  {selectedMockup && (() => {
                    const mockup = PRODUCT_MOCKUPS.find(m => m.id === selectedMockup)
                    if (!mockup) return null
                    
                    return (
                      <div className="space-y-3 p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl">
                        {/* Header */}
                        <div className="flex items-start gap-3">
                          <div 
                            className="w-16 h-16 bg-white rounded-lg shadow-inner overflow-hidden flex-shrink-0"
                            dangerouslySetInnerHTML={{ __html: renderMockupSVG(mockup, selectedMockupColor) }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-slate-900">{mockup.name}</h4>
                            <p className="text-xs text-slate-500 mt-0.5">{mockup.description}</p>
                            <div className="flex gap-1 mt-1.5">
                              {mockup.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="px-1.5 py-0.5 bg-slate-200 text-slate-600 text-[9px] rounded font-medium">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Color Picker */}
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-2 block">Product Color</label>
                          <div className="flex gap-1.5 flex-wrap">
                            {mockup.colors.map(color => (
                              <button
                                key={color.id}
                                onClick={() => setSelectedMockupColor(color.id)}
                                title={color.name}
                                className={`w-7 h-7 rounded-lg border-2 transition-all ${
                                  selectedMockupColor === color.id 
                                    ? 'border-purple-500 ring-2 ring-purple-200 scale-110' 
                                    : 'border-slate-300 hover:border-slate-400'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              >
                                {selectedMockupColor === color.id && (
                                  <Check className={`w-4 h-4 mx-auto ${color.textColor === 'light' ? 'text-white' : 'text-slate-700'}`} />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Design Zones */}
                        <div>
                          <label className="text-xs font-semibold text-slate-700 mb-2 block">Design Zones</label>
                          <div className="space-y-1.5">
                            {mockup.designZones.map(zone => (
                              <div key={zone.id} className="flex items-center justify-between px-2 py-1.5 bg-white rounded-lg border border-slate-200">
                                <span className="text-xs font-medium text-slate-700">{zone.name}</span>
                                <span className="text-[10px] text-slate-400">{zone.width}×{zone.height}px</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-1">
                          <button 
                            onClick={() => {
                              // Set canvas to primary design zone size
                              const zone = mockup.designZones[0]
                              if (zone) {
                                setCanvas({
                                  ...canvas,
                                  width: zone.width * 3,
                                  height: zone.height * 3
                                })
                                toast.success('Canvas resized for design zone')
                              }
                            }}
                            className="flex-1 px-3 py-2 bg-slate-700 text-white text-xs font-medium rounded-lg hover:bg-slate-800 transition-colors"
                          >
                            Resize Canvas
                          </button>
                          <button 
                            onClick={() => setShowMockupPreview(true)}
                            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
                          >
                            Preview Design
                          </button>
                        </div>
                      </div>
                    )
                  })()}

                  {/* Tips */}
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-700">
                        <strong>Tip:</strong> Create your design on the canvas, then preview it on different products to see how it looks!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'grid' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Grid className="w-4 h-4" />
                      Grid Settings
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">Configure grid size, appearance, and snapping behavior</p>
                  </div>

                  {/* Grid Presets */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Quick Presets</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setCanvas({ ...canvas, gridSize: 8, gridColor: '#CBD5E1', gridOpacity: 0.4 })}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        8pt Grid
                      </button>
                      <button
                        onClick={() => setCanvas({ ...canvas, gridSize: 10, gridColor: '#CBD5E1', gridOpacity: 0.5 })}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        10pt Grid
                      </button>
                      <button
                        onClick={() => setCanvas({ ...canvas, gridSize: 20, gridColor: '#E2E8F0', gridOpacity: 0.5 })}
                        className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        20pt Grid
                      </button>
                    </div>
                  </div>

                  {/* Grid Size */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                      <span>Grid Size</span>
                      <span className="text-slate-400">{canvas.gridSize}px</span>
                    </label>
                    <input
                      type="range"
                      min="4"
                      max="100"
                      step="2"
                      value={canvas.gridSize}
                      onChange={(e) => setCanvas({ ...canvas, gridSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>4px</span>
                      <span>100px</span>
                    </div>
                  </div>

                  {/* Grid Color */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-2 block">Grid Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={canvas.gridColor || '#E2E8F0'}
                        onChange={(e) => setCanvas({ ...canvas, gridColor: e.target.value })}
                        className="w-12 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={canvas.gridColor || '#E2E8F0'}
                        onChange={(e) => setCanvas({ ...canvas, gridColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Grid Opacity */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                      <span>Grid Opacity</span>
                      <span className="text-slate-400">{Math.round((canvas.gridOpacity || 0.5) * 100)}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={canvas.gridOpacity || 0.5}
                      onChange={(e) => setCanvas({ ...canvas, gridOpacity: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* Grid Toggles */}
                  <div className="space-y-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Show Grid</label>
                      <button
                        onClick={() => setCanvas({ ...canvas, showGrid: !canvas.showGrid })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${canvas.showGrid ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${canvas.showGrid ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-slate-700">Snap to Grid</label>
                      <button
                        onClick={() => setCanvas({ ...canvas, snapToGrid: !canvas.snapToGrid })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${canvas.snapToGrid ? 'bg-purple-600' : 'bg-slate-300'}`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${canvas.snapToGrid ? 'translate-x-6' : 'translate-x-1'}`} />
                      </button>
                    </div>
                  </div>

                  {/* Canvas Background */}
                  <div className="pt-3 border-t border-slate-200">
                    <h4 className="text-xs font-semibold text-slate-700 mb-3">Canvas Background</h4>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={canvas.backgroundColor}
                        onChange={(e) => setCanvas({ ...canvas, backgroundColor: e.target.value })}
                        className="w-12 h-10 rounded-lg border-2 border-slate-200 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={canvas.backgroundColor}
                        onChange={(e) => setCanvas({ ...canvas, backgroundColor: e.target.value })}
                        className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Grid className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-green-700">
                        <strong>Tip:</strong> Use 8pt or 10pt grids for UI design, 20pt for print work
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'shapes' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Square className="w-4 h-4" />
                      Shape Library
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">Click to add shapes to your canvas</p>
                  </div>

                  {/* Basic Shapes */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Basic Shapes</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleAddShape('rectangle')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-10 h-8 bg-blue-500 rounded group-hover:scale-110 transition-transform"></div>
                        <span className="text-[11px] font-medium text-slate-600">Rectangle</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('circle')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-10 h-10 bg-green-500 rounded-full group-hover:scale-110 transition-transform"></div>
                        <span className="text-[11px] font-medium text-slate-600">Circle</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('triangle')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all group"
                      >
                        <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-purple-500 group-hover:scale-110 transition-transform"></div>
                        <span className="text-[11px] font-medium text-slate-600">Triangle</span>
                      </button>
                    </div>
                  </div>

                  {/* Special Shapes */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Special Shapes</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleAddShape('star')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 transition-all group"
                      >
                        <Star className="w-10 h-10 text-yellow-500 fill-yellow-500 group-hover:scale-110 transition-transform" />
                        <span className="text-[11px] font-medium text-slate-600">Star</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('polygon')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-pink-400 hover:bg-pink-50 transition-all group"
                      >
                        <div className="w-10 h-10 bg-pink-500 group-hover:scale-110 transition-transform" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
                        <span className="text-[11px] font-medium text-slate-600">Polygon</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('line')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all group"
                      >
                        <div className="w-10 h-1 bg-slate-600 group-hover:scale-110 transition-transform"></div>
                        <span className="text-[11px] font-medium text-slate-600">Line</span>
                      </button>
                    </div>
                  </div>

                  {/* Arrows */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Arrows</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleAddShape('arrow')}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all group"
                      >
                        <div className="flex items-center group-hover:scale-110 transition-transform">
                          <div className="w-6 h-1 bg-orange-500"></div>
                          <div className="w-0 h-0 border-l-[8px] border-t-[6px] border-b-[6px] border-l-orange-500 border-t-transparent border-b-transparent"></div>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600">Arrow</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('arrow', { width: 150, height: 40 })}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-400 hover:bg-cyan-50 transition-all group"
                      >
                        <div className="flex items-center group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-r-[8px] border-t-[6px] border-b-[6px] border-r-cyan-500 border-t-transparent border-b-transparent"></div>
                          <div className="w-4 h-1 bg-cyan-500"></div>
                          <div className="w-0 h-0 border-l-[8px] border-t-[6px] border-b-[6px] border-l-cyan-500 border-t-transparent border-b-transparent"></div>
                        </div>
                        <span className="text-[11px] font-medium text-slate-600">Double</span>
                      </button>
                      <button
                        onClick={() => handleAddShape('arrow', { fill: '#8B5CF6', stroke: '#6D28D9' })}
                        className="flex flex-col items-center gap-2 p-3 border-2 border-slate-200 rounded-xl hover:border-violet-400 hover:bg-violet-50 transition-all group"
                      >
                        <div className="w-8 h-8 bg-violet-500 group-hover:scale-110 transition-transform" style={{ clipPath: 'polygon(40% 0%, 40% 40%, 0% 40%, 50% 100%, 100% 40%, 60% 40%, 60% 0%)' }}></div>
                        <span className="text-[11px] font-medium text-slate-600">Down</span>
                      </button>
                    </div>
                  </div>

                  {/* Color Preset Shapes */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-700 mb-2">Quick Color Shapes</h4>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { color: '#EF4444', name: 'Red' },
                        { color: '#F59E0B', name: 'Orange' },
                        { color: '#10B981', name: 'Green' },
                        { color: '#3B82F6', name: 'Blue' },
                        { color: '#8B5CF6', name: 'Purple' }
                      ].map((preset) => (
                        <button
                          key={preset.color}
                          onClick={() => handleAddShape('rectangle', { fill: preset.color, stroke: preset.color })}
                          className="aspect-square rounded-lg border-2 border-slate-200 hover:border-slate-400 hover:scale-110 transition-all"
                          style={{ backgroundColor: preset.color }}
                          title={`Add ${preset.name} Rectangle`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-2">
                      {[
                        { color: '#EF4444', name: 'Red' },
                        { color: '#F59E0B', name: 'Orange' },
                        { color: '#10B981', name: 'Green' },
                        { color: '#3B82F6', name: 'Blue' },
                        { color: '#8B5CF6', name: 'Purple' }
                      ].map((preset) => (
                        <button
                          key={preset.color + '-circle'}
                          onClick={() => handleAddShape('circle', { fill: preset.color, stroke: preset.color })}
                          className="aspect-square rounded-full border-2 border-slate-200 hover:border-slate-400 hover:scale-110 transition-all"
                          style={{ backgroundColor: preset.color }}
                          title={`Add ${preset.name} Circle`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Square className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div className="text-xs text-blue-700">
                        <strong>Tip:</strong> Hold Shift while resizing to maintain aspect ratio. Use the Properties panel to adjust exact dimensions.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'effects' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Wand2 className="w-4 h-4" />
                      Effects & Filters
                    </h3>
                    {selection.selectedIds.length > 0 && selectedElement ? (
                      <>
                        {/* Image Filters (for image elements) */}
                        {selectedElement.type === 'image' && (
                          <div className="space-y-4">
                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                                <span>Brightness</span>
                                <span className="text-slate-400">{selectedElement.image?.brightness || 100}%</span>
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={selectedElement.image?.brightness || 100}
                                onChange={(e) => {
                                  const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                    image: { ...selectedElement.image!, brightness: parseInt(e.target.value) }
                                  })
                                  setCanvas(newCanvas)
                                }}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                                <span>Contrast</span>
                                <span className="text-slate-400">{selectedElement.image?.contrast || 100}%</span>
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={selectedElement.image?.contrast || 100}
                                onChange={(e) => {
                                  const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                    image: { ...selectedElement.image!, contrast: parseInt(e.target.value) }
                                  })
                                  setCanvas(newCanvas)
                                }}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                                <span>Saturation</span>
                                <span className="text-slate-400">{selectedElement.image?.saturation || 100}%</span>
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="200"
                                value={selectedElement.image?.saturation || 100}
                                onChange={(e) => {
                                  const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                    image: { ...selectedElement.image!, saturation: parseInt(e.target.value) }
                                  })
                                  setCanvas(newCanvas)
                                }}
                                className="w-full"
                              />
                            </div>

                            <div>
                              <label className="text-xs font-semibold text-slate-700 mb-2 flex items-center justify-between">
                                <span>Blur</span>
                                <span className="text-slate-400">{selectedElement.image?.blur || 0}px</span>
                              </label>
                              <input
                                type="range"
                                min="0"
                                max="20"
                                value={selectedElement.image?.blur || 0}
                                onChange={(e) => {
                                  const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                    image: { ...selectedElement.image!, blur: parseInt(e.target.value) }
                                  })
                                  setCanvas(newCanvas)
                                }}
                                className="w-full"
                              />
                            </div>
                          </div>
                        )}

                        {/* Layer Effects (for all elements) */}
                        <div className="space-y-4 pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-bold text-slate-900">Layer Effects</h4>
                          
                          <div className="p-3 bg-slate-50 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-slate-700">Drop Shadow</label>
                              <input type="checkbox" className="rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-xs text-slate-500">X</label>
                                <input type="number" defaultValue="0" className="w-full px-2 py-1 border border-slate-200 rounded text-xs" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Y</label>
                                <input type="number" defaultValue="4" className="w-full px-2 py-1 border border-slate-200 rounded text-xs" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Blur</label>
                                <input type="number" defaultValue="8" className="w-full px-2 py-1 border border-slate-200 rounded text-xs" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Color</label>
                                <input type="color" defaultValue="#000000" className="w-full h-7 border border-slate-200 rounded" />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-slate-700">Glow</label>
                              <input type="checkbox" className="rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-xs text-slate-500">Blur</label>
                                <input type="number" defaultValue="10" className="w-full px-2 py-1 border border-slate-200 rounded text-xs" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Color</label>
                                <input type="color" defaultValue="#3B82F6" className="w-full h-7 border border-slate-200 rounded" />
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-50 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                              <label className="text-xs font-medium text-slate-700">Stroke</label>
                              <input type="checkbox" className="rounded" />
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <label className="text-xs text-slate-500">Width</label>
                                <input type="number" defaultValue="2" className="w-full px-2 py-1 border border-slate-200 rounded text-xs" />
                              </div>
                              <div>
                                <label className="text-xs text-slate-500">Color</label>
                                <input type="color" defaultValue="#000000" className="w-full h-7 border border-slate-200 rounded" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Quick Filter Presets */}
                        <div className="pt-4 border-t border-slate-200">
                          <h4 className="text-xs font-bold text-slate-900 mb-3">Quick Filters</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors">
                              Grayscale
                            </button>
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors">
                              Sepia
                            </button>
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors">
                              Invert
                            </button>
                            <button className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors">
                              Vintage
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <Sliders className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm text-slate-500">Select an element to apply effects</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activePanel === 'elements' && selectedElement && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Position & Size</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">X</label>
                        <input
                          type="number"
                          value={Math.round(selectedElement.transform.x)}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: { ...selectedElement.transform, x: parseFloat(e.target.value) || 0 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Y</label>
                        <input
                          type="number"
                          value={Math.round(selectedElement.transform.y)}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: { ...selectedElement.transform, y: parseFloat(e.target.value) || 0 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Width</label>
                        <input
                          type="number"
                          value={Math.round(selectedElement.transform.width)}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: { ...selectedElement.transform, width: parseFloat(e.target.value) || 1 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Height</label>
                        <input
                          type="number"
                          value={Math.round(selectedElement.transform.height)}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: { ...selectedElement.transform, height: parseFloat(e.target.value) || 1 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rotation & Opacity */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Transform</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-slate-600">Rotation</label>
                          <span className="text-xs text-slate-400">{Math.round(selectedElement.transform.rotation || 0)}°</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="-180"
                            max="180"
                            value={selectedElement.transform.rotation || 0}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                transform: { ...selectedElement.transform, rotation: parseFloat(e.target.value) || 0 }
                              })
                              setCanvas(newCanvas)
                            }}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="-360"
                            max="360"
                            value={Math.round(selectedElement.transform.rotation || 0)}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                transform: { ...selectedElement.transform, rotation: parseFloat(e.target.value) || 0 }
                              })
                              setCanvas(newCanvas)
                            }}
                            className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-center"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-medium text-slate-600">Opacity</label>
                          <span className="text-xs text-slate-400">{Math.round((selectedElement.opacity ?? 1) * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={(selectedElement.opacity ?? 1) * 100}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                opacity: parseFloat(e.target.value) / 100
                              })
                              setCanvas(newCanvas)
                            }}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={Math.round((selectedElement.opacity ?? 1) * 100)}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                opacity: (parseFloat(e.target.value) || 100) / 100
                              })
                              setCanvas(newCanvas)
                            }}
                            className="w-16 px-2 py-1.5 border border-slate-200 rounded-lg text-xs text-center"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: { ...selectedElement.transform, rotation: 0 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors"
                        >
                          Reset Rotation
                        </button>
                        <button
                          onClick={() => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              opacity: 1
                            })
                            setCanvas(newCanvas)
                          }}
                          className="flex-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium transition-colors"
                        >
                          Reset Opacity
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedElement.type === 'text' && selectedElement.text && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Text Content</label>
                        <textarea
                          value={selectedElement.text.content}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              text: { ...selectedElement.text!, content: e.target.value }
                            })
                            setCanvas(newCanvas)
                          }}
                          rows={3}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Font Family</label>
                        <select
                          value={selectedElement.text.fontFamily}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              text: { ...selectedElement.text!, fontFamily: e.target.value }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        >
                          {FONTS.map(font => (
                            <option key={font} value={font}>{font}</option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Font Size</label>
                          <input
                            type="number"
                            value={selectedElement.text.fontSize}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, fontSize: parseFloat(e.target.value) || 12 }
                              })
                              setCanvas(newCanvas)
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Font Weight</label>
                          <select
                            value={selectedElement.text.fontWeight}
                            onChange={(e) => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, fontWeight: parseInt(e.target.value) }
                              })
                              setCanvas(newCanvas)
                            }}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                          >
                            {FONT_WEIGHTS.map(fw => (
                              <option key={fw.value} value={fw.value}>{fw.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-2 block">Text Style</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const isBold = selectedElement.text!.fontWeight >= 700
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, fontWeight: isBold ? 400 : 700 }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                              selectedElement.text.fontWeight >= 700
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Bold"
                          >
                            <Bold className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => {
                              const isItalic = selectedElement.text!.fontStyle === 'italic'
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, fontStyle: isItalic ? 'normal' : 'italic' }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm italic transition-colors ${
                              selectedElement.text.fontStyle === 'italic'
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Italic"
                          >
                            <Italic className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => {
                              const isUnderline = selectedElement.text!.textDecoration === 'underline'
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, textDecoration: isUnderline ? 'none' : 'underline' }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm underline transition-colors ${
                              selectedElement.text.textDecoration === 'underline'
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Underline"
                          >
                            <Underline className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-2 block">Text Alignment</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, textAlign: 'left' }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedElement.text.textAlign === 'left'
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Align Left"
                          >
                            <AlignLeft className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, textAlign: 'center' }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedElement.text.textAlign === 'center'
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Align Center"
                          >
                            <AlignCenter className="w-4 h-4 mx-auto" />
                          </button>
                          <button
                            onClick={() => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                text: { ...selectedElement.text!, textAlign: 'right' }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedElement.text.textAlign === 'right'
                                ? 'bg-blue-100 text-blue-700 border-2 border-blue-300'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                            title="Align Right"
                          >
                            <AlignRight className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Line Height</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.5"
                          max="3"
                          value={selectedElement.text.lineHeight}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              text: { ...selectedElement.text!, lineHeight: parseFloat(e.target.value) || 1.5 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Text Color</label>
                        <input
                          type="color"
                          value={selectedElement.text.color}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              text: { ...selectedElement.text!, color: e.target.value }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full h-10 border border-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      {/* Letter Spacing */}
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Letter Spacing</label>
                        <input
                          type="number"
                          step="0.5"
                          min="-10"
                          max="20"
                          value={(selectedElement.text as any).letterSpacing || 0}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              text: { ...selectedElement.text!, letterSpacing: parseFloat(e.target.value) || 0 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>

                      {/* Text Style Presets */}
                      <div className="border-t border-slate-200 pt-4">
                        <button
                          onClick={() => setShowTextPresets(!showTextPresets)}
                          className="w-full flex items-center justify-between mb-3"
                        >
                          <span className="text-xs font-semibold text-slate-700">Text Style Presets</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showTextPresets ? 'rotate-180' : ''}`} />
                        </button>
                        
                        {showTextPresets && (
                          <div className="space-y-2">
                            {/* Category Tabs */}
                            <div className="flex flex-wrap gap-1 mb-2">
                              {(['heading', 'body', 'display', 'decorative', 'special'] as const).map(cat => (
                                <button
                                  key={cat}
                                  onClick={() => setActiveTextStyleCategory(cat)}
                                  className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                    activeTextStyleCategory === cat
                                      ? 'bg-blue-500 text-white'
                                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                  }`}
                                >
                                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </button>
                              ))}
                            </div>
                            
                            {/* Presets Grid */}
                            <div className="space-y-1 max-h-48 overflow-y-auto">
                              {TEXT_STYLE_PRESETS.filter(p => p.category === activeTextStyleCategory).map(preset => (
                                <button
                                  key={preset.id}
                                  onClick={() => applyTextStylePreset(preset)}
                                  className="w-full p-2 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
                                >
                                  <span 
                                    className="block truncate"
                                    style={{
                                      fontFamily: preset.style.fontFamily,
                                      fontSize: Math.min(preset.style.fontSize, 18),
                                      fontWeight: preset.style.fontWeight,
                                      fontStyle: preset.style.fontStyle,
                                      textTransform: preset.style.textTransform,
                                      color: preset.style.color
                                    }}
                                  >
                                    {preset.name}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    {preset.style.fontFamily} • {preset.style.fontSize}px
                                  </span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Advanced Typography Toggle */}
                      <div className="border-t border-slate-200 pt-4">
                        <button
                          onClick={() => setShowAdvancedTypography(!showAdvancedTypography)}
                          className="w-full flex items-center justify-between mb-3"
                        >
                          <span className="text-xs font-semibold text-slate-700">Advanced Typography</span>
                          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedTypography ? 'rotate-180' : ''}`} />
                        </button>

                        {showAdvancedTypography && (
                          <div className="space-y-3">
                            {/* Premium Fonts */}
                            <div>
                              <label className="text-xs font-medium text-slate-600 mb-2 block">Premium Fonts</label>
                              <div className="flex flex-wrap gap-1 mb-2">
                                {FONT_CATEGORIES.map(cat => (
                                  <button
                                    key={cat.id}
                                    onClick={() => setActiveFontCategory(cat.id)}
                                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                                      activeFontCategory === cat.id
                                        ? 'bg-purple-500 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {cat.name}
                                  </button>
                                ))}
                              </div>
                              <select
                                value={selectedElement.text.fontFamily}
                                onChange={(e) => {
                                  const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                    text: { ...selectedElement.text!, fontFamily: e.target.value }
                                  })
                                  setCanvas(newCanvas)
                                }}
                                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                              >
                                {PREMIUM_FONTS.filter(f => f.category === activeFontCategory).map(font => (
                                  <option key={font.family} value={font.family} style={{ fontFamily: font.family }}>
                                    {font.family}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* OpenType Features */}
                            <div>
                              <label className="text-xs font-medium text-slate-600 mb-2 block">OpenType Features</label>
                              <div className="grid grid-cols-3 gap-1">
                                {[
                                  { key: 'liga', label: 'Ligatures' },
                                  { key: 'kern', label: 'Kerning' },
                                  { key: 'smcp', label: 'Small Caps' },
                                  { key: 'onum', label: 'Old Nums' },
                                  { key: 'frac', label: 'Fractions' },
                                  { key: 'swsh', label: 'Swash' }
                                ].map(feature => (
                                  <button
                                    key={feature.key}
                                    onClick={() => setOpenTypeFeatures(prev => ({
                                      ...prev,
                                      [feature.key]: !prev[feature.key as keyof OpenTypeFeatures]
                                    }))}
                                    className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                                      openTypeFeatures[feature.key as keyof OpenTypeFeatures]
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                  >
                                    {feature.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Text on Path */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <label className="text-xs font-medium text-slate-600">Text on Path</label>
                                <button
                                  onClick={() => setTextPathConfig(prev => ({ ...prev, enabled: !prev.enabled }))}
                                  className={`w-8 h-4 rounded-full transition-colors ${textPathConfig.enabled ? 'bg-blue-500' : 'bg-slate-300'}`}
                                >
                                  <div className={`w-3 h-3 rounded-full bg-white shadow transition-transform ${textPathConfig.enabled ? 'translate-x-4' : 'translate-x-0.5'}`} />
                                </button>
                              </div>
                              
                              {textPathConfig.enabled && (
                                <div className="space-y-2 p-2 bg-slate-50 rounded-lg">
                                  <select
                                    value={textPathConfig.pathType}
                                    onChange={(e) => setTextPathConfig(prev => ({ ...prev, pathType: e.target.value as any }))}
                                    className="w-full px-2 py-1 border border-slate-200 rounded text-xs"
                                  >
                                    <option value="arc">Arc</option>
                                    <option value="circle">Circle</option>
                                    <option value="wave">Wave</option>
                                  </select>
                                  
                                  {(textPathConfig.pathType === 'arc' || textPathConfig.pathType === 'circle') && (
                                    <div>
                                      <label className="text-[10px] text-slate-500">Radius</label>
                                      <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={textPathConfig.radius || 150}
                                        onChange={(e) => setTextPathConfig(prev => ({ ...prev, radius: parseInt(e.target.value) }))}
                                        className="w-full"
                                      />
                                    </div>
                                  )}
                                  
                                  {textPathConfig.pathType === 'wave' && (
                                    <>
                                      <div>
                                        <label className="text-[10px] text-slate-500">Amplitude</label>
                                        <input
                                          type="range"
                                          min="5"
                                          max="50"
                                          value={textPathConfig.amplitude || 20}
                                          onChange={(e) => setTextPathConfig(prev => ({ ...prev, amplitude: parseInt(e.target.value) }))}
                                          className="w-full"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[10px] text-slate-500">Wavelength</label>
                                        <input
                                          type="range"
                                          min="20"
                                          max="200"
                                          value={textPathConfig.wavelength || 100}
                                          onChange={(e) => setTextPathConfig(prev => ({ ...prev, wavelength: parseInt(e.target.value) }))}
                                          className="w-full"
                                        />
                                      </div>
                                    </>
                                  )}
                                  
                                  <div className="flex gap-2">
                                    {(['start', 'center', 'end'] as const).map(align => (
                                      <button
                                        key={align}
                                        onClick={() => setTextPathConfig(prev => ({ ...prev, align }))}
                                        className={`flex-1 px-2 py-1 rounded text-[10px] ${
                                          textPathConfig.align === align
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-slate-600 hover:bg-slate-100'
                                        }`}
                                      >
                                        {align}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {selectedElement.type === 'shape' && selectedElement.shape && (
                    <>
                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Fill Color</label>
                        <input
                          type="color"
                          value={selectedElement.shape.fill}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              shape: { ...selectedElement.shape!, fill: e.target.value }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full h-10 border border-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Stroke Color</label>
                        <input
                          type="color"
                          value={selectedElement.shape.stroke}
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              shape: { ...selectedElement.shape!, stroke: e.target.value }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full h-10 border border-slate-200 rounded-lg cursor-pointer"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-medium text-slate-600 mb-1 block">Stroke Width</label>
                        <input
                          type="number"
                          value={selectedElement.shape.strokeWidth}
                          min="0"
                          onChange={(e) => {
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              shape: { ...selectedElement.shape!, strokeWidth: parseFloat(e.target.value) || 0 }
                            })
                            setCanvas(newCanvas)
                          }}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={handleDuplicate} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium transition-colors">
                        <Copy className="w-4 h-4 inline mr-2" />
                        Duplicate
                      </button>
                      <button onClick={handleDeleteSelected} className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors">
                        <Trash2 className="w-4 h-4 inline mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Layer Order</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button onClick={() => handleReorder('front')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        To Front
                      </button>
                      <button onClick={() => handleReorder('back')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        To Back
                      </button>
                      <button onClick={() => handleReorder('forward')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        Forward
                      </button>
                      <button onClick={() => handleReorder('backward')} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-medium">
                        Backward
                      </button>
                    </div>
                  </div>
                  
                  {/* Advanced Transform Tools */}
                  <div className="border-t border-slate-200 pt-4">
                    <h3 className="text-sm font-semibold text-slate-900 mb-3">Advanced Transform</h3>
                    
                    {/* Transform Origin */}
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-600 mb-2 block">Transform Origin</label>
                      <div className="grid grid-cols-3 gap-1 bg-slate-100 p-2 rounded-lg">
                        {(['top-left', 'top-center', 'top-right', 'middle-left', 'center', 'middle-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((origin) => (
                          <button
                            key={origin}
                            onClick={() => {
                              // Apply transform from this origin point
                              const originPoint = TRANSFORM_ORIGIN_PRESETS[origin]
                              // Store for future transforms
                              toast.success(`Origin: ${origin}`)
                            }}
                            className={`w-full aspect-square rounded flex items-center justify-center hover:bg-blue-100 transition-colors`}
                            title={origin}
                          >
                            <div className="w-2 h-2 rounded-full bg-slate-400 hover:bg-blue-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Quick Rotation */}
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-600 mb-2 block">Quick Rotate</label>
                      <div className="flex flex-wrap gap-1">
                        {[0, 45, 90, 135, 180, -45, -90, -135].map(angle => (
                          <button
                            key={angle}
                            onClick={() => {
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                transform: { ...selectedElement.transform, rotation: angle }
                              })
                              setCanvas(newCanvas)
                            }}
                            className={`px-2 py-1 rounded text-xs ${
                              Math.round(selectedElement.transform.rotation || 0) === angle
                                ? 'bg-blue-500 text-white'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {angle}°
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Flip Buttons */}
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-600 mb-2 block">Flip</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const newTransform = flipHorizontal(selectedElement)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: newTransform
                            })
                            setCanvas(newCanvas)
                            toast.success('Flipped horizontally')
                          }}
                          className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                          <FlipHorizontal className="w-4 h-4" />
                          Horizontal
                        </button>
                        <button
                          onClick={() => {
                            const newTransform = flipVertical(selectedElement)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                              transform: newTransform
                            })
                            setCanvas(newCanvas)
                            toast.success('Flipped vertically')
                          }}
                          className="flex-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm flex items-center justify-center gap-2"
                        >
                          <FlipVertical className="w-4 h-4" />
                          Vertical
                        </button>
                      </div>
                    </div>
                    
                    {/* Scale Presets */}
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-600 mb-2 block">Scale</label>
                      <div className="flex flex-wrap gap-1">
                        {[25, 50, 75, 100, 150, 200].map(scale => (
                          <button
                            key={scale}
                            onClick={() => {
                              const factor = scale / 100
                              const newWidth = selectedElement.transform.width * (factor / (selectedElement.transform.scaleX || 1))
                              const newHeight = selectedElement.transform.height * (factor / (selectedElement.transform.scaleY || 1))
                              const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, {
                                transform: {
                                  ...selectedElement.transform,
                                  width: newWidth,
                                  height: newHeight,
                                  scaleX: factor,
                                  scaleY: factor
                                }
                              })
                              setCanvas(newCanvas)
                            }}
                            className="px-2 py-1 rounded text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                          >
                            {scale}%
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Nudge Controls */}
                    <div className="mb-4">
                      <label className="text-xs font-medium text-slate-600 mb-2 block">Nudge Position</label>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-8" />
                        <button
                          onClick={() => {
                            const newTransform = nudgeElement(selectedElement, 'up', 1)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, { transform: newTransform })
                            setCanvas(newCanvas)
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <div className="w-8" />
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            const newTransform = nudgeElement(selectedElement, 'left', 1)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, { transform: newTransform })
                            setCanvas(newCanvas)
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <div className="w-8 h-8 bg-slate-50 rounded flex items-center justify-center text-xs text-slate-400">
                          1px
                        </div>
                        <button
                          onClick={() => {
                            const newTransform = nudgeElement(selectedElement, 'right', 1)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, { transform: newTransform })
                            setCanvas(newCanvas)
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-8" />
                        <button
                          onClick={() => {
                            const newTransform = nudgeElement(selectedElement, 'down', 1)
                            const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, { transform: newTransform })
                            setCanvas(newCanvas)
                          }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <div className="w-8" />
                      </div>
                      <p className="text-[10px] text-slate-400 text-center mt-1">Hold Shift for 10px nudge</p>
                    </div>
                    
                    {/* Round Position */}
                    <button
                      onClick={() => {
                        const roundedTransform = roundPosition(selectedElement.transform)
                        const newCanvas = ElementManager.updateElement(canvas, selectedElement.id, { transform: roundedTransform })
                        setCanvas(newCanvas)
                        toast.success('Position rounded to integers')
                      }}
                      className="w-full px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium"
                    >
                      Round Position to Pixels
                    </button>
                  </div>
                </div>
              )}

              {activePanel === 'layers' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900">Layers</h3>
                    <span className="text-xs text-slate-500 font-medium">{canvas.elements.length} total</span>
                  </div>

                  {/* Search bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search layers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded"
                      >
                        <X className="w-3.5 h-3.5 text-slate-400" />
                      </button>
                    )}
                  </div>

                  {/* Layers list */}
                  <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
                    {(() => {
                      // Filter top-level elements (not in groups) and apply search
                      const topLevelElements = [...canvas.elements]
                        .filter(el => !el.parentId && (!searchQuery || el.name.toLowerCase().includes(searchQuery.toLowerCase())))
                        .sort((a, b) => b.zIndex - a.zIndex)

                      const renderElement = (element: CanvasElement, depth: number = 0) => {
                        const isGroup = element.type === 'group'
                        const isExpanded = expandedGroups.has(element.id)
                        const hasChildren = isGroup && element.childIds && element.childIds.length > 0
                        
                        return (
                          <div key={element.id}>
                            <div
                              className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${
                                selection.selectedIds.includes(element.id) 
                                  ? 'bg-blue-50 border border-blue-300 shadow-sm' 
                                  : 'hover:bg-slate-50 border border-transparent hover:border-slate-200'
                              }`}
                              style={{ marginLeft: `${depth * 20}px` }}
                              onClick={() => setSelection({ ...selection, selectedIds: [element.id] })}
                            >
                              {/* Expand/collapse for groups */}
                              {isGroup && hasChildren && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleGroupExpanded(element.id)
                                  }}
                                  className="p-0.5 hover:bg-slate-200 rounded shrink-0"
                                >
                                  <ChevronRight className={`w-3.5 h-3.5 text-slate-600 transition-transform ${
                                    isExpanded ? 'rotate-90' : ''
                                  }`} />
                                </button>
                              )}
                              
                              {!hasChildren && <div className="w-4 shrink-0"></div>}

                              {/* Type icon */}
                              <div className={`w-8 h-8 rounded flex items-center justify-center text-base shrink-0 ${
                                selection.selectedIds.includes(element.id) ? 'bg-blue-100' : 'bg-slate-100'
                              }`}>
                                {element.type === 'group' && '📦'}
                                {element.type === 'text' && '📝'}
                                {element.type === 'shape' && element.shape?.shapeType === 'rectangle' && '⬜'}
                                {element.type === 'shape' && element.shape?.shapeType === 'circle' && '⭕'}
                                {element.type === 'shape' && element.shape?.shapeType === 'triangle' && '🔺'}
                                {element.type === 'image' && '🖼️'}
                              </div>
                              
                              {/* Name / Rename input */}
                              <div className="flex-1 min-w-0">
                                {renamingLayerId === element.id ? (
                                  <input
                                    type="text"
                                    value={renamingLayerValue}
                                    onChange={(e) => setRenamingLayerValue(e.target.value)}
                                    onBlur={() => {
                                      if (renamingLayerValue.trim()) {
                                        const newCanvas = ElementManager.updateElement(canvas, element.id, {
                                          name: renamingLayerValue.trim()
                                        })
                                        setCanvas(newCanvas)
                                      }
                                      setRenamingLayerId(null)
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.currentTarget.blur()
                                      }
                                      if (e.key === 'Escape') {
                                        setRenamingLayerId(null)
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    autoFocus
                                    className="w-full px-2 py-1 text-sm font-medium text-slate-900 bg-white border border-blue-400 rounded focus:outline-none"
                                  />
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-slate-900 truncate">
                                      {element.name}
                                    </span>
                                    {element.locked && (
                                      <Lock className="w-3 h-3 text-red-500 shrink-0" />
                                    )}
                                  </div>
                                )}
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="text-xs text-slate-500 capitalize">{element.type}</span>
                                  {element.type === 'shape' && element.shape && (
                                    <span className="text-xs text-slate-400">• {element.shape.shapeType}</span>
                                  )}
                                  {isGroup && hasChildren && (
                                    <span className="text-xs text-slate-400">• {element.childIds?.length} items</span>
                                  )}
                                </div>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setRenamingLayerId(element.id)
                                    setRenamingLayerValue(element.name)
                                  }}
                                  className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                                  title="Rename layer"
                                >
                                  <Pen className="w-3.5 h-3.5 text-slate-600" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleElementVisibility(element.id)
                                  }}
                                  className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                                  title={element.visible ? 'Hide layer' : 'Show layer'}
                                >
                                  {element.visible ? (
                                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                                  ) : (
                                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    toggleElementLock(element.id)
                                  }}
                                  className="p-1.5 hover:bg-slate-200 rounded transition-colors"
                                  title={element.locked ? 'Unlock layer' : 'Lock layer'}
                                >
                                  {element.locked ? (
                                    <Lock className="w-3.5 h-3.5 text-red-600" />
                                  ) : (
                                    <Unlock className="w-3.5 h-3.5 text-slate-400" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Render children if group is expanded */}
                            {isGroup && hasChildren && isExpanded && (
                              <div className="mt-1">
                                {element.childIds?.map(childId => {
                                  const child = ElementManager.getElement(canvas, childId)
                                  return child ? renderElement(child, depth + 1) : null
                                })}
                              </div>
                            )}
                          </div>
                        )
                      }

                      return topLevelElements.map(element => renderElement(element))
                    })()}
                    
                    {/* Empty state */}
                    {canvas.elements.filter(el => !el.parentId && (!searchQuery || el.name.toLowerCase().includes(searchQuery.toLowerCase()))).length === 0 && (
                      <div className="text-center py-8">
                        {searchQuery ? (
                          <>
                            <Search className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500">No layers match "{searchQuery}"</p>
                          </>
                        ) : (
                          <>
                            <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-sm text-slate-500">No layers yet</p>
                            <p className="text-xs text-slate-400 mt-1">Add elements to see them here</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Template Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Choose a Template</h2>
                <p className="text-sm text-slate-500 mt-1">Select a product mockup or template to start designing</p>
              </div>
              <button onClick={() => setShowTemplates(false)} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <X className="w-6 h-6 text-slate-600" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <div className="grid grid-cols-4 gap-6">
                <button
                  onClick={() => {
                    setCanvas({
                      width: 1200,
                      height: 800,
                      backgroundColor: '#FFFFFF',
                      zoom: 1,
                      gridSize: 20,
                      showGrid: false,
                      snapToGrid: false,
                      elements: []
                    })
                    setShowTemplates(false)
                    toast.success('Blank canvas ready!', { icon: '🎨' })
                  }}
                  className="aspect-[4/3] border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all flex flex-col items-center justify-center gap-2 text-slate-600 hover:text-blue-600"
                >
                  <Plus className="w-8 h-8" />
                  <span className="font-semibold">Blank Canvas</span>
                </button>

                {TEMPLATES.map(template => (
                  <button
                    key={template.id}
                    onClick={() => loadTemplate(template)}
                    className="aspect-[4/3] border border-slate-200 rounded-xl hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden group relative bg-gradient-to-br from-slate-50 to-slate-100"
                  >
                    {/* Thumbnail Image */}
                    <div className="absolute inset-0">
                      {template.thumbnail.startsWith('/') || template.thumbnail.startsWith('http') ? (
                        <img 
                          src={template.thumbnail} 
                          alt={template.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-6xl">{template.thumbnail}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-slate-900/80 via-slate-900/60 to-transparent">
                      <p className="font-semibold text-white text-sm truncate">{template.name}</p>
                      <p className="text-xs text-white/70">{template.width} × {template.height}</p>
                    </div>
                    
                    {/* Category Badge */}
                    {template.category === 'mockups' && (
                      <div className="absolute top-2 right-2 px-2 py-1 bg-purple-500 text-white text-[10px] font-medium rounded-full">
                        Mockup
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mockup Preview Modal */}
      {showMockupPreview && selectedMockup && (() => {
        const mockup = PRODUCT_MOCKUPS.find(m => m.id === selectedMockup)
        if (!mockup) return null
        const colorObj = mockup.colors.find(c => c.id === selectedMockupColor) || mockup.colors[0]
        
        // Check if there are design elements to preview
        const hasDesignElements = canvas.elements.length > 0
        
        return (
          <div 
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
            onClick={() => setShowMockupPreview(false)}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">{mockup.name} Preview</h2>
                  <p className="text-sm text-purple-100">See how your design looks on this product</p>
                </div>
                <button 
                  onClick={() => setShowMockupPreview(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preview Area */}
              <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="relative mx-auto" style={{ maxWidth: mockup.viewportWidth * 1.5, maxHeight: '60vh' }}>
                  {/* Product SVG */}
                  <div 
                    className="relative w-full"
                    style={{ aspectRatio: `${mockup.viewportWidth}/${mockup.viewportHeight}` }}
                  >
                    <div 
                      className="absolute inset-0"
                      dangerouslySetInnerHTML={{ __html: renderMockupSVG(mockup, selectedMockupColor) }}
                    />
                    
                    {/* Design Zones with User's Design */}
                    {mockup.designZones.map(zone => (
                      <div
                        key={zone.id}
                        className="absolute overflow-hidden"
                        style={{
                          left: `${(zone.x / mockup.viewportWidth) * 100}%`,
                          top: `${(zone.y / mockup.viewportHeight) * 100}%`,
                          width: `${(zone.width / mockup.viewportWidth) * 100}%`,
                          height: `${(zone.height / mockup.viewportHeight) * 100}%`,
                          transform: zone.rotation ? `rotate(${zone.rotation}deg)` : undefined,
                        }}
                      >
                        {hasDesignElements ? (
                          /* Render a scaled-down version of canvas elements */
                          <div 
                            className="w-full h-full relative"
                            style={{ 
                              backgroundColor: canvas.backgroundColor,
                              transform: `scale(${Math.min(zone.width / canvas.width, zone.height / canvas.height)})`,
                              transformOrigin: 'top left',
                              width: canvas.width,
                              height: canvas.height,
                              mixBlendMode: 'multiply'
                            }}
                          >
                            {canvas.elements.map((element) => {
                              if (!element.visible) return null
                              return (
                                <div
                                  key={element.id}
                                  style={{
                                    position: 'absolute',
                                    left: element.transform.x,
                                    top: element.transform.y,
                                    width: element.transform.width,
                                    height: element.transform.height,
                                    transform: `rotate(${element.transform.rotation || 0}deg)`,
                                    opacity: element.opacity
                                  }}
                                >
                                  {element.type === 'shape' && element.shape && (
                                    <div
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: element.shape.fill,
                                        borderRadius: element.shape.shapeType === 'circle' ? '50%' : element.shape.cornerRadius,
                                        border: element.shape.strokeWidth > 0 ? `${element.shape.strokeWidth}px solid ${element.shape.stroke}` : 'none'
                                      }}
                                    />
                                  )}
                                  {element.type === 'text' && element.text && (
                                    <div
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        color: element.text.color,
                                        fontSize: element.text.fontSize,
                                        fontFamily: element.text.fontFamily,
                                        fontWeight: element.text.fontWeight,
                                        textAlign: element.text.textAlign as any,
                                        lineHeight: element.text.lineHeight,
                                        letterSpacing: element.text.letterSpacing,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: element.text.textAlign === 'center' ? 'center' : element.text.textAlign === 'right' ? 'flex-end' : 'flex-start',
                                        overflow: 'hidden'
                                      }}
                                    >
                                      {element.text.content}
                                    </div>
                                  )}
                                  {element.type === 'image' && element.image && (
                                    <img
                                      src={element.image.src}
                                      alt={element.name}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: element.image.objectFit as any,
                                        filter: `brightness(${element.image.brightness}%) contrast(${element.image.contrast}%) saturate(${element.image.saturation}%) blur(${element.image.blur}px)`,
                                        opacity: element.image.opacity / 100
                                      }}
                                    />
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        ) : (
                          <div className="w-full h-full border-2 border-dashed border-purple-400 bg-purple-500/10 rounded flex items-center justify-center">
                            <div className="text-center p-2">
                              <div className="text-2xl mb-1">🎨</div>
                              <p className="text-[10px] text-purple-600 font-medium">{zone.name}</p>
                              <p className="text-[8px] text-purple-400">Add design to canvas</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Design Status */}
                <div className="mt-4 text-center">
                  {canvas.elements.length > 0 ? (
                    <p className="text-sm text-green-600 font-medium">✓ Your design is being previewed on the product</p>
                  ) : (
                    <p className="text-sm text-amber-600 font-medium">⚠️ Add elements to your canvas to see them on the mockup</p>
                  )}
                </div>
              </div>

              {/* Color Selector & Actions */}
              <div className="p-4 bg-white border-t border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium text-slate-600">Product Color:</span>
                    <div className="flex gap-1.5">
                      {mockup.colors.map(color => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedMockupColor(color.id)}
                          title={color.name}
                          className={`w-8 h-8 rounded-full border-2 transition-all ${
                            selectedMockupColor === color.id 
                              ? 'border-purple-500 ring-2 ring-purple-200 scale-110' 
                              : 'border-slate-300 hover:border-slate-400'
                          }`}
                          style={{ backgroundColor: color.hex }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">{mockup.name}</p>
                    <p className="text-xs text-slate-500">{mockup.category} • {mockup.designZones.length} design zone(s)</p>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-end">
                  <button 
                    onClick={() => setShowMockupPreview(false)}
                    className="px-4 py-2 bg-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-300 transition-colors"
                  >
                    Close
                  </button>
                  <button 
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    onClick={() => {
                      // Apply mockup dimensions to canvas
                      const mainZone = mockup.designZones[0]
                      if (mainZone) {
                        setCanvas(prev => ({
                          ...prev,
                          width: mainZone.width,
                          height: mainZone.height
                        }))
                        toast.success(`Canvas resized to fit ${mockup.name} design zone`, { icon: '📐' })
                      }
                      setShowMockupPreview(false)
                    }}
                  >
                    Use Design Zone Size
                  </button>
                  <button 
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all shadow-md"
                    onClick={() => {
                      toast.success('Mockup exported!', { icon: '🖼️' })
                      setShowMockupPreview(false)
                    }}
                  >
                    Export Mockup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Keyboard Shortcuts Modal */}
      {showShortcutsModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]"
          onClick={() => setShowShortcutsModal(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-1">⌨️ Keyboard Shortcuts</h2>
                  <p className="text-blue-100 text-sm">Master the designer with these shortcuts</p>
                </div>
                <button 
                  onClick={() => setShowShortcutsModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* General */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">⚡</span>
                  General
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Show this help</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">?</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Close modal</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Esc</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Save design</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + S</kbd>
                  </div>
                </div>
              </div>

              {/* Editing */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center text-green-600">✏️</span>
                  Editing
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Undo</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + Z</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Redo</span>
                    <div className="flex gap-2">
                      <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + Y</kbd>
                      <span className="text-slate-400">or</span>
                      <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + Shift + Z</kbd>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Copy</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + C</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Paste</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + V</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Duplicate</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + D</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Delete selection</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Delete</kbd>
                  </div>
                </div>
              </div>

              {/* Movement */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">🎯</span>
                  Movement & Transform
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Nudge element (1px)</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Arrow Keys</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Nudge element (10px)</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Shift + Arrow</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Constrain movement (horizontal/vertical)</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Shift + Drag</kbd>
                  </div>
                </div>
              </div>

              {/* Grouping */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <span className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">📦</span>
                  Grouping
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Group selected elements</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + G</kbd>
                  </div>
                  <div className="flex items-center justify-between py-2 px-3 hover:bg-slate-50 rounded-lg">
                    <span className="text-slate-700">Ungroup</span>
                    <kbd className="px-3 py-1 bg-slate-200 text-slate-700 rounded-lg font-mono text-sm">Ctrl + Shift + G</kbd>
                  </div>
                </div>
              </div>

              {/* Pro Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-4">
                <h3 className="text-lg font-bold text-orange-900 mb-3 flex items-center gap-2">
                  💡 Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Hold <kbd className="px-1.5 py-0.5 bg-white text-orange-700 rounded text-xs font-mono">Shift</kbd> while dragging to constrain movement to horizontal or vertical</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Use arrow keys for precise positioning - 1px by default, 10px with <kbd className="px-1.5 py-0.5 bg-white text-orange-700 rounded text-xs font-mono">Shift</kbd></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Enable snap to grid for perfect alignment on your canvas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">•</span>
                    <span>Press <kbd className="px-1.5 py-0.5 bg-white text-orange-700 rounded text-xs font-mono">?</kbd> anytime to view shortcuts</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-slate-50 p-4 rounded-b-2xl border-t border-slate-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-600">
                  <strong>Tip:</strong> Most shortcuts work like popular design tools
                </p>
                <button 
                  onClick={() => setShowShortcutsModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div
          className="fixed bg-white rounded-lg shadow-2xl border border-slate-200 py-1 z-[9999] min-w-[180px]"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          {contextMenu.type === 'element' ? (
            <>
              {/* Element Context Menu */}
              <button
                onClick={() => { handleCopy(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">📋</span>
                <span>Copy</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+C</span>
              </button>
              <button
                onClick={() => { handleCopy(); handleDeleteSelected(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">✂️</span>
                <span>Cut</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+X</span>
              </button>
              <button
                onClick={() => { handlePaste(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">📄</span>
                <span>Paste</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+V</span>
              </button>
              <button
                onClick={() => { handleDuplicate(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">✨</span>
                <span>Duplicate</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+D</span>
              </button>
              
              <div className="h-px bg-slate-200 my-1" />
              
              <button
                onClick={() => { handleDeleteSelected(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-3"
              >
                <span>🗑️</span>
                <span>Delete</span>
                <span className="ml-auto text-xs text-red-400">Del</span>
              </button>
              
              <div className="h-px bg-slate-200 my-1" />
              
              {/* Group/Ungroup */}
              {selection.selectedIds.length > 1 ? (
                <button
                  onClick={() => { handleGroup(); closeContextMenu(); }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
                >
                  <span className="text-slate-400">📦</span>
                  <span>Group</span>
                  <span className="ml-auto text-xs text-slate-400">Ctrl+G</span>
                </button>
              ) : (
                (() => {
                  const element = selection.selectedIds.length === 1 
                    ? ElementManager.getElement(canvas, selection.selectedIds[0]) 
                    : null
                  return element?.type === 'group' ? (
                    <button
                      onClick={() => { handleUngroup(); closeContextMenu(); }}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
                    >
                      <span className="text-slate-400">📂</span>
                      <span>Ungroup</span>
                      <span className="ml-auto text-xs text-slate-400">Ctrl+Shift+G</span>
                    </button>
                  ) : null
                })()
              )}
              
              <div className="h-px bg-slate-200 my-1" />
              
              {/* Z-index operations */}
              <button
                onClick={handleBringToFront}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">⬆️</span>
                <span>Bring to Front</span>
              </button>
              <button
                onClick={handleBringForward}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">↑</span>
                <span>Bring Forward</span>
              </button>
              <button
                onClick={handleSendBackward}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">↓</span>
                <span>Send Backward</span>
              </button>
              <button
                onClick={handleSendToBack}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">⬇️</span>
                <span>Send to Back</span>
              </button>
              
              <div className="h-px bg-slate-200 my-1" />
              
              {/* Lock/Unlock & Visibility */}
              <button
                onClick={handleToggleLock}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                {(() => {
                  const element = selection.selectedIds.length === 1 
                    ? ElementManager.getElement(canvas, selection.selectedIds[0]) 
                    : null
                  return element?.locked ? (
                    <>
                      <span className="text-slate-400">🔓</span>
                      <span>Unlock</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400">🔒</span>
                      <span>Lock</span>
                    </>
                  )
                })()}
              </button>
              <button
                onClick={handleToggleVisibility}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                {(() => {
                  const element = selection.selectedIds.length === 1 
                    ? ElementManager.getElement(canvas, selection.selectedIds[0]) 
                    : null
                  return element?.visible ? (
                    <>
                      <span className="text-slate-400">👁️‍🗨️</span>
                      <span>Hide</span>
                    </>
                  ) : (
                    <>
                      <span className="text-slate-400">👁️</span>
                      <span>Show</span>
                    </>
                  )
                })()}
              </button>
            </>
          ) : (
            <>
              {/* Canvas Context Menu */}
              <button
                onClick={() => { handlePaste(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
                disabled={clipboard.current.length === 0}
              >
                <span className="text-slate-400">📄</span>
                <span className={clipboard.current.length === 0 ? 'text-slate-400' : ''}>Paste</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+V</span>
              </button>
              <button
                onClick={() => { 
                  setSelection({ ...selection, selectedIds: canvas.elements.map(el => el.id) })
                  closeContextMenu()
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">✅</span>
                <span>Select All</span>
                <span className="ml-auto text-xs text-slate-400">Ctrl+A</span>
              </button>
              
              <div className="h-px bg-slate-200 my-1" />
              
              <div className="px-4 py-1.5 text-xs font-medium text-slate-500 uppercase tracking-wide">
                Add Element
              </div>
              <button
                onClick={() => { handleAddText(); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">📝</span>
                <span>Text</span>
              </button>
              <button
                onClick={() => { handleAddShape('rectangle'); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">⬜</span>
                <span>Rectangle</span>
              </button>
              <button
                onClick={() => { handleAddShape('circle'); closeContextMenu(); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">⭕</span>
                <span>Circle</span>
              </button>
              <button
                onClick={() => { 
                  const input = document.createElement('input')
                  input.type = 'file'
                  input.accept = 'image/*'
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onload = (e) => {
                        const src = e.target?.result as string
                        handleAddImage(src)
                      }
                      reader.readAsDataURL(file)
                    }
                  }
                  input.click()
                  closeContextMenu()
                }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-100 flex items-center gap-3"
              >
                <span className="text-slate-400">🖼️</span>
                <span>Image...</span>
              </button>
            </>
          )}
        </div>
      )}

      {/* Click outside to close context menu */}
      {contextMenu && (
        <div 
          className="fixed inset-0 z-[9998]" 
          onClick={closeContextMenu}
          onContextMenu={(e) => { e.preventDefault(); closeContextMenu(); }}
        />
      )}
      
      {/* Template Preview Modal */}
      {showTemplatePreview && selectedTemplate && (
        <div 
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-[100]"
          onClick={() => {
            setShowTemplatePreview(false)
            setSelectedTemplate(null)
          }}
        >
          <div 
            className={`rounded-2xl shadow-2xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`p-6 border-b ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-white'}`}>{selectedTemplate.name}</h2>
                    {selectedTemplate.isPremium && (
                      <span className="px-2 py-1 rounded-full bg-purple-500 text-white text-xs font-semibold flex items-center gap-1">
                        <span>👑</span> Premium
                      </span>
                    )}
                    {selectedTemplate.isNew && (
                      <span className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                        ✨ New
                      </span>
                    )}
                    {selectedTemplate.isTrending && (
                      <span className="px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
                        🔥 Trending
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                    {selectedTemplate.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= selectedTemplate.rating
                              ? 'text-amber-400 fill-current'
                              : darkMode ? 'text-slate-600' : 'text-blue-200'
                          }`}
                        />
                      ))}
                      <span className={`text-sm ml-1 ${darkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                        {selectedTemplate.rating.toFixed(1)}
                      </span>
                    </div>
                    
                    <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                      {selectedTemplate.downloads.toLocaleString()} uses
                    </div>
                    
                    <div className={`px-2 py-1 rounded ${
                      selectedTemplate.difficulty === 'beginner' ? 'bg-green-500/20 text-green-300' :
                      selectedTemplate.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    } text-xs font-medium`}>
                      {selectedTemplate.difficulty.charAt(0).toUpperCase() + selectedTemplate.difficulty.slice(1)}
                    </div>
                    
                    <div className={`text-sm ${darkMode ? 'text-slate-300' : 'text-blue-100'}`}>
                      ⏱️ {selectedTemplate.estimatedTime}
                    </div>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setShowTemplatePreview(false)
                    setSelectedTemplate(null)
                  }}
                  className={`p-2 rounded-lg transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-white/20'}`}
                >
                  <X className={`w-6 h-6 ${darkMode ? 'text-slate-400' : 'text-white'}`} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-280px)]">
              <div className="grid grid-cols-3 gap-6">
                {/* Preview */}
                <div className="col-span-2">
                  <div className={`aspect-video rounded-xl overflow-hidden flex items-center justify-center text-9xl ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                    {selectedTemplate.thumbnail}
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        What's included:
                      </h4>
                      <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                        <ul className={`space-y-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                          <li>✓ {selectedTemplate.elements.length} ready-to-use elements</li>
                          <li>✓ {selectedTemplate.width} × {selectedTemplate.height}px dimensions</li>
                          <li>✓ Fully customizable design</li>
                          <li>✓ Professional color palette</li>
                          {selectedTemplate.fonts && <li>✓ {selectedTemplate.fonts.length} curated fonts</li>}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Details */}
                <div className="space-y-4">
                  {/* Tags */}
                  <div>
                    <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      Tags
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedTemplate.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-2 py-1 rounded-full text-xs ${
                            darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Colors */}
                  {selectedTemplate.colors && selectedTemplate.colors.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Color Palette
                      </h4>
                      <div className="flex gap-2">
                        {selectedTemplate.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-10 h-10 rounded-lg border-2 border-white shadow-md"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Fonts */}
                  {selectedTemplate.fonts && selectedTemplate.fonts.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-semibold mb-2 ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                        Fonts Used
                      </h4>
                      <div className="space-y-1">
                        {selectedTemplate.fonts.map((font, index) => (
                          <div
                            key={index}
                            className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}
                          >
                            <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`} style={{ fontFamily: font }}>
                              {font}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Author & Date */}
                  <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-slate-50'}`}>
                    <div className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-600'} space-y-1`}>
                      <div>
                        <span className="font-semibold">Category:</span> {selectedTemplate.category}
                      </div>
                      {selectedTemplate.subcategory && (
                        <div>
                          <span className="font-semibold">Type:</span> {selectedTemplate.subcategory}
                        </div>
                      )}
                      {selectedTemplate.industry && (
                        <div>
                          <span className="font-semibold">Industry:</span> {selectedTemplate.industry}
                        </div>
                      )}
                      <div>
                        <span className="font-semibold">By:</span> {selectedTemplate.author}
                      </div>
                      <div>
                        <span className="font-semibold">Added:</span> {new Date(selectedTemplate.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className={`p-6 border-t ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleFavoriteTemplate(selectedTemplate.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    favoriteTemplates.includes(selectedTemplate.id)
                      ? 'bg-amber-500 text-white'
                      : darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Star className={`w-5 h-5 ${favoriteTemplates.includes(selectedTemplate.id) ? 'fill-current' : ''}`} />
                  {favoriteTemplates.includes(selectedTemplate.id) ? 'Saved to Favorites' : 'Save to Favorites'}
                </button>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowTemplatePreview(false)
                      setSelectedTemplate(null)
                    }}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                      darkMode ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      applyTemplate(selectedTemplate)
                      setShowTemplatePreview(false)
                      setSelectedTemplate(null)
                      toast.success('Template applied to canvas!', { icon: '✨' })
                    }}
                    className={`px-6 py-2 rounded-lg font-medium text-white transition-all shadow-lg ${
                      selectedTemplate.isPremium
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                    }`}
                  >
                    Use This Template
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
