# Talk to My Lawyer

A comprehensive legal document generation platform built with Next.js 15. Generate professional legal letters with customizable templates, role-based access control, and subscription management.

## Features

- **Professional Legal Letter Generation**: Create customized legal documents using pre-built templates
- **Role-Based Access Control**: Admin, Employee, and Subscriber roles with specific permissions
- **Subscription Management**: Flexible subscription tiers for different user needs
- **PDF Export**: Export generated letters in professional PDF format
- **Multi-User Platform**: Support for multiple users with different access levels
- **Real-time Database**: Supabase PostgreSQL integration for reliable data management
- **Responsive Design**: Beautiful UI with Tailwind CSS and custom animations

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL with real-time features)
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with custom variants
- **PDF Generation**: pdf-lib for creating legal documents
- **Authentication**: Supabase Auth with role-based access
- **Type Safety**: TypeScript with auto-generated database types

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/aqeelwebbing/app.git
cd app
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```
Update the values with your Supabase credentials.

4. Set up the database:
```bash
npm run db:push
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Available Commands

```bash
# Development
npm run dev              # Start development server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript type checking

# Database
npm run db:push          # Push schema changes to Supabase
npm run db:gen-types     # Generate TypeScript types from database schema
```

## Project Structure

```
app/
├── app/                  # Next.js app router pages and API routes
├── components/           # Reusable UI components
├── hooks/               # Custom React hooks
├── lib/                 # Shared utilities and helpers
├── supabase/            # Database configuration and migrations
└── public/              # Static assets
```

## Database Schema

### Core Tables

- **profiles**: User profile information and settings
- **user_roles**: Role assignments (user/employee/admin)
- **subscriptions**: User subscription management
- **letters**: Generated legal letters and documents
- **commissions**: Employee referral tracking

## User Roles

### Subscriber
- Generate legal letters within subscription limits
- Access personal dashboard
- Download generated letters as PDF

### Employee
- Manage subscriber accounts
- Track generated letters
- Earn commissions from subscriber activity

### Admin
- Full system access
- Manage all users and subscriptions
- Monitor platform activity

## Development Workflow

### Adding New Features

1. Create a feature branch
2. Make your changes
3. Push schema changes to database if needed
4. Test thoroughly
5. Submit a pull request

### Database Changes

When modifying the database schema:

1. Update the Supabase migrations
2. Run `npm run db:push` to apply changes
3. Run `npm run db:gen-types` to update TypeScript types
4. Commit both migration files and generated types

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.
