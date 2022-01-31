import Head from "next/head";
import { apiClient } from "../axios";
import Products from "../components/products";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  let response = [];

  await apiClient
    .get("/products/")
    .then(res => {
      let items = res.data.records.map(data => {
        return {
          id: data.id,
          name: data.fields.name,
          image: data.fields.image,
          price: data.fields?.price ? data.fields.price : 0,
        };
      });
      response = items;
    })
    .catch(err => {
      console.log(err);
    });

  return {
    props: {
      products: response,
    },
  };
};

export default function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>E-Com</title>
        <meta name="description" content="Products list" />
      </Head>

      <div className={styles.container}>
        <Products products={props?.products} />
      </div>
    </div>
  );
}
