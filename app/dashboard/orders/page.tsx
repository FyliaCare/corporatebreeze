'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Package, Search, Filter, Download, Eye, RotateCw, LayoutDashboard,
  Clock, CheckCircle2, XCircle, Truck, AlertCircle, ShoppingCart,
  ChevronRight, Calendar, CreditCard, MapPin, FileText, Bell,
  ShoppingBag, Star, MessageSquare, ChevronDown, ChevronUp, MoreVertical,
  Palette, User, Settings, TrendingUp, TrendingDown, DollarSign, Box
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  image: string
  category: string
}

interface Order {
  id: string
  orderNumber: string
  date: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  trackingNumber?: string
  estimatedDelivery?: string
  paymentMethod: string
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [dateRange, setDateRange] = useState<string>('all')
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    activeOrders: 0,
    completedOrders: 0,
    cartItems: 0,
    activeProjects: 3
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock orders data with more variety
    const mockOrders: Order[] = [
      {
        id: '1',
        orderNumber: 'ORD-2026-001',
        date: '2026-01-08',
        status: 'delivered',
        items: [
          { id: '1', name: 'Premium Business Cards', quantity: 2, price: 45.00, image: '💼', category: 'Printing' },
          { id: '2', name: 'Corporate Notebooks', quantity: 5, price: 15.00, image: '📓', category: 'Office' }
        ],
        subtotal: 165.00,
        tax: 16.50,
        shipping: 0,
        total: 181.50,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        trackingNumber: 'TRK123456789',
        estimatedDelivery: '2026-01-10',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: '2',
        orderNumber: 'ORD-2026-002',
        date: '2026-01-05',
        status: 'shipped',
        items: [
          { id: '3', name: 'Corporate T-Shirts', quantity: 10, price: 25.00, image: '👕', category: 'Apparel' }
        ],
        subtotal: 250.00,
        tax: 25.00,
        shipping: 0,
        total: 275.00,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        trackingNumber: 'TRK987654321',
        estimatedDelivery: '2026-01-12',
        paymentMethod: 'Mastercard •••• 8888'
      },
      {
        id: '3',
        orderNumber: 'ORD-2026-003',
        date: '2026-01-03',
        status: 'processing',
        items: [
          { id: '4', name: 'Marketing Flyers', quantity: 1, price: 135.00, image: '📄', category: 'Printing' }
        ],
        subtotal: 135.00,
        tax: 13.50,
        shipping: 15.00,
        total: 163.50,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        estimatedDelivery: '2026-01-15',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: '4',
        orderNumber: 'ORD-2025-125',
        date: '2025-12-20',
        status: 'delivered',
        items: [
          { id: '5', name: 'Corporate Branding Package', quantity: 1, price: 850.00, image: '🎨', category: 'Design' },
          { id: '6', name: 'Logo Design Premium', quantity: 1, price: 450.00, image: '✨', category: 'Design' }
        ],
        subtotal: 1300.00,
        tax: 130.00,
        shipping: 0,
        total: 1430.00,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        trackingNumber: 'TRK555777999',
        estimatedDelivery: '2025-12-25',
        paymentMethod: 'Amex •••• 1234'
      },
      {
        id: '5',
        orderNumber: 'ORD-2025-118',
        date: '2025-12-15',
        status: 'delivered',
        items: [
          { id: '7', name: 'Professional Banners', quantity: 3, price: 75.00, image: '🎪', category: 'Printing' }
        ],
        subtotal: 225.00,
        tax: 22.50,
        shipping: 25.00,
        total: 272.50,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        trackingNumber: 'TRK222444666',
        estimatedDelivery: '2025-12-18',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: '6',
        orderNumber: 'ORD-2025-092',
        date: '2025-11-28',
        status: 'cancelled',
        items: [
          { id: '8', name: 'Custom Mugs', quantity: 20, price: 12.00, image: '☕', category: 'Merchandise' }
        ],
        subtotal: 240.00,
        tax: 24.00,
        shipping: 15.00,
        total: 279.00,
        shippingAddress: {
          name: 'John Doe',
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        },
        paymentMethod: 'Visa •••• 4242'
      }
    ]
    setOrders(mockOrders)

    // Calculate stats
    const totalSpent = mockOrders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.total, 0)
    const activeOrders = mockOrders.filter(o => ['pending', 'processing', 'shipped'].includes(o.status)).length
    const completedOrders = mockOrders.filter(o => o.status === 'delivered').length

    setStats({
      totalOrders: mockOrders.length,
      totalSpent,
      activeOrders,
      completedOrders,
      cartItems: 0,
      activeProjects: 3
    })
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus
    
    let matchesDate = true
    if (dateRange !== 'all') {
      const orderDate = new Date(order.date)
      const today = new Date()
      const daysAgo = parseInt(dateRange)
      const rangeDate = new Date(today.setDate(today.getDate() - daysAgo))
      matchesDate = orderDate >= rangeDate
    }
    
    return matchesSearch && matchesStatus && matchesDate
  })

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'shipped':
        return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'pending':
        return 'bg-orange-100 text-orange-700 border-orange-200'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200'
    }
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle2 className="w-4 h-4" />
      case 'shipped':
        return <Truck className="w-4 h-4" />
      case 'processing':
        return <Clock className="w-4 h-4" />
      case 'pending':
        return <AlertCircle className="w-4 h-4" />
      case 'cancelled':
        return <XCircle className="w-4 h-4" />
    }
  }

  const reorderItems = (orderId: string) => {
    toast.success('Items added to cart!', { icon: '🛒' })
  }

  const downloadInvoice = (orderNumber: string) => {
    toast.success('Downloading invoice...', { icon: '📥' })
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading orders...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Sidebar Navigation */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200 fixed left-0 top-0 h-screen z-40">
        {/* Logo */}
        <div className="p-6 border-b border-slate-200">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">CB</span>
              </div>
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Corporate Breeze
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </Link>
            
            <Link 
              href="/dashboard/shop" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Shop</span>
            </Link>
            
            <Link 
              href="/dashboard/orders" 
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl font-medium transition-all"
            >
              <Package className="w-5 h-5" />
              <span>Orders</span>
              {stats.activeOrders > 0 && (
                <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.activeOrders}
                </span>
              )}
            </Link>
            
            <Link 
              href="/dashboard/designer" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Palette className="w-5 h-5" />
              <span>Designer</span>
              <span className="ml-auto bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                New
              </span>
            </Link>
            
            <Link 
              href="/dashboard/cart" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {stats.cartItems > 0 && (
                <span className="ml-auto bg-slate-900 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {stats.cartItems}
                </span>
              )}
            </Link>
            
            <Link 
              href="/dashboard/chat" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Support</span>
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 space-y-1">
            <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Account</p>
            
            <Link 
              href="/dashboard/profile" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            
            <Link 
              href="/dashboard/billing" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <CreditCard className="w-5 h-5" />
              <span>Billing</span>
            </Link>
            
            <Link 
              href="/dashboard/settings" 
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-semibold ring-2 ring-white shadow-sm">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
            </div>
            <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 fixed top-0 right-0 left-0 lg:left-64 z-30">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Order History</h1>
                <p className="text-sm text-slate-500">{filteredOrders.length} orders found</p>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2.5 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <Link href="/dashboard/cart" className="flex items-center gap-3 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-semibold">Cart</span>
                  {stats.cartItems > 0 && (
                    <span className="bg-white text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full">{stats.cartItems}</span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 lg:px-8 py-8 pt-24">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Orders</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.totalOrders}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">12% vs last month</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
                  <Box className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Total Spent</p>
                  <p className="text-3xl font-bold text-slate-900">${stats.totalSpent.toLocaleString()}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">8% increase</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.activeOrders}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-semibold text-orange-600">In progress</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl">
                  <Truck className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">Completed</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.completedOrders}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Delivered</span>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                  <CheckCircle2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by order number or product name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              {/* Date Range Filter */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 3 months</option>
                <option value="365">Last year</option>
              </select>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">No orders found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or start shopping</p>
              <Link href="/dashboard/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold">
                <ShoppingBag className="w-5 h-5" />
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Order Header */}
                  <div 
                    className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl">
                          <Package className="w-6 h-6 text-slate-600" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-lg font-bold text-slate-900">{order.orderNumber}</h3>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 mb-2">
                            Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </p>
                          <p className="text-sm font-medium text-slate-700">
                            {order.items.length} {order.items.length === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {order.trackingNumber && (
                          <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold text-sm">
                            <Truck className="w-4 h-4" />
                            Track Order
                          </button>
                        )}
                        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold text-sm">
                          <Download className="w-4 h-4" />
                          Invoice
                        </button>
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order.id && (
                    <div className="border-t border-slate-200 bg-slate-50 p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        {/* Order Items */}
                        <div className="lg:col-span-2 space-y-4">
                          <h4 className="font-semibold text-slate-900 mb-4">Order Items</h4>
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200">
                              <div className="w-16 h-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg flex items-center justify-center text-3xl">
                                {item.image}
                              </div>
                              <div className="flex-1">
                                <h5 className="font-semibold text-slate-900">{item.name}</h5>
                                <p className="text-sm text-slate-500">{item.category}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                                <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}

                          {/* Order Summary */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Subtotal</span>
                                <span className="font-medium text-slate-900">${order.subtotal.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Tax</span>
                                <span className="font-medium text-slate-900">${order.tax.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Shipping</span>
                                <span className="font-medium text-slate-900">
                                  {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
                                </span>
                              </div>
                              <div className="pt-2 border-t border-slate-200 flex justify-between">
                                <span className="font-semibold text-slate-900">Total</span>
                                <span className="font-bold text-lg text-slate-900">${order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Order Details Sidebar */}
                        <div className="space-y-4">
                          {/* Shipping Address */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                              <MapPin className="w-4 h-4 text-slate-600" />
                              <h5 className="font-semibold text-slate-900">Shipping Address</h5>
                            </div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              {order.shippingAddress.name}<br />
                              {order.shippingAddress.street}<br />
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                              {order.shippingAddress.country}
                            </p>
                          </div>

                          {/* Payment Method */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <div className="flex items-center gap-2 mb-3">
                              <CreditCard className="w-4 h-4 text-slate-600" />
                              <h5 className="font-semibold text-slate-900">Payment Method</h5>
                            </div>
                            <p className="text-sm text-slate-700">{order.paymentMethod}</p>
                          </div>

                          {/* Tracking */}
                          {order.trackingNumber && (
                            <div className="bg-white p-4 rounded-xl border border-slate-200">
                              <div className="flex items-center gap-2 mb-3">
                                <Truck className="w-4 h-4 text-slate-600" />
                                <h5 className="font-semibold text-slate-900">Tracking</h5>
                              </div>
                              <p className="text-sm font-mono text-slate-700 mb-2">{order.trackingNumber}</p>
                              {order.estimatedDelivery && (
                                <p className="text-xs text-slate-500">
                                  Est. delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          )}

                          {/* Order Timeline */}
                          <div className="bg-white p-4 rounded-xl border border-slate-200">
                            <h5 className="font-semibold text-slate-900 mb-4">Order Status</h5>
                            <div className="space-y-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">Order Placed</p>
                                  <p className="text-xs text-slate-600">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                              </div>

                              <div className={`flex items-start gap-3 ${['processing', 'shipped', 'delivered'].includes(order.status) ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  ['processing', 'shipped', 'delivered'].includes(order.status)
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}>
                                  <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">Processing</p>
                                  <p className="text-xs text-slate-600">Order being prepared</p>
                                </div>
                              </div>

                              <div className={`flex items-start gap-3 ${['shipped', 'delivered'].includes(order.status) ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  ['shipped', 'delivered'].includes(order.status)
                                    ? 'bg-orange-500 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}>
                                  <Truck className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">Shipped</p>
                                  <p className="text-xs text-slate-600">Package in transit</p>
                                </div>
                              </div>

                              <div className={`flex items-start gap-3 ${order.status === 'delivered' ? 'opacity-100' : 'opacity-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  order.status === 'delivered'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-slate-200 text-slate-500'
                                }`}>
                                  <Package className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 text-sm">Delivered</p>
                                  <p className="text-xs text-slate-600">
                                    {order.status === 'delivered' 
                                      ? 'Package delivered' 
                                      : order.estimatedDelivery 
                                        ? `Est. ${new Date(order.estimatedDelivery).toLocaleDateString()}` 
                                        : 'Pending'}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-2">
                            <button 
                              onClick={() => reorderItems(order.id)}
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-semibold"
                            >
                              <RotateCw className="w-4 h-4" />
                              Reorder
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-semibold">
                              <MessageSquare className="w-4 h-4" />
                              Contact Support
                            </button>
                            {order.status === 'delivered' && (
                              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold">
                                <Star className="w-4 h-4" />
                                Leave Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
