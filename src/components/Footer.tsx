import { SHOPEE_URL } from '../data';
import Reveal, { stackDelay } from './Reveal';

export default function Footer() {
  return (
    <footer className="footer">
      <Reveal as="p" className="footer__brand" delay={stackDelay(0)}>Daisy Online Shop</Reveal>
      <Reveal as="p" delay={stackDelay(1)}>Costumes for every special moment. Est. 2020.</Reveal>
      <Reveal as="nav" aria-label="Footer" delay={stackDelay(2)}>
        <a href="#collection">Products</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#faq">FAQ</a>
        <a href={SHOPEE_URL} target="_blank" rel="noopener">Our Shopee store</a>
      </Reveal>
      <Reveal as="p" className="footer__note" delay={stackDelay(3)}>
        Daisy Online Shop is a seller on Shopee. This page is not run by Shopee.
      </Reveal>
    </footer>
  );
}
