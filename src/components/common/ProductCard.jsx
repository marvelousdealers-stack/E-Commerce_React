import { Link } from "react-router-dom";

const ProductCard = ({ id, title, specs = [], image, rating }) => {
  const detailsPath = `/shop/${id}`;

  const [price, ...details] = specs;

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-3.5 transition duration-300 hover:border-ink/25 hover:shadow-xl hover:shadow-ink/10 motion-safe:hover:-translate-y-1">
      <div className="relative">
        <Link
          to={detailsPath}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-square overflow-hidden rounded-xl bg-gray-50 sm:aspect-[4/3]"  
        >
          {image && (
            <img
              src={image}
              alt=""
              loading="lazy"
              className="size-full object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out motion-safe:group-hover:scale-105" /* HOVER/ANIMATION CHANGE: image zooms 5% while the card is hovered; the well has overflow-hidden so it never spills */
            />
          )}
        </Link>
        {details.length > 0 && (
          <ul className="pointer-events-none absolute top-2.5 left-2.5 flex max-w-[calc(100%-1.25rem)] flex-wrap gap-1.5">
            {details.map((detail, index) => (
              <li
                key={index}
                className="truncate rounded-full bg-white/85 px-2.5 py-1 text-[11px] leading-none font-medium text-muted capitalize backdrop-blur-sm"
              >
                {detail}
              </li>
            ))}
          </ul>
        )}
      </div>

      <h2 className="mt-4 line-clamp-2 px-1 font-display text-[15px] leading-snug font-semibold">
        <Link
          to={detailsPath}
          className="transition-colors group-hover:text-pine"
        >
          {title}
        </Link>
      </h2>

      <div className="mt-auto pt-4">
        <div className="flex items-center justify-between px-1">
          {price && (
            <p className="font-display text-xl font-bold tracking-tight tabular-nums">
              {price}
            </p>
          )}

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
            className="btn-primary flex-1 px-3 py-2 text-[13px]"
          >
            Add to Cart
          </button>

          <Link
            to={detailsPath}
            className="btn-ghost flex-1 px-3 py-2 text-[13px]"
          >
            More Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
