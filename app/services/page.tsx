import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { Package, Palette, Megaphone, Briefcase, Camera, Code, ArrowRight } from 'lucide-react'

export default function ServicesPage() {
  const services = [
    {
      title: 'Printing',
      slug: 'printing',
      icon: Package,
      description: 'We create eye-catching designs and provide quality print. With a wide range of print solutions including custom made business cards, brochures, personalized calendars & diaries, labels, letterhead, envelopes, personalized greeting cards, flyers and folders. We also brand shirts, Aprons and many more of such print related jobs to meet your day-to-day need.',
      features: [
        'Business Cards',
        'Brochures & Flyers',
        'Calendars & Diaries',
        'Labels & Letterheads',
        'Envelopes & Greeting Cards',
        'Branded Shirts & Aprons',
      ],
      color: 'orange'
    },
    {
      title: 'Branding',
      slug: 'branding',
      icon: Palette,
      description: 'We offer individual and corporate branding solutions. The services we offer include customized brand collaterals (polo and round neck shirts, caps, nose masks, keyrings etc.)',
      features: [
        'Corporate Identity Design',
        'Logo Design & Development',
        'Brand Guidelines',
        'Customized Merchandise',
        'Polo & Round Neck Shirts',
        'Promotional Materials',
      ],
      color: 'pink'
    },
    {
      title: 'Graphic Designs',
      slug: 'graphic-design',
      icon: Code,
      description: 'Our Graphic Design department solves communication problems between our clients and their customers through graphics. They bridge the gap between words and pictures by bringing to light our Clients\' ideas and making creativity and innovation the benchmark of our designs...simply we demystify the complication of words!!!',
      features: [
        'Logo & Brand Identity',
        'Marketing Materials',
        'Social Media Graphics',
        'Packaging Design',
        'Infographics',
        'Creative Concepts',
      ],
      color: 'purple'
    },
    {
      title: 'Advertising',
      slug: 'advertising',
      icon: Megaphone,
      description: 'Our advertising channels include newspaper, magazines, radio & television advertisement, outdoor advertisement (which includes 3D signage, billboards, pylon signage, frontage signs) and branding (office branding and car branding).',
      features: [
        'Newspaper & Magazine Ads',
        'Radio & TV Commercials',
        '3D Signage',
        'Billboards',
        'Pylon Signage',
        'Vehicle Branding',
      ],
      color: 'blue'
    },
    {
      title: 'Marketing Consultancy',
      slug: 'marketing-consultancy',
      icon: Briefcase,
      description: 'Strategic marketing solutions to help your business grow. We provide comprehensive marketing strategies tailored to your specific needs and industry.',
      features: [
        'Market Research',
        'Strategy Development',
        'Brand Positioning',
        'Campaign Management',
        'Digital Marketing',
        'Analytics & Reporting',
      ],
      color: 'cyan'
    },
    {
      title: 'Photography',
      slug: 'photography',
      icon: Camera,
      description: 'Professional photography services for all your business needs. From product photography to corporate events, we capture your brand\'s essence.',
      features: [
        'Product Photography',
        'Corporate Events',
        'Headshots',
        'Commercial Photography',
        'Event Coverage',
        'Photo Editing',
      ],
      color: 'green'
    },
  ]

  const colorMap: any = {
    orange: 'bg-brand-orange',
    pink: 'bg-brand-pink',
    purple: 'bg-brand-purple',
    blue: 'bg-brand-blue',
    cyan: 'bg-brand-cyan',
    green: 'bg-brand-green',
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-blue to-brand-cyan text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Comprehensive marketing and communication solutions to build your brand and grow your business
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="group card hover:shadow-2xl transition-all duration-300">
                  <div className={`${colorMap[service.color]} w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-700 mb-6">{service.description}</p>
                  
                  <h4 className="font-bold text-lg mb-3">Key Features:</h4>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-brand-cyan mr-2">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link 
                    href={`/services/${service.slug}`}
                    className={`inline-flex items-center gap-2 ${colorMap[service.color]} text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105`}
                  >
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help elevate your brand
          </p>
          <a href="/contact" className="btn-primary">
            Request a Quote
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
