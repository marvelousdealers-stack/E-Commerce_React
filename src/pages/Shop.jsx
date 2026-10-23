import { useContext } from 'react'
import ProductsTab from '../components/common/ProductsTab'
import { ProductContext } from '../context/ProductContext'

// FIX: the component was imported as `ProductTab` while the file and component
// are `ProductsTab`. It worked (default import) but was a typo, so it is renamed.
// FIX: removed the unused `import React`; useContext is now a named import.
const Shop = () => {
    const {products, loading, error,getProducts} = useContext(ProductContext);

    let summary = `${products.length} products in the catalogue.`
    if (loading) summary = 'Fetching the catalogue.'
    if (error) summary = 'The catalogue is unavailable right now.'

  return (
    // TAILWIND CHANGE: pt-12 pb-24 -> py-8 so the heading plus the first row of cards are visible on a laptop screen
    // ANIMATION CHANGE: the whole page fades in and slides up 14px once on load (motion-safe:animate-rise)
    <div className="page-container py-8 motion-safe:animate-rise">
      {/* TAILWIND CHANGE: header margin mb-12 -> mb-6 */}
      <header className="mb-6 max-w-2xl">
        {/* TAILWIND CHANGE: heading 5xl/6xl -> 4xl/5xl */}
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance stretch-wide sm:text-5xl">
          Shop
        </h1>
        <p className="mt-2 text-base text-muted">{summary}</p>
      </header>
      <ProductsTab
        products={products}
        loading={loading}
        error={error}
        getProducts={getProducts}
      />
    </div>
  )
}

export default Shop
