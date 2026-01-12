import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { contactSchema } from '@/lib/validation'
import { strictRateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  try {
    // Apply strict rate limiting for contact form
    const rateLimitResult = await strictRateLimit(request)
    if (rateLimitResult) return rateLimitResult

    const body = await request.json()

    // Validate input with Zod
    const validation = contactSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.errors },
        { status: 400 }
      )
    }

    const { name, email, phone, subject, message } = validation.data

    // Save contact message
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
      },
    })

    // TODO: Send email notification to admin

    return NextResponse.json(
      { message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
