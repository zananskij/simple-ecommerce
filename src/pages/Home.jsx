import Banner from "../components/Banner"
import BannerReverse from "../components/BannerReverse"
import Footer from "../components/Footer"
import Hero from "../components/Header"
import Newsletter from "../components/Newsletter"
import BestProducts from "../components/BestProducts"
import TrendingSlider from "../components/TrendingSlider"
import Banner1 from "../img/banner/banner1.jpg"
import Banner2 from "../img/banner/banner2.jpg"

function Home() {
  return (
    <>
      <Hero />
      <BestProducts />
      <Banner
        title="Creative simplistic living"
        text=" Products are all made to standard sizes so that you can mix and match them freely."
        img={Banner1}
      />
      <TrendingSlider />
      <BannerReverse
        title="Comfortable & Stylish Living"
        text=" Products are all made to standard sizes so that you can mix and match them freely."
        img={Banner2}
      />
      <Newsletter />
      <Footer />
    </>
  )
}

export default Home
