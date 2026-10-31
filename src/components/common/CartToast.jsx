import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CartContext } from '../../context/CartContext'
import ProductImage from './ProductImage'

const SHOW_FOR = 3500 // milliseconds the toast stays on screen

// UX CHANGE: "Added to cart" confirmation. Adding an item used to change only the label of the button, which is easy
// to miss (and invisible if the button is off screen). Now a small card slides in under the header, next to the cart
// button, with the product and a "View cart" link. Rules it follows:
//  - it sits in a polite live region (role="status"), so screen readers announce it;
//  - it stays while the mouse is over it or a keyboard user is inside it (WCAG: do not time out under someone);
//  - it only moves with opacity/transform, so it costs almost nothing, and MotionConfig turns the movement off
//    for visitors who asked for reduced motion.
const CartToast = () => {
  const { lastAdded, dismissToast } = useContext(CartContext)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!lastAdded || paused) return undefined
    const timer = setTimeout(dismissToast, SHOW_FOR)
    return () => clearTimeout(timer)
  }, [lastAdded, paused, dismissToast])

  // Closing by hand: also forget "paused", because the pointer/focus leaves together with the toast and
  // no "leave" event is sent for something that has just been removed from the page.
  const close = () => {
    setPaused(false)
    dismissToast()
  }

  return (
    // The live region stays in the page all the time (screen readers only announce changes inside an existing one).
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-[4.75rem] z-40">
      <div className="page-container flex justify-center sm:justify-end">
        <AnimatePresence>
          {lastAdded && (
            <motion.div
              key="cart-toast"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              onPointerEnter={() => setPaused(true)}
              onPointerLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              className="pointer-events-auto flex w-full items-center gap-3 rounded-2xl border border-line bg-white p-3 pr-2 shadow-xl shadow-ink/15 sm:w-[26rem]"
            >
              <span className="size-12 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                <ProductImage
                  src={lastAdded.image}
                  alt=""
                  className="size-full object-contain p-1 mix-blend-multiply"
                />
              </span>

              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-pine uppercase">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-3.5"
                  >
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                  Added to cart
                </p>
                <p className="mt-0.5 truncate text-sm font-medium">{lastAdded.title}</p>
              </div>

              <Link
                to="/cart"
                onClick={close}
                className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-pine px-4 text-sm font-semibold text-paper transition duration-200 hover:bg-pine-soft active:scale-95"
              >
                View cart
              </Link>
              <button
                type="button"
                onClick={close}
                aria-label="Dismiss"
                className="tap-target text-xl text-muted hover:text-ink"
              >
                &times;
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CartToast
