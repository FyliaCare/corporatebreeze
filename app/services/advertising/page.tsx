'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Megaphone, CheckCircle, ArrowLeft, MessageCircle, Radio, Tv, Newspaper, Building2 } from 'lucide-react'

export default function AdvertisingPage() {
  const channels = [
    {
      icon: Newspaper,
      title: 'Print Media',
      description: 'Strategic placements in newspapers and magazines',
      features: ['Newspaper ads', 'Magazine features', 'Editorial content', 'Classified ads']
    },
    {
      icon: Radio,
      title: 'Radio Advertising',
      description: 'Reach audiences through popular radio stations',
      features: ['Commercial spots', 'Sponsored programs', 'Jingles', 'Live mentions']
    },
    {
      icon: Tv,
      title: 'Television',
      description: 'Compelling TV commercials that engage viewers',
      features: ['TV commercials', 'Program sponsorship', 'Product placement', 'Infomercials']
    },
    {
      icon: Building2,
      title: '3D Signage',
      description: 'Eye-catching dimensional signs for your business',
      features: ['Letter signage', 'Logo displays', 'Custom shapes', 'LED lighting']
    },
    {
      icon: Megaphone,
      title: 'Billboards',
      description: 'High-impact outdoor advertising in prime locations',
      features: ['Strategic placement', 'Large format', 'Digital billboards', 'Highway boards']
    },
    {
      icon: Building2,
      title: 'Pylon Signage',
      description: 'Tall freestanding signs for maximum visibility',
      features: ['Shopping centers', 'Gas stations', 'Business parks', 'Illuminated options']
    },
    {
      icon: Building2,
      title: 'Frontage Signs',
      description: 'Professional signage for your business storefront',
      features: ['Storefront signs', 'Window graphics', 'Awning signs', 'Building wraps']
    },
    {
      icon: Megaphone,
      title: 'Office Branding',
      description: 'Complete visual identity for your office space',
      features: ['Wall graphics', 'Reception signage', 'Wayfinding', 'Interior branding']
    },
    {
      icon: Building2,
      title: 'Vehicle Branding',
      description: 'Turn your vehicles into mobile advertisements',
      features: ['Car wraps', 'Van graphics', 'Fleet branding', 'Magnetic signs']
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Strategy',
      description: 'Develop targeted advertising strategy for your goals'
    },
    {
      step: '02',
      title: 'Creative',
      description: 'Design compelling ads that capture attention'
    },
    {
      step: '03',
      title: 'Media Planning',
      description: 'Select optimal channels and placement times'
    },
    {
      step: '04',
      title: 'Launch',
      description: 'Execute campaign across selected channels'
    },
    {
      step: '05',
      title: 'Monitor',
      description: 'Track performance and optimize for results'
    }
  ]

  const benefits = [
    {
      title: 'Wide Reach',
      description: 'Access multiple advertising channels to reach your target audience wherever they are.'
    },
    {
      title: 'Brand Visibility',
      description: 'Increase brand awareness with consistent presence across traditional and outdoor media.'
    },
    {
      title: 'Targeted Campaigns',
      description: 'Strategic placement ensures your message reaches the right people at the right time.'
    },
    {
      title: 'Measurable Results',
      description: 'Track campaign performance and measure ROI across all advertising channels.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue overflow-hidden">
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
                <Megaphone className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Advertising</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Comprehensive advertising solutions across traditional and outdoor media. From newspaper and magazine ads to billboards and vehicle branding, we help your business get noticed.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-blue px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Plan Your Campaign
            </Link>
          </div>
        </div>
      </section>

      {/* Advertising Channels */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Advertising <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Channels</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Multiple channels to amplify your brand message and reach your audience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {channels.map((channel, index) => {
              const Icon = channel.icon
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-br from-brand-blue to-brand-cyan w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{channel.title}</h3>
                  <p className="text-gray-600 mb-4">{channel.description}</p>
                  <ul className="space-y-2">
                    {channel.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-brand-blue rounded-full mr-2"></span>
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
              Campaign <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Process</span>
            </h2>
            <p className="text-xl text-gray-600">From strategy to execution and optimization</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue to-brand-cyan transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-blue to-brand-cyan text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Choose Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Advertising Services</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-brand-blue/10 to-brand-cyan/10 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Outdoor Advertising Highlight */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-brand-blue to-brand-cyan p-8 text-white flex items-center justify-center">
                <Building2 className="w-32 h-32 opacity-50" />
              </div>
              <div className="md:w-2/3 p-8 md:p-12">
                <h3 className="text-3xl font-bold mb-4">Outdoor Advertising Excellence</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Our outdoor advertising solutions include 3D signage, billboards, pylon signage, frontage signs, office branding, and vehicle branding. We handle everything from design to installation, ensuring maximum visibility for your brand.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Prime location selection for maximum exposure</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Weather-resistant materials for durability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-brand-blue flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Professional installation and maintenance</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Launch Your Advertising Campaign</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's create an advertising strategy that gets your brand noticed and drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-blue px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
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
