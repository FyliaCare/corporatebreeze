# Corporate Breeze - Creative Agency Platform

A modern, full-stack e-commerce and service platform built with Next.js 14, featuring a comprehensive shop, service booking, and admin dashboard.

## 🚀 Features

### Customer Features
- **E-Commerce Shop**: Browse and purchase creative products
- **Advanced Cart System**: Multi-step checkout with delivery options
- **Service Booking**: Request custom services (branding, design, photography, etc.)
- **User Dashboard**: Order tracking, cart management, profile settings
- **Secure Authentication**: NextAuth.js with email/password
- **Saved Addresses**: Multiple delivery addresses with default selection
- **Payment Integration**: Stripe ready (configure keys)

### Admin Features
- **Admin Dashboard**: Sales analytics, order management
- **Product Management**: CRUD operations for products
- **Order Processing**: View and manage customer orders
- **Service Requests**: Review and respond to service inquiries
- **User Management**: View customer accounts and activity

### Technical Features
- **Modern Stack**: Next.js 14 App Router, TypeScript, Prisma ORM
- **Security**: Input validation (Zod), rate limiting, security headers
- **Performance**: Caching, optimized images, code splitting
- **Database**: PostgreSQL (Neon) with connection pooling
- **Deployment Ready**: Render configuration included

## 🛠️ Tech Stack

- **Framework**: Next.js 14.0.4 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Validation**: Zod
- **State Management**: Zustand
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Payment**: Stripe
- **Email**: Nodemailer

## 📋 Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (Neon recommended)
- Git

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/FyliaCare/corporatebreeze.git
cd corporatebreeze
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create `.env` file in root:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/corporate_breeze"
DIRECT_URL="postgresql://user:password@localhost:5432/corporate_breeze"

# Auth
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
APP_URL="http://localhost:3000"

# Optional: Email, Stripe, etc.
```

Generate secrets:
```bash
openssl rand -base64 32
```

### 4. Database Setup

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed database (optional)
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
corporate-breeze/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── cart/         # Cart management
│   │   ├── products/     # Product CRUD
│   │   ├── orders/       # Order processing
│   │   └── health/       # Health check
│   ├── auth/             # Auth pages (login, register)
│   ├── dashboard/        # User dashboard
│   │   ├── cart/        # Shopping cart
│   │   ├── orders/      # Order history
│   │   └── profile/     # User profile
│   ├── admin/           # Admin panel
│   ├── shop/            # Product catalog
│   ├── services/        # Service pages
│   └── layout.tsx       # Root layout
├── components/           # React components
│   ├── home/           # Homepage components
│   ├── shop/           # Shop components
│   └── layout/         # Layout components
├── lib/                 # Utility libraries
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Prisma client
│   ├── validation.ts   # Zod schemas
│   ├── rate-limit.ts   # Rate limiting
│   ├── cache.ts        # Caching layer
│   ├── logger.ts       # Structured logging
│   └── env.ts          # Environment validation
├── prisma/             # Database
│   ├── schema.prisma   # Database schema
│   └── migrations/     # Migration files
├── public/             # Static assets
├── types/              # TypeScript types
└── middleware.ts       # Next.js middleware
```

## 🔐 Security Features

- **Input Validation**: All user inputs validated with Zod schemas
- **Rate Limiting**: API endpoints protected from abuse
- **Security Headers**: HSTS, CSP, X-Frame-Options, etc.
- **Password Hashing**: bcrypt with cost factor 12
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **XSS Prevention**: React automatic escaping
- **CSRF Protection**: NextAuth.js CSRF tokens
- **Environment Validation**: Runtime validation of env variables

## ⚡ Performance Optimizations

- **Caching**: In-memory cache for frequently accessed data
- **Database Indexes**: Optimized queries with proper indexes
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Compression**: Gzip compression enabled
- **Minification**: SWC minifier for production builds
- **Connection Pooling**: PostgreSQL connection pooling

## 📦 Deployment

### Deploy to Render + Neon

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment guide.

**Quick Steps:**

1. **Setup Neon Database**
   ```bash
   # Create database at neon.tech
   # Copy connection strings
   ```

2. **Configure Render**
   ```bash
   # Connect repository
   # Add environment variables
   # Deploy
   ```

3. **Run Migrations**
   ```bash
   npx prisma db push
   ```

4. **Verify Deployment**
   ```
   https://your-app.onrender.com/api/health
   ```

## 🧪 Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
npm run db:seed          # Seed database
npm run db:studio        # Open Prisma Studio

# Code Quality
npm run lint             # Run ESLint
npm run typecheck        # TypeScript type checking
```

## 🔑 Environment Variables

### Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `NEXTAUTH_SECRET` | NextAuth secret key | Generated with openssl |
| `NEXTAUTH_URL` | Application URL | `http://localhost:3000` |

### Optional

| Variable | Description |
|----------|-------------|
| `SMTP_HOST` | Email server host |
| `SMTP_USER` | Email username |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `CLOUDINARY_URL` | Image upload service |

See [.env.production.example](./.env.production.example) for complete list.

## 👥 User Roles

### USER (Default)
- Browse products
- Add to cart
- Place orders
- Request services
- Manage profile

### ADMIN
- All USER permissions
- Access admin dashboard
- Manage products
- Process orders
- View analytics

### Creating Admin User

```sql
-- Run in Prisma Studio or database console
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## 📊 Database Schema

- **User**: Authentication and profile
- **Product**: Shop items with categories
- **Category**: Product categorization
- **CartItem**: Shopping cart entries
- **Order**: Customer orders
- **OrderItem**: Order line items
- **Address**: Saved delivery addresses
- **Service**: Available services
- **ServiceRequest**: Customer service inquiries
- **ContactMessage**: Contact form submissions
- **Portfolio**: Showcase work

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  primary: { ... },
  secondary: { ... }
}
```

### Logo & Images
Replace in `public/` directory

### Content
- Homepage: `app/page.tsx`
- Services: `app/services/*/page.tsx`
- About: `app/about/page.tsx`

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Database Connection Issues
```bash
# Verify connection string
npx prisma db pull
```

### TypeScript Errors
```bash
# Regenerate Prisma Client
npx prisma generate
npm run typecheck
```

## 📝 License

This project is private and proprietary.

## 🤝 Support

For issues or questions:
- Check [DEPLOYMENT.md](./DEPLOYMENT.md)
- Review error logs
- Contact development team

## 🗺️ Roadmap

- [ ] Real-time chat support
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] AI-powered design recommendations
- [ ] Inventory management system
- [ ] Advanced reporting

---

Built with ❤️ using Next.js and TypeScript
