import { whyItems } from '../data';
import Reveal, { gridDelay } from './Reveal';
import Section from './Section';

export default function Why() {
  return (
    <Section id="why" title="Why choose Daisy">
      <ul className="why">
        {whyItems.map((w, i) => (
          <Reveal as="li" key={w.title} delay={gridDelay(i)}>
            <img className="why__icon" src={`/images/${w.icon}.png`} alt="" width={88} height={88} loading="lazy" />
            <div><h3>{w.title}</h3><p>{w.text}</p></div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
