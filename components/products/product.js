import { Grid } from "@material-ui/core";
const Product = props => {
  const { data } = props;

  return (
    <Grid item key={data.id} style={{ margin: "0 auto" }}>
      {console.log(data)}
      <div
      // className={classes.pictureContainer}
      // onClick={() => history.push(`/shop/${details._id}`)}
      >
        <img
          alt={data.name}
          src={data.image}
          // className={classes.picture}
        />
        <div> {data.name}</div>
      </div>
    </Grid>
  );
};

export default Product;
