import * as notify from "../utility/notify";
import BlurText from "../components/reactbits/BlurText";

// IMAGE: local webp file in public/images/ (saved by `npm run download-images`).
const heroImage = "/images/shop-interior.webp";

// UI CHANGE (v3): the contact page follows the "contact" inspiration image:
// dark banner with quick contact options -> form card + info cards -> FAQ -> trust strip.
// PLACEHOLDER details (phone, email, hours, answers): replace with the real ones before launch.

// UI FIX: the three cards used to have different heights (one text wrapped to two lines). Every card now has
// a round icon, one title and ONE short line, so they are equal. Phone and email are real links (tel: / mailto:).
const quickContacts = [
  {
    title: "Live chat",
    text: "Mon to Sat, 9:00 to 18:00",
    icon: "M4 5h16v11H9l-5 4V5Z",
  },
  {
    title: "Phone",
    text: "+1 (555) 010-0199",
    icon: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z",
    href: "tel:+15550100199",
  },
  {
    title: "Email",
    text: "hello@mercato.example",
    icon: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
    href: "mailto:hello@mercato.example",
  },
];

// The topic chips are radio buttons, so no JavaScript is needed to pick one.
const topics = [
  "Product question",
  "Order & delivery",
  "Returns",
  "Something else",
];

// The FAQ uses the browser's built-in <details> element: it opens and closes by itself.
const faqs = [
  {
    q: "How long does delivery take?",
    a: "Most orders arrive within a few working days. Orders over $50 ship free.",
  },
  {
    q: "Can I return an item?",
    a: "Yes. You have 30 days to send an item back if it is unused and in its original packaging.",
  },
  {
    q: "Is my payment secure?",
    a: "Payments are encrypted, and we never store your full card details.",
  },
  {
    q: "What if a product detail looks wrong?",
    a: "Tell us through the form above and we will check it against the catalogue and fix it.",
  },
];

const guarantees = [
  "Free delivery over $50",
  "30-day easy returns",
  "Secure payment",
  "Reply within 24 hours",
];

const Contact = () => {
  // UX CHANGE (SweetAlert2): after sending, a pop-up thanks the visitor by name and the form is cleared.
  // The form is a demo and nothing is sent, so the pop-up says so.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget; // grab it now: currentTarget is empty after the first await
    const name = new FormData(form).get("name");
    form.reset();
    await notify.notice({
      icon: "success",
      title: "Message received",
      text: `Thanks, ${name}. This is a demo, so your message was not actually sent.`,
      confirmText: "Done",
    });
  };

  // UX FIX: both "live chat" buttons did nothing when pressed. They now explain that chat is not connected
  // and offer the e-mail address instead.
  const handleLiveChat = async () => {
    const email = await notify.notice({
      icon: "info",
      title: "Live chat isn’t available yet",
      text: "Write to us at hello@mercato.example and we will reply within 24 hours.",
      confirmText: "Email us",
      cancelText: "Close",
    });
    if (email) window.location.href = "mailto:hello@mercato.example";
  };

  return (
    <div className="motion-safe:animate-rise">
      {/* Banner. SIZING (round 7): a top banner only: one screen at most, capped at 36rem, with a photo + dark overlay,
          two shortcut buttons (they scroll to the form or the FAQ) and the three contact cards. */}
      <section className="relative isolate flex flex-col justify-center overflow-hidden bg-pine text-paper section-y lg:min-h-[min(calc(100svh-65px),36rem)]">
        <img
          src={heroImage}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-ink/90 via-pine/85 to-pine/90" />
        <div className="page-container text-center">
          <p className="eyebrow text-signal">Customer help</p>
          <BlurText as="h1" className="mx-auto block max-w-3xl display-title" text="How can we help?" startDelay={0.05} />
          <p className="mx-auto mt-5 max-w-xl text-base text-pretty text-paper/80 lg:text-lg">
            Ask about a product, an order or a return. Send us a message, or
            reach us the way that suits you. We reply within 24 hours.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#message" className="btn-signal">
              Send a message
            </a>
            <a
              href="#faq"
              className="btn-ghost border-paper/40 text-paper hover:border-paper"
            >
              Read the FAQ
            </a>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            {quickContacts.map((item) => {
              // Cards with an href (phone, email) are links; the chat card is a button.
              const Card = item.href ? "a" : "button";
              const extraProps = item.href
                ? { href: item.href }
                : { type: "button", onClick: handleLiveChat };
              return (
                <Card
                  key={item.title}
                  {...extraProps}
                  className="flex min-h-16 w-full cursor-pointer items-center gap-3 rounded-xl border border-paper/15 bg-paper/10 px-4 py-3 text-left backdrop-blur-sm transition duration-200 hover:border-paper/40 hover:bg-paper/20 hover:shadow-lg hover:shadow-ink/20 focus-visible:ring-4 focus-visible:ring-paper/30 focus-visible:outline-none active:scale-[0.98] motion-safe:hover:-translate-y-0.5"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper/15">
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
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="min-w-0 text-left">
                    <span className="block text-sm font-semibold">
                      {item.title}
                    </span>
                    <span className="block truncate text-sm text-paper/80">
                      {item.text}
                    </span>
                  </span>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + info cards */}
      <section id="message" className="page-container scroll-mt-16 section-y">
        {/* FORM SIZING (round 8): centred 1024px box. Form takes the free width (about 670px), side cards 320px.
            Both columns stretch to the same height: the textarea (left) and the dark card (right) absorb the extra space.
            Name and Email sit side by side from the sm breakpoint; everything stacks on phones. */}
        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8"
          >
            <p className="eyebrow self-start">Send a message</p>
            <h2 className="section-title">Write to us</h2>

            <fieldset className="mt-6">
              <legend className="field-label">Topic</legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {topics.map((topic, index) => (
                  <label
                    key={topic}
                    className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-line bg-paper px-4 text-sm font-medium transition duration-200 hover:border-ink/40 has-checked:border-pine has-checked:bg-pine has-checked:text-paper has-focus-visible:ring-4 has-focus-visible:ring-pine/20"
                  >
                    <input
                      type="radio"
                      name="topic"
                      value={topic}
                      defaultChecked={index === 0}
                      className="sr-only"
                    />
                    {topic}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  required
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="email" className="field-label">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className="field"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              {/* id is "message-text" because the section above already uses id="message" (the scroll link target). */}
              <label htmlFor="message-text" className="field-label">
                Message
              </label>
              <textarea
                id="message-text"
                name="message"
                rows={6}
                minLength={10}
                placeholder="Tell us how we can help (at least 10 characters)"
                required
                className="field min-h-40 flex-1 resize-none"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto sm:px-8"
              >
                Send message &rarr;
              </button>
              <p className="text-sm text-muted">
                Your details stay private · Reply within 24 hours
              </p>
            </div>
          </form>

          <div className="flex flex-col gap-6">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-well px-3 py-1 text-xs font-semibold text-pine">
                <span
                  className="size-2 rounded-full bg-signal"
                  aria-hidden="true"
                />
                Support online
              </span>
              <h2 className="mt-4 font-display text-xl font-bold">
                Prefer a quick chat?
              </h2>
              <p className="mt-2 text-sm text-muted">
                Ask about sizes, stock or delivery and get an answer straight
                away.
              </p>
              <button type="button" onClick={handleLiveChat} className="btn-signal mt-5 w-full">
                Start live chat
              </button>
            </div>

            <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h2 className="font-display text-xl font-bold">
                Hours &amp; contact
              </h2>
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
                  <dd className="text-muted">
                    Monday to Saturday, 9:00 to 18:00
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex-1 rounded-3xl bg-ink p-6 text-paper">
              <p className="text-xs font-semibold tracking-[0.18em] text-signal uppercase">
                Gifts &amp; bulk orders
              </p>
              <h2 className="mt-2 font-display text-xl font-bold">
                Buying for a team or event?
              </h2>
              <p className="mt-2 text-sm text-paper/75">
                Ordering 10 or more items? Choose “Something else” and tell us
                what you need.
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
                    <span className="mr-3 font-display text-signal">
                      0{index + 1}
                    </span>
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
  );
};

export default Contact;
