import Head from "next/head";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { apiClient } from "../axios";
import Products from "../components/products";
import styles from "../styles/Home.module.css";

import Router, { withRouter } from "next/router";

export const getServerSideProps = async ({ query }) => {
  let response = [];
  let offset = "";
  const page = query.page || 1;
  console.log(query); //+ "&offset=" + query.offset
  let url = `/products?pageSize=` + 12;
  if (query.offset !== undefined) {
    url = `/products?pageSize=` + 12 + "&offset=" + query.offset;
  }
  await apiClient
    .get(url)
    .then(res => {
      offset = res.data?.offset ? res.data.offset : null;
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
      offset: offset,
      pageCount: 4,
      currentPage: 1,
    },
  };
};

function Home(props) {
  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);
  useEffect(() => {
    //After the component is mounted set router event handlers
    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
    };
  }, []);
  const pagginationHandler = page => {
    const currentPath = props.router.pathname;
    const currentQuery = props.router.query;
    currentQuery.page = page.selected + 1;
    currentQuery.offset = props.offset;
    props.router.push({
      pathname: currentPath,
      query: currentQuery,
      offset: props.offset,
    });
  };

  let content = null;
  if (isLoading) content = <div>Loading...</div>;
  else {
    content = (
      <ul>
        <Products products={props?.products} />
      </ul>
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>E-Com</title>
        <meta name="description" content="Products list" />
      </Head>

      <div className={styles.container}>
        <div
        //  className="posts"
        >
          {content}
        </div>
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName={styles.pageitem}
          pageLinkClassName={styles.pagelink}
          previousClassName={styles.prevpageitem}
          previousLinkClassName={styles.pagelink}
          nextClassName={styles.nextpageitem}
          nextLinkClassName={styles.pagelink}
          breakLabel="..."
          breakClassName={styles.pageitem}
          breakLinkClassName={styles.pagelink}
          pageCount={props.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={pagginationHandler}
          containerClassName={styles.pagination}
          activeClassName={styles.active}
        />
      </div>
    </div>
  );
}
export default withRouter(Home);
