import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
    const isAdminLogin = req.nextUrl.pathname === '/admin/login'

    // Protect admin routes
    if (isAdminRoute && !isAdminLogin) {
      if (!token || token.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    // Redirect admins away from regular login
    if (req.nextUrl.pathname === '/auth/login' && token?.role === 'ADMIN') {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Protect client dashboard routes
    if (req.nextUrl.pathname.startsWith('/dashboard')) {
      if (!token) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
      }
      // Redirect admins to admin portal
      if (token.role === 'ADMIN') {
        return NextResponse.redirect(new URL('/admin', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
        const isAdminLogin = req.nextUrl.pathname === '/admin/login'
        const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard')

        // Allow access to admin login page
        if (isAdminLogin) return true

        // Require authentication for admin and dashboard routes
        if (isAdminRoute || isDashboardRoute) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/auth/login'],
}
