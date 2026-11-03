import { reviews, SHOPEE_REVIEWS_URL } from '../data';
import Reveal, { gridDelay } from './Reveal';
import Section from './Section';
import CtaLink from './CtaLink';

export default function Testimonials() {
  return (
    <Section id="testimonials" title="Testimonials" intro="Real reviews from buyers on our Shopee store.">
      <div className="reviews">
        {reviews.map((r, i) => (
          <Reveal as="figure" className="review" key={r.user} delay={gridDelay(i)}>
            <div className="review__stars" role="img" aria-label="5 out of 5 stars">★★★★★</div>
            <blockquote>
              {r.paragraphs.map((p) => <p key={p}>{p}</p>)}
              {r.tags && <p className="review__tags">{r.tags}</p>}
            </blockquote>
            <figcaption>
              <b>{r.user}</b>
              <span><time dateTime={r.date}>{r.dateLabel}</time> · {r.item}</span>
            </figcaption>
          </Reveal>
        ))}
      </div>
      <CtaLink href={SHOPEE_REVIEWS_URL}>See more on Shopee</CtaLink>
    </Section>
  );
}
