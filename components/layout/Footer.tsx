import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-brand-blue text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-cyan rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="md:col-span-2">
            <div className="relative w-48 h-16 mb-6">
              <Image
                src="/logo.png"
                alt="Corporate Breeze"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Marketing consultancy providing tailor-made communication solutions to build the brands of our clients. Excellence is our standard.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-brand-cyan p-3 rounded-lg transition-all hover:scale-110">
                <Instagram className="h-5 w-5 group-hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-brand-cyan p-3 rounded-lg transition-all hover:scale-110">
                <Twitter className="h-5 w-5 group-hover:text-white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="group bg-white/10 hover:bg-brand-cyan p-3 rounded-lg transition-all hover:scale-110">
                <Facebook className="h-5 w-5 group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-brand-cyan">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-brand-cyan transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-brand-cyan group-hover:w-4 transition-all mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-brand-cyan transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-brand-cyan group-hover:w-4 transition-all mr-2"></span>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-brand-cyan transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-brand-cyan group-hover:w-4 transition-all mr-2"></span>
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-gray-300 hover:text-brand-cyan transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-brand-cyan group-hover:w-4 transition-all mr-2"></span>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-brand-cyan transition-colors inline-flex items-center group">
                  <span className="w-0 h-0.5 bg-brand-cyan group-hover:w-4 transition-all mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-brand-cyan">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Canada HQ</p>
                  <span className="text-gray-300">Ontario, Canada</span>
                </div>
              </li>
              <li className="flex items-start group">
                <MapPin className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <div>
                  <p className="font-semibold text-white">Ghana Office</p>
                  <span className="text-gray-300">Accra, Ghana</span>
                </div>
              </li>
              <li className="flex items-center group">
                <Phone className="h-5 w-5 mr-3 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <span className="text-gray-300">+1 XXX XXX XXXX</span>
              </li>
              <li className="flex items-center group">
                <Mail className="h-5 w-5 mr-3 flex-shrink-0 text-brand-cyan group-hover:scale-110 transition-transform" />
                <span className="text-gray-300">info@corporatebreeze.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Corporate Breeze Consult. All rights reserved.
            </p>
            
            {/* Admin Login Button */}
            <Link 
              href="/admin" 
              className="group bg-white/5 hover:bg-brand-cyan/20 border border-white/10 hover:border-brand-cyan px-4 py-2 rounded-lg text-xs font-medium transition-all inline-flex items-center gap-2"
            >
              <Shield className="h-3.5 w-3.5 text-gray-400 group-hover:text-brand-cyan transition-colors" />
              <span className="text-gray-400 group-hover:text-brand-cyan transition-colors">Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
