import { Link } from 'react-router-dom'


const footerLinkClass =
  'inline-block underline-offset-4 transition duration-200 hover:text-paper hover:underline focus-visible:outline-paper motion-safe:hover:translate-x-1'

const Footer = () => {
  return (
    <footer className="bg-pine text-paper">
      <div className="page-container grid gap-8 py-10 md:grid-cols-[1.6fr_1fr] items-center justify-center">
        <div>
          
          <p className="font-display text-3xl font-extrabold tracking-tight stretch-wide">
            Techno
          </p>
          <p className="mt-3 max-w-xs text-sm text-paper/70">
            Electronics, jewelry and clothing in one catalogue, with the price shown first.
          </p>
        </div>

        <div className='grid grid-cols-3'>
           <nav aria-label="Browse">
          <h2 className="text-sm font-semibold">Browse</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-paper/70">
            <li><Link to="/" className={footerLinkClass}>Home</Link></li>
            <li><Link to="/shop" className={footerLinkClass}>Shop</Link></li>
            <li><Link to="/cart" className={footerLinkClass}>Cart</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company">
          <h2 className="text-sm font-semibold">Company</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-paper/70">
            <li><Link to="/about" className={footerLinkClass}>About</Link></li>
            <li><Link to="/contact" className={footerLinkClass}>Contact</Link></li>
          </ul>
        </nav>

        <nav aria-label="Account">
          <h2 className="text-sm font-semibold">Account</h2>
          <ul className="mt-3 space-y-1.5 text-sm text-paper/70">
            <li><Link to="/login" className={footerLinkClass}>Log in</Link></li>
            <li><Link to="/signup" className={footerLinkClass}>Sign up</Link></li>
          </ul>
        </nav>
        </div>
       
      </div>

      <div className="border-t border-paper/15">
        {/* TAILWIND CHANGE: py-6 -> py-4 */}
        <div className="page-container flex justify-center py-4 text-sm text-paper/60">
          &copy; 2026 Techno
        </div>
      </div>
    </footer>
  )
}

export default Footer
