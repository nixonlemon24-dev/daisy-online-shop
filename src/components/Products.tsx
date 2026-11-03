import { products, SHOPEE_URL } from '../data';
import Reveal, { gridDelay } from './Reveal';
import Section from './Section';
import CtaLink from './CtaLink';

export default function Products() {
  return (
    <Section
      id="collection"
      title="Featured Products"
      intro="Six looks to start with. Tap any one to see sizes, colors and prices on Shopee. We have over 70 products available."
    >
      <div className="cards">
        {products.map((p, i) => (
          <Reveal as="article" className="card" key={p.name} delay={gridDelay(i)}>
            <span className="card__tag">{p.tag}</span>
            <div className="card__img">
              <img src={`/images/${p.image}.webp`} alt={p.alt} loading="lazy" width={900} height={900} />
            </div>
            <h3>{p.name}</h3>
            <p>{p.text}</p>
          </Reveal>
        ))}
      </div>
      <CtaLink href={SHOPEE_URL}>View More on Shopee</CtaLink>
    </Section>
  );
}
