'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Package, CheckCircle, ArrowLeft, MessageCircle } from 'lucide-react'
import Image from 'next/image'

export default function PrintingPage() {
  const services = [
    {
      title: 'Business Cards',
      description: 'Professional, high-quality business cards that make a lasting first impression',
      features: ['Multiple finishes', 'Custom sizes', 'Premium card stock', 'Fast turnaround']
    },
    {
      title: 'Brochures & Flyers',
      description: 'Eye-catching marketing materials to promote your business',
      features: ['Full-color printing', 'Various paper weights', 'Folding options', 'Bulk discounts']
    },
    {
      title: 'Calendars & Diaries',
      description: 'Personalized calendars and diaries for corporate gifting',
      features: ['Custom branding', 'Multiple layouts', 'Premium binding', 'Bulk orders']
    },
    {
      title: 'Labels & Stickers',
      description: 'Custom labels for products, packaging, and branding',
      features: ['Waterproof options', 'Various shapes', 'Durable materials', 'Custom designs']
    },
    {
      title: 'Letterheads & Envelopes',
      description: 'Professional corporate stationery for your business communications',
      features: ['Custom designs', 'Quality paper', 'Matching sets', 'Bulk pricing']
    },
    {
      title: 'Branded Apparel',
      description: 'Custom printed shirts, aprons, and more for your team',
      features: ['Screen printing', 'Embroidery', 'Quality fabrics', 'All sizes available']
    },
    {
      title: 'Greeting Cards',
      description: 'Personalized greeting cards for all occasions',
      features: ['Custom messages', 'Premium finishes', 'Envelope included', 'Bulk options']
    },
    {
      title: 'Folders & Binders',
      description: 'Professional presentation folders and binders',
      features: ['Custom branding', 'Multiple pockets', 'Durable materials', 'Various sizes']
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Discuss your printing needs and requirements with our team'
    },
    {
      step: '02',
      title: 'Design',
      description: 'Our designers create or refine your artwork to perfection'
    },
    {
      step: '03',
      title: 'Approval',
      description: 'Review and approve the design before production begins'
    },
    {
      step: '04',
      title: 'Production',
      description: 'High-quality printing using state-of-the-art equipment'
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'Fast delivery or convenient pickup of your finished products'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-orange via-brand-yellow to-brand-orange overflow-hidden">
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
                <Package className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Printing Services</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              We create eye-catching designs and provide quality print solutions for all your business needs. From business cards to branded apparel, we deliver excellence in every print.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-orange px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Print</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive printing solutions with exceptional quality and fast turnaround times
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                <div className="bg-gradient-to-br from-brand-orange to-brand-yellow w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <span className="w-1.5 h-1.5 bg-brand-orange rounded-full mr-2"></span>
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Process</span>
            </h2>
            <p className="text-xl text-gray-600">Simple, efficient, and transparent</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-orange to-brand-yellow transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-orange to-brand-yellow text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow">Printing Services</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-brand-orange/10 to-brand-yellow/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Quality Guaranteed</h3>
                <p className="text-gray-700">We use premium materials and state-of-the-art printing technology to ensure every product meets the highest standards.</p>
              </div>
              <div className="bg-gradient-to-br from-brand-orange/10 to-brand-yellow/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Fast Turnaround</h3>
                <p className="text-gray-700">We understand deadlines matter. Our efficient process ensures quick delivery without compromising quality.</p>
              </div>
              <div className="bg-gradient-to-br from-brand-orange/10 to-brand-yellow/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Competitive Pricing</h3>
                <p className="text-gray-700">Quality printing doesn't have to break the bank. We offer competitive rates with bulk discounts available.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-orange via-brand-yellow to-brand-orange text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Print?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Get a free quote for your printing project today. Our team is ready to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-orange px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Get a Quote
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
