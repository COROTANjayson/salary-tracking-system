import '../styles/globals.css'
import * as React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ColorModeContext, useMode } from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { Provider } from 'react-redux';
import { store } from '../store'
import Layout from '../components/Layout'
import { useRouter } from 'next/router';
// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [theme, colorMode] = useMode();
  // const [isSidebar, setIsSidebar] = useState(true);
  const router = useRouter();

  if (router.asPath == '/') {
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    )
  }
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Provider store={store}>
            <Layout >
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>

    </CacheProvider>
  );
}

export default MyApp
