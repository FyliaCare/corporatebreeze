import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords
  const hashedAdminPassword = await bcrypt.hash('Admin123!', 10)
  const hashedUserPassword = await bcrypt.hash('User123!', 10)

  // Create Admin User
  const admin = await prisma.user.upsert({
    where: { email: 'admin@corporatebreeze.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@corporatebreeze.com',
      password: hashedAdminPassword,
      phone: '+1 555 123 4567',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created admin user:', admin.email)

  // Create Test Client User
  const client = await prisma.user.upsert({
    where: { email: 'client@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'client@example.com',
      password: hashedUserPassword,
      phone: '+1 555 987 6543',
      role: 'USER',
    },
  })

  console.log('✅ Created client user:', client.email)

  // Create Sample Categories
  const categories = [
    { name: 'Business Cards', slug: 'business-cards', description: 'Professional business cards' },
    { name: 'Apparel', slug: 'apparel', description: 'Branded clothing and merchandise' },
    { name: 'Stationery', slug: 'stationery', description: 'Office supplies and stationery' },
    { name: 'Signage', slug: 'signage', description: 'Signs and displays' },
    { name: 'Promotional Items', slug: 'promotional-items', description: 'Promotional products' },
    { name: 'Marketing Materials', slug: 'marketing-materials', description: 'Brochures, flyers, and more' },
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    })
  }

  console.log('✅ Created categories')

  // Create Sample Products
  const businessCardsCategory = await prisma.category.findUnique({
    where: { slug: 'business-cards' },
  })

  const apparelCategory = await prisma.category.findUnique({
    where: { slug: 'apparel' },
  })

  const stationeryCategory = await prisma.category.findUnique({
    where: { slug: 'stationery' },
  })

  if (businessCardsCategory) {
    await prisma.product.upsert({
      where: { slug: 'premium-business-cards' },
      update: {},
      create: {
        name: 'Premium Business Cards',
        slug: 'premium-business-cards',
        description: 'High-quality business cards with premium finish. 500 cards per order.',
        price: 45.00,
        compareAt: 60.00,
        stock: 100,
        categoryId: businessCardsCategory.id,
        featured: true,
        published: true,
      },
    })
  }

  if (apparelCategory) {
    await prisma.product.upsert({
      where: { slug: 'branded-t-shirts' },
      update: {},
      create: {
        name: 'Branded T-Shirts',
        slug: 'branded-t-shirts',
        description: 'Custom printed t-shirts with your logo. 100% cotton, various sizes.',
        price: 25.00,
        stock: 200,
        categoryId: apparelCategory.id,
        featured: true,
        published: true,
      },
    })
  }

  if (stationeryCategory) {
    await prisma.product.upsert({
      where: { slug: 'corporate-notebooks' },
      update: {},
      create: {
        name: 'Corporate Notebooks',
        slug: 'corporate-notebooks',
        description: 'Premium branded notebooks with custom cover design.',
        price: 15.00,
        stock: 150,
        categoryId: stationeryCategory.id,
        featured: false,
        published: true,
      },
    })
  }

  console.log('✅ Created sample products')

  // Create Sample Services
  const services = [
    {
      name: 'Printing Services',
      slug: 'printing',
      description: 'Professional printing for all your business needs',
      published: true,
    },
    {
      name: 'Branding & Identity',
      slug: 'branding',
      description: 'Complete brand identity development',
      published: true,
    },
    {
      name: 'Graphic Design',
      slug: 'graphic-design',
      description: 'Creative graphic design services',
      published: true,
    },
  ]

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: service,
    })
  }

  console.log('✅ Created services')

  // Create Sample Order for Client
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-' + Date.now(),
      userId: client.id,
      status: 'DELIVERED',
      subtotal: 70.00,
      tax: 5.60,
      shipping: 10.00,
      total: 85.60,
      paymentStatus: 'paid',
      shippingAddress: '123 Main St, Toronto, ON M5V 1A1, Canada',
      orderItems: {
        create: [
          {
            productId: (await prisma.product.findUnique({ where: { slug: 'premium-business-cards' } }))?.id || '',
            name: 'Premium Business Cards',
            price: 45.00,
            quantity: 1,
          },
          {
            productId: (await prisma.product.findUnique({ where: { slug: 'branded-t-shirts' } }))?.id || '',
            name: 'Branded T-Shirts',
            price: 25.00,
            quantity: 1,
          },
        ],
      },
    },
  })

  console.log('✅ Created sample order')

  console.log('\n🎉 Database seeding completed!')
  console.log('\n📋 Test Credentials:')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  console.log('👤 Admin User:')
  console.log('   Email: admin@corporatebreeze.com')
  console.log('   Password: Admin123!')
  console.log('\n👤 Client User:')
  console.log('   Email: client@example.com')
  console.log('   Password: User123!')
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })
