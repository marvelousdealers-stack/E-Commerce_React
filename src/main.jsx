import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ProductProvider from './context/ProductContext.jsx'
import CartProvider from './context/CartContext.jsx'

// MotionConfig reducedMotion="user": every framer-motion animation on the site (page reveals, header menu, cart rows...)
// drops its movement automatically for visitors who turned on "reduce motion" in their system settings.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ProductProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ProductProvider>
      </BrowserRouter>
    </MotionConfig>
  </StrictMode>
)
