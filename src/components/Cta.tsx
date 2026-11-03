import { SHOPEE_URL } from '../data';
import Reveal, { stackDelay } from './Reveal';

export default function Cta() {
  return (
    <section className="cta">
      <Reveal as="img" delay={stackDelay(0)} src="/images/logo.webp" alt="" width={96} height={96} loading="lazy" />
      <Reveal as="h2" delay={stackDelay(1)}>Dress your story.</Reveal>
      <Reveal as="p" delay={stackDelay(2)}>Pick a costume and check sizes on Shopee.</Reveal>
      <Reveal as="a" delay={stackDelay(3)} className="btn btn--lg btn--light" href={SHOPEE_URL} target="_blank" rel="noopener">
        Shop on Shopee
      </Reveal>
    </section>
  );
}
