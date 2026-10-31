import { useState } from 'react'
import { Link } from 'react-router-dom'
import * as notify from '../utility/notify'

// IMAGE: local webp file in public/images/ (saved by `npm run download-images`).
const sideImage =
  '/images/shop-interior.webp'

const Login = () => {
  // "Show / Hide" button on the password field (one true/false value).
  const [showPassword, setShowPassword] = useState(false)

  // UX CHANGE (SweetAlert2): the grey note under the button is now a toast, so the message is announced to screen readers
  // and does not push the form around. There is no account system yet, and the toast says so.
  const handleSubmit = (event) => {
    event.preventDefault()
    notify.toast({
      icon: 'info',
      title: 'Demo only',
      text: 'No account system is connected yet, so nothing was saved.',
      timer: 5000,
    })
  }

  return (
    // FORM SIZING (round 7): the card is NOT stretched to the screen height. It is as tall as its form, with
    // comfortable space around it. Width: 448px on phones/tablets (max-w-md) and 896px on laptops (max-w-4xl),
    // which makes the form column about 370px wide (fields should be about 400px or less). Photo panel = lg and up.
    <div className="page-container py-8 motion-safe:animate-rise lg:py-12">
      <div className="mx-auto grid w-full max-w-md overflow-hidden rounded-3xl border border-line bg-white shadow-xl shadow-ink/10 lg:max-w-4xl lg:grid-cols-2">
        <div className="relative isolate hidden flex-col justify-between p-8 text-paper lg:flex xl:p-10">
          <img src={sideImage} alt="" className="absolute inset-0 -z-20 size-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-pine via-pine/80 to-pine/60" />
          <div className="flex items-center justify-between gap-4">
            <p className="font-display text-2xl font-extrabold tracking-tight stretch-wide">Mercato</p>
            <Link
              to="/"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-paper/30 bg-paper/10 px-4 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-paper/20"
            >
              <span aria-hidden="true">&lsaquo;</span> Back
            </Link>
          </div>
          <div>
            <h2 className="max-w-sm font-display text-3xl leading-[1.15] font-extrabold tracking-tight text-balance stretch-wide xl:text-4xl">
              Your orders and favourites, all in one place.
            </h2>
            <p className="mt-4 max-w-sm text-base text-paper/80">
              Log in to follow your orders and pick up where you left off.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="-ml-2 inline-flex min-h-11 items-center gap-1 px-2 text-sm font-semibold text-muted transition-colors hover:text-ink lg:hidden">
              <span aria-hidden="true">&lsaquo;</span> Back
            </Link>

            <p className="eyebrow mt-2 lg:mt-0">Log in</p>
            <h1 className="font-display text-3xl font-extrabold tracking-tight stretch-wide">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted">Log in to continue. Demo only: nothing you type is saved.</p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label htmlFor="email" className="field-label">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter your email address" required className="field" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="field-label">Password</label>
                  <Link to="/contact" className="link-action text-alert">Forgot password?</Link>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    className="field mt-0 pr-16"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-1 inline-flex min-h-11 -translate-y-1/2 items-center px-3 text-sm font-semibold text-muted transition-colors hover:text-ink"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" className="btn-signal w-full">Log in &rarr;</button>
            </form>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 border-t border-line pt-2 text-sm text-muted">
              <p>
                New to Mercato?{' '}
                <Link to="/signup" className="font-semibold text-alert underline-offset-4 hover:underline">
                  Create an account
                </Link>
              </p>
              <Link to="/shop" className="link-action text-alert">
                Continue as guest
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
