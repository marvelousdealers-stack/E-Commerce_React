import { createContext, useCallback, useEffect, useState } from "react";
export const ProductContext = createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ error , setError] = useState(null);
 
    const getProducts = useCallback(async () => {
        try{
            setLoading(true);
            setError(null);
            const response = await fetch("https://fakestoreapi.com/products");
            if (!response.ok){
    
                 throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data)
        }
        catch(e){
            setError(e.message)
           
        }
        finally{
            setLoading(false)
        }
    }, [])
    useEffect(()=>{
        getProducts();
    },[getProducts])
    return (<ProductContext.Provider value={{ products, loading , error , getProducts}}>
        {children}
    </ProductContext.Provider>
    );
}
export default ProductProvider;
