import Reveal from './Reveal';

interface Props { href: string; children: string }

/** The centered "View more on Shopee" style button under a section */
export default function CtaLink({ href, children }: Props) {
  return (
    <Reveal className="card__container">
      <a className="card__cta" href={href} target="_blank" rel="noopener">{children}</a>
    </Reveal>
  );
}
