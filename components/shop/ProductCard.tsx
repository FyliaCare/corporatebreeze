import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    compareAt?: number
    images: string[]
    category: {
      name: string
    }
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0

  return (
    <div className="card group cursor-pointer">
      <Link href={`/shop/${product.slug}`}>
        <div className="relative h-64 mb-4 rounded-lg overflow-hidden bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-brand-orange text-white px-2 py-1 rounded-lg text-sm font-bold">
              -{discount}%
            </div>
          )}
        </div>

        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase">{product.category.name}</span>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between">
          <div>
            {product.compareAt && (
              <span className="text-gray-400 line-through text-sm mr-2">
                GH₵{product.compareAt.toFixed(2)}
              </span>
            )}
            <span className="text-brand-blue font-bold text-xl">
              GH₵{product.price.toFixed(2)}
            </span>
          </div>
          <button className="bg-brand-cyan text-white p-2 rounded-lg hover:bg-brand-cyan/90 transition-all">
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </Link>
    </div>
  )
}
