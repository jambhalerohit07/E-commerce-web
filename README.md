# Online Shopping — React + Vite

Pixel-faithful recreation of the Online Shopping design with Vite 5, React 18, and Lucide icons.

## Quick Start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build → dist/
npm run preview    # preview production build
```

## Features

| Feature | Detail |
|---|---|
| **Debounced search** | 400 ms debounce via `useDebounce` hook; spinner shows while typing |
| **32 products** | Across 8 categories; simulated async load with skeleton |
| **Pagination** | 8 per page, smart ellipsis, resets on filter/search change |
| **Header** | Sticky, dark topbar, orange nav bar, hamburger drawer on mobile |
| **Hero** | Auto-sliding carousel, 3 slides, arrows + dots |
| **Categories** | Scrollable grid with prev/next arrows |
| **Media Banner** | Full-width image with play button |
| **Offers** | 3-card carousel with prev/next nav |
| **Testimonials** | Auto-rotating reviews, dot indicators |
| **Newsletter** | Above footer, 3-col layout (form + 2 banners) + product strip, email validation |
| **Footer** | Partner logos bar, 4-col links, social icons, legal bar |
| **Responsive** | Desktop / Tablet / Mobile all breakpoints |
| **Accessible** | Semantic HTML5, aria-*, focus states, sr-only, min 40px touch targets |

## Project Structure

```
src/
├── main.jsx
├── App.jsx
├── styles/            reset.css · vars.css (design tokens)
├── hooks/             useDebounce.js
├── data/              products.json (32 items)
└── components/
    ├── Header/        Header.jsx + Header.css
    ├── Hero/          Hero.jsx + Hero.css
    ├── Categories/    Categories.jsx + Categories.css
    ├── Products/      Products.jsx + Products.css
    ├── MediaBanner/   MediaBanner.jsx + MediaBanner.css
    ├── Offers/        Offers.jsx + Offers.css
    ├── Testimonials/  Testimonials.jsx + Testimonials.css
    ├── Newsletter/    Newsletter.jsx + Newsletter.css
    └── Footer/        Footer.jsx + Footer.css
```
