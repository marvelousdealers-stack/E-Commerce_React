import { useContext } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductsTab from '../components/common/ProductsTab'
import { ProductContext } from '../context/ProductContext'

// UI CHANGE: category filter. The chosen category lives in the page address
// (/shop?category=electronics), so the home page tiles and footer links can open it directly
// and the browser Back button works. "value" must match the API's category text.
const filters = [
  { value: 'all', label: 'All' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'jewelery', label: 'Jewelry' },
  { value: "men's clothing", label: 'Men’s clothing' },
  { value: "women's clothing", label: 'Women’s clothing' },
]

// FIX: the component was imported as `ProductTab` while the file and component
// are `ProductsTab`. It worked (default import) but was a typo, so it is renamed.
// FIX: removed the unused `import React`; useContext is now a named import.
const Shop = () => {
  const { products, loading, error, getProducts } = useContext(ProductContext)
  const [params, setParams] = useSearchParams()
  const category = params.get('category') || 'all'

  const shown = category === 'all' ? products : products.filter((product) => product.category === category)

  let summary = `${shown.length} products.`
  if (loading) summary = 'Fetching the catalogue.'
  if (error) summary = 'The catalogue is unavailable right now.'

  return (
    <div className="motion-safe:animate-rise">
      {/* UI FIX: the old banner + filter row took ~200px, so the product cards were cut off on a laptop.
          Now the title, the count and the filter buttons share ONE slim dark bar (stacked on phones),
          and the first row of cards is visible without scrolling. */}
      <header className="bg-pine text-paper">
        <div className="page-container flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-2xl font-extrabold tracking-tight stretch-wide sm:text-3xl">
              Shop
            </h1>
            <p className="text-sm text-paper/80">{summary}</p>
          </div>

          {/* RESPONSIVE: on phones the filter buttons scroll sideways in ONE row (instead of stacking into 3 rows);
              from 1024px they wrap normally. */}
          <div
            className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
            role="group"
            aria-label="Filter by category"
          >
            {filters.map((filter) => {
              const active = category === filter.value
              return (
                <button
                  key={filter.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setParams(filter.value === 'all' ? {} : { category: filter.value })}
                  className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition duration-200 ${
                    active
                      ? 'border-signal bg-signal text-ink'
                      : 'border-paper/30 text-paper hover:border-paper'
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>
        </div>
      </header>

      <div className="page-container py-6">
        <ProductsTab
          products={shown}
          loading={loading}
          error={error}
          getProducts={getProducts}
        />
      </div>
    </div>
  )
}

export default Shop
