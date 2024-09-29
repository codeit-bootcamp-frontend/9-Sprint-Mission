import Header from '@/src/Header';
import GlobalStyled from '@/styles/GlobalStyled';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <GlobalStyled />
            <Header />
            <Component {...pageProps} />
        </>
    );
};

export default App;
