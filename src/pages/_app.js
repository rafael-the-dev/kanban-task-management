import * as React from 'react';
import Head from 'next/head';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { theme } from 'src/material-ui/theme';
import createEmotionCache from 'src/material-ui/createEmotionCache';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Layout from 'src/components/layout';

import 'src/styles/reset.css';
import 'src/styles/globals.css';
import 'src/styles/checkbox.css';
//import "src/styles/dark-theme.css";
import 'src/styles/tailwind.css';

import { AppContextProvider, LoginContextProvider } from 'src/context';
import { ThemeContextProvider } from "src/context/ThemeContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
    
    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <LoginContextProvider>
                <AppContextProvider>
                    <CacheProvider value={emotionCache}>
                        <ThemeContextProvider>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DndProvider backend={HTML5Backend}>
                                    <Layout>
                                        <Component {...pageProps} />
                                    </Layout>
                                </DndProvider>
                            </LocalizationProvider>
                        </ThemeContextProvider>
                    </CacheProvider>
                </AppContextProvider>
            </LoginContextProvider>
        </>
    );
}

export default MyApp;
