import { z } from 'zod'

// User Validation Schemas
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Product Validation
export const productSchema = z.object({
  name: z.string().min(1).max(200),
  description: z.string().min(1).max(2000),
  price: z.number().positive(),
  compareAt: z.number().positive().optional(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().cuid(),
  images: z.string().optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
})

// Cart Validation
export const addToCartSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive().max(100),
})

export const updateCartSchema = z.object({
  cartItemId: z.string().cuid(),
  quantity: z.number().int().nonnegative().max(100),
})

// Address Validation
export const addressSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(10).max(20),
  street: z.string().min(5).max(200),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  country: z.string().min(2).max(100),
  postalCode: z.string().max(20).optional(),
  isDefault: z.boolean().default(false),
})

// Order Validation
export const createOrderSchema = z.object({
  subtotal: z.number().positive(),
  tax: z.number().nonnegative(),
  shipping: z.number().nonnegative(),
  total: z.number().positive(),
  shippingAddress: z.string(),
  billingAddress: z.string().optional(),
  notes: z.string().max(500).optional(),
  items: z.array(z.object({
    productId: z.string().cuid(),
    name: z.string(),
    price: z.number().positive(),
    quantity: z.number().int().positive(),
    image: z.string().optional(),
  })).min(1),
})

// Contact Validation
export const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(10).max(20).optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(2000),
})

// Service Request Validation
export const serviceRequestSchema = z.object({
  serviceId: z.string().cuid(),
  title: z.string().min(5).max(200),
  description: z.string().min(20).max(2000),
  budget: z.number().positive().optional(),
  attachments: z.string().optional(),
})

// Input Sanitization Helper
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove HTML tags
    .substring(0, 10000) // Limit length
}

// Validate and sanitize email
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim()
}

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type ProductInput = z.infer<typeof productSchema>
export type AddToCartInput = z.infer<typeof addToCartSchema>
export type UpdateCartInput = z.infer<typeof updateCartSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type CreateOrderInput = z.infer<typeof createOrderSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>
