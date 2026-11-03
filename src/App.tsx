import { SHOPEE_URL } from './data';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Benefits from './components/Benefits';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Why from './components/Why';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Benefits />
        <Products />
        <Gallery />
        <Why />
        <Categories />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <a className="buybar" href={SHOPEE_URL} target="_blank" rel="noopener">Buy on Shopee</a>
    </>
  );
}
