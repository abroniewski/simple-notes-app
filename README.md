# simple-notes-app

A minimal notes app built with Next.js and Supabase, used as a learning project for full-stack TypeScript development.

## The Problem

- Building and deploying a full-stack web application requires understanding how a frontend, API layer, and database interact.
- A simple CRUD application provides a focused scope for practising Next.js App Router patterns and Supabase integration without incidental complexity.

## The Approach

**Inputs:** User-entered note text via a web interface.

**Processing:** Next.js App Router handles routing and server-side logic. API routes in `src/app/api/notes/` perform CRUD operations against a Supabase PostgreSQL database. Authentication is handled via Supabase's built-in auth.

**Outputs:** A persistent list of notes displayed in the browser, ordered by creation time.

## Value Delivered

- Working end-to-end example of Next.js + Supabase integration with TypeScript.
- Demonstrates API route construction, Supabase client usage, and basic state management in React.

## Scope & Status

- **Project type:** Learning project
- **Current state:** Paused
- **Known limitations:**
  - No user authentication; notes are shared across all users.
  - Minimal error handling and no test coverage.
  - UI is functional but unstyled beyond Tailwind defaults.

## Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **Language:** TypeScript

## Who This Is For

Developers reviewing the author's Next.js and Supabase learning work.

## Getting Started

Prerequisites: Node.js, a Supabase project with a `notes` table.

```bash
npm install
# Add your Supabase URL and anon key to .env.local
npm run dev
```

## License

Not specified.
