'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Search, SlidersHorizontal, X, ChevronDown, Grid, List, ShoppingCart, Heart, Eye, Star, Filter as FilterIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAt?: number
  images: string[]
  category: string
  stock: number
  rating?: number
  reviews?: number
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 10000])
  const [sortBy, setSortBy] = useState('featured')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])

  const categories = [
    { id: 'all', name: 'All Products', count: 0 },
    { id: 'printing', name: 'Printing', count: 0 },
    { id: 'branding', name: 'Branding', count: 0 },
    { id: 'merchandise', name: 'Merchandise', count: 0 },
    { id: 'signage', name: 'Signage', count: 0 },
    { id: 'promotional', name: 'Promotional Items', count: 0 },
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    filterAndSortProducts()
  }, [products, searchTerm, selectedCategory, priceRange, sortBy])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Mock data for demonstration - replace with actual API call
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Business Cards',
          slug: 'premium-business-cards',
          description: 'High-quality, professional business cards with premium finish',
          price: 150,
          compareAt: 200,
          images: ['/placeholder-product.jpg'],
          category: 'printing',
          stock: 100,
          rating: 4.5,
          reviews: 24
        },
        {
          id: '2',
          name: 'Custom Branded T-Shirts',
          slug: 'custom-branded-tshirts',
          description: 'Premium quality cotton t-shirts with your custom branding',
          price: 80,
          compareAt: 120,
          images: ['/placeholder-product.jpg'],
          category: 'branding',
          stock: 50,
          rating: 4.8,
          reviews: 35
        },
        {
          id: '3',
          name: 'Corporate Calendar 2026',
          slug: 'corporate-calendar-2026',
          description: 'Customizable corporate calendars for the year',
          price: 45,
          images: ['/placeholder-product.jpg'],
          category: 'printing',
          stock: 200,
          rating: 4.2,
          reviews: 18
        },
        {
          id: '4',
          name: 'Promotional Keyrings',
          slug: 'promotional-keyrings',
          description: 'Metal keyrings with laser engraving',
          price: 25,
          compareAt: 35,
          images: ['/placeholder-product.jpg'],
          category: 'promotional',
          stock: 500,
          rating: 4.0,
          reviews: 12
        },
        {
          id: '5',
          name: '3D LED Signage',
          slug: '3d-led-signage',
          description: 'Custom 3D illuminated business signage',
          price: 2500,
          images: ['/placeholder-product.jpg'],
          category: 'signage',
          stock: 10,
          rating: 5.0,
          reviews: 8
        },
        {
          id: '6',
          name: 'Branded Notebooks',
          slug: 'branded-notebooks',
          description: 'Premium leather notebooks with company logo',
          price: 65,
          compareAt: 85,
          images: ['/placeholder-product.jpg'],
          category: 'merchandise',
          stock: 150,
          rating: 4.6,
          reviews: 28
        },
        {
          id: '7',
          name: 'Flyer Package (1000pcs)',
          slug: 'flyer-package-1000',
          description: 'Full-color flyers, glossy finish, 1000 pieces',
          price: 180,
          images: ['/placeholder-product.jpg'],
          category: 'printing',
          stock: 75,
          rating: 4.4,
          reviews: 31
        },
        {
          id: '8',
          name: 'Custom Caps',
          slug: 'custom-caps',
          description: 'Embroidered caps with your logo',
          price: 55,
          compareAt: 75,
          images: ['/placeholder-product.jpg'],
          category: 'branding',
          stock: 120,
          rating: 4.3,
          reviews: 19
        },
      ]
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortProducts = () => {
    let filtered = [...products]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Price range filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
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
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        // featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }

  const addToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`)
    // Implement cart logic here
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    toast.success(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const calculateDiscount = (price: number, compareAt?: number) => {
    if (!compareAt) return 0
    return Math.round(((compareAt - price) / compareAt) * 100)
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Shop Our Products</h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Quality printing, branding, and promotional products for your business
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full pl-14 pr-4 py-4 rounded-2xl text-gray-900 text-lg focus:ring-4 focus:ring-white/30 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FilterIcon className="w-5 h-5" />
                  Filters
                </h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-gray-700">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        selectedCategory === category.id
                          ? 'bg-brand-blue text-white font-semibold'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-bold mb-4 text-gray-700">Price Range</h4>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>GH₵ {priceRange[0]}</span>
                    <span>GH₵ {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setPriceRange([0, 10000])
                  setSearchTerm('')
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition-all"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(true)}
                    className="lg:hidden flex items-center gap-2 bg-brand-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-brand-cyan transition-all"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    Filters
                  </button>
                  <p className="text-gray-600">
                    <span className="font-bold text-gray-900">{filteredProducts.length}</span> products found
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort By */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-gray-100 border-0 px-4 py-2 pr-10 rounded-lg font-semibold text-gray-700 cursor-pointer focus:ring-2 focus:ring-brand-blue outline-none"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A to Z</option>
                      <option value="rating">Top Rated</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand-blue border-t-transparent"></div>
                <p className="text-xl text-gray-600 mt-4">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                      viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative bg-gray-100 ${viewMode === 'list' ? 'md:w-72' : 'h-72'} overflow-hidden`}>
                      <div className="w-full h-full flex items-center justify-center p-8">
                        <ShoppingCart className="w-24 h-24 text-gray-300" />
                      </div>
                      
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {calculateDiscount(product.price, product.compareAt) > 0 && (
                          <span className="bg-brand-orange text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                            -{calculateDiscount(product.price, product.compareAt)}%
                          </span>
                        )}
                        {product.stock < 20 && (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                            Low Stock
                          </span>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all hover:scale-110 ${
                            wishlist.includes(product.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/90 text-gray-700 hover:bg-white'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button
                          onClick={() => setQuickViewProduct(product)}
                          className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                        >
                          <Eye className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="mb-2">
                        <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">
                          {product.category}
                        </span>
                      </div>

                      <Link href={`/shop/${product.slug}`}>
                        <h3 className="text-xl font-bold mb-2 hover:text-brand-blue transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>

                      <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                      {/* Rating */}
                      {product.rating && (
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating!)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
                        </div>
                      )}

                      {/* Price and Add to Cart */}
                      <div className="flex items-center justify-between mt-auto">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-brand-blue">GH₵ {product.price}</span>
                            {product.compareAt && (
                              <span className="text-sm text-gray-400 line-through">
                                GH₵ {product.compareAt}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                          </p>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          disabled={product.stock === 0}
                          className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
                <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setPriceRange([0, 10000])
                    setSearchTerm('')
                  }}
                  className="bg-brand-blue text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-cyan transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">Quick View</h2>
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="bg-gray-100 rounded-2xl h-96 flex items-center justify-center">
                  <ShoppingCart className="w-32 h-32 text-gray-300" />
                </div>

                {/* Details */}
                <div>
                  <span className="text-sm font-semibold text-brand-blue uppercase tracking-wide">
                    {quickViewProduct.category}
                  </span>
                  <h3 className="text-3xl font-bold mt-2 mb-4">{quickViewProduct.name}</h3>
                  <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>

                  {/* Rating */}
                  {quickViewProduct.rating && (
                    <div className="flex items-center gap-2 mb-6">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(quickViewProduct.rating!)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600">
                        {quickViewProduct.rating} ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-bold text-brand-blue">
                        GH₵ {quickViewProduct.price}
                      </span>
                      {quickViewProduct.compareAt && (
                        <span className="text-xl text-gray-400 line-through">
                          GH₵ {quickViewProduct.compareAt}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {quickViewProduct.stock > 0
                        ? `${quickViewProduct.stock} items in stock`
                        : 'Out of stock'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct)
                        setQuickViewProduct(null)
                      }}
                      disabled={quickViewProduct.stock === 0}
                      className="flex-1 bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                        wishlist.includes(quickViewProduct.id)
                          ? 'border-red-500 bg-red-500 text-white'
                          : 'border-gray-300 hover:border-red-500'
                      }`}
                    >
                      <Heart className={`w-6 h-6 ${wishlist.includes(quickViewProduct.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <Link
                    href={`/shop/${quickViewProduct.slug}`}
                    className="block text-center mt-4 text-brand-blue font-semibold hover:underline"
                  >
                    View Full Details →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
