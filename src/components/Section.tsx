import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface Props {
  id: string;
  title: string;
  intro?: string;
  tint?: boolean;
  children: ReactNode;
}

export default function Section({ id, title, intro, tint, children }: Props) {
  return (
    <section className={`section${tint ? ' section--tint' : ''}`} id={id}>
      <Reveal className="section__head">
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </Reveal>
      {children}
    </section>
  );
}
