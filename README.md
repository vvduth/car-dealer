# 🚗 Meat Motors - Car Dealer Platform

A modern, full-stack car dealership management system built with Next.js 15, featuring advanced inventory management, customer reservations, and comprehensive admin tools.

## 🌐 Live Demo

**Production**: [https://car-dealer-lake-eight.vercel.app/](https://car-dealer-lake-eight.vercel.app/)

## 📸 Screenshots

### Homepage & Inventory
![Homepage](snip-0.png)
*Modern landing page with featured vehicles and search functionality*

### Vehicle Details
![Inventory](snip-1.png)
*Inventory section*

### Admin Dashboard
![Admin Dashboard](snip-2.png)
*Comprehensive admin panel for inventory and customer management*

### AI auto-detech car specs
![AI auto-detech](snip-3)
*AI detech specs of the whip by just upload 1 picture*

## ✨ Features

### 🎯 Core Functionality

#### 📋 Advanced Inventory Management
- **Hierarchical Car Taxonomy**: Make → Model → Model Variant structure for precise categorization
- **Real-time Search & Filtering**: Filter by make, model, price, year, mileage, fuel type, transmission, body type, and more
- **Dynamic Vehicle Listings**: Live status updates (LIVE, DRAFT, SOLD)
- **URL-based State Management**: Shareable filter links with `nuqs` integration
- **View Counter**: Track vehicle popularity with automated view counting
- **Slug-based URLs**: SEO-friendly URLs auto-generated from vehicle details

#### 🖼️ Professional Image Management
- **AWS S3 Integration**: Scalable cloud storage with presigned URLs
- **Drag & Drop Upload**: Intuitive multi-image uploader using `@dnd-kit`
- **Image Sorting**: Reorder images with drag-and-drop interface
- **Thumbhash Placeholders**: Ultra-fast loading with blur-up effect
- **Main Image Selection**: Designate primary vehicle photo
- **Automatic Optimization**: Next.js Image component with lazy loading

#### 📅 Smart Reservation System
- **Multi-Step Form**: Welcome → Date Selection → Customer Details
- **Calendar Integration**: Interactive date picker with `date-fns`
- **Lead Tracking**: Capture customer interest with status lifecycle
- **Email Notifications**: Automated alerts via Resend
- **Terms & Conditions**: Built-in acceptance workflow
- **Booking Confirmation**: Success page with reservation details

#### 👥 Customer Relationship Management
- **Lead Status Pipeline**: SUBSCRIBER → INTERESTED → CONTACTED → PURCHASED → COLD
- **Lifecycle Tracking**: Full history of status changes with timestamps
- **Customer Profiles**: Detailed contact information and booking preferences
- **Vehicle Association**: Link customers to specific vehicle interests
- **Search & Filter**: Find customers by name, email, status, or vehicle
- **Bulk Actions**: Efficient customer management workflows

### 🔐 Authentication & Security

#### 🔒 Advanced Authentication Flow
- **NextAuth v5**: Latest authentication library with database sessions
- **Custom 2FA Implementation**: OTP-based two-factor authentication
- **Challenge System**: Secure OTP generation and validation with `@/lib/otp`
- **Session Management**: 30-day sessions with automatic expiration
- **Credential Provider**: Email/password authentication with bcrypt hashing
- **Protected Routes**: Middleware-based route protection for admin area
- **Automatic Redirects**: Smart routing based on authentication state

#### 🛡️ Security Features
- **Rate Limiting**: Upstash Redis-based request throttling (5 login attempts per 10 minutes)
- **CSRF Protection**: Built-in NextAuth CSRF tokens
- **Content Security Policy**: Strict CSP headers via middleware
- **SQL Injection Prevention**: Prisma ORM parameterized queries
- **Input Sanitization**: HTML sanitization for user-generated content
- **Environment Variable Validation**: Type-safe env vars with `@t3-oss/env-nextjs`
- **Secure Headers**: Custom security headers via Next.js middleware

### 🎨 User Experience

#### 🌓 Modern UI/UX
- **Responsive Design**: Mobile-first design with Tailwind CSS 4.0
- **Dark/Light Mode**: System-aware theme switching with `next-themes`
- **Smooth Animations**: Framer Motion for elegant transitions
- **Loading States**: Skeleton loaders and progress indicators
- **Toast Notifications**: Real-time feedback with Sonner
- **Top Loading Bar**: Visual page transition indicator with NextTopLoader
- **Accessible Components**: Radix UI primitives for WCAG compliance

#### 🖱️ Interactive Elements
- **Image Lightbox**: Full-screen image viewing with `fslightbox-react`
- **Carousel Components**: Swipeable image galleries with Swiper
- **Rich Text Editor**: TinyMCE for vehicle descriptions with AI assistance
- **Form Validation**: Real-time validation with React Hook Form + Zod
- **Autocomplete Selects**: Radix UI Select components for taxonomy
- **Tooltips**: Contextual help with `react-tooltip`

### 🤖 AI-Powered Features

#### ✨ OpenAI Integration
- **AI Description Generator**: Automatically generate compelling vehicle descriptions
- **Streamable Responses**: Real-time AI output streaming
- **Content Enhancement**: Improve existing descriptions with AI suggestions
- **Custom Prompts**: Tailored prompts for automotive content
- **Token Management**: Efficient API usage with streaming

### 🛠 Technical Features

#### 💾 Database Architecture
- **PostgreSQL**: Production-ready relational database
- **Prisma ORM**: Type-safe database client with migrations
- **Connection Pooling**: Neon database with optimized pooling
- **Soft Deletes**: Cascade deletes for related entities
- **Indexes**: Optimized queries with strategic indexing
- **Migrations**: Version-controlled schema changes
- **Seeding**: CSV-based hierarchical data seeding from `taxonomy.csv`

#### 📦 File Storage & CDN
- **AWS S3**: Scalable object storage for vehicle images
- **Presigned URLs**: Secure, temporary upload links
- **Imgix CDN**: Optional image transformation and delivery
- **Multi-region Support**: Configurable AWS regions
- **MIME Type Validation**: Secure file type checking
- **Size Limits**: Configurable upload constraints

#### 📧 Communication
- **Resend Email API**: Transactional email service
- **React Email Templates**: Beautifully designed email components
- **OTP Delivery**: Secure code delivery for 2FA
- **Booking Confirmations**: Automated reservation emails
- **Admin Notifications**: Alert system for new leads

#### 🔍 Advanced Search & Analytics
- **Full-text Search**: Search across vehicle titles and descriptions
- **Multi-criteria Filtering**: Combine multiple filters simultaneously
- **Sorting Options**: Sort by price, year, views, date added
- **Pagination**: Server-side pagination with configurable page sizes
- **Page View Tracking**: Analytics on vehicle popularity
- **URL State Persistence**: Shareable search results


## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router with Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Forms**: React Hook Form 7 + Zod validation
- **State Management**: 
  - URL state with `nuqs`
  - Form state with React Hook Form
  - No global state library (React Context only)
- **Animation**: Framer Motion
- **Icons**: Lucide React + React Simple Icons
- **Rich Text**: TinyMCE Editor
- **Drag & Drop**: @dnd-kit
- **Image Gallery**: Swiper + fslightbox-react
- **Date Handling**: date-fns

### Backend
- **Runtime**: Node.js (Edge & Node.js runtimes)
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma 6 with extensions
  - `@prisma/extension-accelerate` for query caching
  - Connection pooling optimized for serverless
- **Authentication**: NextAuth v5 (Auth.js)
  - Database sessions
  - Custom JWT encoding
  - Credentials provider with bcrypt
- **File Storage**: AWS S3
  - `@aws-sdk/client-s3` v3
  - Presigned URLs for secure uploads
- **Email**: Resend API
  - React Email for templates
  - Transactional emails
- **Rate Limiting**: Upstash Redis
  - `@upstash/ratelimit` with sliding window
  - API protection
- **AI**: OpenAI SDK with streaming

### Development Tools
- **Package Manager**: npm
- **TypeScript**: Strict mode enabled
- **Linting**: ESLint with Next.js config
- **Code Formatting**: Prettier
- **Database Tools**: 
  - Prisma Studio (GUI)
  - Prisma Migrate (migrations)
  - ts-node for seeding
- **Build Tool**: Turbopack (Next.js dev server)
- **Deployment**: Vercel

### Key Dependencies
```json
{
  "@ai-sdk/openai": "^1.1.13",
  "@auth/prisma-adapter": "^2.7.4",
  "@dnd-kit/core": "^6.3.1",
  "@hookform/resolvers": "^3.10.0",
  "@prisma/client": "^6.3.1",
  "@radix-ui/react-*": "Latest",
  "@upstash/ratelimit": "^2.0.5",
  "next": "^15.4.0-canary.83",
  "next-auth": "^5.0.0-beta.25",
  "nuqs": "^2.3.1",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "zod": "^3.25.56"
}
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- **PostgreSQL** database (we recommend [Neon](https://neon.tech) for serverless Postgres)
- **AWS Account** with S3 bucket configured
- **Resend Account** for transactional emails
- **Upstash Account** for Redis rate limiting
- **TinyMCE API Key** (free tier available)
- **OpenAI API Key** (optional, for AI features)

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/car-dealer.git
cd car-dealer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env.local` file in the root directory:

```env
# Database (Neon PostgreSQL with connection pooling)
DATABASE_URL="postgresql://username:password@host.region.aws.neon.tech/dbname?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-here"  # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"  # Change to your production URL in Vercel

# AWS S3 Configuration
AWS_S3_BUCKET_ACCESS_KEY="your-aws-access-key"
AWS_S3_BUCKET_SECRET_KEY="your-aws-secret-key"
NEXT_PUBLIC_S3_BUCKET_REGION="us-east-1"
NEXT_PUBLIC_S3_BUCKET_NAME="your-bucket-name"
NEXT_PUBLIC_S3_BUCKET_URL="https://your-bucket-name.s3.region.amazonaws.com"

# Email Service (Resend)
RESEND_API_KEY="re_your-resend-api-key"
SENDER_EMAIL="onboarding@resend.dev"  # Or your verified domain

# TinyMCE Rich Text Editor
NEXT_PUBLIC_TINYMCE_API_KEY="your-tinymce-api-key"

# Redis Rate Limiting (Upstash)
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# AI Integration (Optional - for description generation)
OPENAI_API_KEY="sk-proj-your-openai-api-key"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Your app URL
X_AUTH_TOKEN="secret"  # Custom auth token for API protection

# Optional: Imgix CDN (if using Imgix for image optimization)
NEXT_PUBLIC_IMGIX_URL="https://your-source.imgix.net"
```

**Important for Production (Vercel):**
- Set `NEXTAUTH_URL` to your production domain (e.g., `https://your-app.vercel.app`)
- Set `NEXT_PUBLIC_APP_URL` to your production domain
- Use a strong `NEXTAUTH_SECRET` (generate with `openssl rand -base64 32`)
- Ensure Upstash Redis database is active (free tier databases delete after 14 days of inactivity)

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations (creates all tables)
npx prisma migrate dev

# Seed the database with sample data
# This will create:
# - Admin user (admin@example.com / admin123)
# - Car makes, models, and variants from taxonomy.csv
# - Sample vehicle listings
# - Sample customers
npx prisma db seed
```

**Database Schema Overview:**
- `users` & `sessions` - Authentication tables
- `classifieds` - Vehicle listings
- `makes`, `models`, `model_variants` - Hierarchical car taxonomy
- `images` - Vehicle images with thumbhash data
- `customers` & `customer_lifecycle` - Lead management
- `page_views` - Analytics tracking

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🗄️ Database Schema

The application uses a comprehensive database schema with the following main entities:

### Core Entities

**Users & Authentication**
- `users` - Admin users with bcrypt-hashed passwords
- `sessions` - NextAuth database sessions with 2FA flags

**Vehicle Inventory**
- `classifieds` - Main vehicle listings with all specifications
  - Indexed by: make/model, status, price for query optimization
  - Includes: VRM, year, mileage, price, transmission, fuel type, body type, etc.
  - Status: LIVE, DRAFT, SOLD
- `images` - Vehicle photos with S3 URLs and thumbhash placeholders
  - One-to-many relationship with classifieds
  - Supports main image designation and sorting

**Car Taxonomy (Hierarchical)**
- `makes` - Car manufacturers (Toyota, BMW, etc.)
- `models` - Car models linked to makes (Camry → Toyota)
- `model_variants` - Specific variants with year ranges (Camry XLE 2020-2024)

**Customer Management**
- `customers` - Lead information with booking details
  - Status pipeline: SUBSCRIBER → INTERESTED → CONTACTED → PURCHASED → COLD
- `customer_lifecycle` - Historical status changes for tracking

**Analytics**
- `page_views` - Page visit tracking with IP and referrer data

### Key Relationships
```
Make (1) ──→ (N) Model ──→ (N) ModelVariant
                            ↓
Classified (N) ──→ (1) Make/Model/Variant
    ↓
    ├──→ (N) Images
    └──→ (N) Customers
```

## 🛡️ Authentication

The platform uses NextAuth v5 with a custom two-factor authentication flow:

### Authentication Flow

1. **Initial Login**: User submits email/password
   - Credentials validated against database
   - Password verified with bcrypt
   - Session created with `requireF2A: true` flag

2. **OTP Challenge**: Middleware intercepts request
   - Redirects to `/auth/challenge`
   - OTP code sent via email (Resend)
   - User submits 6-digit code

3. **Challenge Verification**: OTP validated
   - Session updated with `requireF2A: false`
   - User redirected to admin dashboard
   - Full access granted

4. **Protected Routes**: Middleware guards all `/admin/*` routes
   - Checks session existence
   - Validates 2FA completion
   - Auto-redirects unauthorized users

### Security Features

- **Rate Limiting**: 5 login attempts per 10 minutes (Upstash Redis)
- **OTP Rate Limiting**: 3 OTP attempts per 10 minutes
- **Session Duration**: 30 days with automatic expiration
- **Bcrypt Hashing**: Password storage with salt rounds
- **CSRF Protection**: Built-in NextAuth CSRF tokens
- **Secure Cookies**: HTTP-only, SameSite strict cookies

### Default Admin Credentials

After running `npx prisma db seed`:
- **Email**: `admin@example.com`
- **Password**: `admin123`

**⚠️ Important**: Change these credentials immediately in production!

## 📁 Project Structure

```
car-dealer/
├── prisma/                    # Database schema and migrations
│   ├── schema.prisma         # Main Prisma schema with all models
│   ├── migrations/           # Version-controlled schema changes
│   └── seed/                 # Database seeding scripts
│       ├── seed.ts           # Main seed orchestrator
│       ├── tax.seed.ts       # Make/Model/Variant seeding from CSV
│       ├── admin.seed.ts     # Admin user creation
│       ├── class.seed.ts     # Sample vehicle listings
│       ├── customer.seed.ts  # Sample customer data
│       └── imageSeed.ts      # Sample images with thumbhash
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (presentation)/   # Public-facing pages (route group)
│   │   │   ├── page.tsx      # Homepage
│   │   │   ├── auth/         # Sign-in, challenge pages
│   │   │   ├── inventory/    # Vehicle browsing & details
│   │   │   └── favourites/   # User favourites
│   │   ├── admin/            # Admin dashboard (protected)
│   │   │   ├── dashboard/    # Analytics & overview
│   │   │   ├── cars/         # Inventory management
│   │   │   ├── customers/    # Lead management
│   │   │   └── settings/     # Admin settings
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   ├── images/       # S3 upload handlers
│   │   │   ├── taxonomy/     # Make/model data endpoints
│   │   │   └── favourites/   # Favourites management
│   │   ├── _actions/         # Server Actions (mutations)
│   │   │   ├── car.ts        # Vehicle CRUD operations
│   │   │   ├── customer.ts   # Customer management
│   │   │   ├── challenge.ts  # OTP verification
│   │   │   ├── sign-in.ts    # Authentication
│   │   │   ├── subscribe.ts  # Newsletter subscription
│   │   │   └── ai.tsx        # AI description generation
│   │   └── schemas/          # Zod validation schemas
│   │       ├── car.schema.ts     # Vehicle validation
│   │       ├── customer.schema.ts # Customer validation
│   │       ├── auth.schema.ts    # Auth validation
│   │       └── ...               # Other schemas
│   ├── components/           # React components
│   │   ├── ui/               # Base Radix UI components
│   │   ├── admin/            # Admin-specific components
│   │   ├── car/              # Vehicle-related components
│   │   │   ├── car-form.tsx          # Vehicle edit form
│   │   │   ├── car-form-fields.tsx   # Form field components
│   │   │   ├── car-carousel.tsx      # Image carousel
│   │   │   ├── drag-and-drop.tsx     # Image uploader
│   │   │   ├── rich-text-editor.tsx  # TinyMCE wrapper
│   │   │   └── TaxonomySelect.tsx    # Make/model dropdowns
│   │   ├── auth/             # Authentication components
│   │   ├── shared/           # Reusable components
│   │   ├── homepage/         # Landing page sections
│   │   ├── inventory/        # Inventory browsing UI
│   │   └── reserve/          # Reservation flow
│   ├── lib/                  # Utility functions and clients
│   │   ├── prisma.ts         # Prisma client singleton
│   │   ├── s3.ts             # AWS S3 client & upload functions
│   │   ├── resend.ts         # Email client configuration
│   │   ├── otp.ts            # OTP generation & validation
│   │   ├── rate-limiter.ts   # Upstash Redis rate limiting
│   │   ├── thumbhash-server.ts # Server-side thumbhash generation
│   │   ├── thumbhash-client.tsx # Client-side thumbhash rendering
│   │   ├── uploader.ts       # File upload utilities
│   │   ├── utils.ts          # General utilities (cn, formatters)
│   │   └── ai-utils.ts       # OpenAI integration helpers
│   ├── config/               # Configuration files
│   │   ├── routes.ts         # Centralized route definitions
│   │   ├── types.ts          # Shared TypeScript types
│   │   ├── constants.ts      # App-wide constants
│   │   └── endpoints.ts      # API endpoint definitions
│   └── middleware.ts         # Route protection & security headers
├── emails/                   # React Email templates
│   └── challenge.tsx         # OTP email template
├── public/                   # Static assets
├── auth.config.ts            # NextAuth configuration
├── auth.ts                   # Auth.js wrapper
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── taxonomy.csv              # Car make/model seed data
└── .env.local                # Environment variables (gitignored)
```

### Key Architecture Patterns

- **Route Groups**: `(presentation)/` for public pages keeps admin area separate
- **Server Actions**: All mutations in `_actions/` with `"use server"` directive
- **Type Safety**: Prisma payload types in `config/types.ts` for complex queries
- **Centralized Routes**: All routes defined in `config/routes.ts` for type-safe navigation
- **Middleware Protection**: Automatic route guarding for `/admin/*` paths

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack (fast HMR)
npm run build        # Build for production (optimized)
npm run start        # Start production server
npm run lint         # Run ESLint for code quality

# Database Operations
npx prisma studio    # Open Prisma Studio (visual database browser)
npx prisma generate  # Regenerate Prisma Client after schema changes
npx prisma migrate dev       # Create and apply new migration
npx prisma migrate deploy    # Apply migrations in production
npx prisma db push   # Push schema changes without creating migration (dev only)
npx prisma db seed   # Seed database with initial data
npx prisma migrate reset     # Reset database and re-run all migrations + seed

# Useful Development Commands
npx prisma format    # Format schema.prisma file
npx prisma validate  # Validate Prisma schema
npx prisma db pull   # Pull schema from existing database (introspection)

# Deployment
npm run build && npm run start   # Build and start production server locally
vercel                           # Deploy to Vercel (install: npm i -g vercel)
```

### Common Development Workflows

**Adding a new feature:**
```bash
npm run dev              # Start dev server
# Make changes...
npx prisma migrate dev   # If schema changed
npm run build            # Test production build
git add . && git commit  # Commit changes
git push                 # Auto-deploy to Vercel
```

**Database schema changes:**
```bash
# Edit prisma/schema.prisma
npx prisma migrate dev --name add_new_field
npx prisma generate
# Update TypeScript types in config/types.ts if needed
```

## 🌐 API Routes

The application provides comprehensive API endpoints:

### Authentication
- `POST /api/auth/signin` - Sign in with credentials
- `POST /api/auth/signout` - Sign out and destroy session
- `POST /api/auth/session` - Get current session
- `GET /api/auth/csrf` - Get CSRF token

### Vehicle Management
- `GET /api/cars` - List vehicles with filtering
- `GET /api/cars/[id]` - Get single vehicle details
- `POST /api/cars` - Create new vehicle (admin)
- `PUT /api/cars/[id]` - Update vehicle (admin)
- `DELETE /api/cars/[id]` - Delete vehicle (admin)

### Image Upload
- `POST /api/images/upload` - Upload image to S3
- `POST /api/images/presigned-url` - Get presigned S3 URL
- `DELETE /api/images/[key]` - Delete image from S3

### Taxonomy Data
- `GET /api/taxonomy/makes` - Get all car makes
- `GET /api/taxonomy/models?makeId=[id]` - Get models for make
- `GET /api/taxonomy/variants?modelId=[id]` - Get variants for model

### Favourites
- `GET /api/favourites` - Get user's favourites (cookie-based)
- `POST /api/favourites` - Add to favourites
- `DELETE /api/favourites/[id]` - Remove from favourites

### Server Actions (Form Mutations)
Located in `src/app/_actions/`:
- `createCarAction` - Create new vehicle listing
- `updateCarAction` - Update existing vehicle
- `deleteCarAction` - Delete vehicle
- `signInAction` - Authenticate user with rate limiting
- `challengeAction` - Verify OTP code
- `createCustomerAction` - Create new customer lead
- `updateCustomerStatusAction` - Update lead status
- `generateDescriptionAction` - AI-powered description generation

## 🎨 UI Components

Built with a comprehensive design system using Radix UI primitives:

### Form Components
- **Input**: Text, email, password, number inputs
- **Select**: Dropdown selects with search capability
- **Checkbox**: Accessible checkbox with label
- **Radio Group**: Radio button groups
- **Textarea**: Multi-line text input
- **Date Picker**: Calendar-based date selection
- **Rich Text Editor**: TinyMCE integration with AI assistance

### Data Display
- **Table**: Sortable, filterable data tables with pagination
- **Card**: Flexible card component for content
- **Carousel**: Image galleries with Swiper integration
- **Lightbox**: Full-screen image viewer (fslightbox)
- **Badge**: Status indicators and tags
- **Avatar**: User profile images
- **Skeleton**: Loading state placeholders

### Navigation
- **Breadcrumbs**: Hierarchical navigation
- **Pagination**: Page navigation with URL state
- **Tabs**: Tabbed interface components
- **Active Link**: Navigation with active state highlighting
- **Filters**: Advanced filtering UI with URL persistence

### Feedback
- **Toast**: Notifications with Sonner (success, error, info)
- **Dialog/Modal**: Accessible modal dialogs
- **Alert**: Inline alert messages
- **Loading Bar**: Top-level progress indicator (NextTopLoader)
- **Spinner**: Loading spinners with Lucide icons

### Specialized Components
- **Drag & Drop Zone**: Multi-file upload with preview
- **Sortable List**: Reorderable lists with @dnd-kit
- **Image Uploader**: S3 integration with progress tracking
- **Taxonomy Select**: Cascading make → model → variant dropdowns
- **Status Pipeline**: Customer lifecycle visualization
- **Analytics Charts**: Recharts-based data visualization

## 📱 Responsive Design

The application is fully responsive with a mobile-first approach:

### Breakpoints (Tailwind CSS)
- **Mobile**: 320px - 640px (sm)
- **Tablet**: 640px - 768px (md)
- **Laptop**: 768px - 1024px (lg)
- **Desktop**: 1024px - 1280px (xl)
- **Wide**: 1280px+ (2xl)

### Responsive Features
- **Adaptive Layouts**: Grid/flexbox layouts that adjust per screen size
- **Touch-Optimized**: Large touch targets for mobile devices
- **Image Optimization**: Responsive images with Next.js Image component
- **Mobile Navigation**: Hamburger menu for small screens
- **Responsive Tables**: Horizontal scroll on mobile, full view on desktop
- **Conditional Rendering**: Show/hide elements based on viewport
- **Viewport-Specific Styling**: Different UI patterns for mobile vs. desktop

## 🔒 Security Features

Comprehensive security implementation:

### Application Security
- **CSRF Protection**: Built-in NextAuth CSRF tokens on all forms
- **XSS Prevention**: Input sanitization with `sanitize-html`
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **Rate Limiting**: API throttling with Upstash Redis
  - 5 login attempts per 10 minutes
  - 3 OTP attempts per 10 minutes
- **Content Security Policy**: Strict CSP headers via middleware
- **Secure Headers**: Custom security headers (X-Frame-Options, etc.)
- **Environment Variables**: Type-safe validation with `@t3-oss/env-nextjs`

### Authentication Security
- **Bcrypt Password Hashing**: Industry-standard password encryption
- **Two-Factor Authentication**: OTP-based 2FA with email delivery
- **Session Management**: Secure database sessions (30-day expiration)
- **HTTP-Only Cookies**: Prevent XSS attacks on session tokens
- **Secure Cookie Flags**: SameSite strict for CSRF protection
- **Auto-Logout**: Session expiration with automatic cleanup

### Data Security
- **Input Validation**: Zod schemas on all user inputs
- **File Upload Validation**: MIME type and size checks
- **Presigned S3 URLs**: Temporary, secure upload links
- **Database SSL**: Enforced SSL connections to PostgreSQL
- **API Authentication**: Custom auth tokens for internal APIs

### Production Considerations
- **Environment Separation**: Different configs for dev/staging/prod
- **Secret Management**: Never commit secrets to version control
- **HTTPS Enforcement**: All production traffic over HTTPS
- **Regular Security Audits**: npm audit for dependency vulnerabilities

## 🚀 Deployment

### Vercel Deployment (Recommended)

**One-Click Deploy:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vvduth/car-dealer)

**Manual Deployment:**

1. **Connect Repository**
   - Push your code to GitHub
   - Import project in Vercel dashboard
   - Select your repository

2. **Configure Environment Variables**
   
   In Vercel Project Settings → Environment Variables, add:
   
   ```env
   # Critical for Production
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=<generate-strong-secret>
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   
   # AWS S3
   AWS_S3_BUCKET_ACCESS_KEY=...
   AWS_S3_BUCKET_SECRET_KEY=...
   NEXT_PUBLIC_S3_BUCKET_REGION=us-east-1
   NEXT_PUBLIC_S3_BUCKET_NAME=your-bucket
   NEXT_PUBLIC_S3_BUCKET_URL=https://...
   
   # Email & Communication
   RESEND_API_KEY=re_...
   SENDER_EMAIL=your-email@yourdomain.com
   
   # Rate Limiting
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   
   # Optional
   OPENAI_API_KEY=sk-proj-...
   NEXT_PUBLIC_TINYMCE_API_KEY=...
   NEXT_PUBLIC_IMGIX_URL=https://...
   X_AUTH_TOKEN=secret
   ```

3. **Database Migration**
   ```bash
   # Run migrations in production database
   npx prisma migrate deploy
   
   # Seed production database (one-time)
   npx prisma db seed
   ```

4. **Deploy**
   - Click "Deploy" in Vercel dashboard
   - Or push to main branch for automatic deployment


### Manual Deployment (VPS/Self-Hosted)

```bash
# Build the application
npm run build

# Set production environment variables
export NODE_ENV=production
export DATABASE_URL="postgresql://..."
# ... all other env vars

# Run database migrations
npx prisma migrate deploy

# Start the production server
npm run start

# Or use PM2 for process management
pm2 start npm --name "car-dealer" -- start
```

### Docker Deployment (Optional)

```dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

## 🧪 Testing & Development

### Local Testing

**Test the full application flow:**

1. **Homepage & Browsing**
   - Visit `http://localhost:3000`
   - Test vehicle filtering and search
   - Verify responsive design on different screen sizes

2. **Vehicle Details**
   - Click on any vehicle to view details
   - Test image carousel and lightbox
   - Verify all specifications display correctly

3. **Reservation Flow**
   - Click "Reserve" on a vehicle
   - Complete multi-step form
   - Verify email notifications

4. **Admin Authentication**
   - Visit `http://localhost:3000/auth/sign-in`
   - Login with: `ducthai060501@gmail.com` / `password`
   - Access admin dashboard

5. **Admin Dashboard**
   - View analytics and charts
   - Test vehicle CRUD operations
   - Upload and manage images
   - Update customer statuses

6. **Image Management**
   - Test drag-and-drop upload
   - Verify S3 storage
   - Reorder images
   - Set main image

### Development Tips

**Hot Module Replacement (HMR):**
- Turbopack provides instant feedback
- CSS changes reflect immediately
- Component updates without page reload

**Database Inspection:**
```bash
# Open Prisma Studio
npx prisma studio
# Access at http://localhost:5555
```

**Debugging:**
- Use React DevTools for component inspection
- Check Network tab for API calls
- Monitor Vercel Function logs for server errors
- Use `console.log` in Server Actions (shows in terminal)

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Prisma Client errors | Run `npx prisma generate` |
| Database connection fails | Check `DATABASE_URL` in `.env.local` |
| Images not uploading | Verify AWS credentials and bucket policy |
| Rate limiting blocks requests | Clear Redis or adjust limits in `rate-limiter.ts` |
| NextAuth errors | Ensure `NEXTAUTH_SECRET` is set |
| OTP not receiving | Check Resend API key and sender email |



## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Process

1. **Fork the Repository**
   ```bash
   git clone https://github.com/vvduth/car-dealer.git
   cd car-dealer
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow existing code patterns
   - Use TypeScript for type safety
   - Update Prisma schema if needed
   - Add Zod schemas for new forms
   - Follow component structure conventions

4. **Test Your Changes**
   ```bash
   npm run dev          # Test locally
   npm run build        # Ensure production build works
   npm run lint         # Check for linting errors
   ```

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```
   
   **Commit Message Conventions:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Test additions/changes
   - `chore:` Build process or tooling changes

6. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Submit a Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style Guidelines

- **TypeScript**: Use strict type checking
- **Components**: Functional components with TypeScript
- **Server Actions**: Always use `"use server"` directive
- **Client Components**: Mark with `"use client"` when needed
- **Styling**: Use Tailwind CSS utility classes
- **Imports**: Use `@/` alias for cleaner imports
- **Error Handling**: Return `{ success: boolean, message: string }`
- **Validation**: Zod schemas for all user inputs

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features (vehicle comparisons, saved searches, etc.)
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- ♿ Accessibility improvements
- 🌍 Internationalization (i18n)
- 🧪 Test coverage
- ⚡ Performance optimizations

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 🆘 Troubleshooting

### Common Issues and Solutions

#### Database Issues

**Problem**: `PrismaClientInitializationError`
```bash
# Solution: Regenerate Prisma Client
npx prisma generate

# If persists, clear node_modules and reinstall
rm -rf node_modules .next
npm install
```

**Problem**: Migration fails
```bash
# Solution: Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or manually fix migration in prisma/migrations/
```

**Problem**: Database connection timeout (Neon)
```bash
# Solution: Check if database is active
# Neon databases sleep after inactivity - wake them up by:
# 1. Visit Neon console
# 2. Check database status
# 3. Connection should auto-wake
```

#### Authentication Issues

**Problem**: Can't login / Session issues
```bash
# Solution 1: Check environment variables
# Ensure NEXTAUTH_SECRET and NEXTAUTH_URL are set

# Solution 2: Clear browser cookies
# Chrome: DevTools → Application → Cookies → Delete

# Solution 3: Check database sessions table
npx prisma studio
# Navigate to sessions table and verify
```

**Problem**: OTP email not received
```bash
# Solution: Check Resend configuration
# 1. Verify RESEND_API_KEY in .env.local
# 2. Check sender email is verified in Resend
# 3. Look for emails in spam folder
# 4. Check Resend logs in dashboard
```

**Problem**: Rate limiting blocks all requests
```bash
# Solution: Clear Redis or restart Upstash
# Or temporarily disable rate limiting in:
# src/lib/rate-limiter.ts
```

#### Upload Issues

**Problem**: Images not uploading to S3
```bash
# Solution: Check S3 configuration
# 1. Verify AWS credentials in .env.local
# 2. Check S3 bucket policy allows uploads
# 3. Verify bucket CORS configuration
# 4. Check bucket region matches NEXT_PUBLIC_S3_BUCKET_REGION
```

**S3 Bucket Policy (example):**
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket-name/*"
    }
  ]
}
```

**S3 CORS Configuration:**
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
```

#### Vercel Deployment Issues

**Problem**: Application error on Vercel
```bash
# Solution: Check function logs
# 1. Vercel Dashboard → Functions tab
# 2. Look for error messages
# 3. Common issues:
#    - Missing environment variables
#    - Database connection failures
#    - Upstash Redis deleted (free tier after 14 days)
```

**Problem**: Build fails on Vercel
```bash
# Solution: Ensure all dependencies are in package.json
npm install
git add package.json package-lock.json
git commit -m "fix: update dependencies"
git push
```

**Problem**: Environment variables not working
```bash
# Solution: 
# 1. Check variable names match exactly (case-sensitive)
# 2. Redeploy after adding new variables
# 3. NEXT_PUBLIC_ prefix required for client-side vars
```

#### Upstash Redis Issues

**Problem**: `ENOTFOUND daring-bedbug-xxxxx.upstash.io`
```bash
# This means Redis database was deleted (14-day inactivity on free tier)

# Solution:
# 1. Go to Upstash console
# 2. Restore from backup OR create new database
# 3. Update environment variables:
UPSTASH_REDIS_REST_URL=https://new-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=new-token
# 4. Redeploy on Vercel
```

#### Development Server Issues

**Problem**: Port 3000 already in use
```bash
# Solution: Kill existing process
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

**Problem**: Turbopack compilation errors
```bash
# Solution: Clear Next.js cache
rm -rf .next
npm run dev
```

### Getting Help

If you encounter issues not covered here:

1. **Check the Logs**
   - Terminal output for server errors
   - Browser console for client errors
   - Vercel function logs for production

2. **GitHub Issues**: [Create an issue](https://github.com/vvduth/car-dealer/issues)
   - Include error messages
   - Describe steps to reproduce
   - Share relevant code snippets

3. **Community Support**
   - Next.js Discord
   - Prisma Slack
   - Stack Overflow with tags: `nextjs`, `prisma`, `next-auth`

4. **Documentation**
   - [Next.js Docs](https://nextjs.org/docs)
   - [Prisma Docs](https://www.prisma.io/docs)
   - [NextAuth Docs](https://next-auth.js.org)
   - [Vercel Docs](https://vercel.com/docs)

## � License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## �🙏 Acknowledgments

This project was built with amazing open-source technologies:

- **[Next.js](https://nextjs.org/)** - The React framework for production by Vercel
- **[Vercel](https://vercel.com/)** - Deployment and hosting platform with edge network
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM for type-safe database access
- **[NextAuth.js](https://next-auth.js.org/)** - Complete authentication solution for Next.js
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible component primitives
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable components built with Radix and Tailwind
- **[Upstash](https://upstash.com/)** - Serverless Redis for rate limiting and caching
- **[Neon](https://neon.tech/)** - Serverless PostgreSQL with branching
- **[AWS S3](https://aws.amazon.com/s3/)** - Scalable object storage
- **[Resend](https://resend.com/)** - Modern email API for developers
- **[OpenAI](https://openai.com/)** - AI models for content generation
- **[TinyMCE](https://www.tiny.cloud/)** - Rich text editor

Special thanks to the open-source community for making these tools freely available.


**Built with ❤️ by [vvduth](https://github.com/vvduth) using Next.js 15 and modern web technologies**

**Live Demo**: [https://car-dealer-lake-eight.vercel.app/](https://car-dealer-lake-eight.vercel.app/)

**GitHub**: [https://github.com/vvduth/car-dealer](https://github.com/vvduth/car-dealer)
