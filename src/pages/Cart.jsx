import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import { ProductContext } from '../context/ProductContext'
import ProductImage from '../components/common/ProductImage'
import ProductsTab from '../components/common/ProductsTab'

// PLACEHOLDER shop rules: free delivery from $50, otherwise a flat $5. Change them here.
const freeDeliveryFrom = 50
const deliveryFee = 5

const money = (amount) => `$${amount.toFixed(2)}`

// Shortcuts shown when the cart is empty ("value" must match the API's category text).
const shortcuts = [
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelry' },
  { value: "men's clothing", label: 'Men’s clothing' },
  { value: "women's clothing", label: 'Women’s clothing' },
]

const Cart = () => {
  const { items, totalItems, subtotal, changeQuantity, removeFromCart, clearCart } = useContext(CartContext)
  const { products, loading, error, getProducts } = useContext(ProductContext)
  // Shows a short message after pressing Checkout (checkout is a demo).
  const [checkedOut, setCheckedOut] = useState(false)

  const delivery = subtotal >= freeDeliveryFrom ? 0 : deliveryFee
  const total = subtotal + delivery
  // How far the progress bar is filled (0 to 100) on the way to free delivery.
  const progress = Math.min(100, (subtotal / freeDeliveryFrom) * 100)

  // Text next to the page title.
  let countText = `${totalItems} items`
  if (totalItems === 0) countText = 'Nothing here yet.'
  if (totalItems === 1) countText = '1 item'

  // Suggestions for the empty cart: the 4 best rated products.
  const popular = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 4)

  return (
    <div className="motion-safe:animate-rise">
      {/* Same slim dark bar as the Shop page (consistency). */}
      <header className="bg-pine text-paper">
        <div className="page-container">
          {/* WIDTH FIX: title and content share a centred 1024px box (max-w-5xl). */}
          <div className="mx-auto flex max-w-5xl items-baseline gap-3 py-4">
            <h1 className="font-display text-2xl font-extrabold tracking-tight stretch-wide sm:text-3xl">
              Your cart
            </h1>
            <p className="text-sm text-paper/80">{countText}</p>
          </div>
        </div>
      </header>

      <div className="page-container py-6">
        {items.length === 0 ? (
          <>
            {/* EMPTY CART banner: stays in the centred 1024px box. */}
            <div className="mx-auto max-w-5xl">
              <div className="grid items-center gap-6 rounded-3xl border border-line bg-white p-6 sm:p-8 lg:grid-cols-2 lg:gap-10">
                <img
                  src="/images/empty-cart.webp"
                  alt=""
                  width="800"
                  height="600"
                  className="mx-auto w-full max-w-sm lg:max-w-none"
                />
                <div>
                  <p className="eyebrow">Cart</p>
                  <h2 className="section-title">Your cart is empty</h2>
                  <p className="mt-3 max-w-md text-base text-muted">
                    Nothing here yet. Pick a category to start, or add one of the popular products below.
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {shortcuts.map((shortcut) => (
                      <Link
                        key={shortcut.value}
                        to={`/shop?category=${shortcut.value}`}
                        className="inline-flex min-h-11 items-center rounded-full border border-line bg-paper px-4 text-sm font-semibold transition duration-200 hover:border-ink/40"
                      >
                        {shortcut.label}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link to="/shop" className="btn-primary">Browse the shop</Link>
                    <span className="text-sm text-muted">Free delivery over $50 · 30-day returns</span>
                  </div>
                </div>
              </div>
            </div>

            {/* POPULAR PRODUCTS: full page width (same as the Shop page) so 4 cards fit in one row. */}
            <section className="mt-10 flex flex-col">
              <div className="mb-6">
                <p className="eyebrow">Popular right now</p>
                <h2 className="section-title">Start with a favourite</h2>
              </div>
              <ProductsTab
                products={popular}
                loading={loading}
                error={error}
                getProducts={getProducts}
                placeholders={4}
              />
            </section>
          </>
        ) : (
          <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[1fr_21rem]">
            <div>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 rounded-2xl border border-line bg-white p-4">
                    <Link to={`/shop/${item.id}`} className="block size-20 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:size-24">
                      <ProductImage src={item.image} alt="" className="size-full object-contain p-2 mix-blend-multiply" />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link to={`/shop/${item.id}`} className="line-clamp-2 font-display text-base leading-snug font-semibold transition-colors hover:text-pine">
                        {item.title}
                      </Link>
                      <p className="mt-1 text-sm text-muted">{money(item.price)} each</p>

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="inline-flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label={`Remove one ${item.title}`}
                            className="tap-target text-lg"
                          >
                            &minus;
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label={`Add one more ${item.title}`}
                            className="tap-target text-lg"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-display text-lg font-bold tabular-nums">{money(item.price * item.quantity)}</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.title} from the cart`}
                      className="tap-target self-start text-xl text-muted hover:text-ink"
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>

              <Link to="/shop" className="link-action mt-3">&larr; Continue shopping</Link>
            </div>

            <aside className="rounded-3xl border border-line bg-white p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold">Order summary</h2>

              {/* Progress towards free delivery (the bar fills until the subtotal reaches the free-delivery amount). */}
              <div className="mt-4">
                <p className="text-sm text-muted">
                  {delivery === 0
                    ? 'You get free delivery on this order.'
                    : `Add ${money(freeDeliveryFrom - subtotal)} more for free delivery.`}
                </p>
                <div
                  className="mt-2 h-2 overflow-hidden rounded-full bg-well"
                  role="progressbar"
                  aria-label="Progress to free delivery"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow={Math.round(progress)}
                >
                  <div className="h-full rounded-full bg-signal transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted">Subtotal</dt>
                  <dd className="font-semibold tabular-nums">{money(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Delivery</dt>
                  <dd className="font-semibold tabular-nums">{delivery === 0 ? 'Free' : money(delivery)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-3 text-base">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl font-bold tabular-nums">{money(total)}</dd>
                </div>
              </dl>

              <button type="button" onClick={() => setCheckedOut(true)} className="btn-signal mt-5 w-full">
                Checkout
              </button>
              <p className="mt-3 text-center text-sm text-muted">No account needed to check out</p>
              {checkedOut && (
                <p role="status" className="mt-3 rounded-lg bg-well px-3 py-2 text-sm text-muted">
                  Demo only: checkout is not connected yet.
                </p>
              )}

              <ul className="mt-4 space-y-1 border-t border-line pt-4 text-sm text-muted">
                <li>Secure payment</li>
                <li>30-day easy returns</li>
                <li>Friendly support if you need help</li>
              </ul>

              <button type="button" onClick={clearCart} className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-sm font-semibold text-muted underline underline-offset-4 transition-colors hover:text-ink">
                Clear cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart