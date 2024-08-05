import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider } from "react-bootstrap";
import Head from 'next/head';

const theme = createTheme()

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>SkinManager</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}

export default App;