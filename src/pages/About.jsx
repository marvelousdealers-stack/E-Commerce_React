import { Link } from 'react-router-dom'


const About = () => {
  return (
    // TAILWIND CHANGE: wrapper fits one laptop screen (pt-12 pb-24 -> py-10, lg centred, min-h = 100dvh - header)
    // ANIMATION CHANGE: the whole page fades in and slides up 14px once on load (motion-safe:animate-rise)
    <div className="page-container py-10 motion-safe:animate-rise lg:grid lg:min-h-[calc(100dvh-65px)] lg:content-center lg:py-8">
      {/* TAILWIND CHANGE: gap-12/lg:gap-20 -> gap-8/lg:gap-12 */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        {/* TAILWIND CHANGE: heading 5xl/6xl -> 4xl/5xl (xl:6xl) */}
        <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight text-balance stretch-wide sm:text-5xl xl:text-6xl">
          A shop that shows you the price first.
        </h1>

        {/* TAILWIND CHANGE: text-lg -> text-base, space-y-6 -> space-y-4 */}
        <div className="max-w-xl space-y-4 text-base leading-relaxed text-pretty text-muted lg:pt-2">
          <p>
            Techno is an online shop for electronics, jewelry and clothing. The whole
            catalogue lives in one place, and every product shows its price up front, so
            comparing two items takes seconds.
          </p>
          <p>
            Product details come straight from the catalogue. If something looks wrong,
            tell us and we’ll fix it.
          </p>
          <p>
            Have a question about an item? The contact page reaches us directly.
          </p>
          <div className="pt-1">
            <Link to="/shop" className="btn-primary">Browse the shop</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
