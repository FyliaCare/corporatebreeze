import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting store (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

interface RateLimitConfig {
  windowMs?: number // Time window in milliseconds
  max?: number // Max requests per window
}

export function rateLimit(config: RateLimitConfig = {}) {
  const windowMs = config.windowMs || 60000 // Default: 1 minute
  const max = config.max || 100 // Default: 100 requests per minute

  return async (req: NextRequest) => {
    // Get client identifier (IP address or user ID)
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : req.ip || 'unknown'
    
    const now = Date.now()
    const identifier = `${ip}-${req.nextUrl.pathname}`
    
    // Get or create rate limit entry
    let limitData = rateLimitMap.get(identifier)
    
    if (!limitData || now > limitData.resetTime) {
      // Create new window
      limitData = {
        count: 1,
        resetTime: now + windowMs,
      }
      rateLimitMap.set(identifier, limitData)
    } else {
      // Increment count
      limitData.count++
    }
    
    // Clean up old entries periodically
    if (Math.random() < 0.01) {
      for (const [key, value] of rateLimitMap.entries()) {
        if (now > value.resetTime) {
          rateLimitMap.delete(key)
        }
      }
    }
    
    // Check if limit exceeded
    if (limitData.count > max) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { 
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil((limitData.resetTime - now) / 1000)),
          },
        }
      )
    }
    
    return null // Allow request
  }
}

// Specific rate limits for different endpoints
export const authRateLimit = rateLimit({ windowMs: 15 * 60 * 1000, max: 5 }) // 5 attempts per 15 minutes
export const apiRateLimit = rateLimit({ windowMs: 60 * 1000, max: 100 }) // 100 requests per minute
export const strictRateLimit = rateLimit({ windowMs: 60 * 1000, max: 10 }) // 10 requests per minute
