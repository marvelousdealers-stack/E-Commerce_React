import { useEffect, useRef, useState } from 'react'
import { animate, useReducedMotion } from 'framer-motion'

/*
  React Bits: CountUp (https://reactbits.dev/text-animations/count-up), MIT + Commons Clause.
  This is a LEAN version of it. The current React Bits file has a slot-machine "roll" mode, compact units, SVG blur
  filters and more (~12 KB); this site only needs "count smoothly to the new number", so that is all it does.
  It uses framer-motion's animate() (already installed), so no new package is added.

  How it behaves:
  - First render: shows the number straight away (no count-up from 0 on page load).
  - Whenever `value` changes (cart quantity, item removed...): counts from the number on screen to the new one in 0.5s.
  - The digits are written straight into the DOM node (no React re-render per frame), so it costs almost nothing.
  - Screen readers get ONE final value (visually hidden) instead of dozens of changing numbers.
  - With "reduce motion" turned on, the new number just appears.

  Props: value (number), prefix (e.g. "$"), decimals (default 2), duration (seconds), className.
*/
const ease = [0.22, 1, 0.36, 1]

const CountUp = ({ value, prefix = '', decimals = 2, duration = 0.5, className = '' }) => {
  const reduceMotion = useReducedMotion()
  const textRef = useRef(null)
  // The number currently drawn on screen. An interrupted animation continues from here, never from the old target.
  const shownRef = useRef(value)
  const format = (number) => `${prefix}${number.toFixed(decimals)}`
  // React only ever renders this first text. Later changes are written by the effect below (see "How it behaves").
  const [firstText] = useState(() => format(value))

  useEffect(() => {
    const node = textRef.current
    if (!node) return undefined

    const write = (number) => {
      shownRef.current = number
      node.textContent = `${prefix}${number.toFixed(decimals)}`
    }

    if (reduceMotion || shownRef.current === value) {
      write(value)
      return undefined
    }

    const controls = animate(shownRef.current, value, {
      duration,
      ease,
      onUpdate: write,
      onComplete: () => write(value),
    })
    return () => controls.stop()
  }, [value, prefix, decimals, duration, reduceMotion])

  return (
    <>
      <span ref={textRef} className={className} aria-hidden="true">
        {firstText}
      </span>
      <span className="sr-only">{format(value)}</span>
    </>
  )
}

export default CountUp
