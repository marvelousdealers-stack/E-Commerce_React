# Mercato

Mercato is a responsive e-commerce demo for browsing electronics, jewelry, and clothing. It features a clean product catalogue, category filters, product details, and a persistent shopping cart.

## Features

- Browse products by category and view ratings, prices, and product details.
- Add products to a cart, adjust quantities, and review delivery costs.
- Keep cart contents between visits with browser `localStorage`.
- Load the catalogue from [Fake Store API](https://fakestoreapi.com/), with a local product-data fallback.
- Enjoy responsive layouts, motion effects, and support for reduced-motion preferences.
- Use the contact, login, and sign-up pages as part of the demo experience.

## Getting started

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run download-images` | Download the site and product images used by the demo. |

The image download script requires an internet connection. Existing image files are in `public/images/` and `public/products/`.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home |
| `/shop` | Product catalogue, with optional category filtering |
| `/shop/:id` | Product details |
| `/cart` | Shopping cart and demo checkout |
| `/about` | About Mercato |
| `/contact` | Contact form |
| `/login` | Demo sign-in page |
| `/signup` | Demo registration page |

## Catalogue and cart behavior

The catalogue is loaded from Fake Store API. If the request fails, Mercato uses the product data in [`src/data/products.json`](src/data/products.json). Product images are tried from their original URL first, then from `public/products/`, and finally from a placeholder.

The cart is stored in the browser's `localStorage`, so it persists across page reloads on the same browser. Category selections are represented in the shop URL; for example, `/shop?category=electronics`.

## Demo limitations

Mercato is a front-end demonstration, not a production storefront. Checkout is simulated: it does not process payments or create real orders. Login and registration are not connected to an authentication service, and the contact form does not submit to a backend. Product details and prices come from the external sample catalogue and may change.

## Tech stack

- React 19
- Vite 8
- React Router
- Tailwind CSS 4
- Framer Motion
- SweetAlert2

## Project structure

```text
src/
├── components/
│   ├── common/       Shared site and product components
│   └── reactbits/    Reusable visual effects
├── context/          Catalogue and cart state
├── data/             Local catalogue fallback
├── layout/           Shared page layout
├── pages/            Route-level pages
└── utility/          Animation and notification helpers
public/
├── images/           Site imagery
└── products/         Local product-image fallbacks
scripts/
└── download-images.mjs
```
