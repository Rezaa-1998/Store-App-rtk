import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/config";

const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProducts(await api.get("/products"));
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchProducts();
  }, []);
  return (
    <ProductContext.Provider value={products}>
      {children}
    </ProductContext.Provider>
  );
}
//  اونو انجام میدیم و useproducts بکنیم و چندین عملیات انجام دهیم همینجا با یک فانکشن import رو useContext در کامپوننت مقصد بجای اینکه اونجا context برای گرفتن دیتای
// نیز میگیم ینی هوکی که خودمون ایجاد می کنیم custom hook به اون
const useProducts = () => {
  const products = useContext(ProductContext);
  return products;
};
const useProductDetails = (id) => {
  const products = useContext(ProductContext);
  const result = products.find((product) => product.id === id);
  return result;
};
export default ProductsProvider;
export { useProducts, useProductDetails };
