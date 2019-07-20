/* _app.js */
import React from "react";
import App, { Container, AppContext } from "next/app";
import Layout from "../components/Layout";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          {/* <Layout isAuthenticated={isAuthenticated}> */}
          <Component {...pageProps} />
        </Layout>

        <style jsx global>
          {`
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
            }import { AppContext } from 'next/app';

            .card-columns {
              column-count: 3;
            }
          `}
        </style>
      </Container>
    );
  }
}
