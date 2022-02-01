import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import Router, { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "../../components/withAuth";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../../redux/cart.slice";
import styles from "../../styles/Cart.module.css";
import { insertAddress } from "../api";
const Cart = props => {
  const router = useRouter();

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price,
      0
    );
  };

  const handleNavigate = () => {
    router.push("/address");
  };
  return (
    <div className={styles.container}>
      {cart.length === 0 ? (
        <h1>Your Cart is Empty!</h1>
      ) : (
        <>
          <div className={styles.header}>
            <div>Image</div>
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Actions</div>
            <div>Total Price</div>
          </div>
          {cart.map(item => (
            <div className={styles.body} key={item.id}>
              <div className={styles.image}>
                <img
                  src={item.image}
                  alt={item.name}
                  height="90"
                  width="65"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <p>{item.name}</p>
              <p>$ {item.price}</p>
              <p>{item.quantity}</p>
              <div className={styles.buttons}>
                <button onClick={() => dispatch(incrementQuantity(item.id))}>
                  +
                </button>
                <button onClick={() => dispatch(decrementQuantity(item.id))}>
                  -
                </button>
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  x
                </button>
              </div>
              <p>$ {item.quantity * item.price}</p>
            </div>
          ))}
          <h2>Grand Total: $ {getTotalPrice()}</h2>

          <Button
            variant="contained"
            endIcon={<Send />}
            onClick={() => {
              handleNavigate();
              // router.push("/address");
            }}
          >
            Procceed
          </Button>
        </>
      )}
    </div>
  );
};

export default (withRouter, withAuth)(Cart);
