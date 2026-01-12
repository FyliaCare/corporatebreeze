'use client'

import { useEffect, useState, useRef } from 'react'
import { Lightbulb, Target, Rocket, Heart } from 'lucide-react'

export default function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const features = [
    { 
      icon: Lightbulb, 
      title: 'Creative Excellence', 
      description: 'We bring fresh, innovative ideas that make your brand stand out in the marketplace',
      color: 'from-brand-orange to-brand-yellow' 
    },
    { 
      icon: Target, 
      title: 'Strategic Approach', 
      description: 'Every solution is tailored specifically to your unique business goals and audience',
      color: 'from-brand-blue to-brand-cyan' 
    },
    { 
      icon: Rocket, 
      title: 'Results Driven', 
      description: 'We focus on measurable outcomes that drive real growth for your business',
      color: 'from-brand-pink to-brand-purple' 
    },
    { 
      icon: Heart, 
      title: 'Client First', 
      description: 'Your success is our success. We build lasting partnerships, not just transactions',
      color: 'from-brand-green to-brand-cyan' 
    },
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Makes Us <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Different</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We don't just deliver services – we deliver experiences that transform your brand
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative Element */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-bl-full`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
