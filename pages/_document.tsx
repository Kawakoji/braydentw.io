import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <title>Adam - Developper, Designer, Creator</title>
          <link
            rel="icon"
            type="image/png"
            href="/static/logos/ADAMSITE LOGO (1).png"
          />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
