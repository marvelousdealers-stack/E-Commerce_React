import { createContext, useEffect, useState } from "react";
// BACKUP DATA: if the API fails, the products are taken from this file instead.
// To fill it: open https://fakestoreapi.com/products in the browser, copy the whole response
// and paste it into src/data/products.json (replace the [] ). It must stay valid JSON.
import savedProducts from "../data/products.json";

export const ProductContext = createContext();

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
      if (savedProducts.length > 0) {
        // The API failed, so use the saved copy.
        console.warn("API failed, showing the products saved in src/data/products.json");
        setProducts(savedProducts);
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
