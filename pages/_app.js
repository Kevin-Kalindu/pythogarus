import '../styles/globals.css'
import { RecoilRoot } from 'recoil'
import { ParallaxProvider } from 'react-scroll-parallax' 

function MyApp({ Component, pageProps }) {
  return(
      <ParallaxProvider scrollAxis='horizontal'>
          <RecoilRoot>
          <Component {...pageProps} />
          </RecoilRoot>
      </ParallaxProvider>
  )
}

export default MyApp
