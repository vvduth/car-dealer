# 🚗 Car Dealer Platform

A modern, full-stack car dealership management system built with Next.js 15, featuring advanced collection management, customer reservations, and comprehensive admin tools.

## ✨ Features

### 🎯 Core Functionality
- **Modern Car Inventory**: Browse and search vehicles with advanced filtering.
- **Streamlined Reservations**: A single-page form for a smooth booking experience.
- **Admin Dashboard**: Complete dealership management interface.
- **Customer Management**: Track leads, interactions, and manually add new customers.
- **Image Management**: AWS S3 integration with drag-and-drop uploads.
- **Real-time Search**: Advanced filtering by make, model, price, and specifications.

### 🔐 Authentication & Security
- **NextAuth v5**: Secure authentication with sessions.
- **Role-based Access**: Admin and customer user roles.
- **Rate Limiting**: API protection with Upstash Redis.
- **Input Validation**: Comprehensive data validation with Zod.

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with Tailwind CSS.
- **Dark/Light Mode**: Theme switching with next-themes.
- **Loading States**: Smooth transitions and skeleton loaders.
- **Image Optimization**: Next.js Image with Thumbhash placeholders.
- **Rich Text Editor**: TinyMCE integration for vehicle descriptions.

### 🛠️ Technical Features
- **Database**: PostgreSQL with Prisma ORM.
- **File Storage**: AWS S3 with presigned URLs.
- **Email Service**: Resend integration for notifications.
- **Automated Setup**: A bash script (`run_initialsetup.sh`) for easy one-command local setup.

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI & Shadcn UI
- **State Management**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth v5
- **File Storage**: AWS S3
- **Email**: Resend
- **Rate Limiting**: Upstash Redis

### Development Tools
- **Language**: TypeScript 5
- **Linting**: ESLint + Prettier
- **Database Migrations**: Prisma Migrate
- **Development**: Turbopack (Next.js)

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (preferably via `nvm`)
- **npm** or **yarn**
- **PostgreSQL** service running locally.
- **sudo** privileges (for database setup in the script).

For optional features, you will need accounts/keys for:
- **AWS S3**
- **Resend**
- **TinyMCE**
- **Upstash Redis**

## ⚡ Quick Start with Setup Script

This project includes an automated setup script for Linux-based environments. It will configure the database, environment variables, and install all dependencies.

### 1. Clone the Repository
```bash
git clone https://github.com/MematiBas42/CAR-GALLERY-PRO.git
cd CAR-GALLERY-PRO
```

### 2. Make the Script Executable
```bash
chmod +x run_initialsetup.sh
```

### 3. Run the Script
```bash
./run_initialsetup.sh
```
The script will handle database creation, `.env` file generation, `npm install`, and database seeding. It will ask for your `sudo` password once for database operations.

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Default Admin Account
After seeding, you can log in with:
- **Email**: admin@example.com
- **Password**: admin123

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.