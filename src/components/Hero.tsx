import { SHOPEE_URL } from '../data';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <p className="hero__tag">Costumes for every special moment</p>
        <h1>Dress up their imagination.</h1>
        <p className="hero__lead">
          Cultural outfits, storybook characters and party classics for kids and adults.
          Ready for school events, themed parties and cosplay.
        </p>
        <a className="btn btn--lg" href={SHOPEE_URL} target="_blank" rel="noopener">Buy on Shopee</a>
      </div>
      <figure className="hero__art">
        <img
          src="/images/balintawak.webp"
          alt="Filipiniana Balintawak dresses in colorful floral prints modeled by women, with traditional headscarves"
          width={900}
          height={900}
          fetchPriority="high"
        />
      </figure>
    </section>
  );
}
