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
  components/common/       Header, Footer, ProductsTab (grid), ProductCard, ProductImage
  pages/                   Home, Shop, ProductDetails, Cart, About, Contact, Login, Signup
  utility/Animations.js    the three entrance animations
public/products/           backup copies of the product pictures (filled by npm run download-images)
public/placeholder.svg     shown when a picture cannot load
scripts/                   one-time helper that downloads the pictures
```

## Backup product data (when the API is down)

The API is unpredictable. If it fails, the site shows the products saved in `src/data/products.json`.
The product pictures live on the same server as the API, so they need a local copy too.

1. Open https://fakestoreapi.com/products in the browser, copy the whole response and paste it into
   `src/data/products.json`, replacing the `[]`. It must stay valid JSON.
2. While the API is working, run `npm run download-images`. It saves every picture into `public/products/`
   (it uses the file name from the end of each picture link, so you do not need to edit the JSON).

How it works:

- API works: the site uses the API data and the pictures from the internet, as usual.
- API fails: the site uses `products.json` and the pictures in `public/products/`.
- A single picture cannot load (even when the API works): `ProductImage.jsx` tries the local copy in `public/products/`, then shows `public/placeholder.svg` ("Image unavailable") instead of a broken-image icon.
- `products.json` is still `[]` and the API fails: the site shows "We couldn't load the products" with a Try Again button.

`scripts/download-images.mjs` is only a one-time helper and is not part of the website. You can delete it afterwards.
