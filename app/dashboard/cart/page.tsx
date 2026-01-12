'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ShoppingCart, Trash2, Plus, Minus, CreditCard,
  ArrowRight, Sparkles, Package, Truck, Shield, X,
  RotateCw, Gift, Lock, Check, Clock,
  MapPin, AlertCircle, Store, Edit2, Bookmark, TrendingUp,
  Star, Smartphone
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CartItem {
  id: string
  productId: string
  name: string
  description: string
  price: number
  compareAt?: number
  quantity: number
  image: string
  category?: string
  stock: number
  inStock: boolean
  maxQuantity: number
}

interface Address {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  country: string
  postalCode?: string
  isDefault: boolean
}

type CheckoutStep = 'cart' | 'shipping' | 'payment' | 'review'
type DeliveryMethod = 'standard' | 'express' | 'pickup'
type PaymentMethod = 'card' | 'mobile-money' | 'paypal'

export default function CartPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [processingItemId, setProcessingItemId] = useState<string | null>(null)
  
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart')
  const [couponCode, setCouponCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)
  
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('standard')
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date>(new Date())
  
  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null)
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null)
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    country: 'Ghana',
    postalCode: '',
    isDefault: false,
  })
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  })
  const [mobileMoneyDetails, setMobileMoneyDetails] = useState({
    provider: 'mtn',
    number: '',
  })
  
  const [giftMessage, setGiftMessage] = useState('')
  const [isGift, setIsGift] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const [saveForLater, setSaveForLater] = useState<string[]>([])
  
  const [recommendedProducts] = useState([
    { id: 'rec1', name: 'Business Card Holder', price: 15.99, image: '💼', rating: 4.5 },
    { id: 'rec2', name: 'Premium Pen Set', price: 29.99, image: '✒️', rating: 4.8 },
    { id: 'rec3', name: 'Custom Stickers', price: 12.99, image: '🏷️', rating: 4.6 },
  ])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  useEffect(() => {
    if (session) {
      fetchCartItems()
      fetchAddresses()
    }
  }, [session])

  useEffect(() => {
    const today = new Date()
    let daysToAdd = deliveryMethod === 'express' ? 2 : deliveryMethod === 'standard' ? 5 : 1
    const delivery = new Date(today)
    delivery.setDate(delivery.getDate() + daysToAdd)
    setEstimatedDelivery(delivery)
  }, [deliveryMethod])

  const fetchCartItems = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/cart')
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.items || [])
      } else {
        toast.error('Failed to load cart')
      }
    } catch (error) {
      console.error('Cart fetch error:', error)
      toast.error('Failed to load cart')
    } finally {
      setLoading(false)
    }
  }

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses')
      if (response.ok) {
        const data = await response.json()
        setAddresses(data.addresses || [])
        const defaultAddr = data.addresses?.find((a: Address) => a.isDefault)
        if (defaultAddr) setSelectedAddressId(defaultAddr.id)
      }
    } catch (error) {
      console.error('Addresses fetch error:', error)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = subtotal * 0.1
  const shipping = deliveryMethod === 'pickup' ? 0 : deliveryMethod === 'express' ? 25 : subtotal > 100 ? 0 : 15
  const discountAmount = subtotal * (discount / 100)
  const total = subtotal + tax + shipping - discountAmount

  const updateQuantity = async (cartItemId: string, change: number) => {
    const item = cartItems.find(i => i.id === cartItemId)
    if (!item) return

    const newQuantity = item.quantity + change
    
    if (newQuantity < 1) {
      removeItem(cartItemId)
      return
    }

    if (newQuantity > item.maxQuantity) {
      toast.error(`Only ${item.maxQuantity} items available in stock`)
      return
    }

    setProcessingItemId(cartItemId)
    
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItemId, quantity: newQuantity }),
      })

      if (response.ok) {
        setCartItems(cartItems.map(i => 
          i.id === cartItemId ? { ...i, quantity: newQuantity } : i
        ))
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update quantity')
      }
    } catch (error) {
      console.error('Update quantity error:', error)
      toast.error('Failed to update quantity')
    } finally {
      setProcessingItemId(null)
    }
  }

  const removeItem = async (cartItemId: string) => {
    setProcessingItemId(cartItemId)
    
    try {
      const response = await fetch(`/api/cart?id=${cartItemId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setCartItems(cartItems.filter(item => item.id !== cartItemId))
        toast.success('Item removed from cart')
      } else {
        toast.error('Failed to remove item')
      }
    } catch (error) {
      console.error('Remove item error:', error)
      toast.error('Failed to remove item')
    } finally {
      setProcessingItemId(null)
    }
  }

  const moveToSaveForLater = (cartItemId: string) => {
    setSaveForLater([...saveForLater, cartItemId])
    removeItem(cartItemId)
    toast.success('Moved to saved items')
  }

  const applyCoupon = () => {
    const code = couponCode.toUpperCase()
    const validCoupons: Record<string, number> = {
      'SAVE20': 20,
      'SAVE10': 10,
      'WELCOME15': 15,
      'BULK25': 25,
    }

    if (validCoupons[code]) {
      setDiscount(validCoupons[code])
      setAppliedCoupon(code)
      toast.success(`Coupon applied! ${validCoupons[code]}% off`)
    } else {
      toast.error('Invalid coupon code')
    }
  }

  const removeCoupon = () => {
    setDiscount(0)
    setAppliedCoupon(null)
    setCouponCode('')
    toast.success('Coupon removed')
  }

  const saveAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.street || !newAddress.city || !newAddress.state) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const method = editingAddressId ? 'PUT' : 'POST'
      const body = editingAddressId ? { id: editingAddressId, ...newAddress } : newAddress

      const response = await fetch('/api/addresses', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        const data = await response.json()
        
        if (editingAddressId) {
          setAddresses(addresses.map(a => a.id === editingAddressId ? data.address : a))
          toast.success('Address updated')
        } else {
          setAddresses([...addresses, data.address])
          setSelectedAddressId(data.address.id)
          toast.success('Address saved')
        }
        
        setShowAddressForm(false)
        setEditingAddressId(null)
        setNewAddress({
          name: '',
          phone: '',
          street: '',
          city: '',
          state: '',
          country: 'Ghana',
          postalCode: '',
          isDefault: false,
        })
      } else {
        toast.error('Failed to save address')
      }
    } catch (error) {
      console.error('Save address error:', error)
      toast.error('Failed to save address')
    }
  }

  const deleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return

    try {
      const response = await fetch(`/api/addresses?id=${addressId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setAddresses(addresses.filter(a => a.id !== addressId))
        if (selectedAddressId === addressId) setSelectedAddressId(null)
        toast.success('Address deleted')
      } else {
        toast.error('Failed to delete address')
      }
    } catch (error) {
      console.error('Delete address error:', error)
      toast.error('Failed to delete address')
    }
  }

  const proceedToNextStep = () => {
    if (checkoutStep === 'cart') {
      if (cartItems.length === 0) {
        toast.error('Your cart is empty')
        return
      }
      setCheckoutStep('shipping')
    } else if (checkoutStep === 'shipping') {
      if (!selectedAddressId) {
        toast.error('Please select a delivery address')
        return
      }
      setCheckoutStep('payment')
    } else if (checkoutStep === 'payment') {
      if (paymentMethod === 'card' && (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv)) {
        toast.error('Please complete card details')
        return
      }
      if (paymentMethod === 'mobile-money' && !mobileMoneyDetails.number) {
        toast.error('Please enter mobile money number')
        return
      }
      setCheckoutStep('review')
    }
  }

  const placeOrder = async () => {
    const selectedAddress = addresses.find(a => a.id === selectedAddressId)
    if (!selectedAddress) {
      toast.error('Please select a delivery address')
      return
    }

    const orderData = {
      subtotal,
      tax,
      shipping,
      total,
      shippingAddress: JSON.stringify(selectedAddress),
      billingAddress: JSON.stringify(selectedAddress),
      notes: orderNotes,
      items: cartItems.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
    }

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Order placed successfully!')
        router.push(`/dashboard/orders?success=true&orderId=${data.order.id}`)
      } else {
        toast.error('Failed to place order')
      }
    } catch (error) {
      console.error('Place order error:', error)
      toast.error('Failed to place order')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  const ProgressSteps = () => {
    const steps = [
      { key: 'cart', label: 'Cart', icon: ShoppingCart },
      { key: 'shipping', label: 'Shipping', icon: Truck },
      { key: 'payment', label: 'Payment', icon: CreditCard },
      { key: 'review', label: 'Review', icon: Check },
    ]

    const currentStepIndex = steps.findIndex(s => s.key === checkoutStep)

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.key === checkoutStep
            const isCompleted = index < currentStepIndex
            
            return (
              <div key={step.key} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-lg scale-110' 
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`mt-2 text-sm font-semibold ${
                    isActive ? 'text-brand-cyan' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-4 rounded ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {checkoutStep !== 'cart' ? (
              <button 
                onClick={() => {
                  const steps: CheckoutStep[] = ['cart', 'shipping', 'payment', 'review']
                  const currentIndex = steps.indexOf(checkoutStep)
                  if (currentIndex > 0) setCheckoutStep(steps[currentIndex - 1])
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                ← Back
              </button>
            ) : (
              <Link href="/dashboard/shop" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                ← Continue Shopping
              </Link>
            )}
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-brand-cyan" />
              <span className="font-semibold text-gray-900">{cartItems.length} Items</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {checkoutStep !== 'cart' && <ProgressSteps />}
        
        {cartItems.length === 0 && checkoutStep === 'cart' ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link href="/dashboard/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-bold hover:shadow-xl transition-all">
              <Sparkles className="w-5 h-5" />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {checkoutStep === 'cart' && (
                <>
                  <h1 className="text-4xl font-bold mb-6">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Shopping Cart</span>
                  </h1>

                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex gap-6">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-6xl flex-shrink-0">
                          {item.image}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-xl text-gray-900 mb-1">{item.name}</h3>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                              {item.category && (
                                <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-semibold">
                                  {item.category}
                                </span>
                              )}
                              
                              <div className="mt-2 flex items-center gap-2">
                                {item.stock <= 5 ? (
                                  <div className="flex items-center gap-1 text-orange-600 text-xs">
                                    <AlertCircle className="w-3 h-3" />
                                    <span>Only {item.stock} left in stock</span>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-1 text-green-600 text-xs">
                                    <Check className="w-3 h-3" />
                                    <span>In stock</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              disabled={processingItemId === item.id}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                disabled={processingItemId === item.id}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-lg w-12 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                disabled={processingItemId === item.id || item.quantity >= item.maxQuantity}
                                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="text-right">
                              {item.compareAt && item.compareAt > item.price && (
                                <p className="text-xs text-gray-400 line-through">${item.compareAt.toFixed(2)} each</p>
                              )}
                              <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                              <p className="text-2xl font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() => moveToSaveForLater(item.id)}
                              className="text-sm text-brand-cyan hover:text-brand-blue font-semibold flex items-center gap-1"
                            >
                              <Bookmark className="w-4 h-4" />
                              Save for later
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {recommendedProducts.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-brand-cyan" />
                        <h3 className="text-xl font-bold">You might also like</h3>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {recommendedProducts.map((product) => (
                          <div key={product.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="text-4xl mb-2 text-center">{product.image}</div>
                            <h4 className="font-semibold text-sm text-center mb-1">{product.name}</h4>
                            <div className="flex items-center justify-center gap-1 mb-2">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">{product.rating}</span>
                            </div>
                            <p className="text-center font-bold text-brand-cyan">${product.price}</p>
                            <button className="w-full mt-3 px-3 py-2 bg-gray-900 text-white rounded-lg text-xs font-semibold hover:bg-gray-800 transition-colors">
                              Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {checkoutStep === 'shipping' && (
                <>
                  <h2 className="text-3xl font-bold mb-6">Shipping Information</h2>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Delivery Method</h3>
                    <div className="space-y-3">
                      {[
                        { value: 'standard', label: 'Standard Delivery', time: '5-7 business days', price: subtotal > 100 ? 0 : 15, icon: Package },
                        { value: 'express', label: 'Express Delivery', time: '2-3 business days', price: 25, icon: Truck },
                        { value: 'pickup', label: 'Store Pickup', time: 'Available next business day', price: 0, icon: Store },
                      ].map((method) => {
                        const Icon = method.icon
                        return (
                          <button
                            key={method.value}
                            onClick={() => setDeliveryMethod(method.value as DeliveryMethod)}
                            className={`w-full p-4 rounded-xl border-2 transition-all ${
                              deliveryMethod === method.value
                                ? 'border-brand-cyan bg-brand-cyan/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-brand-cyan" />
                                <div className="text-left">
                                  <p className="font-semibold">{method.label}</p>
                                  <p className="text-sm text-gray-600">{method.time}</p>
                                </div>
                              </div>
                              <p className="font-bold">{method.price === 0 ? 'FREE' : `$${method.price}`}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">Delivery Address</h3>
                      <button
                        onClick={() => {
                          setShowAddressForm(true)
                          setEditingAddressId(null)
                        }}
                        className="text-brand-cyan hover:text-brand-blue font-semibold text-sm flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add New Address
                      </button>
                    </div>

                    {showAddressForm ? (
                      <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={newAddress.name}
                            onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={newAddress.phone}
                            onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Street Address"
                          value={newAddress.street}
                          onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="City"
                            value={newAddress.city}
                            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="State/Region"
                            value={newAddress.state}
                            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                        </div>
                        <div className="flex gap-3">
                          <button
                            onClick={saveAddress}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                          >
                            Save Address
                          </button>
                          <button
                            onClick={() => {
                              setShowAddressForm(false)
                              setEditingAddressId(null)
                            }}
                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {addresses.map((address) => (
                          <button
                            key={address.id}
                            onClick={() => setSelectedAddressId(address.id)}
                            className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                              selectedAddressId === address.id
                                ? 'border-brand-cyan bg-brand-cyan/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="font-semibold">{address.name}</p>
                                  {address.isDefault && (
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-semibold">Default</span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600">{address.phone}</p>
                                <p className="text-sm text-gray-600">{address.street}, {address.city}, {address.state}</p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setNewAddress({
                                      name: address.name,
                                      phone: address.phone,
                                      street: address.street,
                                      city: address.city,
                                      state: address.state,
                                      country: address.country,
                                      postalCode: address.postalCode || '',
                                      isDefault: address.isDefault,
                                    })
                                    setEditingAddressId(address.id)
                                    setShowAddressForm(true)
                                  }}
                                  className="p-2 text-gray-400 hover:text-brand-cyan rounded-lg transition-colors"
                                >
                                  <Edit2 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteAddress(address.id)
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Special Instructions</h3>
                    <textarea
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Add any delivery instructions or special requests..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </>
              )}

              {checkoutStep === 'payment' && (
                <>
                  <h2 className="text-3xl font-bold mb-6">Payment Method</h2>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { value: 'card', label: 'Credit Card', icon: CreditCard },
                        { value: 'mobile-money', label: 'Mobile Money', icon: Smartphone },
                        { value: 'paypal', label: 'PayPal', icon: Package },
                      ].map((method) => {
                        const Icon = method.icon
                        return (
                          <button
                            key={method.value}
                            onClick={() => setPaymentMethod(method.value as PaymentMethod)}
                            className={`p-4 rounded-xl border-2 transition-all ${
                              paymentMethod === method.value
                                ? 'border-brand-cyan bg-brand-cyan/5'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mx-auto mb-2 text-brand-cyan" />
                            <p className="text-sm font-semibold text-center">{method.label}</p>
                          </button>
                        )
                      })}
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Card Number"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Cardholder Name"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'mobile-money' && (
                      <div className="space-y-4">
                        <select
                          value={mobileMoneyDetails.provider}
                          onChange={(e) => setMobileMoneyDetails({ ...mobileMoneyDetails, provider: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        >
                          <option value="mtn">MTN Mobile Money</option>
                          <option value="vodafone">Vodafone Cash</option>
                          <option value="airteltigo">AirtelTigo Money</option>
                        </select>
                        <input
                          type="tel"
                          placeholder="Mobile Money Number"
                          value={mobileMoneyDetails.number}
                          onChange={(e) => setMobileMoneyDetails({ ...mobileMoneyDetails, number: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 mx-auto mb-4 text-brand-cyan" />
                        <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment</p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                          <Lock className="w-4 h-4" />
                          <span>Secure payment via PayPal</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="isGift"
                        checked={isGift}
                        onChange={(e) => setIsGift(e.target.checked)}
                        className="w-5 h-5 text-brand-cyan"
                      />
                      <label htmlFor="isGift" className="flex items-center gap-2 font-semibold cursor-pointer">
                        <Gift className="w-5 h-5 text-brand-cyan" />
                        This is a gift
                      </label>
                    </div>
                    {isGift && (
                      <textarea
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Enter your gift message here..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none resize-none"
                        rows={3}
                      />
                    )}
                  </div>
                </>
              )}

              {checkoutStep === 'review' && (
                <>
                  <h2 className="text-3xl font-bold mb-6">Review Your Order</h2>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-3xl">
                            {item.image}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Delivery Information</h3>
                    {selectedAddressId && addresses.find(a => a.id === selectedAddressId) && (
                      <div className="space-y-2">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-brand-cyan mt-0.5" />
                          <div>
                            <p className="font-semibold">{addresses.find(a => a.id === selectedAddressId)!.name}</p>
                            <p className="text-sm text-gray-600">{addresses.find(a => a.id === selectedAddressId)!.street}</p>
                            <p className="text-sm text-gray-600">
                              {addresses.find(a => a.id === selectedAddressId)!.city}, {addresses.find(a => a.id === selectedAddressId)!.state}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                          <Clock className="w-5 h-5 text-brand-cyan" />
                          <p className="text-sm text-gray-600">
                            Estimated delivery: <span className="font-semibold">{estimatedDelivery.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                    <div className="flex items-center gap-3">
                      {paymentMethod === 'card' && <CreditCard className="w-5 h-5 text-brand-cyan" />}
                      {paymentMethod === 'mobile-money' && <Smartphone className="w-5 h-5 text-brand-cyan" />}
                      {paymentMethod === 'paypal' && <Package className="w-5 h-5 text-brand-cyan" />}
                      <p className="font-semibold capitalize">{paymentMethod.replace('-', ' ')}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                {checkoutStep === 'cart' && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">Have a coupon?</label>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-2 text-green-600">
                          <Check className="w-4 h-4" />
                          <span className="text-sm font-semibold">{appliedCoupon}</span>
                        </div>
                        <button
                          onClick={removeCoupon}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code"
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                        <button
                          onClick={applyCoupon}
                          className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span className="font-semibold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-green-600">FREE</span>
                    ) : (
                      <span className="font-semibold">${shipping.toFixed(2)}</span>
                    )}
                  </div>
                  {shipping > 0 && subtotal > 100 === false && checkoutStep === 'cart' && (
                    <p className="text-xs text-gray-500">Free shipping on orders over $100</p>
                  )}
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
                    ${total.toFixed(2)}
                  </span>
                </div>

                {checkoutStep === 'review' ? (
                  <button
                    onClick={placeOrder}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Lock className="w-5 h-5" />
                    Place Order
                  </button>
                ) : (
                  <button
                    onClick={proceedToNextStep}
                    className="w-full bg-gradient-to-r from-brand-blue to-brand-cyan text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    {checkoutStep === 'cart' ? 'Proceed to Checkout' : checkoutStep === 'shipping' ? 'Continue to Payment' : 'Review Order'}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span>Secure payment & data protection</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-5 h-5 text-blue-600" />
                    <span>Fast delivery & tracking</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <RotateCw className="w-5 h-5 text-purple-600" />
                    <span>30-day return policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
