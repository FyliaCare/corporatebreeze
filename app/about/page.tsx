'use client'

import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Image from 'next/image'
import { Award, Target, Eye, Heart, CheckCircle, Users, Briefcase, Zap } from 'lucide-react'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story')

  const team = [
    {
      name: 'Humphrey Lomotey',
      role: 'Chief Executive Officer',
      image: null,
      social: {
        facebook: 'HUMPHREYLOMOTEY_',
        instagram: 'HUMPHREYLOMOTEY_',
        email: 'Humphrey010@yahoo.com'
      }
    },
    {
      name: 'Nana Yaa Hanson-Lomotey',
      role: 'Head of Legal and Administration',
      image: null,
      email: 'Phanson215@gmail.com'
    },
    {
      name: 'Glover Tetteh',
      role: 'Head of Creatives and Designs',
      image: null,
      social: {
        facebook: 'GLOVER TETTEH BRA_KWADWO',
        instagram: 'GLOVER TETTEH BRA_KWADWO',
        email: 'glovertee27@gmail.com'
      }
    },
  ]

  const values = [
    {
      icon: Award,
      title: 'Excellence',
      description: '"Just okay is not good enough" - We pursue excellence in every project, ensuring exceptional results.',
      color: 'from-brand-blue to-brand-cyan'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We are passionate about creating the best solutions for our clients and their success.',
      color: 'from-brand-orange to-brand-yellow'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving ideas and staying ahead with creative communication solutions.',
      color: 'from-brand-pink to-brand-purple'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'Building lasting relationships with clients, making brands valuable to people and vice versa.',
      color: 'from-brand-green to-brand-cyan'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">About Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Building Brands,<br />Creating Experiences
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              A marketing consultancy based in Canada, dedicated to providing tailor-made communication solutions that elevate brands across North America and Africa
            </p>
          </div>
        </div>
      </section>

      {/* Our Story / Mission / Vision Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveTab('story')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'story'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Our Story
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'vision'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab('mission')}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === 'mission'
                    ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Mission
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
              {activeTab === 'story' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-brand-blue to-brand-cyan p-3 rounded-xl">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>
                  </div>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      Corporate Breeze Consult is a marketing consultancy headquartered in Canada with operations in Ghana. We bridge North American innovation with African market opportunities, bringing world-class marketing expertise to businesses across both continents.
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      We specialize in providing tailor-made communication solutions to build the brands of our clients. Our approach is simple yet powerful: we believe that great communication bridges the gap between businesses and their customers, regardless of geography.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Through creativity, innovation, and a deep understanding of both North American and African markets, we've helped numerous businesses tell their stories, connect with their audiences, and achieve remarkable growth across borders.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-brand-purple to-brand-pink p-3 rounded-xl">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                    We seek to be the bridge connecting North American innovation with African opportunity, influencing marketing communications across continents.
                  </p>
                  <p className="text-gray-600 mt-6 leading-relaxed">
                    Our vision is to be the leading cross-continental marketing consultancy, delivering Canadian standards of excellence to businesses in Canada, Ghana, and beyond. We envision a future where every brand we touch becomes a recognized name, trusted across borders.
                  </p>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="animate-fadeIn">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-brand-orange to-brand-yellow p-3 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                  </div>
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                    To make brands valuable to people and people more valuable to brands by constantly evolving ideas.
                  </p>
                  <p className="text-gray-600 mt-6 leading-relaxed">
                    We are committed to creating meaningful connections between businesses and their customers. Through innovative strategies and creative excellence, we transform ordinary brands into extraordinary experiences.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Values</span>
              </h2>
              <p className="text-xl text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className={`bg-gradient-to-br ${value.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Team</span>
              </h2>
              <p className="text-xl text-gray-600">The passionate people behind Corporate Breeze</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-64 bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Users className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-brand-cyan font-medium mb-4">{member.role}</p>
                    {member.email && (
                      <p className="text-sm text-gray-600 mb-2">📧 {member.email}</p>
                    )}
                    {member.social && (
                      <div className="flex gap-2 mt-4">
                        {member.social.facebook && (
                          <div className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-lg text-xs">
                            Facebook
                          </div>
                        )}
                        {member.social.instagram && (
                          <div className="bg-brand-pink/10 text-brand-pink px-3 py-1 rounded-lg text-xs">
                            Instagram
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What Sets Us Apart</h2>
              <p className="text-xl text-white/90">Our commitment to excellence in every detail</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Customer-Centric Approach</h3>
                  <p className="text-white/80">We believe "just okay is not good enough" - we're passionate about creating the best solutions for our clients.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                    <h3 className="font-bold text-lg mb-2">Cross-Continental Expertise</h3>
                    <p className="text-white/80">Canadian headquarters with African operations, bringing global best practices and local market understanding.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Comprehensive Services</h3>
                  <p className="text-white/80">From printing to advertising, we offer end-to-end solutions under one roof.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Proven Track Record</h3>
                  <p className="text-white/80">Successfully delivered projects for diverse clients across multiple industries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
