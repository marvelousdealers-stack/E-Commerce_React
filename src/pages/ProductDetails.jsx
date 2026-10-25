import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'
import { CartContext } from '../context/CartContext'


const ProductDetails = () => {
  const { id } = useParams()
  const { products, loading, error, getProducts } = useContext(ProductContext)
  const product = products.find((item) => String(item.id) === id)
  // CART: addToCart adds this product; inCart is its cart entry (undefined if not added yet).
  const { items, addToCart } = useContext(CartContext)
  const inCart = items.find((item) => item.id === product?.id)

  const backLink = (
    <Link
      to="/shop"
      className="inline-flex min-h-11 items-center text-sm font-semibold underline decoration-line decoration-2 underline-offset-4 transition duration-200 hover:decoration-signal motion-safe:hover:-translate-x-1" /* HOVER CHANGE: link nudges 4px left (toward "back") */
    >
      Back to shop
    </Link>
  )

  if (loading) {
    return (
      <div className="page-container py-10 lg:py-8">
        <div role="status" aria-live="polite" className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <p className="sr-only">Loading product</p>
          <div className="aspect-square w-full rounded-3xl bg-well motion-safe:animate-pulse lg:max-w-[min(100%,calc(100svh-11rem),36rem)] lg:justify-self-center" /* TAILWIND CHANGE: skeleton is square and capped like the real image */ />
          <div className="space-y-4">
            <div className="h-10 w-3/4 rounded-lg bg-well motion-safe:animate-pulse" />
            <div className="h-5 w-1/4 rounded-lg bg-well motion-safe:animate-pulse" />
            <div className="h-24 w-full rounded-lg bg-well motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container py-10 lg:py-8">
        <div role="alert" className="max-w-md rounded-2xl bg-alert-well p-8">
          <h1 className="font-display text-xl font-bold text-alert">We couldn’t load this product</h1>
          <p className="mt-2 text-sm text-alert">{error}</p>
          <button
            onClick={getProducts}
            className="mt-6 rounded-full bg-alert px-5 py-3 text-sm font-semibold text-paper transition duration-200 hover:bg-alert/85 active:scale-95 motion-safe:hover:-translate-y-0.5" /* HOVER CHANGE: lift on hover, press on click */
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="page-container py-10 lg:py-8">
        <h1 className="font-display text-2xl font-extrabold tracking-tight stretch-wide sm:text-3xl">
          We couldn’t find that product
        </h1>
        <p className="mt-3 mb-8 max-w-md text-muted">
          It may have been removed. Browse the shop to see what’s available.
        </p>
        {backLink}
      </div>
    )
  }

  return (
    // TAILWIND CHANGE: pt-8 pb-24 -> py-6; the page now fits one laptop screen (no scrolling to see the price/button)
    // ANIMATION CHANGE: the product page fades in and slides up 14px once on load
    <div className="page-container py-6 motion-safe:animate-rise lg:py-6">
      {/* TAILWIND CHANGE: mb-8 -> mb-4 */}
      <div className="mb-2">{backLink}</div>
      {/* TAILWIND CHANGE: gap-12/lg:gap-20 -> gap-8/lg:gap-12, lg:items-center to centre text beside the image */}
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
      
        {/* TAILWIND CHANGE (fixes the stretched image): the previous version fixed only the HEIGHT,
            so the width followed the column and the well became a wide rectangle. It now stays
            square on laptops (lg:aspect-square) and its width is capped to whichever is smallest:
            the column (100%), the visible height (100svh minus header, back link and padding
            = 11rem) or 36rem. lg:justify-self-center centres it in its column. */}
        <div className="group aspect-square w-full overflow-hidden rounded-3xl bg-well lg:max-w-[min(100%,calc(100svh-11rem),36rem)] lg:justify-self-center">
          <img
            src={product.image}
            alt={product.title}
            className="size-full object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-out motion-safe:group-hover:scale-105" /* HOVER CHANGE: slow 5% zoom when the image box is hovered */
          />
        </div>

        <div className="flex flex-col items-start">
          <p className="text-sm font-medium text-muted first-letter:uppercase">{product.category.replace('jewelery', 'jewelry') /* FIX: API spells it "jewelery" */}</p>
          <h1 className="mt-2 font-display text-2xl leading-tight font-extrabold tracking-tight text-balance stretch-wide sm:text-3xl">
            {product.title}
          </h1>
          {product.rating && (
            <p className="mt-3 text-sm text-muted">
              Rated {product.rating.rate} out of 5 ({product.rating.count} reviews)
            </p>
          )}
   
          <span className="price-tag mt-4 [--tag-hole:var(--color-paper)]">
            ${product.price.toFixed(2)}
          </span>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-pretty text-muted">
            {product.description}
          </p>
     
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button type="button" onClick={() => addToCart(product)} className="btn-primary">
              {inCart ? `In cart (${inCart.quantity}) · Add another` : 'Add to Cart'}
            </button>
            {inCart && (
              <Link to="/cart" className="link-action">
                View cart
              </Link>
            )}
          </div>
          {/* UI CHANGE: small reassurance list next to the buy button (trust signals) */}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li>Free delivery over $50</li>
            <li>30-day returns</li>
            <li>Secure payment</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
