'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShoppingCart, Star, ArrowRight, Eye, Heart } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAt?: number
  category: string
  stock: number
  rating?: number
  reviews?: number
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])

  useEffect(() => {
    // Mock products - same as shop page
    const allProducts: Product[] = [
      {
        id: '1',
        name: 'Premium Business Cards',
        slug: 'premium-business-cards',
        description: 'High-quality, professional business cards with premium finish',
        price: 150,
        compareAt: 200,
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
        category: 'branding',
        stock: 120,
        rating: 4.3,
        reviews: 19
      },
    ]

    // Randomly select 4 products
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random())
    setProducts(shuffled.slice(0, 4))
  }, [])

  const calculateDiscount = (price: number, compareAt?: number) => {
    if (!compareAt) return 0
    return Math.round(((compareAt - price) / compareAt) * 100)
  }

  const addToCart = (product: Product) => {
    toast.success(`${product.name} added to cart!`)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
    toast.success(wishlist.includes(productId) ? 'Removed from wishlist' : 'Added to wishlist')
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-6 py-2 rounded-full mb-4">
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">Shop Our Products</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality printing, branding, and promotional items to elevate your business
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map(product => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative bg-gray-100 h-64 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center p-8">
                    <ShoppingCart className="w-24 h-24 text-gray-300" />
                  </div>
                  
                  {/* Badges */}
                  {calculateDiscount(product.price, product.compareAt) > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-brand-orange text-white px-3 py-1 rounded-lg text-sm font-bold shadow-lg">
                        -{calculateDiscount(product.price, product.compareAt)}%
                      </span>
                    </div>
                  )}

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
                    <Link
                      href={`/shop/${product.slug}`}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                    >
                      <Eye className="w-5 h-5 text-gray-700" />
                    </Link>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-brand-blue uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>

                  <Link href={`/shop/${product.slug}`}>
                    <h3 className="text-lg font-bold mb-2 hover:text-brand-blue transition-colors line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating!)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600">({product.reviews})</span>
                    </div>
                  )}

                  {/* Price and Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-brand-blue">GH₵ {product.price}</span>
                        {product.compareAt && (
                          <span className="text-xs text-gray-400 line-through">
                            GH₵ {product.compareAt}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white p-3 rounded-xl hover:shadow-lg transition-all hover:scale-105"
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/shop"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              View All Products
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
