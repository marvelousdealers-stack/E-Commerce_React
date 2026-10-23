import { Link } from 'react-router-dom'


const Cart = () => {
  return (
    // TAILWIND CHANGE: wrapper fits one laptop screen (pt-12 pb-24 -> py-10, lg centred, min-h = 100dvh - 65px header)
    // ANIMATION CHANGE: the whole page fades in and slides up 14px once on load (motion-safe:animate-rise)
    <div className="page-container py-10 motion-safe:animate-rise lg:grid lg:min-h-[calc(100dvh-65px)] lg:content-center lg:py-8">
      {/* TAILWIND CHANGE: heading 5xl/6xl -> 4xl/5xl */}
      <h1 className="font-display text-4xl font-extrabold tracking-tight stretch-wide sm:text-5xl">
        Your cart
      </h1>
      <div className="mt-6 flex flex-col items-start gap-5 rounded-3xl bg-well p-6 sm:p-8" /* TAILWIND CHANGE: mt-12 -> mt-6, p-8/sm:p-12 -> p-6/sm:p-8 */>
        <div>
          <h2 className="font-display text-2xl font-bold">Your cart is empty</h2>
          <p className="mt-2 max-w-md text-muted">
            Add something from the shop and it will show up here.
          </p>
        </div>
        <Link to="/shop" className="btn-primary">Browse the shop</Link>
      </div>
    </div>
  )
}

export default Cart
