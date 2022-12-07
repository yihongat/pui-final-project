import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
          crossOrigin="anonymous"
        />
      </Head>
      <body className="w-screen lg:w-full overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
