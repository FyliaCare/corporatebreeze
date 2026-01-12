'use client'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Briefcase, CheckCircle, ArrowLeft, MessageCircle, TrendingUp, Target, Users, BarChart } from 'lucide-react'

export default function MarketingConsultancyPage() {
  const services = [
    {
      icon: BarChart,
      title: 'Market Research',
      description: 'In-depth analysis of your market, competitors, and opportunities',
      features: ['Consumer insights', 'Competitor analysis', 'Market trends', 'SWOT analysis']
    },
    {
      icon: Target,
      title: 'Strategy Development',
      description: 'Comprehensive marketing strategies aligned with business goals',
      features: ['Marketing plans', 'Go-to-market strategy', 'Growth strategies', 'Positioning']
    },
    {
      icon: Users,
      title: 'Brand Positioning',
      description: 'Define and strengthen your brand\'s unique market position',
      features: ['Brand audit', 'Competitive positioning', 'Value proposition', 'Messaging']
    },
    {
      icon: TrendingUp,
      title: 'Campaign Management',
      description: 'End-to-end management of marketing campaigns',
      features: ['Campaign planning', 'Budget allocation', 'Timeline management', 'Execution oversight']
    },
    {
      icon: Briefcase,
      title: 'Digital Marketing',
      description: 'Comprehensive digital strategies for online success',
      features: ['Social media strategy', 'Content marketing', 'Email campaigns', 'SEO/SEM']
    },
    {
      icon: BarChart,
      title: 'Analytics & Reporting',
      description: 'Data-driven insights to measure and optimize performance',
      features: ['KPI tracking', 'ROI analysis', 'Performance reports', 'Recommendations']
    }
  ]

  const approach = [
    {
      step: '01',
      title: 'Discovery',
      description: 'Understand your business, challenges, and objectives'
    },
    {
      step: '02',
      title: 'Analysis',
      description: 'Deep dive into market data, competitors, and trends'
    },
    {
      step: '03',
      title: 'Strategy',
      description: 'Develop comprehensive marketing strategy and roadmap'
    },
    {
      step: '04',
      title: 'Implementation',
      description: 'Execute strategies with precision and expertise'
    },
    {
      step: '05',
      title: 'Optimization',
      description: 'Continuous monitoring and improvement for better results'
    }
  ]

  const benefits = [
    {
      title: 'Expert Guidance',
      description: 'Access to experienced marketing professionals who understand North American and African markets with global best practices.'
    },
    {
      title: 'Strategic Focus',
      description: 'Move beyond tactics to develop comprehensive strategies that drive long-term business growth.'
    },
    {
      title: 'Cost-Effective',
      description: 'Get senior-level marketing expertise without the overhead of full-time hires.'
    },
    {
      title: 'Fresh Perspective',
      description: 'External viewpoint brings new ideas and unbiased analysis to your marketing challenges.'
    },
    {
      title: 'Measurable Results',
      description: 'Data-driven approach ensures accountability and demonstrates clear return on investment.'
    },
    {
      title: 'Scalable Solutions',
      description: 'Strategies that grow with your business, from startup to enterprise level.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-cyan overflow-hidden">
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
                <Briefcase className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white">Marketing Consultancy</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              Strategic marketing solutions to help your business grow. We provide comprehensive marketing strategies tailored to your specific needs and industry, backed by data and proven methodologies.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 bg-white text-brand-cyan px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              <MessageCircle className="w-5 h-5" />
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive marketing consultancy services to accelerate your business growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className="bg-gradient-to-br from-brand-cyan to-brand-blue w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full mr-2"></span>
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

      {/* Approach Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Approach</span>
            </h2>
            <p className="text-xl text-gray-600">A proven methodology for marketing success</p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-brand-cyan to-brand-blue transform -translate-y-1/2 z-0"></div>

              <div className="grid md:grid-cols-5 gap-8 relative z-10">
                {approach.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 mb-4">
                      <div className="bg-gradient-to-br from-brand-cyan to-brand-blue text-white text-3xl font-bold w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                Why Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">With Us</span>
              </h2>
              <p className="text-xl text-gray-600">The advantages of partnering with Corporate Breeze</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-gradient-to-br from-brand-cyan/10 to-brand-blue/10 rounded-2xl p-6 hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Industries We <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">Serve</span>
              </h2>
              <p className="text-xl text-gray-600">Experience across diverse sectors</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                'Financial Services',
                'Retail & E-commerce',
                'Hospitality & Tourism',
                'Real Estate',
                'Healthcare',
                'Technology',
                'Education',
                'Non-Profit Organizations'
              ].map((industry, index) => (
                <div key={index} className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all">
                  <CheckCircle className="w-6 h-6 text-brand-cyan flex-shrink-0" />
                  <span className="text-gray-700 font-medium text-lg">{industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-cyan via-brand-blue to-brand-cyan text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Marketing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Schedule a consultation to discuss how our strategic marketing expertise can drive your business growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-brand-cyan px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
              Schedule Consultation
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
