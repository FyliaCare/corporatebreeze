'use client'

import Link from 'next/link'
import { Package, Palette, Megaphone, Code, Camera, Briefcase, ArrowRight } from 'lucide-react'
import { useState } from 'react'

export default function ServicesShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const services = [
    {
      title: 'Printing',
      icon: Package,
      description: 'Eye-catching designs and quality print solutions for all your business needs.',
      gradient: 'from-brand-orange to-brand-yellow',
      features: ['Business Cards', 'Brochures', 'Branded Merchandise']
    },
    {
      title: 'Branding',
      icon: Palette,
      description: 'Transform your identity with comprehensive branding solutions that resonate.',
      gradient: 'from-brand-pink to-brand-purple',
      features: ['Logo Design', 'Brand Guidelines', 'Corporate Identity']
    },
    {
      title: 'Graphic Design',
      icon: Code,
      description: 'Creative designs that bridge the gap between words and pictures beautifully.',
      gradient: 'from-brand-blue to-brand-cyan',
      features: ['Social Media', 'Marketing Materials', 'UI/UX Design']
    },
    {
      title: 'Advertising',
      icon: Megaphone,
      description: 'Multi-channel advertising campaigns that get your message heard loud and clear.',
      gradient: 'from-brand-cyan to-brand-green',
      features: ['Digital Ads', 'Outdoor Advertising', 'Media Planning']
    },
    {
      title: 'Photography',
      icon: Camera,
      description: 'Professional photography that captures your brand essence perfectly.',
      gradient: 'from-brand-purple to-brand-pink',
      features: ['Product Photos', 'Corporate Events', 'Commercial Shoots']
    },
    {
      title: 'Consultancy',
      icon: Briefcase,
      description: 'Strategic marketing insights to drive your business growth forward.',
      gradient: 'from-brand-green to-brand-cyan',
      features: ['Strategy', 'Market Research', 'Campaign Management']
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-6 py-2 rounded-full mb-4">
            <span className="font-semibold">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to elevate your brand and drive real results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative p-8">
                {/* Icon */}
                <div className={`bg-gradient-to-br ${service.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-3 group-hover:text-brand-blue transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-500">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} mr-2`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Learn More Link */}
                <div className={`flex items-center text-brand-blue font-semibold transition-all ${hoveredIndex === index ? 'translate-x-2' : ''}`}>
                  <span className="mr-2">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Corner Decoration */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-10 rounded-bl-full transform group-hover:scale-150 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/services" className="group inline-flex items-center bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Explore All Services
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
