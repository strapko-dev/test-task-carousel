# Test Task Carousel

A clean Next.js project with modern stack.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **State Management:** Redux Toolkit
- **Styling:** SCSS (Sass)
- **Animations:** Framer Motion
- **Language:** TypeScript

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── page.module.scss    # Page styles
├── components/             # React components
│   ├── Counter/            # Example component with Redux
│   └── providers/          # Context providers
├── store/                  # Redux store
│   ├── features/           # Redux slices
│   ├── hooks.ts            # Typed hooks
│   ├── store.ts            # Store configuration
│   └── index.ts            # Store exports
└── styles/                 # Global styles
    ├── _variables.scss     # SCSS variables
    ├── _mixins.scss        # SCSS mixins
    └── globals.scss        # Global styles
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
