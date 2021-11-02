import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import "swiper/css/bundle";
import { getLibraryInfoIds, getTotalSets } from "../store/sets/setsSlice";
import { wrapper } from "../store";
import Layout from "../components/Layout";
import "../styles/globals.css";

const App = ({ Component, pageProps }) => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getLibraryInfoIds());
    }
  }, [user, dispatch]);


  useEffect(() => {
    dispatch(getTotalSets());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>eduCards</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(App);
