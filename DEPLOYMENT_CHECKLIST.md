# Pre-Deployment Checklist

Use this checklist to ensure everything is ready before deploying to production.

## ✅ Code & Configuration

### Security
- [x] Input validation implemented (Zod schemas)
- [x] Rate limiting configured on all API routes
- [x] Security headers added to next.config.js
- [x] Environment variables validated
- [x] Password hashing with bcrypt (cost 12)
- [x] CSRF protection enabled (NextAuth.js)
- [ ] Review and test all authentication flows
- [ ] Verify no sensitive data in client-side code

### Performance
- [x] Database indexes added to Prisma schema
- [x] Caching system implemented
- [x] Image optimization configured
- [x] Code minification enabled (SWC)
- [x] Console logs removed in production
- [x] Gzip compression enabled
- [ ] Test page load times < 3 seconds
- [ ] Verify mobile responsiveness

### Database
- [x] Schema updated for PostgreSQL
- [x] Connection pooling configured
- [x] Indexes optimized for common queries
- [ ] Database migration tested locally
- [ ] Seed data prepared (optional)

### API Routes
- [x] All routes have error handling
- [x] Input validation on all POST/PUT routes
- [x] Rate limiting applied
- [x] Authentication checks in place
- [ ] API endpoints tested with Postman/Thunder Client

## 🗄️ Database Setup (Neon)

- [ ] Create Neon account at https://neon.tech
- [ ] Create new project
- [ ] Create database
- [ ] Copy connection strings:
  - [ ] DATABASE_URL (with `?pgbouncer=true`)
  - [ ] DIRECT_URL (without pooling)
- [ ] Test connection locally:
  ```bash
  DATABASE_URL="your-neon-url" npx prisma db push
  ```
- [ ] Verify database is empty and ready
- [ ] Configure automatic backups in Neon dashboard

## 🚀 Render Setup

### Account & Repository
- [ ] Create Render account at https://render.com
- [ ] Connect GitHub account to Render
- [ ] Authorize access to https://github.com/FyliaCare/corporatebreeze
- [ ] Push latest code to main branch
- [ ] Ensure `.gitignore` excludes:
  - [ ] `.env`
  - [ ] `.env.local`
  - [ ] `node_modules/`
  - [ ] `.next/`

### Web Service Configuration
- [ ] Create new Web Service
- [ ] Connect repository
- [ ] Configure build settings:
  - **Name**: corporate-breeze (or your choice)
  - **Region**: Choose closest to your users
  - **Branch**: main
  - **Runtime**: Node
  - **Build Command**: `npm install && npm run build`
  - **Start Command**: `npm start`
  - **Plan**: Starter (minimum) or higher

### Environment Variables
Add these in Render dashboard:

**Required:**
- [ ] `NODE_ENV` = `production`
- [ ] `DATABASE_URL` = (Neon pooled connection)
- [ ] `DIRECT_URL` = (Neon direct connection)
- [ ] `NEXTAUTH_SECRET` = (generate with `openssl rand -base64 32`)
- [ ] `NEXTAUTH_URL` = `https://your-app.onrender.com`
- [ ] `APP_URL` = `https://your-app.onrender.com`

**Optional (configure if needed):**
- [ ] `SMTP_HOST`
- [ ] `SMTP_PORT`
- [ ] `SMTP_USER`
- [ ] `SMTP_PASSWORD`
- [ ] `SMTP_FROM`
- [ ] `STRIPE_PUBLIC_KEY`
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET`

### Generate Secrets
```bash
# Generate NEXTAUTH_SECRET
openssl rand -base64 32

# Save output to Render environment variables
```

## 🧪 Pre-Deployment Testing

### Local Testing
- [ ] Run production build locally:
  ```bash
  npm run build
  npm start
  ```
- [ ] Test at http://localhost:3000
- [ ] Verify no build errors
- [ ] Check console for warnings

### Feature Testing
- [ ] Homepage loads correctly
- [ ] User registration works
- [ ] User login works
- [ ] Shop page displays products
- [ ] Add to cart functionality
- [ ] Cart page with checkout flow
- [ ] Address management
- [ ] Order placement (test mode)
- [ ] Service request submission
- [ ] Contact form submission
- [ ] Admin login (if admin user exists)
- [ ] Admin dashboard access

### API Testing
Test these endpoints:
- [ ] `GET /api/health` - Should return 200
- [ ] `POST /api/auth/register` - Create test user
- [ ] `POST /api/auth/[...nextauth]` - Login test user
- [ ] `GET /api/products` - List products
- [ ] `POST /api/cart` - Add to cart
- [ ] `GET /api/cart` - View cart
- [ ] `POST /api/orders` - Create order
- [ ] `POST /api/contact` - Contact form

### Security Testing
- [ ] SQL injection protection (try special chars in inputs)
- [ ] XSS protection (try `<script>alert('xss')</script>` in forms)
- [ ] Rate limiting (rapid API requests should be blocked)
- [ ] Authentication bypass (can't access /admin without login)
- [ ] HTTPS redirect working (after deployment)

## 📤 Deployment

### Initial Deploy
- [ ] Click "Create Web Service" in Render
- [ ] Wait for build to complete (5-10 minutes)
- [ ] Check build logs for errors
- [ ] Verify deployment success

### Post-Deployment Verification
- [ ] Visit `https://your-app.onrender.com`
- [ ] Check `/api/health` endpoint returns:
  ```json
  {
    "status": "healthy",
    "database": "connected"
  }
  ```
- [ ] Test homepage loads
- [ ] Test user registration
- [ ] Test user login
- [ ] Test cart functionality

### Create Admin User
Option 1 - Prisma Studio (local):
```bash
# Connect to production database
DATABASE_URL="your-neon-url" npx prisma studio

# Update user role to ADMIN
```

Option 2 - Neon SQL Console:
```sql
UPDATE "User" 
SET role = 'ADMIN' 
WHERE email = 'your-email@example.com';
```

- [ ] Admin user created
- [ ] Admin dashboard accessible
- [ ] Admin functions tested

## 🔍 Monitoring Setup

### Render Monitoring
- [ ] Enable email notifications for:
  - [ ] Deploy failures
  - [ ] Service downtime
  - [ ] High memory usage
- [ ] Set up Slack notifications (optional)

### Application Monitoring
- [ ] Check Render logs for errors
- [ ] Monitor response times in Render dashboard
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error tracking (optional - Sentry)

### Database Monitoring
- [ ] Check Neon dashboard for:
  - [ ] Connection count
  - [ ] Query performance
  - [ ] Storage usage
- [ ] Set up backup retention policy
- [ ] Enable automatic backups

## 🌐 Custom Domain (Optional)

If adding custom domain:
- [ ] Purchase domain from registrar
- [ ] Add domain in Render dashboard
- [ ] Configure DNS records (A or CNAME)
- [ ] Wait for SSL certificate provisioning
- [ ] Update environment variables:
  - [ ] `NEXTAUTH_URL` = `https://yourdomain.com`
  - [ ] `APP_URL` = `https://yourdomain.com`
- [ ] Test domain access
- [ ] Verify HTTPS redirect

## 📊 Performance Validation

After deployment, verify:
- [ ] Page load time < 3 seconds
- [ ] Time to Interactive (TTI) < 5 seconds
- [ ] First Contentful Paint (FCP) < 2 seconds
- [ ] Images load with proper optimization
- [ ] Mobile performance acceptable
- [ ] API response times < 500ms

Tools:
- [ ] Google PageSpeed Insights
- [ ] GTmetrix
- [ ] WebPageTest.org
- [ ] Lighthouse (Chrome DevTools)

## 🔒 Security Validation

After deployment, verify:
- [ ] HTTPS enabled (green padlock)
- [ ] Security headers present (check with securityheaders.com)
- [ ] Rate limiting working (test rapid requests)
- [ ] Authentication required for protected routes
- [ ] No sensitive data in client-side JavaScript
- [ ] Environment variables not exposed

## 📱 User Acceptance Testing

Test full user journey:
1. [ ] New user visits site
2. [ ] Browses products
3. [ ] Registers account
4. [ ] Adds items to cart
5. [ ] Proceeds to checkout
6. [ ] Enters shipping address
7. [ ] Completes order (test mode)
8. [ ] Views order in dashboard
9. [ ] Requests a service
10. [ ] Contacts support

## 📝 Documentation

- [x] README.md updated
- [x] DEPLOYMENT.md created
- [x] OPTIMIZATION_SUMMARY.md created
- [ ] Add any project-specific notes
- [ ] Document admin procedures
- [ ] Create user guide (optional)

## 🎯 Go-Live

### Final Checklist
- [ ] All tests passing
- [ ] No critical errors in logs
- [ ] Performance acceptable
- [ ] Security validated
- [ ] Monitoring configured
- [ ] Backups configured
- [ ] Team notified
- [ ] Support contacts ready

### Launch!
- [ ] Deploy to production
- [ ] Monitor for first 30 minutes
- [ ] Test critical flows
- [ ] Announce launch 🎉

## 📞 Support Contacts

### Service Providers
- **Render Support**: https://render.com/docs/support
- **Neon Support**: https://neon.tech/docs/introduction
- **Next.js**: https://nextjs.org/docs

### Emergency Contacts
- Developer: _______________
- DevOps: _______________
- Database Admin: _______________

## 🔄 Rollback Plan

If issues occur:
1. [ ] Access Render dashboard
2. [ ] Click "Manual Deploy"
3. [ ] Select previous working commit
4. [ ] Deploy
5. [ ] Verify site restored
6. [ ] Investigate issues
7. [ ] Fix and redeploy

## 📈 Post-Launch Monitoring

### First 24 Hours
- [ ] Check error logs every 2 hours
- [ ] Monitor response times
- [ ] Watch database connections
- [ ] Track user registrations
- [ ] Monitor order creation

### First Week
- [ ] Daily log review
- [ ] Performance monitoring
- [ ] User feedback collection
- [ ] Bug tracking
- [ ] Feature requests

### Ongoing
- [ ] Weekly performance reports
- [ ] Monthly security audits
- [ ] Quarterly dependency updates
- [ ] Regular backups verified

---

## 🎉 Ready to Deploy!

When all items are checked, you're ready for production deployment.

**Estimated Total Time**: 1-2 hours for full deployment and verification.

Good luck! 🚀
