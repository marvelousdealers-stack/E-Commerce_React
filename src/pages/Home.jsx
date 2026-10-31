import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import ProductsTab from '../components/common/ProductsTab'
import ProductImage from '../components/common/ProductImage'
import BlurText from '../components/reactbits/BlurText'
import Magnet from '../components/reactbits/Magnet'
import SpotlightCard from '../components/reactbits/SpotlightCard'
import { ProductContext } from '../context/ProductContext'
import { SlideUp, SlideLeft, SlideRight } from '../utility/Animations'

/*
  UI CHANGE (v3): the home page now has 8 sections instead of 3:
  hero -> trust strip -> shop by category -> top rated -> promo banner
  -> why us -> reviews -> final call to action.
  Design rules applied (from e-commerce homepage research):
  - clear value proposition above the fold, one main call to action
  - trust signals right under the hero
  - category entry points with real photos
  - text on photos always sits on a dark overlay (WCAG 4.5:1), and every photo
    section has a solid background colour underneath as a fallback if the image fails.
*/

// IMAGES: free Unsplash photos, loaded by URL. To change one, paste another URL here.
const images = {
  hero: '/images/shop-interior.webp',
  electronics: '/images/electronics.webp',
  jewelry: '/images/jewelry.webp',
  men: '/images/mens-clothing.webp',
  women: '/images/womens-clothing.webp',
  promo: '/images/electronics.webp',
  story: '/images/clothes-rack.webp',
  cta: '/images/watch.webp',
}

// One entry per product type. "value" must match the category text the API sends
// (the API spells it "jewelery"); "label" is what the visitor sees.
const categories = [
  { value: 'electronics', label: 'Electronics', image: images.electronics },
  { value: 'jewelery', label: 'Jewelry', image: images.jewelry },
  { value: "men's clothing", label: 'Men’s clothing', image: images.men },
  { value: "women's clothing", label: 'Women’s clothing', image: images.women },
]

// Small line icons (24x24 paths) for the trust strip.
const perks = [
  { title: 'Free delivery', text: 'On orders over $50', icon: 'M21 8 12 3 3 8v8l9 5 9-5V8ZM3 8l9 5 9-5M12 13v8' },
  { title: '30-day returns', text: 'Changed your mind? Send it back', icon: 'M3 12a9 9 0 1 0 3-6.7M3 4v5h5' },
  { title: 'Secure payment', text: 'Your details stay protected', icon: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3ZM9 12l2 2 4-4' },
  { title: 'Friendly support', text: 'We reply within 24 hours', icon: 'M4 5h16v11H9l-5 4V5Z' },
]

const reasons = [
  { title: 'Price first', text: 'Every product shows its price up front, so comparing two items takes seconds.' },
  { title: 'One catalogue', text: 'Electronics, jewelry and clothing in one place, with one cart.' },
  { title: 'Plain answers', text: 'Questions about an item go straight to us through the contact page.' },
]

// PLACEHOLDER reviews and avatars (drawn illustrations in public/images/): replace with real customers before launch.
const reviews = [
  { name: 'Amna R.', item: 'Electronics', avatar: '/images/avatar-amna.webp', text: 'The price was right on the card, so I compared three headphones in a minute and ordered the same day.' },
  { name: 'Daniel K.', item: 'Clothing', avatar: '/images/avatar-daniel.webp', text: 'Easy to browse by category. The jacket matched the photos and arrived quickly.' },
  { name: 'Sofia M.', item: 'Jewelry', avatar: '/images/avatar-sofia.webp', text: 'Bought a gift here. Simple checkout, nice packaging and no surprises on the price.' },
]

const Home = () => {
  const { products, loading, error, getProducts } = useContext(ProductContext)

  // UI FIX: the hero used the FIRST product of each type, which put a backpack under
  // "Men's clothing". It now uses the BEST RATED product of each type.
  const picks = categories.map((category) =>
    products
      .filter((product) => product.category === category.value)
      .sort((a, b) => b.rating.rate - a.rating.rate)[0]
  )

  // Highest rated 4 products for the catalogue section.
  // UI FIX: hero products are skipped here so the same product is not shown twice on one page.
  const topRated = products
    .filter((product) => !picks.includes(product))
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4)

  return (
    <>
      {/* 1. HERO: photo background + dark overlay. The overlay is darkest on the text side. */}
      {/* SIZING (round 7): hero = min-height (one screen minus the 64px header, capped at 56rem), never a fixed height,
            so tall content can never be clipped. svh keeps it stable on phones. */}
      <section className="relative isolate flex flex-col justify-center overflow-hidden bg-pine text-paper lg:min-h-[min(calc(100svh-65px),56rem)]">
        <img
          src={images.hero}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pine via-pine/85 to-pine/50" />

        <div className="page-container grid gap-8 py-10 sm:py-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-10 lg:py-10">
          <div>
            <motion.p
              variants={SlideUp(0)}
              initial="hidden"
              animate="visible"
              className="eyebrow text-signal"
            >
              New season · Free delivery over $50
            </motion.p>
            {/* REACT BITS (BlurText): the headline words fade in out of a blur, one after another (about 0.7s in total). */}
            <BlurText as="h1" className="display-title" text="Everything you need, priced plainly." startDelay={0.05} />

            <motion.p
              variants={SlideUp(0.3)}
              initial="hidden"
              animate="visible"
              className="mt-5 max-w-lg text-base text-pretty text-paper/80 xl:text-lg"
            >
              Electronics, jewelry and clothing in one catalogue. Every product shows its
              price first, so you can compare before you click.
            </motion.p>

            <motion.div
              variants={SlideUp(0.4)}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap gap-3 lg:mt-7"
            >
              {/* REACT BITS (Magnet): the main button leans a few pixels toward the cursor (off on touch screens and with "reduce motion"). */}
              <Magnet padding={50} magnetStrength={4} maxOffset={10}>
                <Link to="/shop" className="btn-signal">Shop now</Link>
              </Magnet>
              <Link to="/about" className="btn-ghost border-paper/40 text-paper hover:border-paper">
                Our story
              </Link>
            </motion.div>
          </div>

          {/* UI CHANGE: 3 big mixed tiles -> 4 equal tiles, one for EACH product type.
              While products load, each tile shows a pulsing placeholder. */}
          <div className="grid aspect-[5/4] grid-cols-2 grid-rows-2 gap-3 lg:aspect-[4/3]">
            {picks.map((product, index) => (
              <motion.div
                key={categories[index].value}
                variants={SlideUp(index * 0.12)}
                initial="hidden"
                animate="visible"
                className="group relative overflow-hidden rounded-2xl bg-paper shadow-lg shadow-ink/30 transition-shadow duration-300 hover:shadow-2xl [--tag-hole:var(--color-paper)]"
              >
                {product ? (
                  <Link to={`/shop/${product.id}`} className="block size-full">
                    <ProductImage
                      src={product.image}
                      alt={product.title}
                      className="size-full object-contain p-6 pt-12 pb-12 mix-blend-multiply transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-pine px-3 py-1 text-xs font-semibold text-paper">
                      {categories[index].label}
                    </span>
                    <span className="price-tag absolute bottom-3 left-3 transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                      ${product.price.toFixed(2)}
                    </span>
                  </Link>
                ) : (
                  <div className="size-full bg-well motion-safe:animate-pulse" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP: reassurance right under the hero. */}
      <section className="border-b border-line bg-white">
        <div className="page-container grid grid-cols-2 gap-x-6 gap-y-5 py-6 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-well text-pine">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path d={perk.icon} />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold">{perk.title}</p>
                <p className="text-sm text-muted">{perk.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY: photo tiles with a bottom overlay so the label is always readable. */}
      <section className="section-y">
        <div className="page-container">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2"
          >
            <div>
              <p className="eyebrow">Categories</p>
              <h2 className="section-title">Shop by category</h2>
            </div>
            <Link
              to="/shop"
              className="link-action"
            >
              See all products
            </Link>
          </motion.div>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.value}
                variants={SlideUp(index * 0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Link
                  to={`/shop?category=${category.value}`}
                  /* UI FIX: tiles are square on laptops so the whole section fits one screen; ring + shadow give the bright photos a visible edge. */
                  className="group relative isolate block aspect-[4/5] overflow-hidden rounded-2xl bg-pine shadow-md shadow-ink/10 ring-1 ring-ink/10 lg:aspect-square"
                >
                  <img
                    src={category.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-105"
                  />
                  <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
                  <div className="flex h-full flex-col justify-end p-4 text-paper sm:p-5">
                    <h3 className="font-display text-lg font-bold sm:text-xl">{category.label}</h3>
                    <span className="mt-1 text-sm text-paper/85 transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                      Shop now &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TOP RATED: the 4 best rated products from the catalogue. */}
      <section className="bg-white section-y">
        <div className="page-container">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2"
          >
            <div>
              <p className="eyebrow">Best sellers</p>
              <h2 className="section-title">Top rated right now</h2>
            </div>
            <Link
              to="/shop"
              className="link-action"
            >
              See all products
            </Link>
          </motion.div>

          <motion.div
            variants={SlideUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <ProductsTab
              products={topRated}
              loading={loading}
              error={error}
              getProducts={getProducts}
              placeholders={4}
            />
          </motion.div>
        </div>
      </section>

      {/* 5. PROMO BANNER: photo background + dark overlay, one message, one button. */}
      <section className="relative isolate overflow-hidden bg-ink section-y text-paper">
        <img
          src={images.promo}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-ink/95 via-ink/80 to-ink/60" />
        <div className="page-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <p className="eyebrow text-signal">This week</p>
            <h2 className="section-title">Free delivery on every order over $50.</h2>
            <p className="mt-3 text-base text-paper/80">
              Add a few favourites from any category and shipping is on us.
            </p>
          </motion.div>
          <motion.div
            variants={SlideLeft(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Magnet padding={50} magnetStrength={4} maxOffset={10}>
              <Link to="/shop" className="btn-signal">Start shopping</Link>
            </Magnet>
          </motion.div>
        </div>
      </section>

      {/* 6. WHY US: photo on one side, three short reasons on the other. */}
      <section className="section-y">
        <div className="page-container grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative isolate aspect-[4/3] overflow-hidden rounded-3xl bg-pine lg:aspect-[3/2]"
          >
            <img
              src={images.story}
              alt="Clothes on display in a store"
              loading="lazy"
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink/30 to-transparent" />
          </motion.div>

          <motion.div
            variants={SlideLeft(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="eyebrow">Why Mercato</p>
            <h2 className="section-title">A shop built around clear prices.</h2>
            <ul className="mt-6 space-y-5">
              {reasons.map((reason, index) => (
                <li key={reason.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-pine font-display text-sm font-bold text-paper">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">{reason.title}</h3>
                    <p className="mt-1 text-base text-muted">{reason.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary mt-7">More about us</Link>
          </motion.div>
        </div>
      </section>

      {/* 7. REVIEWS: social proof. */}
      <section className="bg-well section-y">
        <div className="page-container">
          <motion.div
            variants={SlideUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8 max-w-xl"
          >
            <p className="eyebrow">Reviews</p>
            <h2 className="section-title">What shoppers say</h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                variants={SlideUp(index * 0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* REACT BITS (SpotlightCard): a soft orange glow follows the cursor across the card and lights its border.
                    It only runs while the pointer is near the card. */}
                <SpotlightCard
                  as="figure"
                  theme="light"
                  spotlightColor="var(--color-signal)"
                  intensity={0.6}
                  spotlightSize={220}
                  className="flex h-full cursor-pointer flex-col rounded-2xl p-6"
                  style={{ '--spotlight-card-shadow': '0 1px 2px oklch(0.243 0.025 174 / 0.06)' }}
                >
                  <p aria-label="5 out of 5 stars" className="text-amber-500">★★★★★</p>
                  <blockquote className="mt-3 text-base text-pretty">“{review.text}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3 pt-5 text-sm">
                    <img
                      src={review.avatar}
                      alt=""
                      width="48"
                      height="48"
                      loading="lazy"
                      className="size-12 shrink-0 rounded-full object-cover ring-2 ring-well"
                    />
                    <span>
                      <span className="block font-semibold">{review.name}</span>
                      <span className="block text-muted">Bought {review.item.toLowerCase()}</span>
                    </span>
                  </figcaption>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION: photo background + dark overlay. */}
      <section className="relative isolate overflow-hidden bg-pine section-y text-paper">
        <img
          src={images.cta}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-pine/95 via-pine/85 to-pine/60" />
        <div className="page-container flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <h2 className="section-title">Can’t find it in the catalogue?</h2>
            <p className="mt-2 text-base text-paper/80">
              Tell us what you’re after and we’ll look into it.
            </p>
          </motion.div>

          <motion.div
            variants={SlideLeft(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/contact" className="btn-signal">Contact us</Link>
            <Link to="/shop" className="btn-ghost border-paper/40 text-paper hover:border-paper">
              Browse the shop
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home
