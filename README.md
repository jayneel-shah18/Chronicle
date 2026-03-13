# Chronicle

Your personal sanctuary for growth. Chronicle helps you track todos, goals, habits, journal entries, and expenses with a warm, focused UI.

## Current Stage

Chronicle is in a functional web app stage with:

- React + TypeScript migration completed for all core pages
- Supabase authentication integrated
- Google OAuth integrated
- Protected routes and session persistence enabled
- Ready for deployment to static hosts (Vercel/Netlify/Cloudflare Pages)

## Features

- Authentication with Supabase (email/password + Google OAuth)
- Dashboard with a yearly activity heatmap
- Daily todos with completion tracking
- Goals with progress visualization
- Journal with date-based entries
- Habit tracking with streak-friendly workflow
- Expense tracking by category
- Global keyboard shortcuts
- Toast notifications and loading states

## Tech Stack

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- Zustand
- React Router
- Supabase

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create .env.local in the project root:

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 3. Run the app

```bash
npm run dev
```

Open http://localhost:3000

## Authentication Setup

### Supabase

1. Create a Supabase project.
2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.
3. In Supabase, go to Authentication -> URL Configuration:
	- Site URL: http://localhost:3000
	- Redirect URLs: http://localhost:3000/**

### Google OAuth

1. In Google Cloud Console, create OAuth credentials (Web application).
2. Add Authorized redirect URI:
	- https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback
3. In Supabase, go to Authentication -> Providers -> Google and paste:
	- Client ID
	- Client Secret

For legacy/auth notes, see archive/SETUP_AUTH.md.

## Available Scripts

- npm run dev: Start development server
- npm run build: Type-check and create production build
- npm run preview: Preview production build locally
- npm run lint: Run ESLint
- npm run test: Run tests

## Deployment

Recommended: Vercel.

Build settings:

- Build command: npm run build
- Output directory: dist

After deployment:

1. Add your production URL to Supabase Authentication URL Configuration.
2. Add your production domain/origin in Google OAuth client settings.
3. Set production environment variables in your hosting provider.

## Project Structure

Core source code lives in src:

- src/components/pages: App pages
- src/components/common: Shared UI
- src/contexts: Auth context
- src/store: Zustand state
- src/lib: Supabase client
- src/hooks: Custom hooks

## License

Apache-2.0

This project is free to use, including commercial use, as long as license and attribution notices are preserved.
