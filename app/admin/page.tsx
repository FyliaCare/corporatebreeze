'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { 
  Shield, Users, ShoppingBag, FileText, Settings, 
  TrendingUp, Activity, Database, LogOut, Menu,
  X, ChevronRight, Package, Briefcase, Image
} from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    } else if (session && session.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [session, status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'from-blue-500 to-cyan-500', trend: '+12%' },
    { label: 'Total Orders', value: '856', icon: ShoppingBag, color: 'from-purple-500 to-pink-500', trend: '+8%' },
    { label: 'Revenue', value: '$45,678', icon: TrendingUp, color: 'from-green-500 to-emerald-500', trend: '+23%' },
    { label: 'Active Services', value: '142', icon: Activity, color: 'from-orange-500 to-red-500', trend: '+5%' },
  ]

  const quickActions = [
    { label: 'Manage Users', icon: Users, href: '/admin/users', color: 'blue' },
    { label: 'Orders', icon: ShoppingBag, href: '/admin/orders', color: 'purple' },
    { label: 'Products', icon: Package, href: '/admin/products', color: 'green' },
    { label: 'Services', icon: Briefcase, href: '/admin/services', color: 'orange' },
    { label: 'Portfolio', icon: Image, href: '/admin/portfolio', color: 'pink' },
    { label: 'Settings', icon: Settings, href: '/admin/settings', color: 'gray' },
  ]

  const recentActivity = [
    { action: 'New order placed', user: 'John Doe', time: '2 minutes ago', type: 'order' },
    { action: 'User registered', user: 'Jane Smith', time: '15 minutes ago', type: 'user' },
    { action: 'Service completed', user: 'Mike Johnson', time: '1 hour ago', type: 'service' },
    { action: 'Product updated', user: 'Admin', time: '2 hours ago', type: 'product' },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Bar */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Admin Portal</h1>
                <p className="text-xs text-gray-400">Corporate Breeze</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-semibold">{session.user?.name}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Logout</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-[73px] lg:top-0 bottom-0 left-0 w-64 bg-gray-800 border-r border-gray-700 transition-transform duration-300 ease-in-out z-30`}>
          <nav className="p-4 space-y-2">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 rounded-lg font-semibold">
              <Activity className="w-5 h-5" />
              Dashboard
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              Users
            </Link>
            <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <ShoppingBag className="w-5 h-5" />
              Orders
            </Link>
            <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Package className="w-5 h-5" />
              Products
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Briefcase className="w-5 h-5" />
              Services
            </Link>
            <Link href="/admin/portfolio" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Image className="w-5 h-5" />
              Portfolio
            </Link>
            <Link href="/admin/reports" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <FileText className="w-5 h-5" />
              Reports
            </Link>
            <Link href="/admin/database" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Database className="w-5 h-5" />
              Database
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
              Settings
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-green-500 text-sm font-semibold">{stat.trend}</span>
                </div>
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl p-4 text-center transition-all hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-${action.color}-500/10 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <action.icon className={`w-6 h-6 text-${action.color}-500`} />
                  </div>
                  <p className="text-sm font-semibold">{action.label}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-750 rounded-lg hover:bg-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full ${
                      activity.type === 'order' ? 'bg-purple-500/10 text-purple-500' :
                      activity.type === 'user' ? 'bg-blue-500/10 text-blue-500' :
                      activity.type === 'service' ? 'bg-green-500/10 text-green-500' :
                      'bg-orange-500/10 text-orange-500'
                    } flex items-center justify-center`}>
                      {activity.type === 'order' && <ShoppingBag className="w-5 h-5" />}
                      {activity.type === 'user' && <Users className="w-5 h-5" />}
                      {activity.type === 'service' && <Briefcase className="w-5 h-5" />}
                      {activity.type === 'product' && <Package className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-semibold">{activity.action}</p>
                      <p className="text-sm text-gray-400">{activity.user}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{activity.time}</span>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
