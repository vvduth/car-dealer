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
