import { Grid } from "@material-ui/core";
import Product from "./product";

const Products = props => {
  const { products } = props;

  return (
    <Grid container>
      {products &&
        products.map(product => (
          <Product key={product.id} data={product} id={product.id} />
        ))}
    </Grid>
  );
};

export default Products;
