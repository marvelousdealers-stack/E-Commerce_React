import { Link } from 'react-router-dom'

/*
  SIZING (round 7): only the top banner is tall (min-height = one screen minus the 64px header, capped at 44rem).
  "How we work" and "What we sell" are sized by their content: the cards use aspect ratios (3:4 on laptops,
  4:5 on tablets, 5:4 on phones), so they look the same on every screen and are never stretched or squeezed.
*/

// IMAGES: free Unsplash photos; paste another URL here to change one.
const images = {
  hero: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=70',
  electronics: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=70',
  jewelry: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=70',
  men: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=70',
  women: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=700&q=70',
  story: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=70',
  cta: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=70',
}

// Facts shown on the hero (placeholders for delivery and returns, same as the home page).
const facts = [
  { title: '4 categories', text: 'Electronics, jewelry, clothing' },
  { title: 'One cart', text: 'Everything checks out together' },
  { title: 'Free delivery', text: 'On orders over $50' },
  { title: '30-day returns', text: 'If it isn’t right' },
]

const steps = [
  {
    title: 'Browse by category',
    text: 'Start with electronics, jewelry or clothing. Each has its own filter.',
    to: '/shop',
    image: images.women,
  },
  {
    title: 'Compare at a glance',
    text: 'Price and rating sit on every card, so comparing takes seconds.',
    to: '/shop',
    image: images.electronics,
  },
  {
    title: 'Add to your cart',
    text: 'Your total and free-delivery progress update as you add items.',
    to: '/cart',
    image: images.jewelry,
  },
  {
    title: 'Ask us anything',
    text: 'Not sure about a detail? The contact page reaches us directly.',
    to: '/contact',
    image: images.story,
  },
]

// "value" must match the API's category text (it spells jewelry "jewelery").
const categories = [
  { value: 'electronics', label: 'Electronics', text: 'Phones, drives, monitors and more.', image: images.electronics },
  { value: 'jewelery', label: 'Jewelry', text: 'Rings, bracelets and gifts.', image: images.jewelry },
  { value: "men's clothing", label: 'Men’s clothing', text: 'Jackets, tees and everyday basics.', image: images.men },
  { value: "women's clothing", label: 'Women’s clothing', text: 'Tops, outerwear and seasonal picks.', image: images.women },
]

const About = () => {
  return (
    <div className="motion-safe:animate-rise">
      {/* 1. ABOUT MERCATO: full-screen photo banner with a dark overlay, plus four quick facts. */}
      <section className="relative isolate flex flex-col justify-center overflow-hidden bg-pine section-y text-paper lg:min-h-[min(calc(100svh-65px),44rem)]">
        <img src={images.hero} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pine via-pine/85 to-pine/50" />
        <div className="page-container">
          <p className="eyebrow text-signal">About Mercato</p>
          <h1 className="max-w-3xl display-title">
            A shop that shows you the price first.
          </h1>
          <p className="mt-5 max-w-xl text-base text-pretty text-paper/80 lg:text-lg">
            Mercato is an online shop for electronics, jewelry and clothing. The whole
            catalogue lives in one place, and every product shows its price up front.
          </p>

          <ul className="mt-8 grid max-w-3xl grid-cols-2 gap-3 lg:mt-10 lg:grid-cols-4">
            {facts.map((fact) => (
              <li key={fact.title} className="rounded-xl border border-paper/20 bg-paper/10 px-4 py-3 backdrop-blur-sm">
                <p className="text-sm font-semibold">{fact.title}</p>
                <p className="mt-1 text-sm text-paper/75">{fact.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. HOW WE WORK: heading + intro, then four equal photo cards (one per step). The whole card is one link. */}
      <section className="section-y">
        <div className="page-container">
          <div className="grid gap-4 lg:grid-cols-2 lg:items-end lg:gap-12">
            <div>
              <p className="eyebrow">How we work</p>
              <h2 className="section-title">Comparing should take seconds.</h2>
            </div>
            <p className="max-w-xl text-base text-pretty text-muted lg:justify-self-end">
              Prices sit at the top of every card and every product page, and product
              details come straight from the catalogue. Here is how shopping works.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title}>
                <Link
                  to={step.to}
                  className="group flex aspect-[5/4] w-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/10 motion-safe:hover:-translate-y-1 sm:aspect-[4/5] lg:aspect-[3/4]"
                >
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-pine">
                    <img
                      src={step.image}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 flex size-10 items-center justify-center rounded-full bg-signal font-display text-base font-bold text-ink shadow-md">
                      {index + 1}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="flex items-center justify-between gap-3 font-display text-lg font-bold">
                      {step.title}
                      <span aria-hidden="true" className="text-xl transition-transform duration-300 motion-safe:group-hover:translate-x-1">&rarr;</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{step.text}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. WHAT WE SELL: four cards of the SAME size (photo fills the card, compact text panel at the bottom). */}
      <section className="bg-white section-y">
        <div className="page-container">
          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
            <div>
              <p className="eyebrow">What we sell</p>
              <h2 className="section-title">Four categories, one cart</h2>
            </div>
            <Link to="/shop" className="link-action">See all products</Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.value}
                to={`/shop?category=${category.value}`}
                className="group flex aspect-[5/4] flex-col overflow-hidden rounded-2xl border border-line bg-paper transition duration-300 hover:border-ink/25 hover:shadow-lg hover:shadow-ink/10 motion-safe:hover:-translate-y-1 sm:aspect-[4/5] lg:aspect-[3/4]"
              >
                <div className="relative min-h-0 flex-1 overflow-hidden bg-pine">
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="flex items-center justify-between gap-3 font-display text-lg font-bold transition-colors group-hover:text-pine">
                    {category.label}
                    <span aria-hidden="true" className="text-xl transition-transform duration-300 motion-safe:group-hover:translate-x-1">&rarr;</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{category.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CLOSING CALL TO ACTION: same photo banner as the home page. */}
      <section className="relative isolate overflow-hidden bg-pine section-y text-paper">
        <img src={images.cta} alt="" loading="lazy" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pine/95 via-pine/85 to-pine/60" />
        <div className="page-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="section-title">Ready to look around?</h2>
            <p className="mt-2 text-base text-paper/80">Browse the catalogue or send us a question.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/shop" className="btn-signal">Browse the shop</Link>
            <Link to="/contact" className="btn-ghost border-paper/40 text-paper hover:border-paper">Contact us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
