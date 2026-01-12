'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { 
  ShoppingBag, ShoppingCart, Package, MessageSquare, Clock, CheckCircle2,
  Palette, Bell, ChevronRight, ArrowUpRight, TrendingUp, DollarSign,
  Users, Activity, Calendar, Download, Filter, Search, MoreVertical,
  Star, Eye, Zap, Award, Target, BarChart3, PieChart, ArrowDown, ArrowUp,
  LayoutDashboard, Settings, LogOut, User, Heart, CreditCard, HelpCircle
} from 'lucide-react'

export default function ClientDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalOrders: 12,
    activeProjects: 3,
    cartItems: 0,
    savedDesigns: 5,
    totalSpent: 2847.50,
    pendingOrders: 2,
    completedOrders: 10
  })
  
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-slate-600 font-medium">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  const quickActions = [
    {
      title: 'Browse Catalog',
      description: 'Explore 500+ products',
      href: '/dashboard/shop',
      icon: ShoppingBag,
      color: 'blue',
      stats: '500+ items'
    },
    {
      title: 'Design Studio',
      description: 'AI-powered mockup creator',
      href: '/dashboard/designer',
      icon: Palette,
      color: 'purple',
      stats: 'New feature'
    },
    {
      title: 'Order Tracking',
      description: 'Track your shipments',
      href: '/dashboard/orders',
      icon: Package,
      color: 'green',
      stats: `${stats.activeProjects} active`
    },
    {
      title: 'Live Support',
      description: 'Chat with our team',
      href: '/dashboard/chat',
      icon: MessageSquare,
      color: 'orange',
      stats: 'Avg 2min response'
    }
  ]

  const recentOrders = [
    { 
      id: 'ORD-2847', 
      name: 'Premium Business Cards', 
      date: '2 hours ago', 
      status: 'Processing', 
      amount: 145.00,
      quantity: 500,
      image: '💼'
    },
    { 
      id: 'ORD-2846', 
      name: 'Corporate T-Shirts', 
      date: '1 day ago', 
      status: 'Shipped', 
      amount: 425.00,
      quantity: 50,
      image: '👕'
    },
    { 
      id: 'ORD-2845', 
      name: 'Marketing Brochures', 
      date: '3 days ago', 
      status: 'Delivered', 
      amount: 235.00,
      quantity: 200,
      image: '📄'
    },
    { 
      id: 'ORD-2844', 
      name: 'Custom Banners', 
      date: '1 week ago', 
      status: 'Delivered', 
      amount: 385.00,
      quantity: 3,
      image: '🎯'
    }
  ]

  const activityData = [
    { month: 'Jan', orders: 4, spent: 580 },
    { month: 'Feb', orders: 6, spent: 920 },
    { month: 'Mar', orders: 3, spent: 445 },
    { month: 'Apr', orders: 8, spent: 1240 },
    { month: 'May', orders: 5, spent: 765 },
    { month: 'Jun', orders: 7, spent: 1180 }
  ]

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
              className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 rounded-xl font-medium transition-all"
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
              className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-xl font-medium transition-all"
            >
              <Package className="w-5 h-5" />
              <span>Orders</span>
              <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {stats.activeProjects}
              </span>
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
        {/* Top Header */}
        <header className="fixed top-0 right-0 left-0 lg:left-64 z-30 bg-white border-b border-slate-200 shadow-sm">
          <div className="px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-3 bg-slate-50 rounded-lg px-4 py-2 border border-slate-200 flex-1 max-w-xl">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search orders, products..." 
                    className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder-slate-400 w-full"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="relative p-2.5 hover:bg-slate-100 rounded-lg transition-colors group">
                  <Bell className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>
                
                <Link href="/dashboard/cart" className="relative p-2.5 hover:bg-slate-100 rounded-lg transition-colors group">
                  <ShoppingCart className="w-5 h-5 text-slate-600 group-hover:text-slate-900" />
                  {stats.cartItems > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {stats.cartItems}
                    </span>
                  )}
                </Link>

                <div className="h-8 w-px bg-slate-200"></div>

                <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="hidden xl:block">Premium</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="pt-16 px-6 lg:px-8 py-8">
          {/* Welcome Section with Period Selector */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Welcome back, {session.user?.name?.split(' ')[0]}
              </h1>
              <p className="text-slate-600 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Last login: Today at {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          
            <div className="mt-4 md:mt-0 flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
              <button 
                onClick={() => setSelectedPeriod('7d')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedPeriod === '7d' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                7 Days
              </button>
              <button 
                onClick={() => setSelectedPeriod('30d')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedPeriod === '30d' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                30 Days
              </button>
              <button 
                onClick={() => setSelectedPeriod('90d')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${selectedPeriod === '90d' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
              >
                90 Days
              </button>
            </div>
            <button className="p-2.5 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
              <Download className="w-5 h-5 text-slate-600" />
            </button>
          </div>
        </div>

        {/* Advanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Spent */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <ArrowUp className="w-3 h-3" />
                  12.5%
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Spent</p>
              <p className="text-3xl font-bold text-slate-900">${stats.totalSpent.toLocaleString()}</p>
              <p className="text-xs text-slate-500 mt-2">Last 30 days</p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                  <ArrowUp className="w-3 h-3" />
                  8.2%
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-slate-900">{stats.totalOrders}</p>
              <p className="text-xs text-slate-500 mt-2">{stats.completedOrders} completed</p>
            </div>
          </div>

          {/* Active Projects */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                  <Activity className="w-3 h-3" />
                  Live
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Active Projects</p>
              <p className="text-3xl font-bold text-slate-900">{stats.activeProjects}</p>
              <p className="text-xs text-slate-500 mt-2">{stats.pendingOrders} pending orders</p>
            </div>
          </div>

          {/* Saved Designs */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <div className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <button className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-400" />
                </button>
              </div>
              <p className="text-sm font-medium text-slate-600 mb-1">Saved Designs</p>
              <p className="text-3xl font-bold text-slate-900">{stats.savedDesigns}</p>
              <p className="text-xs text-slate-500 mt-2">Design library</p>
            </div>
          </div>
        </div>

        {/* Activity Chart & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Activity Overview</h2>
                <p className="text-sm text-slate-500">Your ordering trends over time</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-slate-600" />
                </button>
                <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
            
            <div className="flex items-end gap-2 h-48">
              {activityData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col gap-1">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group"
                      style={{ height: `${(data.orders / 8) * 100}%`, minHeight: '8px' }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {data.orders} orders
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-slate-600">{data.month}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Orders Placed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Amount Spent</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Quick Actions</h2>
            <div className="space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="group block p-4 bg-gradient-to-br from-slate-50 to-white hover:from-white hover:to-slate-50 border border-slate-200 rounded-xl transition-all hover:shadow-md hover:border-slate-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 bg-gradient-to-br ${
                      action.color === 'blue' ? 'from-blue-500 to-cyan-500' :
                      action.color === 'purple' ? 'from-purple-500 to-pink-500' :
                      action.color === 'green' ? 'from-emerald-500 to-teal-500' :
                      'from-orange-500 to-red-500'
                    } rounded-lg`}>
                      <action.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-slate-900 text-sm">{action.title}</h3>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 mb-2">{action.description}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                        {action.stats}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders & Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Recent Orders</h2>
                  <p className="text-sm text-slate-500">Track your latest transactions</p>
                </div>
                <Link href="/dashboard/orders" className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View all
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-slate-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-50 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                      {order.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-slate-900 text-sm">{order.name}</h3>
                          <p className="text-xs text-slate-500">{order.id} • {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900">${order.amount.toFixed(2)}</p>
                          <p className="text-xs text-slate-500">{order.quantity} items</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-50 text-green-700' :
                          order.status === 'Shipped' ? 'bg-blue-50 text-blue-700' :
                          'bg-orange-50 text-orange-700'
                        }`}>
                          {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3" />}
                          {order.status === 'Shipped' && <Package className="w-3 h-3" />}
                          {order.status === 'Processing' && <Clock className="w-3 h-3" />}
                          {order.status}
                        </span>
                        <button className="text-xs text-slate-500 hover:text-slate-700 font-medium">Track Order</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Performance</h2>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Order Success Rate</span>
                  <span className="text-sm font-bold text-slate-900">98.5%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '98.5%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Avg. Delivery Time</span>
                  <span className="text-sm font-bold text-slate-900">3.2 days</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-600">Customer Satisfaction</span>
                  <span className="text-sm font-bold text-slate-900">4.9/5</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Premium Member</p>
                    <p className="text-xs text-slate-600">Since January 2026</p>
                  </div>
                </div>
              </div>

              <Link href="/dashboard/designer" className="block w-full p-4 bg-gradient-to-r from-slate-900 to-slate-700 text-white text-center text-sm font-semibold rounded-xl hover:shadow-lg transition-all group">
                <span className="flex items-center justify-center gap-2">
                  <Palette className="w-4 h-4" />
                  Launch Designer Studio
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
