# Corporate Breeze Website

A comprehensive e-commerce and marketing consultancy website built with Next.js, featuring client portal, admin dashboard, and online shopping.

## Features

### Public Features
- **Homepage** - Company profile and services overview
- **Services** - Detailed service offerings (Printing, Branding, Graphic Design, Advertising)
- **Shop** - E-commerce product catalog with search and filters
- **Portfolio** - Showcase of client work
- **Contact** - Contact form for inquiries

### Authentication
- User registration and login with NextAuth.js
- Role-based access control (Admin, Client, User)
- Secure password hashing with bcrypt

### Client Portal
- Personal dashboard with order overview
- Order history and tracking
- Service request management
- Profile and address management

### Admin Dashboard
- Complete admin panel with sidebar navigation
- **Dashboard** - Real-time statistics and analytics
- **Products** - Manage product catalog (CRUD operations)
- **Orders** - View and manage customer orders
- **Users** - User management
- **Service Requests** - Review and respond to service inquiries
- **Messages** - View contact form submissions
- **Settings** - Site configuration

### E-commerce
- Product listings with categories
- Shopping cart functionality
- Checkout process
- Order management
- Payment integration ready (Stripe)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS
- **UI Components:** Custom components with Lucide icons
- **Email:** Nodemailer
- **Payment:** Stripe (configured)

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

Update the following variables:
- `DATABASE_URL` - Your PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for development)
- Email configuration for notifications
- Stripe keys for payments (optional)

3. **Setup database:**
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database with sample data
npx prisma db seed
```

4. **Run development server:**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product CRUD
│   │   ├── orders/        # Order management
│   │   ├── contact/       # Contact form
│   │   └── admin/         # Admin endpoints
│   ├── auth/              # Auth pages (login, register)
│   ├── shop/              # E-commerce pages
│   ├── dashboard/         # Client portal
│   ├── admin/             # Admin dashboard
│   ├── services/          # Services pages
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── shop/             # Product components
│   └── providers/        # Context providers
├── lib/                   # Utilities
│   ├── prisma.ts         # Database client
│   ├── auth.ts           # Auth configuration
│   └── email.ts          # Email utilities
├── prisma/               # Database schema
│   └── schema.prisma     # Prisma schema
└── public/               # Static assets
```

## Database Schema

### Key Models:
- **User** - User accounts with roles (ADMIN, CLIENT, USER)
- **Product** - Product catalog with categories
- **Order** - Customer orders with items
- **ServiceRequest** - Service inquiry system
- **Portfolio** - Project showcase
- **ContactMessage** - Contact form submissions

## Brand Colors

Based on Corporate Breeze branding:
- **Blue:** #003B73 (Primary)
- **Cyan:** #00B4D8 (Secondary)
- **Orange:** #FF8C42
- **Yellow:** #FFC300
- **Pink:** #E91E63
- **Purple:** #7B2D8E
- **Green:** #8BC34A

## API Endpoints

### Public
- `POST /api/auth/register` - User registration
- `POST /api/contact` - Submit contact form
- `GET /api/products` - Get products
- `GET /api/products/[id]` - Get single product

### Protected (User)
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order

### Protected (Admin)
- `GET /api/admin/stats` - Dashboard statistics
- `POST /api/products` - Create product
- `PUT /api/products/[id]` - Update product
- `DELETE /api/products/[id]` - Delete product

## Deployment

### Build for production:
```bash
npm run build
npm start
```

### Recommended Platforms:
- **Vercel** - Optimal for Next.js
- **Railway** - For PostgreSQL database
- **Heroku** - Full-stack deployment

## Contributing

This is a custom project for Corporate Breeze Consult. For issues or suggestions, contact the development team.

## License

Proprietary - Corporate Breeze Consult © 2026
