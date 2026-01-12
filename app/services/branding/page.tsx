'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Palette, CheckCircle, ArrowLeft, MessageCircle, Sparkles } from 'lucide-react'

export default function BrandingPage() {
  const services = [
    {
      title: 'Corporate Identity Design',
      description: 'Complete brand identity systems that define who you are',
      features: ['Logo design', 'Color palette', 'Typography', 'Brand guidelines']
    },
    {
      title: 'Custom Merchandise',
      description: 'Branded products that promote your business everywhere',
      features: ['Polo shirts', 'Round neck shirts', 'Caps & hats', 'Tote bags']
    },
    {
      title: 'Promotional Materials',
      description: 'Marketing collateral that spreads your brand message',
      features: ['Keyrings', 'Pens & notebooks', 'USB drives', 'Mugs & drinkware']
    },
    {
      title: 'Safety Equipment',
      description: 'Branded safety gear for corporate health initiatives',
      features: ['Custom nose masks', 'Safety vests', 'Helmets', 'Lanyards']
    },
    {
      title: 'Event Branding',
      description: 'Complete branding solutions for corporate events',
      features: ['Banners & flags', 'Event shirts', 'Name tags', 'Badges']
    },
    {
      title: 'Brand Guidelines',
      description: 'Comprehensive documentation for brand consistency',
      features: ['Usage rules', 'Color codes', 'Typography specs', 'Digital assets']
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We learn about your business, values, and target audience'
    },
    {
      step: '02',
      title: 'Strategy',
      description: 'Develop a comprehensive branding strategy aligned with your goals'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Create unique brand elements that reflect your identity'
    },
    {
      step: '04',
      title: 'Refinement',
      description: 'Perfect every detail based on your feedback'
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'Provide all brand assets and guidelines for implementation'
    }
  ]

  const portfolio = [
    'Corporate rebranding for financial institutions',
    'Startup identity packages',
    'Event merchandise for conferences',
    'Retail brand development',
    'Non-profit organization branding',
    'Restaurant and hospitality branding'
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-pink via-brand-purple to-brand-pink overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </Link>

          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                <Palette className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Branding</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              We offer individual and corporate branding solutions that make your business memorable. From logo design to customized merchandise, we create cohesive brand identities that resonate with your audience.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-pink px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Start Your Branding
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Branding <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive branding services to build a strong, consistent brand identity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="bg-gradient-to-br from-brand-pink to-brand-purple w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-brand-pink rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Branding <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Process</span>
            </h2>
            <p className="text-xl text-gray-600">From concept to complete brand identity</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-pink to-brand-purple transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-pink to-brand-purple text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Branding <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-purple">Experience</span>
              </h2>
              <p className="text-xl text-gray-600">We've helped businesses across various industries build strong brands</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {portfolio.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-gradient-to-br from-brand-pink/10 to-brand-purple/10 rounded-xl p-6">
                  <CheckCircle className="w-6 h-6 text-brand-pink flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-pink via-brand-purple to-brand-pink text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Build Your Brand Identity</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's create a brand that stands out and resonates with your target audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-pink px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Get Started
            </Link>
            <Link href="/services" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
