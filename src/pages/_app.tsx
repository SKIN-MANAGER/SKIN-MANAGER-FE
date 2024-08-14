import type { AppProps } from "next/app"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { createTheme, CssBaseline } from "@mui/material"
import { ThemeProvider } from "react-bootstrap"
import Head from 'next/head'
import { AuthProvider } from "@/context/authContext"
import { useRouter } from "next/router"

const theme = createTheme()

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const isLoginPage = router.pathname === '/login'
  const isSignupPage = router.pathname === '/signup'

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Head>
          <title>SkinManager</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        {!isLoginPage && !isSignupPage && <Header />}
        <Component {...pageProps} />
        {!isLoginPage && !isSignupPage && <Footer />}
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App