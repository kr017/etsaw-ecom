import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cart.slice";
import styles from "../../styles/Product.module.css";
import { isItemAdded } from "../../utils";
const Product = ({ product }) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  return (
    <Grid item style={{ margin: "0 auto" }}>
      <div className={styles}>
        <img src={product.image} alt={product.name} height={300} width={220} />
        <div className={styles.title}>{product.name}</div>
        <div>$ {product.price}</div>
        {!isItemAdded(cart, product.id) ? (
          <button
            onClick={() => dispatch(addToCart(product))}
            className={styles.button}
          >
            Add to Cart
          </button>
        ) : (
          <button
            onClick={() => dispatch(removeFromCart(product.id))}
            className={styles.filledbutton}
          >
            Remove from cart
          </button>
        )}
      </div>
    </Grid>
  );
};

export default Product;
