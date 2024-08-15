import type { AppProps } from "next/app"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "react-bootstrap"
import Head from 'next/head'
import { useRouter } from "next/router"
import { TokenProvider } from "@/context/tokenContext"

const theme = createTheme()

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'
  const isSignupPage = router.pathname === '/signup'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>SkinManager</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <TokenProvider>
      {!isLoginPage && !isSignupPage && <Header />}
      <Component {...pageProps} />
      {!isLoginPage && !isSignupPage && <Footer />}
      </TokenProvider>
    </ThemeProvider>
  )
}

export default App