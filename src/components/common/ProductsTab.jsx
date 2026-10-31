import { useContext } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';
import { CartContext } from '../../context/CartContext';

// Default grid (shop page). Other pages can pass their own via the gridClass prop.
// Each card rises in on its own with a restrained 80ms stagger, which also works when a filter swaps the products.
const defaultGrid = "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-10"

const ProductsTab = ({ products, loading, error, getProducts, placeholders = 8, gridClass = defaultGrid }) => {
    // CART: items = what is in the cart, addToCart = adds one more of a product.
    const { items, addToCart } = useContext(CartContext);

    if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p className="mb-6 text-sm text-muted">
          Loading products. Please wait while we fetch the latest gear...
        </p>
        <div className={gridClass}>
          {/* UX CHANGE: the placeholders copy the real card (picture, category, two title lines, price, two buttons),
              so nothing jumps when the products arrive (no layout shift), and a soft shimmer shows that it is loading. */}
          {Array.from({ length: placeholders }, (_, index) => (
            <div key={index} aria-hidden="true" className="flex flex-col rounded-2xl border border-line bg-white p-4">
              <div className="skeleton aspect-[4/3] rounded-xl" />
              <div className="skeleton mt-4 h-3.5 w-1/3 rounded" />
              <div className="skeleton mt-3 h-4 w-11/12 rounded" />
              <div className="skeleton mt-2 h-4 w-2/3 rounded" />
              <div className="skeleton mt-5 h-6 w-1/4 rounded" />
              <div className="mt-4 flex gap-2">
                <div className="skeleton h-11 flex-1 rounded-full" />
                <div className="skeleton h-11 flex-1 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    if (error) {
    return (
      <div
        role="alert"
        className="mx-auto my-8 flex w-full max-w-md flex-col items-center rounded-2xl bg-alert-well px-6 py-12 text-center"
      >
        <div
          aria-hidden="true"
          className="mb-4 flex size-12 items-center justify-center rounded-full bg-alert text-xl text-paper"
        >
          &times;
        </div>
        <h2 className="font-display text-lg font-bold text-alert">
          We couldn’t load the products
        </h2>
        <p className="mt-1 max-w-xs text-sm text-alert">{error}</p>
        <p className="mt-1 mb-6 max-w-xs text-sm text-alert">
          Check your connection, then try again.
        </p>
        <button
          onClick={getProducts}
          className="rounded-full bg-alert px-5 py-3 text-sm font-semibold text-paper transition duration-200 hover:bg-alert/85 active:scale-95 motion-safe:hover:-translate-y-0.5" /* HOVER CHANGE: lift on hover, press on click */
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((product, index) => {
        // How many of this product are already in the cart (0 if none).
        const inCart = items.find((item) => item.id === product.id)
        return (
          // Staggering is capped at 400ms, so long product lists never feel slow.
          // Only opacity + transform are animated (cheap for the browser). "Reduce motion" is handled by MotionConfig in main.jsx.
          <motion.div
            key={product.id}
            className="h-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index, 5) * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProductCard
              id={product.id}
              title={product.title}
              price={product.price}
              // FIX: the API spells it "jewelery"; shown to visitors as "jewelry".
              category={product.category.replace('jewelery', 'jewelry')}
              image={product.image}
              rating={product.rating}
              quantityInCart={inCart ? inCart.quantity : 0}
              onAddToCart={() => addToCart(product)}
            />
          </motion.div>
        )
      })}
    </div>
  );
};

export default ProductsTab;