import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Zap, Star } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import AnimatedStats from '@/components/home/AnimatedStats'
import FeaturedProducts from '@/components/home/FeaturedProducts'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <HeroSection />

      <AnimatedStats />

      <FeaturedProducts />

      {/* Why Choose Us - Alternating Timeline Design */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2 bg-brand-cyan/10 text-brand-cyan px-6 py-2 rounded-full mb-4">
                <Star className="w-5 h-5" />
                <span className="font-semibold">Our Advantage</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Why Businesses <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Trust Us</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We combine strategic thinking, creative excellence, and proven results to deliver exceptional value
              </p>
            </div>

            <div className="space-y-6">
              {/* Item 1 - Left aligned */}
              <div className="group flex items-center gap-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-r from-brand-blue/5 to-transparent border-l-4 border-brand-blue p-6 rounded-r-2xl">
                  <h3 className="text-2xl font-bold mb-2">International Reach</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Based in Canada with operations in Ghana, we bring North American standards and global best practices to African markets, ensuring world-class results.
                  </p>
                </div>
              </div>

              {/* Item 2 - Right aligned */}
              <div className="group flex items-center gap-6 flex-row-reverse hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-orange to-brand-yellow flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-l from-brand-orange/5 to-transparent border-r-4 border-brand-orange p-6 rounded-l-2xl text-right">
                  <h3 className="text-2xl font-bold mb-2">End-to-End Solutions</h3>
                  <p className="text-gray-600 leading-relaxed">
                    From strategy and design to production and distribution, we handle everything under one roof. No need for multiple vendors or coordination headaches.
                  </p>
                </div>
              </div>

              {/* Item 3 - Left aligned */}
              <div className="group flex items-center gap-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-pink to-brand-purple flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-r from-brand-pink/5 to-transparent border-l-4 border-brand-pink p-6 rounded-r-2xl">
                  <h3 className="text-2xl font-bold mb-2">Fast Turnaround</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We respect your deadlines. Our streamlined processes and dedicated team ensure quick delivery without compromising on quality or creativity.
                  </p>
                </div>
              </div>

              {/* Item 4 - Right aligned */}
              <div className="group flex items-center gap-6 flex-row-reverse hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-green to-brand-cyan flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-l from-brand-green/5 to-transparent border-r-4 border-brand-green p-6 rounded-l-2xl text-right">
                  <h3 className="text-2xl font-bold mb-2">Quality Guaranteed</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Premium materials, cutting-edge technology, and meticulous attention to detail in every project. We stand behind our work with a satisfaction guarantee.
                  </p>
                </div>
              </div>

              {/* Item 5 - Left aligned */}
              <div className="group flex items-center gap-6 hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-r from-brand-purple/5 to-transparent border-l-4 border-brand-purple p-6 rounded-r-2xl">
                  <h3 className="text-2xl font-bold mb-2">Strategic Partnership</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We don't just execute tasks—we become your strategic partner, invested in your success and committed to helping your brand grow long-term.
                  </p>
                </div>
              </div>

              {/* Item 6 - Right aligned */}
              <div className="group flex items-center gap-6 flex-row-reverse hover:scale-[1.02] transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 bg-gradient-to-l from-brand-cyan/5 to-transparent border-r-4 border-brand-cyan p-6 rounded-l-2xl text-right">
                  <h3 className="text-2xl font-bold mb-2">Proven Track Record</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Years of experience delivering successful campaigns across diverse industries. Our portfolio speaks to our ability to drive real business results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-cyan to-brand-blue"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/90">
              Let's create something extraordinary together. Get in touch with our team today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="group bg-white text-brand-blue px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all inline-flex items-center shadow-xl hover:shadow-2xl hover:scale-105">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/portfolio" className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all inline-flex items-center">
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
