import { Grid } from "@material-ui/core";
import Product from "./product";
import styles from "../../styles/Product.module.css";
const Products = props => {
  const { products } = props;

  return (
    <Grid container spacing={4}>
      {products &&
        products.map(product => <Product key={product.id} product={product} />)}
    </Grid>
  );
};

export default Products;
