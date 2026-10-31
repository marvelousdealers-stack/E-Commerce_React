import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as notify from '../utility/notify'

export const CartContext = createContext()

// Read the saved cart. A broken or missing value must never crash the whole site, so it falls back to an empty cart.
const loadCart = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('cart'))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

// Simple cart: a list of items { id, title, price, image, quantity }.
// Every function builds a NEW list and passes it to setItems (React needs a new list to re-render).
//
// UX CHANGE: the cart now talks back (SweetAlert2 toasts, see utility/notify.js):
//   add      -> "Added to your cart" with a "View cart" button
//   remove   -> "Removed from your cart" with an "Undo" button (the item returns to the same spot)
// The toasts live HERE, not in each page, so every "Add to Cart" button on the site behaves the same way.
const CartProvider = ({ children }) => {
  const navigate = useNavigate()
  // Start from what was saved in the browser, so the cart survives a page refresh.
  const [items, setItems] = useState(loadCart)

  // Save the cart every time it changes.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // Already in the cart? Add 1 to its quantity. Otherwise add it as a new item.
  const addToCart = (product) => {
    const found = items.find((item) => item.id === product.id)
    setItems((current) =>
      current.some((item) => item.id === product.id)
        ? current.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
        : [
            ...current,
            { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 },
          ]
    )
    notify.added({
      productTitle: product.title,
      quantity: found ? found.quantity + 1 : 1,
      onViewCart: () => navigate('/cart'),
    })
  }

  // Remove a product and offer "Undo". Undo puts it back at the position it had.
  const removeFromCart = (id) => {
    const index = items.findIndex((item) => item.id === id)
    if (index === -1) return
    const removedItem = items[index]
    setItems((current) => current.filter((item) => item.id !== id))
    notify.removed({
      productTitle: removedItem.title,
      onUndo: () =>
        setItems((current) => {
          if (current.some((item) => item.id === id)) return current // added again in the meantime
          const restored = [...current]
          restored.splice(Math.min(index, restored.length), 0, removedItem)
          return restored
        }),
    })
  }

  // change is +1 or -1. An item that would reach 0 is removed (with the Undo toast).
  const changeQuantity = (id, change) => {
    const item = items.find((entry) => entry.id === id)
    if (!item) return
    if (item.quantity + change <= 0) {
      removeFromCart(id)
      return
    }
    setItems((current) =>
      current.map((entry) => (entry.id === id ? { ...entry, quantity: entry.quantity + change } : entry))
    )
  }

  // Empties the cart without a message: the Cart page asks "Are you sure?" first and shows the result itself.
  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, totalItems, subtotal, addToCart, changeQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
