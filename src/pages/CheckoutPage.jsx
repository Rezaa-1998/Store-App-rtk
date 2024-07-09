import BasketCard from "../Components/BasketCard";
// import { useCart } from "../context/CartContext";
import { TbShoppingCartX } from "react-icons/tb";
import BasketSidebar from "../Components/BasketSidebar";
import styles from "./CheckoutPage.module.css";
import { useDispatch, useSelector } from "react-redux";
function CheckoutPage() {
  // const [state, dispatch] = useCart();
  const state = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  if (!state.itemsCounter) {
    return (
      <div
        className={styles.container}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <TbShoppingCartX style={{ color: "blue", fontSize: "8.5em" }} />
        <p style={{ color: "blue" }}>سبد خرید شما خالی است</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <BasketSidebar state={state} />
      <div className={styles.products}>
        {state.selectedItems.map((product) => (
          <BasketCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
}

export default CheckoutPage;
