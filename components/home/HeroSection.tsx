'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, CheckCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-brand-cyan/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-brand-orange/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-3xl"></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-32 right-[15%] animate-float">
          <div className="w-20 h-20 bg-gradient-to-br from-brand-yellow to-brand-orange rounded-2xl rotate-12 opacity-80"></div>
        </div>
        <div className="absolute bottom-40 left-[10%] animate-float" style={{ animationDelay: '0.5s' }}>
          <div className="w-16 h-16 bg-gradient-to-br from-brand-pink to-brand-purple rounded-full opacity-70"></div>
        </div>
        <div className="absolute top-1/3 right-[8%] animate-float" style={{ animationDelay: '1s' }}>
          <div className="w-24 h-24 bg-gradient-to-br from-brand-cyan to-brand-blue rounded-3xl -rotate-12 opacity-60"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-brand-blue/20">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold text-sm">Professional Marketing Solutions</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Transform Your
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-blue animate-gradient">
                Brand Story
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Based in Canada, serving businesses across North America and Africa with innovative marketing solutions that turn brands into unforgettable experiences.
              <span className="block mt-2 text-brand-blue font-semibold">Let's build something remarkable together.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/contact" className="group bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all inline-flex items-center">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="group bg-white border-2 border-gray-200 text-brand-blue px-8 py-4 rounded-xl font-bold text-lg hover:border-brand-cyan hover:shadow-xl transition-all inline-flex items-center">
                <Play className="mr-2 h-5 w-5" />
                View Portfolio
              </Link>
            </div>
          </div>

          {/* Right Content - Logo & Visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              {/* Main Logo Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-100">
                <div className="relative h-96 w-full">
                  <Image
                    src="/logo.png"
                    alt="Corporate Breeze"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-blue rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-brand-blue rounded-full animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
