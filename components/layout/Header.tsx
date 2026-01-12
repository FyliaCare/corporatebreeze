'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Menu, X, ShoppingCart, User, LogIn } from 'lucide-react'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative w-48 h-14 transition-transform group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Corporate Breeze"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/services" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              Shop
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              Portfolio
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-brand-cyan transition-colors font-medium relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-cyan group-hover:w-full transition-all"></span>
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth/login" className="bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all inline-flex items-center">
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-brand-cyan transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2 animate-fadeIn">
            <Link href="/" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Home
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              About
            </Link>
            <Link href="/services" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Services
            </Link>
            <Link href="/shop" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Shop
            </Link>
            <Link href="/portfolio" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Portfolio
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Contact
            </Link>
            <Link href="/auth/login" className="block py-2 text-gray-700 hover:text-brand-cyan hover:bg-brand-cyan/5 rounded-lg px-4 transition-all">
              Login
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
