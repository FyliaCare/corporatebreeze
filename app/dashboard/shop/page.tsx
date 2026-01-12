'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingBag, Search, SlidersHorizontal, X,
  Star, Heart, ShoppingCart, Eye, TrendingUp, Tag,
  Grid3x3, List, ArrowUpDown, Package, Truck, Shield, LayoutDashboard, CheckCircle2,
  Palette, MessageSquare, User, CreditCard, Settings, MoreVertical, Bell
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  description: string
  price: number
  compareAt?: number
  category: string
  categorySlug: string
  image: string
  rating: number
  reviews: number
  inStock: boolean
  stock: number
  featured: boolean
  tags: string[]
}

export default function ShopPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [activePriceRange, setActivePriceRange] = useState({ min: 0, max: 1000 })
  const [wishlist, setWishlist] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const [stats] = useState({
    activeProjects: 3,
    cartItems: 0,
  })

  const categories = [
    { name: 'All Products', value: 'all', count: 12 },
    { name: 'Business Cards', value: 'business-cards', count: 2 },
    { name: 'Apparel', value: 'apparel', count: 3 },
    { name: 'Stationery', value: 'stationery', count: 3 },
    { name: 'Marketing', value: 'marketing', count: 3 },
    { name: 'Signage', value: 'signage', count: 1 },
  ]

  const allTags = ['Best Seller', 'On Sale', 'Premium', 'New Arrival', 'Eco-Friendly']

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchQuery, selectedCategory, selectedTags, sortBy, activePriceRange])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Business Cards',
          description: 'Luxury business cards with spot UV finish, rounded corners, and premium 32pt cardstock',
          price: 89.99,
          compareAt: 129.99,
          category: 'Business Cards',
          categorySlug: 'business-cards',
          image: '💼',
          rating: 4.9,
          reviews: 247,
          inStock: true,
          stock: 150,
          featured: true,
          tags: ['Best Seller', 'Premium'],
        },
        {
          id: '2',
          name: 'Corporate T-Shirts Bundle',
          description: 'Set of 50 premium cotton t-shirts with custom screen printing',
          price: 425.00,
          compareAt: 550.00,
          category: 'Apparel',
          categorySlug: 'apparel',
          image: '👕',
          rating: 4.8,
          reviews: 189,
          inStock: true,
          stock: 45,
          featured: true,
          tags: ['Best Seller', 'On Sale'],
        },
        {
          id: '3',
          name: 'Marketing Brochures (Tri-Fold)',
          description: 'Professional tri-fold brochures on high-quality glossy paper',
          price: 125.00,
          category: 'Marketing',
          categorySlug: 'marketing',
          image: '📄',
          rating: 4.7,
          reviews: 142,
          inStock: true,
          stock: 200,
          featured: false,
          tags: ['New Arrival'],
        },
        {
          id: '4',
          name: 'Branded Notebooks - Hardcover',
          description: 'Premium hardcover notebooks with embossed logo',
          price: 24.99,
          compareAt: 34.99,
          category: 'Stationery',
          categorySlug: 'stationery',
          image: '📓',
          rating: 4.6,
          reviews: 98,
          inStock: true,
          stock: 320,
          featured: false,
          tags: ['On Sale', 'Eco-Friendly'],
        },
        {
          id: '5',
          name: 'Vinyl Banner - Large Format',
          description: 'Weather-resistant vinyl banner with grommets',
          price: 185.00,
          category: 'Signage',
          categorySlug: 'signage',
          image: '🎯',
          rating: 4.8,
          reviews: 76,
          inStock: true,
          stock: 28,
          featured: true,
          tags: [],
        },
        {
          id: '6',
          name: 'Letterhead Stationery Package',
          description: '500 professional letterheads on premium 24lb paper',
          price: 95.00,
          category: 'Stationery',
          categorySlug: 'stationery',
          image: '📋',
          rating: 4.5,
          reviews: 64,
          inStock: true,
          stock: 180,
          featured: false,
          tags: [],
        },
        {
          id: '7',
          name: 'Custom Polo Shirts',
          description: 'Premium embroidered polo shirts in various colors',
          price: 45.00,
          compareAt: 65.00,
          category: 'Apparel',
          categorySlug: 'apparel',
          image: '👔',
          rating: 4.9,
          reviews: 203,
          inStock: true,
          stock: 95,
          featured: true,
          tags: ['Best Seller', 'Premium'],
        },
        {
          id: '8',
          name: 'Presentation Folders',
          description: 'Professional gloss-laminated folders with pockets',
          price: 165.00,
          category: 'Marketing',
          categorySlug: 'marketing',
          image: '📁',
          rating: 4.6,
          reviews: 87,
          inStock: true,
          stock: 140,
          featured: false,
          tags: ['New Arrival'],
        },
        {
          id: '9',
          name: 'Luxury Business Cards - Foil',
          description: 'Ultra-premium business cards with gold/silver foil stamping',
          price: 149.99,
          compareAt: 199.99,
          category: 'Business Cards',
          categorySlug: 'business-cards',
          image: '✨',
          rating: 5.0,
          reviews: 156,
          inStock: true,
          stock: 85,
          featured: true,
          tags: ['Premium'],
        },
        {
          id: '10',
          name: 'Promotional Flyers - A5',
          description: 'High-impact promotional flyers on glossy paper',
          price: 75.00,
          category: 'Marketing',
          categorySlug: 'marketing',
          image: '📰',
          rating: 4.4,
          reviews: 112,
          inStock: true,
          stock: 250,
          featured: false,
          tags: [],
        },
        {
          id: '11',
          name: 'Corporate Hoodies',
          description: 'Premium fleece hoodies with embroidered logo',
          price: 65.00,
          compareAt: 85.00,
          category: 'Apparel',
          categorySlug: 'apparel',
          image: '🧥',
          rating: 4.7,
          reviews: 134,
          inStock: true,
          stock: 67,
          featured: false,
          tags: ['On Sale'],
        },
        {
          id: '12',
          name: 'Desk Calendar 2026',
          description: 'Custom desk calendar with your branding',
          price: 18.99,
          category: 'Stationery',
          categorySlug: 'stationery',
          image: '📅',
          rating: 4.5,
          reviews: 91,
          inStock: true,
          stock: 200,
          featured: false,
          tags: ['New Arrival'],
        },
      ]
      
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.categorySlug === selectedCategory)
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter(p =>
        selectedTags.some(tag => p.tags.includes(tag))
      )
    }

    filtered = filtered.filter(p =>
      p.price >= activePriceRange.min && p.price <= activePriceRange.max
    )

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    toast.success(
      wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist'
    )
  }

  const addToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`)
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setSelectedTags([])
    setActivePriceRange({ min: 0, max: 1000 })
    setSortBy('featured')
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading products...</p>
        </div>
      </div>
    )
  }

  if (!session) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 fixed left-0 top-0 h-screen z-40">
        {/* Logo */}
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

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </Link>
            
            <Link 
              href="/dashboard/shop" 
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl font-medium transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop</span>
            </Link>
            
            <Link 
              href="/dashboard/orders" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Package className="w-5 h-5" />
              <span>Orders</span>
              <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {stats.activeProjects}
              </span>
            </Link>
            
            <Link 
              href="/dashboard/designer" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Palette className="w-5 h-5" />
              <span>Designer</span>
              <span className="ml-auto bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                New
              </span>
            </Link>
            
            <Link 
              href="/dashboard/cart" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {stats.cartItems > 0 && (
                <span className="ml-auto bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.cartItems}
                </span>
              )}
            </Link>
            
            <Link 
              href="/dashboard/chat" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Support</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account</p>
            
            <Link 
              href="/dashboard/profile" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            
            <Link 
              href="/dashboard/billing" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <CreditCard className="w-5 h-5" />
              <span>Billing</span>
            </Link>
            
            <Link 
              href="/dashboard/settings" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        {/* User Profile Section */}
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

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 fixed top-0 right-0 left-0 lg:left-64 z-30">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Shop</h1>
                <p className="text-sm text-slate-500">{filteredProducts.length} products available</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2.5 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <Link href="/dashboard/cart" className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Cart</span>
                  <span className="bg-white text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">0</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-8 pt-24">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Categories</label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedCategory === cat.value
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-slate-400">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Price Range</label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="Min"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm"
                      placeholder="Max"
                    />
                  </div>
                  <button
                    onClick={() => setActivePriceRange(priceRange)}
                    className="w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-3">Tags</label>
                <div className="space-y-2">
                  {allTags.map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-slate-600">{tag}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {(searchQuery || selectedCategory !== 'all' || selectedTags.length > 0 || activePriceRange.min > 0 || activePriceRange.max < 1000) && (
                <button
                  onClick={clearFilters}
                  className="w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4 text-slate-600" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                    }`}
                  >
                    <List className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A to Z</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedTags.length > 0 || selectedCategory !== 'all') && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm font-medium text-slate-600">Active filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                    {categories.find(c => c.value === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory('all')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                    {tag}
                    <button onClick={() => toggleTag(tag)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {paginatedProducts.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
                <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No products found</h3>
                <p className="text-slate-600 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <>
                <div className={`grid gap-6 mb-8 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-1'
                }`}>
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      {/* Product Image */}
                      <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 aspect-square">
                        <div className="absolute inset-0 flex items-center justify-center text-7xl">
                          {product.image}
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product.featured && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded-md flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              Featured
                            </span>
                          )}
                          {product.compareAt && (
                            <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-md">
                              Save ${(product.compareAt - product.price).toFixed(0)}
                            </span>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 bg-white rounded-full shadow-lg hover:bg-red-50 transition-colors"
                          >
                            <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <span className="text-xs font-medium text-blue-600 mb-1 block">
                          {product.category}
                        </span>
                        <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>

                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">{product.description}</p>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-slate-600">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>

                        {/* Tags */}
                        {product.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {product.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs font-medium rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Price & Actions */}
                        <div className="flex items-end justify-between pt-3 border-t border-slate-200">
                          <div>
                            {product.compareAt && (
                              <span className="text-sm text-slate-400 line-through block">
                                ${product.compareAt.toFixed(2)}
                              </span>
                            )}
                            <span className="text-2xl font-bold text-slate-900">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>

                          <button
                            onClick={() => addToCart(product)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 hover:scale-105 transition-all"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add
                          </button>
                        </div>

                        {/* Stock Indicator */}
                        {product.stock < 50 && (
                          <p className="text-xs text-orange-600 mt-2 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
                            Only {product.stock} left in stock
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                            currentPage === i + 1
                              ? 'bg-slate-900 text-white'
                              : 'border border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-slate-600">On orders over $200</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-slate-600">100% secure transactions</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-start gap-4">
            <div className="p-3 bg-purple-50 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Quality Guarantee</h3>
              <p className="text-sm text-slate-600">30-day money back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
