// A product picture that never shows a broken-image icon.
// If the picture cannot load, it tries these in order:
//   1. the original link (the API picture)
//   2. the local copy in public/products/ (same file name as the original link)
//   3. /placeholder.svg (public/placeholder.svg)
// It takes the same props as a normal <img>.
const ProductImage = (props) => (
  <img
    {...props}
    onError={(event) => {
      const picture = event.currentTarget
      const fileName = picture.src.split('/').pop() // the file name at the end of the link

      if (picture.src.endsWith('/placeholder.svg')) {
        picture.onerror = null // even the placeholder failed: stop, so it cannot loop
      } else if (picture.src.includes('/products/')) {
        picture.src = '/placeholder.svg' // the local copy is missing too
      } else {
        picture.src = '/products/' + fileName // the original failed: try the local copy
      }
    }}
  />
)

export default ProductImage
