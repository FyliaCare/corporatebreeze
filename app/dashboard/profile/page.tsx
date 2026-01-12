'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  User, Mail, Phone, MapPin, CreditCard, Lock, Bell,
  Settings, Save, Edit2, Camera, Trash2, Plus, Check,
  Eye, EyeOff, Shield, LogOut, ChevronRight, Star,
  Package, Heart, Calendar, DollarSign, AlertCircle
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface UserProfile {
  name: string
  email: string
  phone: string
  avatar?: string
}

interface Address {
  id: string
  type: 'shipping' | 'billing'
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  isDefault: boolean
}

interface PaymentMethod {
  id: string
  type: 'card'
  cardNumber: string
  cardHolder: string
  expiryDate: string
  isDefault: boolean
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  
  const [activeTab, setActiveTab] = useState<'profile' | 'addresses' | 'payment' | 'security' | 'preferences'>('profile')
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: ''
  })
  const [addresses, setAddresses] = useState<Address[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [showPassword, setShowPassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    } else if (session?.user) {
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        phone: ''
      })
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock addresses
    const mockAddresses: Address[] = [
      {
        id: '1',
        type: 'shipping',
        name: 'John Doe',
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA',
        isDefault: true
      }
    ]
    setAddresses(mockAddresses)

    // Mock payment methods
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: '1',
        type: 'card',
        cardNumber: '**** **** **** 4242',
        cardHolder: 'John Doe',
        expiryDate: '12/25',
        isDefault: true
      }
    ]
    setPaymentMethods(mockPaymentMethods)
  }, [])

  const updateProfile = () => {
    toast.success('Profile updated successfully!')
  }

  const changePassword = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error('Passwords do not match')
      return
    }
    if (passwordData.new.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    toast.success('Password changed successfully!')
    setPasswordData({ current: '', new: '', confirm: '' })
  }

  const deleteAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
    toast.success('Address deleted')
  }

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id))
    toast.success('Payment method removed')
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5 text-brand-cyan" />
              <span className="font-semibold text-gray-900">Account Settings</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
              {/* Profile Preview */}
              <div className="text-center mb-6 pb-6 border-b border-gray-200">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-brand-cyan transition-colors">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <h3 className="font-bold text-lg text-gray-900">{session.user?.name}</h3>
                <p className="text-sm text-gray-600">{session.user?.email}</p>
                <div className="mt-3 inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                  <Check className="w-3 h-3" />
                  Verified
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Info
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === 'addresses' 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('payment')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === 'payment' 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  Payment
                </button>
                <button
                  onClick={() => setActiveTab('security')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === 'security' 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  Security
                </button>
                <button
                  onClick={() => setActiveTab('preferences')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors ${
                    activeTab === 'preferences' 
                      ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  Preferences
                </button>
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/api/auth/signout"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={updateProfile}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Account Stats */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-lg mb-4">Account Overview</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                      <Package className="w-8 h-8 text-brand-blue mb-2" />
                      <p className="text-2xl font-bold text-gray-900">12</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                      <Heart className="w-8 h-8 text-purple-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-sm text-gray-600">Saved Designs</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4">
                      <DollarSign className="w-8 h-8 text-green-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">$1,245</p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
                      <Calendar className="w-8 h-8 text-orange-600 mb-2" />
                      <p className="text-2xl font-bold text-gray-900">6m</p>
                      <p className="text-sm text-gray-600">Member Since</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Saved Addresses</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      <Plus className="w-5 h-5" />
                      Add Address
                    </button>
                  </div>

                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div key={address.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-brand-cyan transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-bold text-lg">{address.name}</h3>
                              {address.isDefault && (
                                <span className="px-2 py-1 bg-brand-cyan/10 text-brand-cyan text-xs rounded-full font-semibold">
                                  Default
                                </span>
                              )}
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-semibold capitalize">
                                {address.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:text-brand-cyan hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteAddress(address.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600">{address.street}</p>
                        <p className="text-gray-600">{address.city}, {address.state} {address.zip}</p>
                        <p className="text-gray-600">{address.country}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Payment Tab */}
            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Payment Methods</h2>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      <Plus className="w-5 h-5" />
                      Add Card
                    </button>
                  </div>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="p-6 border-2 border-gray-200 rounded-xl hover:border-brand-cyan transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-bold text-lg">{method.cardNumber}</p>
                                {method.isDefault && (
                                  <span className="px-2 py-1 bg-brand-cyan/10 text-brand-cyan text-xs rounded-full font-semibold">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{method.cardHolder}</p>
                              <p className="text-sm text-gray-600">Expires {method.expiryDate}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:text-brand-cyan hover:bg-gray-100 rounded-lg transition-colors">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePaymentMethod(method.id)}
                              className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.current}
                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={changePassword}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-bold hover:shadow-xl transition-all"
                    >
                      <Shield className="w-5 h-5" />
                      Change Password
                    </button>
                  </div>

                  {/* Security Tips */}
                  <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-bold text-blue-900 mb-2">Password Security Tips</h3>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Use at least 8 characters</li>
                          <li>• Include uppercase and lowercase letters</li>
                          <li>• Add numbers and special characters</li>
                          <li>• Don't reuse passwords from other sites</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold mb-6">Notification Preferences</h2>
                
                <div className="space-y-6">
                  {[
                    { title: 'Order Updates', description: 'Get notified about your order status changes' },
                    { title: 'Promotional Emails', description: 'Receive special offers and discounts' },
                    { title: 'Product Recommendations', description: 'Get personalized product suggestions' },
                    { title: 'Newsletter', description: 'Weekly updates about new products and features' },
                    { title: 'SMS Notifications', description: 'Receive text messages for important updates' }
                  ].map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-gray-900">{pref.title}</h3>
                        <p className="text-sm text-gray-600">{pref.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={index === 0} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-cyan/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-cyan"></div>
                      </label>
                    </div>
                  ))}

                  <div className="flex gap-4 pt-4">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl font-bold hover:shadow-xl transition-all">
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
