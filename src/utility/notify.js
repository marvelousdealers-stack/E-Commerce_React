import Swal from 'sweetalert2'

/*
  NOTIFICATIONS (SweetAlert2, https://sweetalert2.github.io/)
  Every toast and pop-up on the site goes through this file, so they all look and behave the same.
  Pages never import sweetalert2 directly: they call toast(), added(), removed(), confirm() or notice().

  Researched rules this file follows:
  - TOASTS are for short, low-stakes feedback ("Added to cart"). They stay 3.5 to 6 seconds, pause while the mouse
    is over them OR a button inside has keyboard focus (WCAG 2.2.1 Timing Adjustable), and are announced to screen
    readers (SweetAlert2 gives toasts role="alert" + aria-live).
  - Anything the visitor can UNDO (removing an item) gets an "Undo" button in the toast, which beats a confirm dialog:
    no extra click for the normal case, and a mistake costs one click to fix.
  - DIALOGS (confirm / notice) are only for decisions that are hard to take back (clear the cart, place the order) or
    that need an explanation. Destructive dialogs focus "Cancel" first so a stray Enter key cannot destroy anything.
  - SweetAlert2 toasts never take keyboard focus. When the thing that was clicked disappears (the cart "x" button), focus
    would be lost, so the "Undo" button receives it (see focusActionIfFocusWasLost below).
  - "Reduce motion" in the system settings turns the animations and the progress bar off.
  - Titles are plain text (titleText / text), never HTML, so a product name coming from the API can never inject markup.
    Only `html` (used for the order summary) must be built from numbers you control.

  Colours, radius and shadow are set once in index.css (--swal2-* variables); sizes and fonts come from the Tailwind
  classes below. Buttons reuse the site's own .btn-primary / .btn-signal / .btn-ghost / .btn-alert classes
  (buttonsStyling: false switches SweetAlert2's own button look off).
*/

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

// Icon colours follow the brand: pine for good news and info, alert red for errors, signal orange for warnings.
const iconColors = {
  success: 'var(--color-pine)',
  info: 'var(--color-pine)',
  question: 'var(--color-pine)',
  error: 'var(--color-alert)',
  warning: 'var(--color-signal)',
}

// WHY THE "!" ON THE UTILITIES BELOW: Tailwind v4 puts its utilities inside a CSS @layer, and SweetAlert2's own stylesheet
// is NOT in a layer. Unlayered CSS always beats layered CSS, so without the trailing "!" (important) SweetAlert2's default
// font size / weight / colour would win over these classes. Only classes that change a property SweetAlert2 also sets need it.
// The button classes (.btn-primary ...) need no "!" because buttonsStyling: false leaves the buttons unstyled.
const dialogClasses = {
  title: 'font-display! text-2xl! font-extrabold! tracking-tight! text-ink! stretch-wide!',
  htmlContainer: 'text-base! text-muted!',
  actions: 'gap-3!',
  closeButton: 'text-muted! hover:text-ink!',
  confirmButton: 'btn-primary',
  cancelButton: 'btn-ghost',
}

// SweetAlert2 sizes everything inside a toast in `em`, so `text-sm` on the popup scales the whole toast down to 14px.
const toastClasses = {
  popup: 'text-sm!',
  title: 'font-display! font-bold! text-ink!',
  htmlContainer: 'text-muted!',
  actions: 'mt-1! gap-2!',
  closeButton: 'text-muted! hover:text-ink!',
  confirmButton: 'btn-primary min-h-11 px-4 text-xs',
  timerProgressBar: 'bg-signal!',
}

// Pause the countdown while the toast is hovered or something inside it has keyboard focus.
const pauseWhileInteracting = (popup) => {
  popup.addEventListener('mouseenter', Swal.stopTimer)
  popup.addEventListener('mouseleave', Swal.resumeTimer)
  popup.addEventListener('focusin', Swal.stopTimer)
  popup.addEventListener('focusout', Swal.resumeTimer)
}

// If the clicked button was removed from the page, the browser drops focus on <body>.
// Give it to the toast's action button, so keyboard users can reach "Undo" straight away.
const focusActionIfFocusWasLost = (popup) => {
  const lost = !document.activeElement || document.activeElement === document.body
  if (lost) popup.querySelector('.swal2-confirm')?.focus({ preventScroll: true })
}

// ---------------------------------------------------------------------------------------------------------------------
// TOASTS
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A small message in the bottom-right corner.
 * toast({ icon: 'success', title: 'Saved', text: 'optional second line', timer: 3500 })
 * Returns a promise that resolves to true when the optional action button was pressed.
 */
export const toast = ({
  icon = 'success',
  title,
  text,
  timer = 3500,
  actionText,
  closable = false,
  focusAction = false,
}) =>
  Swal.fire({
    toast: true,
    position: 'bottom-end',
    icon,
    iconColor: iconColors[icon],
    titleText: title,
    text,
    timer,
    timerProgressBar: !reducedMotion(),
    animation: !reducedMotion(),
    showConfirmButton: Boolean(actionText),
    confirmButtonText: actionText,
    showCloseButton: closable,
    buttonsStyling: false,
    customClass: toastClasses,
    didOpen: (popup) => {
      pauseWhileInteracting(popup)
      if (focusAction) focusActionIfFocusWasLost(popup)
    },
  }).then((result) => result.isConfirmed)

/** "Added to cart" (or "Quantity updated") with a "View cart" shortcut. */
export const added = ({ productTitle, quantity, onViewCart }) =>
  toast({
    icon: 'success',
    title: quantity > 1 ? `Quantity updated to ${quantity}` : 'Added to your cart',
    text: productTitle,
    actionText: 'View cart',
    timer: 4000,
  }).then((pressed) => {
    if (pressed) onViewCart()
  })

/** "Removed from cart" with an Undo button. Stays a little longer (6s) because the visitor has to notice and react. */
export const removed = ({ productTitle, onUndo }) =>
  toast({
    icon: 'info',
    title: 'Removed from your cart',
    text: productTitle,
    actionText: 'Undo',
    timer: 6000,
    focusAction: true,
  }).then((pressed) => {
    if (pressed) onUndo()
  })

// ---------------------------------------------------------------------------------------------------------------------
// DIALOGS
// ---------------------------------------------------------------------------------------------------------------------

/**
 * A yes / no question. Resolves to true (confirmed) or false (cancelled, closed, Escape, click outside).
 * tone: 'primary' (green button), 'signal' (orange main-action button) or 'danger' (red button; "Cancel" gets focus first).
 * Extra SweetAlert2 options (showLoaderOnConfirm, preConfirm ...) can be passed through `options`.
 */
export const confirm = async ({
  title,
  text,
  html,
  icon = 'question',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  tone = 'primary',
  ...options
}) => {
  const confirmClass = { primary: 'btn-primary', signal: 'btn-signal', danger: 'btn-alert' }[tone]
  const result = await Swal.fire({
    icon,
    iconColor: iconColors[icon],
    titleText: title,
    text,
    html,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true, // "Cancel" on the left, the main action on the right
    focusCancel: tone === 'danger',
    animation: !reducedMotion(),
    buttonsStyling: false,
    customClass: { ...dialogClasses, confirmButton: confirmClass },
    ...options,
  })
  return result.isConfirmed
}

/**
 * A message with one button (and an optional second one). Resolves to true when the main button was pressed.
 * notice({ icon: 'success', title: 'Order placed', text: '...', confirmText: 'Continue shopping' })
 */
export const notice = async ({
  icon = 'info',
  title,
  text,
  html,
  confirmText = 'OK',
  cancelText,
  tone = 'primary',
  ...options
}) => {
  const confirmClass = { primary: 'btn-primary', signal: 'btn-signal' }[tone]
  const result = await Swal.fire({
    icon,
    iconColor: iconColors[icon],
    titleText: title,
    text,
    html,
    confirmButtonText: confirmText,
    showCancelButton: Boolean(cancelText),
    cancelButtonText: cancelText,
    reverseButtons: true,
    animation: !reducedMotion(),
    buttonsStyling: false,
    customClass: { ...dialogClasses, confirmButton: confirmClass },
    ...options,
  })
  return result.isConfirmed
}

/** True while the loading spinner of a confirm dialog is showing (used to block closing during the fake order). */
export const isBusy = () => Swal.isLoading()
