import { Navigate, Route, Routes } from "react-router-dom";
// import CartProvider from "./context/CartContext";
// import ProductsProvider from "./context/ProductsContext";
import Layout from "./layout/Layout";
import CheckoutPage from "./pages/CheckoutPage";
import DetailsPage from "./pages/DetailsPage";
import PageNotFound from "./pages/PageNotFound";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    // <CartProvider>
      // <ProductsProvider>
        <Layout>
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            {/* // products کاربر وقتی اومد به صفحه اصلی اونو بفرست به صفحه */}
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products/:id" element={<DetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            {/* // بفرست pagenotfound هر مسیری بجز مسیرهای بالا را به پیج */}
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      // </ProductsProvider>
    // </CartProvider>
  );
}

export default App;

//  npm install @reduxjs/toolkit react-redux