import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { motion } from 'framer-motion'
import ProductsTab from '../components/common/ProductsTab'
import { ProductContext } from '../context/ProductContext'
import { SlideUp, SlideLeft, SlideRight } from '../utility/Animations'

const slots = [
  { box: 'col-span-3 row-span-2 rounded-3xl', pad: 'p-6 lg:p-8' },
  { box: 'col-span-2 rounded-2xl', pad: 'p-4' },
  { box: 'col-span-2 rounded-2xl', pad: 'p-4' },
]


const Home = () => {
  const { products, loading, error, getProducts } = useContext(ProductContext)

  const electronics = products.filter((product) => product.category === 'electronics')
  const picks = (electronics.length >= 3 ? electronics : products).slice(0, 3)

  return (
    <>
      
      <section className="lg:h-[calc(100dvh-65px)] lg:max-h-[60rem] lg:min-h-[30rem]">
        
        <div className="page-container grid gap-8 py-10 sm:py-12 lg:h-full lg:grid-cols-[1fr_1.05fr] lg:grid-rows-[minmax(0,1fr)] lg:items-center lg:gap-10 lg:py-8">
          <div>
           
            <motion.h1
              variants={SlideUp(0)}
              initial="hidden"
              animate="visible"
              viewport={{ once: false }}
              className="font-display text-4xl leading-none font-extrabold tracking-tight text-balance stretch-wide sm:text-5xl xl:text-6xl"
            >
              Everyday gear, priced plainly.
            </motion.h1>

            {/* TAILWIND CHANGE: mt-6 -> mt-5, text-lg -> text-base lg:text-lg only on xl */}
            <motion.p
              variants={SlideUp(0.12)}
              initial="hidden"
              animate="visible"
              viewport={{ once: false }}
              className="mt-5 max-w-lg text-base text-pretty text-muted xl:text-lg"
            >
              Electronics, jewelry and clothing in one catalogue. Every product shows its
              price first, so you can compare before you click.
            </motion.p>

            <motion.div
              variants={SlideUp(0.24)}
              initial="hidden"
              animate="visible"
              viewport={{ once: false }}
              className="mt-6 flex flex-wrap gap-3 lg:mt-7"
            >
              <Link to="/shop" className="btn-signal">Browse the shop</Link>
              <Link to="/about" className="btn-ghost">About Techno</Link>
            </motion.div>
          </div>

          {/* TAILWIND CHANGE (hero product grid): the fixed aspect-[5/4] made it taller than
              the screen on laptops. From lg it now fills the hero height (lg:h-full,
              lg:aspect-auto) with a lg:max-h cap; aspect ratio is kept on mobile. */}
          <div className="grid aspect-[5/4] grid-cols-5 grid-rows-2 gap-3 lg:aspect-auto lg:h-full lg:max-h-[40rem]">
            {slots.map((slot, index) => {
              const product = picks[index]
              return (
                <motion.div
                  key={index}
                  variants={SlideUp(index * 0.14)}
                  initial="hidden"
                  animate="visible"
                  viewport={{ once: false }}
                  className={`group relative overflow-hidden bg-well transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10 ${slot.box}`} /* HOVER CHANGE: each box is a group with a soft shadow on hover. The lift is NOT put on the box itself because its entrance animation keeps transform fixed after it ends */
                >
                  {product && (
                    <Link to={`/shop/${product.id}`} className="block size-full">
                      {/* HOVER CHANGE: product picture zooms 5% and the price tag nudges right when the box is hovered */}
                      <img
                        src={product.image}
                        alt={product.title}
                        className={`size-full object-contain mix-blend-multiply transition-transform duration-500 ease-out motion-safe:group-hover:scale-105 ${slot.pad}`}
                      />
                      <span className="price-tag absolute bottom-3 left-3 transition-transform duration-300 motion-safe:group-hover:translate-x-1">
                        ${product.price.toFixed(2)}
                      </span>
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* TAILWIND CHANGE (catalogue section): pb-24 removed; on laptops the section is one
          screen tall and the product row is centred vertically inside it. */}
      <section className="flex flex-col justify-center py-10 lg:min-h-[calc(100dvh-65px)]">
        <div className="page-container">
          {/* TAILWIND CHANGE: mb-10 -> mb-6 lg:mb-8 */}
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false}}
            className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2 lg:mb-8"
          >
            <h2 className="font-display text-2xl font-extrabold tracking-tight stretch-wide sm:text-3xl">
              From the catalogue
            </h2>
            <Link
              to="/shop"
              className="text-sm font-semibold underline decoration-signal decoration-2 underline-offset-4 transition-colors hover:text-pine hover:decoration-pine" /* HOVER CHANGE: text and underline switch to pine */
            >
              See all products
            </Link>
          </motion.div>

          <motion.div
            variants={SlideUp(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false}}
          >
            <ProductsTab
              products={products.slice(0, 4)}
              loading={loading}
              error={error}
              getProducts={getProducts}
              placeholders={4}
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-well">
        {/* TAILWIND CHANGE: py-16 -> py-10 lg:py-12, gap-8 -> gap-6 */}
        <div className="page-container flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center lg:py-12">
          <motion.div
            variants={SlideRight(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            className="max-w-xl"
          >
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-balance stretch-wide sm:text-3xl">
              Can’t find it in the catalogue?
            </h2>
            <p className="mt-2 text-base text-muted">
              Tell us what you’re after and we’ll look into it.
            </p>
          </motion.div>

          <motion.div
            variants={SlideLeft(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            <Link to="/contact" className="btn-primary">Contact us</Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Home