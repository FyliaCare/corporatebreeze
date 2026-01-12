import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import AuthProvider from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Corporate Breeze - Transform Your Brand Story',
  description: 'Leading marketing consultancy based in Canada with operations in Africa, providing tailor-made communication solutions, printing, branding, graphic design, and advertising services across North America and Africa.',
  keywords: 'marketing, branding, printing, graphic design, advertising, corporate solutions, Canada, international marketing, business consulting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <div className="pt-20">
            {children}
          </div>
          <Toaster position="top-right" toastOptions={{
            duration: 4000,
            style: {
              background: '#003B73',
              color: '#fff',
            },
          }} />
        </AuthProvider>
      </body>
    </html>
  )
}
