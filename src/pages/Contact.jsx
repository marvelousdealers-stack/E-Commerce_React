import { useState } from 'react'

// IMAGE: free Unsplash photo behind the banner; paste another URL here to change it.
const heroImage =
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1600&q=70'

// UI CHANGE (v3): the contact page follows the "contact" inspiration image:
// dark banner with quick contact options -> form card + info cards -> FAQ -> trust strip.
// PLACEHOLDER details (phone, email, hours, answers): replace with the real ones before launch.

// UI FIX: the three cards used to have different heights (one text wrapped to two lines). Every card now has
// a round icon, one title and ONE short line, so they are equal. Phone and email are real links (tel: / mailto:).
const quickContacts = [
  { title: 'Live chat', text: 'Mon to Sat, 9:00 to 18:00', icon: 'M4 5h16v11H9l-5 4V5Z' },
  { title: 'Phone', text: '+1 (555) 010-0199', icon: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z', href: 'tel:+15550100199' },
  { title: 'Email', text: 'hello@mercato.example', icon: 'M3 6h18v12H3V6Zm0 0 9 7 9-7', href: 'mailto:hello@mercato.example' },
]

// The topic chips are radio buttons, so no JavaScript is needed to pick one.
const topics = ['Product question', 'Order & delivery', 'Returns', 'Something else']

// The FAQ uses the browser's built-in <details> element: it opens and closes by itself.
const faqs = [
  { q: 'How long does delivery take?', a: 'Most orders arrive within a few working days. Orders over $50 ship free.' },
  { q: 'Can I return an item?', a: 'Yes. You have 30 days to send an item back if it is unused and in its original packaging.' },
  { q: 'Is my payment secure?', a: 'Payments are encrypted, and we never store your full card details.' },
  { q: 'What if a product detail looks wrong?', a: 'Tell us through the form above and we will check it against the catalogue and fix it.' },
]

const guarantees = ['Free delivery over $50', '30-day easy returns', 'Secure payment', 'Reply within 24 hours']

const Contact = () => {
  // Shows a short confirmation after sending (the form is a demo, nothing is sent).
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSent(true)
  }

  return (
    <div className="motion-safe:animate-rise">
      {/* Banner. SIZING (round 7): a top banner only: one screen at most, capped at 36rem, with a photo + dark overlay,
          two shortcut buttons (they scroll to the form or the FAQ) and the three contact cards. */}
      <section className="relative isolate flex flex-col justify-center overflow-hidden bg-pine text-paper section-y lg:min-h-[min(calc(100svh-65px),36rem)]">
        <img src={heroImage} alt="" fetchPriority="high" className="absolute inset-0 -z-20 size-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/90 via-pine/85 to-pine/90" />
        <div className="page-container text-center">
          <p className="eyebrow text-signal">Customer help</p>
          <h1 className="mx-auto max-w-3xl display-title">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-paper/80 lg:text-lg">
            Ask about a product, an order or a return. Send us a message, or reach us
            the way that suits you. We reply within 24 hours.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#message" className="btn-signal">Send a message</a>
            <a href="#faq" className="btn-ghost border-paper/40 text-paper hover:border-paper">Read the FAQ</a>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {quickContacts.map((item) => {
              // Cards with an href (phone, email) are links; the chat card is a plain box.
              const Card = item.href ? 'a' : 'div'
              const linkStyle = item.href ? 'transition-colors hover:bg-paper/20' : ''
              return (
                <Card
                  key={item.title}
                  href={item.href}
                  className={`flex min-h-16 items-center gap-3 rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 backdrop-blur-sm ${linkStyle}`}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper/15">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-semibold">{item.title}</span>
                    <span className="block truncate text-sm text-paper/80">{item.text}</span>
                  </span>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Form + info cards */}
      <section id="message" className="page-container scroll-mt-16 section-y">
        {/* FORM SIZING (round 7): one column, fields about 400px wide (card 480px incl. padding), side cards 352px.
            On phones and tablets everything stacks in a 448px column. Forms are never stretched to the screen. */}
        <div className="mx-auto grid max-w-md gap-6 lg:max-w-none lg:grid-cols-[30rem_22rem] lg:justify-center">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="eyebrow">Send a message</p>
          <h2 className="section-title">Write to us</h2>

          <fieldset className="mt-5">
            <legend className="field-label">Topic</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <label
                  key={topic}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-paper px-4 text-sm font-medium transition duration-200 hover:border-ink/40 has-checked:border-pine has-checked:bg-pine has-checked:text-paper has-focus-visible:ring-4 has-focus-visible:ring-pine/20"
                >
                  <input type="radio" name="topic" value={topic} defaultChecked={index === 0} className="sr-only" />
                  {topic}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-5 space-y-4">
            <div>
              <label htmlFor="name" className="field-label">Name</label>
              <input id="name" name="name" type="text" autoComplete="name" placeholder="Your full name" required className="field" />
            </div>
            <div>
              <label htmlFor="email" className="field-label">Email</label>
              <input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required className="field" />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="message" className="field-label">Message</label>
            <textarea id="message" name="message" rows={5} minLength={10} placeholder="Tell us how we can help (at least 10 characters)" required className="field h-32 resize-none" />
          </div>

          <button type="submit" className="btn-primary mt-5 w-full">Send message &rarr;</button>
          {sent && (
            <p role="status" className="mt-4 rounded-lg bg-well px-4 py-3 text-sm text-muted">
              Demo only: your message was not sent, but this is where the confirmation would appear.
            </p>
          )}
          <p className="mt-4 text-center text-sm text-muted">Your details stay private · We reply within 24 hours</p>
        </form>

        <div className="space-y-6">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <span className="inline-flex items-center gap-2 rounded-full bg-well px-3 py-1 text-xs font-semibold text-pine">
              <span className="size-2 rounded-full bg-signal" aria-hidden="true" />
              Support online
            </span>
            <h2 className="mt-4 font-display text-xl font-bold">Prefer a quick chat?</h2>
            <p className="mt-2 text-sm text-muted">
              Ask about sizes, stock or delivery and get an answer straight away.
            </p>
            <button type="button" className="btn-signal mt-5 w-full">Start live chat</button>
          </div>

          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <h2 className="font-display text-xl font-bold">Hours &amp; contact</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="font-semibold">Phone</dt>
                <dd className="text-muted">+1 (555) 010-0199</dd>
              </div>
              <div>
                <dt className="font-semibold">Email</dt>
                <dd className="text-muted">hello@mercato.example</dd>
              </div>
              <div>
                <dt className="font-semibold">Opening hours</dt>
                <dd className="text-muted">Monday to Saturday, 9:00 to 18:00</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-3xl bg-ink p-6 text-paper">
            <p className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">Gifts &amp; bulk orders</p>
            <h2 className="mt-2 font-display text-xl font-bold">Buying for a team or event?</h2>
            <p className="mt-2 text-sm text-paper/75">
              Ordering 10 or more items? Choose “Something else” and tell us what you need.
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-16 bg-pine section-y text-paper">
        <div className="page-container max-w-2xl">
          <div className="text-center">
            <p className="eyebrow text-signal">FAQ</p>
            <h2 className="section-title">Questions we hear often</h2>
          </div>
          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <details
                key={faq.q}
                open={index === 0}
                className="group rounded-xl border border-paper/15 bg-paper/5 transition-colors open:bg-paper/10"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold marker:content-none [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-3 font-display text-signal">0{index + 1}</span>
                    {faq.q}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm text-paper/80">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-white">
        <div className="page-container grid grid-cols-2 gap-4 py-6 text-center text-sm font-semibold lg:grid-cols-4">
          {guarantees.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Contact
