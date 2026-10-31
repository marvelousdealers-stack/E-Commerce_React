import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartContext } from "../../context/CartContext";

// UI CHANGE: links are NavLink, which tells us which page is open (isActive).
// The open page keeps its orange underline and darker text, so visitors always know where they are.
// The underline utilities are split between the two states so they never fight each other.
const navLinkBase =
  "relative inline-flex min-h-11 items-center font-medium transition-colors after:absolute after:inset-x-0 after:bottom-2 after:h-0.5 after:origin-left after:bg-signal after:transition-transform after:duration-300";

// ANIMATION CHANGE: the orange underline of the open page is now ONE shared element (framer-motion layoutId) that glides
// from the old link to the new one. Links that are not open still get the CSS hover underline.
const navLinkClass = ({ isActive }) =>
  `${navLinkBase} ${
    isActive
      ? "text-ink after:scale-x-0"
      : "text-muted hover:text-ink after:scale-x-0 hover:after:scale-x-100"
  }`;

// RESPONSIVE: the phone/tablet menu uses bigger rows (48px) and a soft background for the open page.
const mobileLinkClass = ({ isActive }) =>
  `flex min-h-12 items-center rounded-lg px-3 text-base font-medium transition-colors ${
    isActive ? "bg-well text-ink" : "text-muted hover:bg-well hover:text-ink"
  }`;

const links = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const Header = () => {
  const { totalItems } = useContext(CartContext);
  // RESPONSIVE: below 1024px the links move into a menu that opens with the button (one true/false value).
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);
  // UI CHANGE: the header gets a soft shadow once the page has scrolled, so it reads as floating above the content.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // UX: Escape closes the phone menu (expected keyboard behaviour for a disclosure menu).
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-md shadow-ink/10" : ""
      }`}
    >
      {/* The bar is always 64px tall (h-16) on every screen, so nothing wraps into extra rows on phones. */}
      <div className="page-container flex h-16 items-center gap-4">
        {/* RENAME: Techno -> Mercato (a market that sells more than tech). The small mark is the same tag shape as the favicon. */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 font-display text-pine-soft text-2xl font-extrabold tracking-tight stretch-wide transition-opacity hover:opacity-75"
        >
          <svg viewBox="0 0 32 32" aria-hidden="true" className="size-7">
            <rect width="32" height="32" rx="8" fill="currentColor" />
            <path d="M8 9h11l6 7-6 7H8z" fill="#FF6B3D" />
            <circle cx="12.5" cy="16" r="2" fill="#F6F8F3" />
          </svg>
          Mercato
        </Link>

        {/* Desktop links (hidden below 1024px) */}
        <nav aria-label="Main" className="hidden items-center gap-8 text-sm lg:ml-auto lg:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === "/"} className={navLinkClass}>
              {({ isActive }) => (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-2 h-0.5 bg-signal"
                      transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Link
            to="/login"
            className="hidden min-h-11 items-center px-3 text-sm font-semibold underline-offset-4 transition-colors hover:text-pine hover:underline lg:inline-flex"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="hidden min-h-11 items-center rounded-full border border-ink/25 px-5 text-sm font-semibold transition duration-200 hover:border-ink active:scale-95 motion-safe:hover:-translate-y-0.5 lg:inline-flex"
          >
            Sign up
          </Link>
          <Link
            to="/cart"
            onClick={closeMenu}
            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-pine px-4 text-sm font-semibold text-paper transition duration-200 hover:bg-pine-soft active:scale-95 motion-safe:hover:-translate-y-0.5 sm:px-5"
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
            {/* CART: shows how many items are in the cart */}
            {totalItems > 0 && (
              // ANIMATION CHANGE: key={totalItems} restarts this tiny "pop" every time the number changes (item added/removed).
              <motion.span
                key={totalItems}
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18 }}
                className="flex min-w-5 items-center justify-center rounded-full bg-signal px-1.5 text-xs font-bold text-ink"
              >
                {totalItems}
                <span className="sr-only"> items in cart</span>
              </motion.span>
            )}
          </Link>

          {/* Menu button (only below 1024px) */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-ink lg:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="size-5">
              {menuOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Phone/tablet menu. ANIMATION CHANGE: fades and slides down 8px (opacity + transform only, 180ms). */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            aria-label="Main"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="border-t border-line bg-paper lg:hidden"
          >
            <div className="page-container flex flex-col gap-1 py-3">
              {links.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.to === "/"} onClick={closeMenu} className={mobileLinkClass}>
                  {link.label}
                </NavLink>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
                <Link to="/login" onClick={closeMenu} className="btn-ghost">Log in</Link>
                <Link to="/signup" onClick={closeMenu} className="btn-signal">Sign up</Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
