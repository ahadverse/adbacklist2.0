import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {" "}
        <Script
          async
          strategy='afterInteractive'
          src='https://www.googletagmanager.com/gtag/js?id=G-RDFXEVQK54'
        ></Script>
        <Script id='google-analytics' strategy='afterInteractive'>
          {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-RDFXEVQK54');`}
        </Script>
        <Script id='schema' type='application/ld+json'>
          {`
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AdBackList",
  "url": "https://adbacklist.com",
  "logo": "https://adbacklist.com/logo.png",
  "description": "AdBackList is a classified ads listing website where users can post and browse listings across multiple categories."
}
`}
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
