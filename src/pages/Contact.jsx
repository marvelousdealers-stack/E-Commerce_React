
const Contact = () => {
  return (
    // TAILWIND CHANGE: wrapper fits one laptop screen (pt-12 pb-24 -> py-10, lg centred, min-h = 100dvh - 65px header)
    // ANIMATION CHANGE: the whole page fades in and slides up 14px once on load (motion-safe:animate-rise)
    <div className="page-container py-10 motion-safe:animate-rise lg:grid lg:min-h-[calc(100dvh-65px)] lg:content-center lg:py-8">
      {/* TAILWIND CHANGE: gap-12/lg:gap-20 -> gap-8/lg:gap-12 */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-center">
        <div>
          <h1 className="font-display text-4xl leading-none font-extrabold tracking-tight text-balance stretch-wide sm:text-5xl xl:text-6xl">
            Write to us
          </h1>
          <p className="mt-4 max-w-md text-base text-pretty text-muted">
            Ask about a product, report a wrong detail, or tell us what you can’t find.
            Leave an email address so we can reply.
          </p>
        </div>

        
        <form onSubmit={(event) => event.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="name" className="text-sm font-semibold">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required className="field" />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-semibold">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required className="field" />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-semibold">Message</label>
            <textarea id="message" name="message" rows={6} required className="field h-32 resize-none lg:h-28" /* TAILWIND CHANGE: fixed shorter height (h-32, lg:h-28) so the whole form fits the laptop screen; resize-none stops the user stretching it off-screen */ />
          </div>
          <button type="submit" className="btn-primary">Send message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact
