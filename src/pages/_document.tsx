import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta property="og:title" content="렌모어" />
        <meta property="og:description" content="다양한 브랜드의 렌즈를 한 눈에! 렌즈모어는 " />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
