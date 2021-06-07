import "../styles/globals.css";
import "../styles/index.scss";
import type { AppProps } from "next/app";
import React from "react";
import Head from "next/head";
import config from "../static/config.json";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.headerData.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
