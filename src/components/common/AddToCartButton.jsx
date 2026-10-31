import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ClickSpark from '../reactbits/ClickSpark'

// ANIMATION (React Bits ClickSpark + a short "Added" state): one "Add to Cart" button used on the product
// cards and on the product page, so it behaves the same everywhere.
//  - ClickSpark draws a small burst of orange sparks where you click (it is a tiny canvas that removes itself).
//  - For 1.4 seconds after a click the label swaps to a check mark + "Added", then settles on "In cart (n)".
//    The "Added to cart" toast (CartToast) is the screen-reader announcement; this is the instant feedback.
// Props: onAdd = adds the product; quantityInCart = how many are already in the cart;
// inCartText = (quantity) => label for the "already in the cart" state; className = classes for the <button>;
// sparkClassName = classes for the wrapper that ClickSpark puts around the button (use it for flex sizing).
const AddToCartButton = ({
  onAdd,
  quantityInCart = 0,
  inCartText = (quantity) => `In cart (${quantity})`,
  className = '',
  sparkClassName = '',
}) => {
  const [justAdded, setJustAdded] = useState(false)
  const timer = useRef(0)

  // Do not leave a timer running if the button disappears (for example when the visitor changes page).
  useEffect(() => () => clearTimeout(timer.current), [])

  const handleClick = () => {
    onAdd()
    setJustAdded(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setJustAdded(false), 1400)
  }

  let label = 'Add to Cart'
  if (quantityInCart > 0) label = inCartText(quantityInCart)
  if (justAdded) label = 'Added'

  return (
    <ClickSpark
      sparkColor="#FF6B3D"
      sparkCount={8}
      sparkRadius={26}
      sparkSize={9}
      sparkWidth={2}
      duration={450}
      className={sparkClassName}
    >
      <button type="button" onClick={handleClick} className={`btn-primary ${className}`}>
        {/* mode="wait": the old label leaves (120ms) before the new one arrives, so the button never shows two labels. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            className="inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
          >
            {justAdded && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="size-4"
              >
                <path d="m5 13 4 4L19 7" />
              </svg>
            )}
            {label}
          </motion.span>
        </AnimatePresence>
      </button>
    </ClickSpark>
  )
}

export default AddToCartButton
