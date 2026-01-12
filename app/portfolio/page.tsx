'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import Link from 'next/link'
import { Briefcase, Filter, Grid3x3, List, Eye, ExternalLink, ArrowRight } from 'lucide-react'

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('masonry')

  const categories = ['all', 'branding', 'printing', 'graphic design', 'advertising', 'photography', 'marketing']

  // Mock portfolio data - will be replaced with database data
  const portfolioItems = [
    {
      id: '1',
      title: 'Tech Startup Brand Identity',
      slug: 'tech-startup-brand',
      description: 'Complete brand identity package including logo, business cards, and digital assets for a Toronto-based tech startup.',
      client: 'InnovateTech Inc.',
      category: 'branding',
      images: ['/portfolio/tech-brand.jpg'],
      featured: true
    },
    {
      id: '2',
      title: 'Restaurant Marketing Campaign',
      slug: 'restaurant-campaign',
      description: 'Integrated marketing campaign featuring social media ads, flyers, and outdoor advertising.',
      client: 'Maple Leaf Bistro',
      category: 'advertising',
      images: ['/portfolio/restaurant.jpg'],
      featured: true
    },
    {
      id: '3',
      title: 'Corporate Event Photography',
      slug: 'corporate-event',
      description: 'Professional photography coverage for annual corporate gala with 500+ attendees.',
      client: 'Global Finance Corp',
      category: 'photography',
      images: ['/portfolio/event.jpg'],
      featured: false
    },
    {
      id: '4',
      title: 'E-commerce Product Catalog',
      slug: 'ecommerce-catalog',
      description: '100-page product catalog design and print production for fashion retailer.',
      client: 'Urban Style Fashion',
      category: 'printing',
      images: ['/portfolio/catalog.jpg'],
      featured: true
    },
    {
      id: '5',
      title: 'Real Estate Brochures',
      slug: 'real-estate-brochures',
      description: 'Premium brochure design and printing for luxury property listings.',
      client: 'Elite Properties Ghana',
      category: 'graphic design',
      images: ['/portfolio/brochure.jpg'],
      featured: false
    },
    {
      id: '6',
      title: 'Social Media Strategy',
      slug: 'social-media-strategy',
      description: '6-month social media marketing strategy with content creation and management.',
      client: 'FitLife Wellness',
      category: 'marketing',
      images: ['/portfolio/social.jpg'],
      featured: false
    },
    {
      id: '7',
      title: 'Retail Signage System',
      slug: 'retail-signage',
      description: 'Complete signage design and production for retail chain across 10 locations.',
      client: 'FreshMart Stores',
      category: 'printing',
      images: ['/portfolio/signage.jpg'],
      featured: true
    },
    {
      id: '8',
      title: 'Product Launch Campaign',
      slug: 'product-launch',
      description: 'Multi-channel advertising campaign for new product launch in African markets.',
      client: 'TechGear Africa',
      category: 'advertising',
      images: ['/portfolio/launch.jpg'],
      featured: false
    },
    {
      id: '9',
      title: 'Corporate Rebranding',
      slug: 'corporate-rebrand',
      description: 'Full rebrand including new logo, color palette, typography, and brand guidelines.',
      client: 'Heritage Bank',
      category: 'branding',
      images: ['/portfolio/rebrand.jpg'],
      featured: true
    }
  ]

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-purple overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">Our Work</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Projects That <br />Speak for Themselves
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Explore our portfolio of successful projects across branding, design, printing, and marketing
            </p>
          </div>
        </div>
      </section>

      {/* Filter & View Controls */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('masonry')}
                className={`p-2 rounded-md transition-all ${
                  viewMode === 'masonry' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Masonry View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            Showing <span className="font-semibold text-brand-blue">{filteredItems.length}</span> {filteredItems.length === 1 ? 'project' : 'projects'}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className={
            viewMode === 'grid'
              ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8'
          }>
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  viewMode === 'masonry' ? 'break-inside-avoid mb-8' : ''
                }`}
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-purple overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Briefcase className="w-20 h-20 text-white/30" />
                  </div>
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8 gap-4">
                    <button className="bg-white text-brand-blue px-6 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform inline-flex items-center gap-2">
                      <Eye className="w-5 h-5" />
                      View Project
                    </button>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="inline-flex items-center gap-2 bg-brand-cyan/10 text-brand-cyan px-3 py-1 rounded-full text-sm font-semibold mb-3 capitalize">
                    {item.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>

                  {/* Client */}
                  <p className="text-gray-500 text-sm mb-3">
                    Client: <span className="font-semibold text-gray-700">{item.client}</span>
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* View Details Link */}
                  <Link 
                    href={`/portfolio/${item.slug}`}
                    className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:text-brand-cyan transition-colors group/link"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 right-4 bg-brand-orange text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    Featured
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-20">
              <Briefcase className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No projects found</h3>
              <p className="text-gray-500 mb-6">
                Try selecting a different category to see more projects
              </p>
              <button
                onClick={() => setActiveCategory('all')}
                className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Show All Projects
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Let's create something amazing together. Our team is ready to bring your vision to life.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="group bg-white text-brand-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center shadow-xl hover:shadow-2xl hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
