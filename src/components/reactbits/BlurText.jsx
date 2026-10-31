import { motion, useReducedMotion } from 'framer-motion'

/*
  React Bits: BlurText (https://reactbits.dev/text-animations/blur-text), MIT + Commons Clause.
  This is a LEAN version of it. The current React Bits file is ~30 KB because it ships many effects; this keeps only
  the one this site needs (words fade in out of a blur, one after another) and uses framer-motion, which is
  already installed, so no new package is added.

  Why it is built this way (researched best practices):
  - Only ONE short reveal per page (about 0.8s in total): long hero animations delay the perceived load.
  - The real sentence is kept in a visually hidden <span>, and the animated words are aria-hidden, so screen readers,
    search engines, copy/paste and browser translation still see ONE normal heading.
  - With "reduce motion" turned on in the system settings, the text is simply shown (no blur, no movement).
  - Words are inline-block spans separated by normal spaces, so the heading still wraps and balances like normal text.

  Props: text (string), as (tag name, default "span"), className, delay (stagger per word, seconds),
         startDelay (seconds before the first word), inView (true = animate when scrolled into view instead of on load).
*/
const ease = [0.22, 1, 0.36, 1]

const BlurText = ({ text, as: Tag = 'span', className = '', delay = 0.08, startDelay = 0, inView = false }) => {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>
  }

  const words = text.split(' ')
  const trigger = inView ? { whileInView: 'visible', viewport: { once: true } } : { animate: 'visible' }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`}>
            {index > 0 && ' '}
            <motion.span
              className="inline-block"
              initial="hidden"
              {...trigger}
              variants={{
                hidden: { opacity: 0, y: -14, filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, delay: startDelay + index * delay, ease },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}

export default BlurText
