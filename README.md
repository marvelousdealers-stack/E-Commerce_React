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
  utility/notify.js        every SweetAlert2 toast and pop-up (cart, checkout, forms) in one place
  components/reactbits/    React Bits components used by the site (SpotlightCard, Magnet, BlurText, CountUp)
public/images/             site photos (.webp), review avatars, empty-cart illustration
public/products/           backup copies of the product pictures (filled by npm run download-images)
public/placeholder.svg     shown when a picture cannot load
scripts/                   one-time helper that downloads the pictures
```

## Pictures (all local, no outside links while the site runs)

- `public/images/*.webp`: the site photos (hero, categories, banners, login panels).
  `avatar-*.webp` (review profile pictures) and `empty-cart.webp` (empty cart illustration) are drawn illustrations that come with the project.
  The photos are free Unsplash photos that you download **once**: run `npm run download-images` (needs internet and Node 18+).
  Until you do, photo sections show a plain green background.
- `public/products/`: copies of the product pictures (see below).
- `public/placeholder.svg`: shown when a picture cannot load at all.

To use another site photo: put a `.webp` file in `public/images/` and change its path in the page (each page has an `images` object at the top).

## Backup product data (when the API is down)

The API is unpredictable. If it fails, the site shows the products saved in `src/data/products.json`.
The product pictures live on the same server as the API, so they need a local copy too.

1. Open https://fakestoreapi.com/products in the browser, copy the whole response and paste it into
   `src/data/products.json`, replacing the `[]`. It must stay valid JSON.
2. Run `npm run download-images` while the internet works. Besides the site photos it saves every product picture
   into `public/products/` (it uses the file name from the end of each picture link, so you do not need to edit the JSON).

How it works:

- API works: the site uses the API data and the pictures from the internet, as usual.
- API fails: the site uses `products.json` and the pictures in `public/products/`.
- A single picture cannot load (even when the API works): `ProductImage.jsx` tries the local copy in `public/products/`, then shows `public/placeholder.svg` ("Image unavailable") instead of a broken-image icon.
- `products.json` is still `[]` and the API fails: the site shows "We couldn't load the products" with a Try Again button.

`scripts/download-images.mjs` is only a one-time helper and is not part of the website. You can delete it afterwards.


## Animations and notifications (UI polish round)

Run `npm install` once after unpacking: this round adds one package, `sweetalert2`.

**React Bits** (https://reactbits.dev, source is copied into `src/components/reactbits/`, so nothing extra is installed):

| Component | Where | Notes |
| --- | --- | --- |
| BlurText (lean version) | hero heading on Home, About, Contact | one reveal per page, plain text for screen readers |
| Magnet | "Shop now" and "Start shopping" buttons on Home | off on touch screens and with "reduce motion" |
| SpotlightCard | review cards on Home | cursor-following glow, runs only while the pointer is near |
| CountUp (lean version) | subtotal and total on the Cart page | counts to the new number when the cart changes |

BlurText and CountUp are trimmed versions: the current React Bits files are 12 to 30 KB each because they ship many effects. These keep only what the site uses and run on framer-motion, which was already installed.
React Bits is MIT + Commons Clause: fine inside a website or app, but the components themselves may not be resold or repackaged.

**Other animation changes** (all opacity/transform only, and all switched off by "reduce motion" through `MotionConfig` in `main.jsx`):
header link underline glides between pages, phone menu fades in, cart badge pops on change, product cards rise in with a 40ms stagger,
cart rows slide in/out, About page sections reveal on scroll, loading placeholders copy the real card and shimmer.

**SweetAlert2** (`src/utility/notify.js`, themed with `--swal2-*` variables at the end of `index.css`):

- Add to cart: toast with a "View cart" button. Remove from cart: toast with "Undo" (the item returns to the same place).
- Clear cart: confirm dialog. Checkout: summary dialog, then a success dialog (still a demo; the text says so).
- Login and Sign up: "demo only" toast. Contact form: thank-you dialog; the two "live chat" buttons, which did nothing before, now open a dialog with the e-mail address.
- If the live API fails and the saved products are used, a toast tells the visitor.
