'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Camera, CheckCircle, ArrowLeft, MessageCircle, Image as ImageIcon, Video, Aperture } from 'lucide-react'

export default function PhotographyPage() {
  const services = [
    {
      icon: ImageIcon,
      title: 'Product Photography',
      description: 'High-quality product images that showcase your items perfectly',
      features: ['E-commerce photos', 'Catalog images', 'Lifestyle shots', 'Detail photography']
    },
    {
      icon: Camera,
      title: 'Corporate Events',
      description: 'Professional coverage of your business events and functions',
      features: ['Conferences', 'Seminars', 'Award ceremonies', 'Team building events']
    },
    {
      icon: Aperture,
      title: 'Professional Headshots',
      description: 'Polished portraits for your team and executives',
      features: ['Individual portraits', 'Team photos', 'LinkedIn profiles', 'Website use']
    },
    {
      icon: ImageIcon,
      title: 'Commercial Photography',
      description: 'Photography for advertising and marketing campaigns',
      features: ['Advertising shoots', 'Brand photography', 'Editorial content', 'Creative concepts']
    },
    {
      icon: Video,
      title: 'Event Coverage',
      description: 'Comprehensive documentation of your special occasions',
      features: ['Launch events', 'Grand openings', 'Celebrations', 'Milestone events']
    },
    {
      icon: Camera,
      title: 'Photo Editing',
      description: 'Professional retouching and enhancement services',
      features: ['Color correction', 'Retouching', 'Background removal', 'Image optimization']
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'Discuss your vision, needs, and objectives for the shoot'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Develop shot list, location, and styling details'
    },
    {
      step: '03',
      title: 'Shoot Day',
      description: 'Professional photography session with expert direction'
    },
    {
      step: '04',
      title: 'Editing',
      description: 'Professional post-production and enhancement'
    },
    {
      step: '05',
      title: 'Delivery',
      description: 'High-resolution images in required formats'
    }
  ]

  const equipment = [
    'Professional DSLR and mirrorless cameras',
    'Studio lighting equipment',
    'Backdrop and props',
    'Reflectors and diffusers',
    'Professional editing software',
    'High-end lenses for every situation'
  ]

  const benefits = [
    {
      title: 'Professional Quality',
      description: 'State-of-the-art equipment and expert photographers ensure stunning results every time.'
    },
    {
      title: 'Brand Consistency',
      description: 'We maintain consistent visual style across all your photography needs for cohesive branding.'
    },
    {
      title: 'Fast Turnaround',
      description: 'Quick delivery of edited photos without compromising on quality or attention to detail.'
    },
    {
      title: 'Versatile Expertise',
      description: 'From products to people, we have the skills to handle diverse photography requirements.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-green via-brand-cyan to-brand-green overflow-hidden">
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
                <Camera className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Photography</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Professional photography services for all your business needs. From product photography to corporate events, we capture your brand's essence with stunning visual storytelling.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-green px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Book a Shoot
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Photography <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive photography solutions to showcase your brand visually
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-br from-brand-green to-brand-cyan w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-brand-green rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">Process</span>
            </h2>
            <p className="text-xl text-gray-600">From concept to final delivery</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-green to-brand-cyan transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-green to-brand-cyan text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Equipment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">Equipment</span>
              </h2>
              <p className="text-xl text-gray-600">Top-tier gear for exceptional results</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {equipment.map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-gradient-to-br from-brand-green/10 to-brand-cyan/10 rounded-xl p-6">
                  <CheckCircle className="w-6 h-6 text-brand-green flex-shrink-0 mt-1" />
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-brand-cyan">Photography</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-green via-brand-cyan to-brand-green text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Capture Your Story?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's create stunning visuals that showcase your brand and tell your story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-green px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Book a Session
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
