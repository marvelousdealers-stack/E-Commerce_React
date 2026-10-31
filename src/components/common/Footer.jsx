import { Link } from "react-router-dom";

const footerLinkClass =
  "inline-flex min-h-11 items-center underline-offset-4 transition duration-200 hover:text-paper hover:underline focus-visible:outline-paper motion-safe:hover:translate-x-1";

// UI CHANGE: the footer now has 4 link columns (Shop, Categories, Company, Account).
// Category links open the shop already filtered (/shop?category=...).
const columns = [
  {
    title: "Shop",
    links: [
      { to: "/", label: "Home" },
      { to: "/shop", label: "All products" },
      { to: "/cart", label: "Cart" },
    ],
  },
  {
    title: "Categories",
    links: [
      { to: "/shop?category=electronics", label: "Electronics" },
      { to: "/shop?category=jewelery", label: "Jewelry" },
      { to: "/shop?category=men's clothing", label: "Men’s clothing" },
      { to: "/shop?category=women's clothing", label: "Women’s clothing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { to: "/login", label: "Log in" },
      { to: "/signup", label: "Sign up" },
    ],
  },
];

const Footer = () => {
  return (
    /* UI FIX: bg-pine -> bg-ink so the footer no longer blends into the pine call-to-action above it */
    <footer className="bg-ink text-paper">
      <div className="page-container grid gap-8 py-12 lg:grid-cols-[1.4fr_2.6fr]">
        <div>
          {/* RENAME: Techno -> Mercato */}
          <p className="font-display text-3xl font-extrabold tracking-tight stretch-wide">
            Mercato
          </p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">
            Electronics, jewelry and clothing in one catalogue, with the price
            shown first.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-2 text-sm text-paper/70">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={footerLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="page-container flex flex-col items-center justify-between gap-1 py-4 text-sm text-paper/60 sm:flex-row">
          <p>&copy; 2026 Mercato</p>
          <p>Free delivery on orders over $50 · 30-day returns</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
