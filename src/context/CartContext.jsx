import { createContext, useEffect, useState } from 'react'

export const CartContext = createContext()

// Simple cart: a list of items { id, title, price, image, quantity }.
// Every function builds a NEW list and passes it to setItems (React needs a new list to re-render).
const CartProvider = ({ children }) => {
  // Start from what was saved in the browser, so the cart survives a page refresh.
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart')) || [])

  // Save the cart every time it changes.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // change is +1 or -1. An item that reaches 0 is removed.
  const changeQuantity = (id, change) => {
    setItems(
      items
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + change } : item))
        .filter((item) => item.quantity > 0)
    )
  }

  // Already in the cart? Add 1 to its quantity. Otherwise add it as a new item.
  const addToCart = (product) => {
    const found = items.find((item) => item.id === product.id)
    if (found) {
      changeQuantity(product.id, 1)
    } else {
      setItems([
        ...items,
        { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 },
      ])
    }
  }

  const removeFromCart = (id) => {
    setItems(items.filter((item) => item.id !== id))
  }

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
