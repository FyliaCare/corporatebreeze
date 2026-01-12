import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const [
      totalOrders,
      totalUsers,
      totalProducts,
      pendingOrders,
      serviceRequests,
      orders
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count(),
      prisma.product.count(),
      prisma.order.count({ where: { status: 'PENDING' } }),
      prisma.serviceRequest.count({ where: { status: 'PENDING' } }),
      prisma.order.findMany({
        select: { total: true }
      })
    ])

    const totalRevenue = orders.reduce((sum: number, order: { total: number }) => sum + order.total, 0)

    return NextResponse.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      pendingOrders,
      serviceRequests,
    })
  } catch (error) {
    console.error('Stats fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
