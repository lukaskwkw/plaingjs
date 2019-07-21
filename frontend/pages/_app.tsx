import React from "react";
import { Provider } from "react-redux";
import App, { Container, AppContext } from "next/app";

import Layout from "../components/Layout";
import withReduxStore from "../utils/with-redux-store";

class MyApp extends App<{ reduxStore: any }> {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Layout>
            {/* <Layout isAuthenticated={isAuthenticated}> */}
            <Component {...pageProps} />
          </Layout>
          <style jsx global>{`
            a {
              color: white !important;
            }
            a:link {
              text-decoration: none !important;
              color: white !important;
            }
            a:hover {
              color: white;
            }
            .card {
              display: inline-block !important;
            }

            .card-columns {
              column-count: 3;
            }
          `}</style>
          `
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
