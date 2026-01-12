'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Code, CheckCircle, ArrowLeft, MessageCircle, Layers, Image as ImageIcon } from 'lucide-react'

export default function GraphicDesignPage() {
  const services = [
    {
      icon: Layers,
      title: 'Logo & Brand Identity',
      description: 'Unique logos that capture your brand essence',
      features: ['Multiple concepts', 'Unlimited revisions', 'Vector files', 'Brand guide']
    },
    {
      icon: ImageIcon,
      title: 'Marketing Materials',
      description: 'Compelling designs for all your marketing needs',
      features: ['Flyers & brochures', 'Posters', 'Banners', 'Ad campaigns']
    },
    {
      icon: Code,
      title: 'Social Media Graphics',
      description: 'Engaging visuals for your social platforms',
      features: ['Post templates', 'Cover images', 'Stories', 'Ads']
    },
    {
      icon: Layers,
      title: 'Packaging Design',
      description: 'Product packaging that sells itself',
      features: ['3D mockups', 'Label design', 'Box design', 'Print-ready files']
    },
    {
      icon: ImageIcon,
      title: 'Infographics',
      description: 'Complex data simplified through visual storytelling',
      features: ['Data visualization', 'Custom illustrations', 'Charts & graphs', 'Shareable formats']
    },
    {
      icon: Code,
      title: 'Creative Concepts',
      description: 'Innovative ideas brought to life through design',
      features: ['Brainstorming', 'Concept boards', 'Mood boards', 'Style guides']
    }
  ]

  const process = [
    {
      step: '01',
      title: 'Brief',
      description: 'Understanding your vision, goals, and target audience'
    },
    {
      step: '02',
      title: 'Research',
      description: 'Market analysis and competitor research for insights'
    },
    {
      step: '03',
      title: 'Concept',
      description: 'Creating initial design concepts and ideas'
    },
    {
      step: '04',
      title: 'Design',
      description: 'Developing refined designs with attention to detail'
    },
    {
      step: '05',
      title: 'Deliver',
      description: 'Final files in all required formats for any use'
    }
  ]

  const principles = [
    {
      title: 'Creativity First',
      description: 'We push boundaries to create designs that stand out and capture attention.'
    },
    {
      title: 'Purpose-Driven',
      description: 'Every design element serves a purpose in communicating your message.'
    },
    {
      title: 'Audience-Focused',
      description: 'We design with your target audience in mind, ensuring maximum impact.'
    },
    {
      title: 'Brand Consistency',
      description: 'Maintaining cohesive visual language across all touchpoints.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-purple overflow-hidden">
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
                <Code className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Graphic Design</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              We solve communication problems between our clients and their customers through graphics.
            </p>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              We bridge the gap between words and pictures by bringing to light our clients' ideas and making creativity and innovation the benchmark of our designs. Simply put, we demystify the complication of words!
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-purple px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Start Your Project
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to creation, we deliver designs that communicate and captivate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-br from-brand-purple to-brand-pink w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mr-2"></span>
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

      {/* Design Principles */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">Principles</span>
              </h2>
              <p className="text-xl text-gray-600">The foundation of every great design we create</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100">
                  <h3 className="text-2xl font-bold mb-4 text-brand-purple">{principle.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Design <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">Process</span>
            </h2>
            <p className="text-xl text-gray-600">A structured approach to creative excellence</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-purple to-brand-pink transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {process.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-purple to-brand-pink text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-purple via-brand-pink to-brand-purple text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let our designers transform your ideas into stunning visuals that captivate your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-purple px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Start Your Design
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
