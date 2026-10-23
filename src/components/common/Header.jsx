import { Link } from "react-router-dom";


const navLinkClass =
  "relative py-1 font-medium text-muted transition-colors hover:text-ink after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-signal after:transition-transform after:duration-300 hover:after:scale-x-100";

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
     
      <div className="page-container flex flex-wrap items-center gap-x-4 gap-y-3 py-4 sm:gap-x-8 lg:h-16 lg:flex-nowrap lg:py-0">
        <Link
          to="/"
          className="order-1 font-display text-pine-soft text-2xl font-extrabold tracking-tight stretch-wide transition-opacity hover:opacity-75"
        >
          Techno
        </Link>

        <nav
          aria-label="Main"
          className="order-3 flex w-full items-center gap-6 text-sm sm:order-2 sm:ml-auto sm:w-auto sm:gap-8"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={navLinkClass}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="order-2 ml-auto flex items-center gap-2 sm:order-3 sm:ml-0 sm:gap-3">
          <Link
            to="/login"
            className="px-2 py-2 text-sm font-semibold underline-offset-4 transition-colors hover:text-pine hover:underline"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-ink/25 px-4 py-2 text-sm font-semibold transition duration-200 hover:border-ink active:scale-95 motion-safe:hover:-translate-y-0.5"
          >
            Sign up
          </Link>
          <Link
            to="/cart"
            className="group inline-flex items-center gap-2 rounded-full bg-pine px-3 py-2 text-sm font-semibold text-paper transition duration-200 hover:bg-pine-soft active:scale-95 motion-safe:hover:-translate-y-0.5 sm:px-4"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="size-4 transition-transform duration-200 motion-safe:group-hover:-rotate-12 motion-safe:group-hover:scale-110"
            >
              <path d="M6 8h12l-1 12H7L6 8Z" />
              <path d="M9 8V7a3 3 0 0 1 6 0v1" />
            </svg>
            <span className="sr-only sm:not-sr-only">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
