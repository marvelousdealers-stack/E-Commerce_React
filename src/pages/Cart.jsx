import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'
import ProductImage from '../components/common/ProductImage'

// PLACEHOLDER shop rules: free delivery from $50, otherwise a flat $5. Change them here.
const freeDeliveryFrom = 50
const deliveryFee = 5

const money = (amount) => `$${amount.toFixed(2)}`

const Cart = () => {
  const { items, totalItems, subtotal, changeQuantity, removeFromCart, clearCart } = useContext(CartContext)
  // Shows a short message after pressing Checkout (checkout is a demo).
  const [checkedOut, setCheckedOut] = useState(false)

  const delivery = subtotal >= freeDeliveryFrom ? 0 : deliveryFee
  const total = subtotal + delivery

  // Text next to the page title.
  let countText = `${totalItems} items`
  if (totalItems === 0) countText = 'Nothing here yet.'
  if (totalItems === 1) countText = '1 item'

  return (
    <div className="motion-safe:animate-rise">
      {/* Same slim dark bar as the Shop page (consistency). */}
      <header className="bg-pine text-paper">
        <div className="page-container">
          {/* WIDTH FIX: the cart rows stretched across the whole 1280px page. Title and content now share a centred 1024px box (max-w-5xl). */}
          <div className="mx-auto flex max-w-5xl items-baseline gap-3 py-4">
          <h1 className="font-display text-2xl font-extrabold tracking-tight stretch-wide sm:text-3xl">
            Your cart
          </h1>
          <p className="text-sm text-paper/80">
            {countText}
          </p>
          </div>
        </div>
      </header>

      <div className="page-container py-6">
        {items.length === 0 ? (
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-5 rounded-3xl bg-well p-6 sm:p-8">
            <div>
              <h2 className="font-display text-2xl font-bold">Your cart is empty</h2>
              <p className="mt-2 max-w-md text-muted">
                Add something from the shop and it will show up here.
              </p>
            </div>
            <Link to="/shop" className="btn-primary">Browse the shop</Link>
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[1fr_21rem]">
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

            <aside className="rounded-3xl border border-line bg-white p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-xl font-bold">Order summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
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

              {delivery > 0 && (
                <p className="mt-3 rounded-lg bg-well px-3 py-2 text-sm text-muted">
                  Add {money(freeDeliveryFrom - subtotal)} more for free delivery.
                </p>
              )}

              <button type="button" onClick={() => setCheckedOut(true)} className="btn-signal mt-5 w-full">
                Checkout
              </button>
              {checkedOut && (
                <p role="status" className="mt-3 rounded-lg bg-well px-3 py-2 text-sm text-muted">
                  Demo only: checkout is not connected yet.
                </p>
              )}
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
