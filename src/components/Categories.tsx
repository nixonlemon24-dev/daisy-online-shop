import { categories, SHOPEE_URL } from '../data';
import Reveal, { gridDelay } from './Reveal';
import Section from './Section';
import CtaLink from './CtaLink';

export default function Categories() {
  return (
    <Section
      id="categories"
      title="Shop by Category"
      intro="Find the right outfit faster. Each category opens our Shopee store."
      tint
    >
      <ul className="cats">
        {categories.map((c, i) => (
          <Reveal as="li" key={c.title} delay={gridDelay(i)}>
            <a href={SHOPEE_URL} target="_blank" rel="noopener">
              <img className="cats__icon" src={`/images/${c.icon}.webp`} alt="" width={72} height={72} loading="lazy" />
              <b>{c.title}</b><span>{c.text}</span>
            </a>
          </Reveal>
        ))}
      </ul>
      <CtaLink href={SHOPEE_URL}>Shop All on Shopee</CtaLink>
    </Section>
  );
}
