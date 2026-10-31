import { createContext, useEffect, useState } from "react";
// BACKUP DATA: if the API fails, the products are taken from this file instead.
// To fill it: open https://fakestoreapi.com/products in the browser, copy the whole response
// and paste it into src/data/products.json (replace the [] ). It must stay valid JSON.
import savedProducts from "../data/products.json";
import * as notify from "../utility/notify";

export const ProductContext = createContext();

// The saved products use the LOCAL copies of the pictures (public/products/), because the picture
// links in the saved data point to the same server as the API and would break too.
// Each file name is taken from the end of the original link (see README.md to download them).
const localProducts = savedProducts.map((product) => ({
  ...product,
  image: "/products/" + product.image.split("/").pop(),
}));

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Loads the products. The "Try Again" buttons call this function too.
  const getProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      setProducts(await response.json());
    } catch (e) {
      if (localProducts.length > 0) {
        // The API failed, so use the saved copy.
        console.warn("API failed, showing the products saved in src/data/products.json");
        setProducts(localProducts);
        // UX: tell the visitor the list is a saved copy (prices and stock may be out of date).
        notify.toast({
          icon: "info",
          title: "Showing saved products",
          text: "We couldn’t reach the live catalogue, so prices may be out of date.",
          timer: 6000,
          closable: true,
        });
      } else {
        // Nothing saved either: show the error message with the Try Again button.
        setError(e.message);
      }
    }

    setLoading(false);
  };

  // Load once when the site opens.
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, getProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
