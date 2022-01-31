import Head from "next/head";
import Script from "next/script";
import { Fragment } from "react";
import { Provider } from "react-redux";
import store from "../redux/store";
import Navbar from "../components/navbar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>ETSAWECOM | Home</title>
      </Head>
      <Script
        id="bootstrap-cdn"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      />
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
