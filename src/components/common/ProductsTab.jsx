import ProductCard from './ProductCard';

const gridClass = "grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-10 motion-safe:animate-rise"

const ProductsTab = ({ products, loading, error, getProducts, placeholders = 8 }) => {
    if (loading) {
    return (
      <div role="status" aria-live="polite">
        <p className="mb-6 text-sm text-muted">
          Loading products. Please wait while we fetch the latest gear...
        </p>
        <div className={gridClass}>
          {Array.from({ length: placeholders }, (_, index) => (
            <div key={index} className="h-72 rounded-2xl bg-well motion-safe:animate-pulse" />
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
          className="rounded-full bg-alert px-5 py-2.5 text-sm font-semibold text-paper transition duration-200 hover:bg-alert/85 active:scale-95 motion-safe:hover:-translate-y-0.5" /* HOVER CHANGE: lift on hover, press on click */
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
        
          specs={[
            `$${product.price.toFixed(2)}`,
            product.category
          ]}
          image={product.image}
          rating={product.rating}
        />
      ))}
    </div>
  );
};

export default ProductsTab;