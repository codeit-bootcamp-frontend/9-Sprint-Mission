import '@/styles/globals.css';
import DefaultLayout from '@/components/Layout/DefaultLayout';
import Header from '@/components/Layout/Header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import FooterController from '@/components/Layout/FooterController';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultLayout>
      <Head>
        <title>판다마켓</title>
        <link rel='icon' href='favicon.ico' />
      </Head>
      <Header />
      <main
        className='min-h-screen'
        style={{
          minWidth: '400px',
          margin: '0',
          padding: '0',
        }}
      >
        <Component {...pageProps} />
      </main>
      <FooterController />
    </DefaultLayout>
  );
}
