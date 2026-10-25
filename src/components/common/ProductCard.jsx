import { Link } from "react-router-dom";

// CART: onAddToCart is passed in by ProductsTab; quantityInCart is how many of this product are in the cart.
const ProductCard = ({ id, title, price, category, image, rating, onAddToCart, quantityInCart = 0 }) => {
  const detailsPath = `/shop/${id}`;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-4 transition duration-300 hover:border-ink/25 hover:shadow-xl hover:shadow-ink/10 motion-safe:hover:-translate-y-1">
      {/* UI FIX: the category pill used to sit on top of the picture and touched the product.
          It is now a small text line under the picture, so the whole picture area is free. */}
      <Link
        to={detailsPath}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-gray-50"
      >
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="size-full object-contain p-4 mix-blend-multiply transition-transform duration-500 ease-out motion-safe:group-hover:scale-105" /* HOVER/ANIMATION CHANGE: image zooms 5% while the card is hovered; the well has overflow-hidden so it never spills */
          />
        )}
      </Link>

      <p className="mt-3 px-1 text-sm font-semibold tracking-wide text-muted first-letter:uppercase">
        {category}
      </p>

      <h2 className="mt-1 line-clamp-2 px-1 font-display text-base leading-snug font-semibold">
        <Link
          to={detailsPath}
          className="transition-colors group-hover:text-pine"
        >
          {title}
        </Link>
      </h2>

      <div className="mt-auto pt-3">
        <div className="flex items-center justify-between px-1">
          <p className="font-display text-xl font-bold tracking-tight tabular-nums">
            ${price.toFixed(2)}
          </p>

          {rating && (
            <div className="flex items-center gap-1 text-sm font-semibold">
              <span className="text-amber-500">★</span>
              <span>{rating.rate}</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onAddToCart}
            className="btn-primary flex-1 px-3"
          >
            {quantityInCart > 0 ? `In cart (${quantityInCart})` : "Add to Cart"}
          </button>

          <Link
            to={detailsPath}
            className="btn-ghost flex-1 px-3"
          >
            More Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
