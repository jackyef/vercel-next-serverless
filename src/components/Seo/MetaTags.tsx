import * as React from 'react';
import Head from 'next/head';
import { useColorMode } from '@chakra-ui/core';

const description = 'Nextjs app as an UI for HipoLabs universities data. Created for learning next + vercel serverless';

export const MetaTags: React.FC = () => {
  const themeMetaRef = React.useRef<HTMLMetaElement>(null);
  const { colorMode } = useColorMode();

  React.useEffect(() => {
    const themeColor = colorMode === 'light' ? '#fff' : '#1A202C';

    const metaThemeTag = document.querySelector('meta[name="theme-color"]');
    metaThemeTag?.setAttribute('content', themeColor);
  })

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta
        name="description"
        content={description}
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta ref={themeMetaRef} name="theme-color" content={colorMode === 'light' ? '#fff' : '#1A202C'} />
      <link rel="canonical" href="https://vercel-next-serverless.vercel.app/" />
      <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
      <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
      <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="apple-mobile-web-app-title" content="university-search" />
      <meta name="application-name" content="university-search" />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:url" content="https://vercel-next-serverless.vercel.app/" />
      <meta property="twitter:creator" content="@jackyef__" />
    </Head>
  );
};
