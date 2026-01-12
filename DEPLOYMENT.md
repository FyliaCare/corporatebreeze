# Deployment Guide - Corporate Breeze

## Prerequisites

1. **GitHub Repository**
   - Repository: https://github.com/FyliaCare/corporatebreeze.git
   - Ensure latest code is pushed to main branch

2. **Neon PostgreSQL Database**
   - Sign up at https://neon.tech
   - Create a new project
   - Copy the connection string

3. **Render Account**
   - Sign up at https://render.com
   - Connect your GitHub repository

## Step 1: Setup Neon Database

### 1.1 Create Database
```bash
# Go to Neon dashboard and create a new database
# Save these connection strings:
# - DATABASE_URL (pooled connection for application)
# - DIRECT_URL (direct connection for migrations)
```

### 1.2 Update Environment Variables
```bash
# Update .env.production with your Neon credentials
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require&pgbouncer=true"
DIRECT_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"
```

### 1.3 Run Database Migrations
```bash
# Install dependencies
npm install

# Generate Prisma Client for PostgreSQL
npx prisma generate

# Push schema to Neon database
npx prisma db push

# Optional: Seed database with sample data
npx prisma db seed
```

## Step 2: Configure Render

### 2.1 Create Web Service

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Use these settings:
   - **Name**: corporate-breeze
   - **Region**: Choose closest to your users
   - **Branch**: main
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (or higher)

### 2.2 Environment Variables

Add these environment variables in Render dashboard:

**Required:**
```
NODE_ENV=production
DATABASE_URL=<your-neon-pooled-connection-string>
DIRECT_URL=<your-neon-direct-connection-string>
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://your-app.onrender.com
APP_URL=https://your-app.onrender.com
```

**Optional:**
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@corporatebreeze.com
```

### 2.3 Generate Secrets
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Copy and paste the output to Render environment variables
```

## Step 3: Deploy

### 3.1 Automatic Deployment

Render will automatically deploy when you push to your main branch.

### 3.2 Manual Deployment

1. Go to Render Dashboard
2. Select your service
3. Click "Manual Deploy" → "Deploy latest commit"

### 3.3 Monitor Deployment

```bash
# Check build logs in Render dashboard
# Watch for:
# - npm install completion
# - Next.js build success
# - Application start
```

## Step 4: Post-Deployment

### 4.1 Health Check

Visit your deployed application:
```
https://your-app.onrender.com/api/health
```

Should return:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-10T...",
  "uptime": 123.45,
  "environment": "production",
  "database": "connected"
}
```

### 4.2 Verify Features

1. **Homepage**: https://your-app.onrender.com
2. **Shop**: https://your-app.onrender.com/shop
3. **Authentication**: https://your-app.onrender.com/auth/login
4. **Admin Panel**: https://your-app.onrender.com/admin

### 4.3 Create Admin User

```bash
# Option 1: Using Prisma Studio (local)
npx prisma studio

# Option 2: Direct SQL (Neon dashboard)
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain in Render

1. Go to your service settings
2. Click "Custom Domains"
3. Add your domain
4. Follow DNS configuration instructions

### 5.2 Update Environment Variables

```
NEXTAUTH_URL=https://yourdomain.com
APP_URL=https://yourdomain.com
```

## Troubleshooting

### Build Fails

```bash
# Check package.json scripts
"build": "next build"
"start": "next start"

# Ensure all dependencies are in package.json (not devDependencies)
npm install typescript @types/node @types/react --save
```

### Database Connection Issues

```bash
# Verify connection string format
postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Check Neon dashboard for connection details
# Ensure IP restrictions are not blocking Render
```

### 500 Errors After Deployment

```bash
# Check Render logs
# Common issues:
# - Missing environment variables
# - Database migration not run
# - Build artifacts missing
```

### Rate Limiting Too Strict

```bash
# For production with Redis:
# Update lib/rate-limit.ts to use Redis instead of in-memory store
```

## Performance Optimization

### Enable Connection Pooling

Your Neon connection string should include `?pgbouncer=true` for connection pooling.

### Enable Caching

```bash
# For production, replace in-memory cache with Redis
# Update lib/cache.ts to use Redis client
```

### Monitor Performance

1. **Render Metrics**: View CPU, Memory, Request metrics
2. **Neon Dashboard**: Monitor database queries, connections
3. **Application Logs**: Check for slow queries, errors

## Security Checklist

- [x] HTTPS enabled (automatic on Render)
- [x] Security headers configured (in next.config.js)
- [x] Rate limiting implemented
- [x] Input validation with Zod
- [x] Environment variables secured
- [x] Database credentials rotated
- [ ] Custom domain with SSL
- [ ] Regular security audits
- [ ] Automated backups configured (Neon)

## Maintenance

### Database Backups

Neon provides automatic backups. Configure retention in Neon dashboard.

### Monitoring

- Set up Render alerts for downtime
- Configure email notifications
- Monitor error logs regularly

### Updates

```bash
# Update dependencies
npm update

# Test locally
npm run build
npm start

# Deploy (push to main branch)
git push origin main
```

## Support

- Render Docs: https://render.com/docs
- Neon Docs: https://neon.tech/docs
- Next.js Docs: https://nextjs.org/docs

## Estimated Costs

- **Render Starter**: $7/month (includes 512MB RAM, 0.5 CPU)
- **Neon Free Tier**: Free (0.5GB storage, 100 compute hours)
- **Total**: ~$7/month for small traffic

Upgrade as needed for production traffic.
