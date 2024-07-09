import Card from "../Components/Card";
import Loader from "../Components/Loader";
// import { useProducts } from "../context/ProductsContext";
import { fetchProducts } from "../features/product/productSlice";
import {  useDispatch, useSelector } from "react-redux";

import styles from "./ProductsPage.module.css";
import { useEffect, useState } from "react";
import {
  filterProducts,
  getInitialQuery,
  searchProducts,
} from "../helper/helper";
import { useSearchParams } from "react-router-dom";
import SearchBox from "../Components/SearchBox";
import Sidebar from "../Components/Sidebar";

function ProductsPage() {
  const dispatch = useDispatch();
  const {products,loading} = useSelector((store) => store.product);

  const [displayed, setDisplayed] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // category و هم مقدار search برای فیلتر کردن هم مقدار
  const [query, setQuery] = useState({});

  // استفاده می شود URL به query از این هوک برای اضافه کردن
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setDisplayed(products);

    // ای که زده بودم بمونه search و category می خوام وقتی صفحه رو ریلود میکنم در اون
    setQuery(getInitialQuery(searchParams));
  }, [products]);

  useEffect(() => {
    setSearchParams(query);

    // حذف نشه input از search وقتی ریلود شد صفحه مقدار
    setSearch(query.search || "");

    let finalProducts = searchProducts(products, query.search);
    finalProducts = filterProducts(finalProducts, query.category);
    setDisplayed(finalProducts);
  }, [query]);

  return (
    <>
      <SearchBox search={search} setSearch={setSearch} setQuery={setQuery} />
      <div className={styles.container}>
        <div className={styles.products}>
          {loading && <Loader />}
          {displayed.map((p) => (
            <Card key={p.id} data={p} />
          ))}
        </div>
        <Sidebar query={query} setQuery={setQuery} />
      </div>
    </>
  );
}

export default ProductsPage;
