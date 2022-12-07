import React, { ReactNode } from "react";
import Head from "next/head";

interface HeadProps {
  children?: ReactNode;
  title?: string;
}

const TitleHead = ({ title, children }: HeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta name="twitter:site" content="@ViewOdyssey" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="icon" href="/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicon/favicon-16x16.png"
      />
      {children}
    </Head>
  );
};

export default TitleHead;
