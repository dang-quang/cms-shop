/*!

=========================================================
* natcash Platform v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.microtec.vn/product/natcash
* Copyright 2021 Microtec (https://www.microtec.vn)
* Licensed under MIT (https://github.com/creativetimofficial/natcash/blob/master/LICENSE.md)

* Coded by Microtec

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
import { connect, Provider } from "react-redux";
import store from "../redux/store";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { ConnectedRouter } from "connected-next-router";

import PageChange from "components/PageChange/PageChange.js";

import "assets/css/natcash.css?v=1.1.0";
import "react-light-notifications/lib/main.css";
import "assets/css/loader.css";
import {appWithI18Next, useSyncLanguage} from 'ni18n';
import {ni18nConfig} from '../ni18n.config';

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  //document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange/>,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  //document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  //document.body.classList.remove("body-page-transition");
});

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    let comment = document.createComment(`

=========================================================
* * natcash Platform 
=========================================================

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

`);
    document.insertBefore(comment, document.documentElement);
  }, []);

  const Layout = Component.layout || (({ children }) => <>{children}</>);
  const locale =
      typeof window !== 'undefined' && window.localStorage.getItem('MY_LANGUAGE')

  useSyncLanguage(locale)
    return (
      <Provider store={store}>
        <ConnectedRouter>
          <React.Fragment>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
              <title>natcash Platform</title>
            </Head>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </React.Fragment>
        </ConnectedRouter>
      </Provider>
    );
}

MyApp.getInitialProps = async ({ Component, router, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  return { pageProps };
};

export default appWithI18Next(MyApp, ni18nConfig)