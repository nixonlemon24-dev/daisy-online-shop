import { benefits } from '../data';
import Reveal, { gridDelay } from './Reveal';

export default function Benefits() {
  return (
    <section className="benefits" aria-label="Highlights">
      <ul>
        {benefits.map((b, i) => (
          <Reveal as="li" key={b.title} delay={gridDelay(i)}>
            <b><span className="ico" aria-hidden="true">{b.icon}</span>{b.title}</b>
            <span>{b.text}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
