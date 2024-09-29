import Header from '@/src/Header';
import GlobalStyled from '@/styles/GlobalStyled';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    as="style"
                    crossOrigin="anonymous"
                    href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
                />
            </Head>
            <GlobalStyled />
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default App;
