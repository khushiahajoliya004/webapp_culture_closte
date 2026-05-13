# Culture Closet

A peer-to-peer marketplace for pre-loved South Asian fashion and accessories. Built with Next.js 16, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and SQLite.

## Getting Started

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Setup

```bash
npx prisma migrate dev
npx tsx prisma/seed.ts
```

## Demo Test Accounts

| Email | Password | Role | What to Test |
|---|---|---|---|
| `buyer@culturecloset.com` | `password123` | **Buyer** | Browse, cart, checkout, orders, wishlist, reviews, messaging |
| `seller@culturecloset.com` | `password123` | **Seller** | Seller dashboard, create listings, view orders received, earnings |
| `admin@culturecloset.com` | `password123` | **Admin** | Admin panel, user management, listing moderation, order management |

## Key Features

- **Buyer Flow** — Browse categories, search listings, add to cart, checkout, track orders, leave reviews
- **Seller Flow** — Create listings with image upload, manage inventory, view orders and earnings
- **Messaging** — Buyer-seller chat tied to listings
- **Admin Panel** — Stats dashboard, user/listing/order management with inline status updates
- **Auth** — Email/password login with password reset

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** SQLite + Prisma ORM
- **Auth:** NextAuth.js v5 (Credentials provider)
