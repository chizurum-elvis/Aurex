# Aurex — Real-Time Commodity Terminal

Aurex is an ultra-clean, minimalist market terminal dashboard optimized for monitoring real-time commodity indices, streaming live feeds, and evaluating historical charting metrics. Built with Next.js 14, TypeScript, and Tailwind CSS, it delivers a high-fidelity SaaS interface balanced with absolute performance and modern layout controls.

> **"Real-time commodity prices. All sources. One view."**

---

## 🚀 Key Features

- **Live Index Feed:** Real-time data streaming architectures highlighting immediate commodity market evaluation.
- **Unified Identity Management:** Powered securely by Clerk with multi-account isolation workflows.
- **Dynamic Context Scaling Profile:** User-specific state pipelines fallback seamlessly to primary authenticated handles (e.g., Gmail addresses) if custom localized profile updates have not been explicitly saved.
- **Synchronized Visual Branding:** Premium custom SVG brand mark typography carefully balanced and aligned inline with an optimized image asset loader context.
- **Global Layout Interactivity:** Persistent global layout state management using unified client-side state stores via Zustand (including dynamic responsive menu sidebar triggers).

---

## 🛠️ Tech Stack Architecture

- **Framework:** Next.js 14 (App Router Architecture)
- **Language:** TypeScript (Strict Type Boundaries)
- **Styling:** Tailwind CSS + Lucide Icons
- **State Management:** Zustand
- **Authentication & Security:** Clerk Authentication Engine

---

## 📁 Core Directory Map

```text
aurex-terminal/
├── app/
│   ├── dashboard/
│   │   ├── analytics/      # Historical charts tracking metrics
│   │   ├── explore/        # Commodity listing index modules
│   │   ├── watchlist/      # Personalized user monitoring vectors
│   │   └── layout.tsx      # Multi-account session waterfall routing setup
│   ├── layout.tsx          # Master template wrapper & Clerk Provider initialization
│   └── page.tsx            # Global platform landing gateway
├── components/
│   ├── AuthControls.tsx    # Session login & signup trigger interfaces
│   ├── Logo.tsx            # Inline structural branding typography layout
│   └── Navbar.tsx          # Top nav shell featuring dynamic breadcrumbs
├── context/
│   └── IdentityContext.tsx # User-isolated localized local storage profile engine
├── lib/
│   └── store.ts            # Global application UX sidebar triggers (Zustand)
├── public/
│   └── logo.png            # Premium high-resolution visual icon asset
└── types/
    └── index.ts            # Global core interface data shapes