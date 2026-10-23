import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    // TAILWIND CHANGE: wrapper fits one laptop screen (pt-12 pb-24 -> py-10, lg centred, min-h = 100dvh - 65px header)
    // ANIMATION CHANGE: the whole page fades in and slides up 14px once on load (motion-safe:animate-rise)
    <div className="page-container py-10 motion-safe:animate-rise lg:grid lg:min-h-[calc(100dvh-65px)] lg:content-center lg:py-8">
      {/* TAILWIND CHANGE: gap-12/lg:gap-20 -> gap-8/lg:gap-12 */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-center">
        <div>
          <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight text-balance stretch-wide sm:text-5xl xl:text-6xl">
            Log in
          </h1>
          <p className="mt-4 max-w-md text-base text-pretty text-muted">
            Welcome back. This is a demo page, so nothing you type is sent or saved.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-md space-y-4" /* TAILWIND CHANGE: space-y-6 -> space-y-4 */>
          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="field" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required className="field" />
          </div>
          <button type="submit" className="btn-primary w-full">Log in</button>
          {submitted && (
            <p role="status" className="rounded-lg bg-well px-4 py-3 text-sm text-muted">
              Demo only: no account system is connected yet.
            </p>
          )}
          <p className="text-sm text-muted">
            New to Techno?{' '}
            <Link to="/signup" className="font-semibold text-ink underline decoration-signal decoration-2 underline-offset-4">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
