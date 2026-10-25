# Mercato (React + Vite + Tailwind CSS)

A small online shop that sells electronics, jewelry and clothing. Products come from https://fakestoreapi.com/products.

## Run it

```
npm install
npm run dev
```

## Where things are

```
src/
  main.jsx                 starts the app and wraps it in the providers below
  App.jsx                  the list of pages (routes)
  index.css                Tailwind + the shared styles (buttons, fields, section spacing, sizing rules)
  layout/RootLayout.jsx    header + page + footer
  context/
    ProductContext.jsx     loads the products (API first, backup file if the API fails)
    CartContext.jsx        the cart: add, change quantity, remove, clear (saved in the browser)
  data/products.json       BACKUP copy of the API response (see below)
  components/common/       Header, Footer, ProductsTab (grid), ProductCard
  pages/                   Home, Shop, ProductDetails, Cart, About, Contact, Login, Signup
  utility/Animations.js    the three entrance animations
```

## Backup product data (when the API is down)

The API is unpredictable. If it fails, the site shows the products saved in `src/data/products.json`.

1. Open https://fakestoreapi.com/products in the browser.
2. Copy the whole response.
3. Paste it into `src/data/products.json`, replacing the `[]`.

If the file is still `[]` and the API fails, the site shows the "We couldn't load the products" message with a Try Again button.
