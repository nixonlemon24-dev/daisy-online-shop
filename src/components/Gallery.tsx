import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from 'react';
import { photos } from '../data';
import Reveal, { gridDelay } from './Reveal';
import Section from './Section';
import Lightbox from './Lightbox';

const GAP = 12;

export default function Gallery() {
  const galRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Mouse-drag state lives in a ref: it changes on every pointer move and never needs a render
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });

  const getItems = () =>
    Array.from(galRef.current?.querySelectorAll<HTMLElement>('.gallery__item') ?? []);

  const step = () => (getItems()[0]?.getBoundingClientRect().width ?? 0) + GAP;

  const sync = useCallback(() => {
    const gal = galRef.current;
    if (!gal) return;
    const s = step();
    setActive(Math.min(photos.length - 1, Math.round(gal.scrollLeft / s)));
    setAtStart(gal.scrollLeft < 4);
    setAtEnd(gal.scrollLeft + gal.clientWidth >= gal.scrollWidth - 4);
  }, []);

  const scrollByStep = (dir: 1 | -1) =>
    galRef.current?.scrollBy({ left: dir * step(), behavior: 'smooth' });

  useEffect(() => {
    sync();
    window.addEventListener('resize', sync);

    const onMove = (e: globalThis.PointerEvent) => {
      const d = drag.current;
      const gal = galRef.current;
      if (!d.down || !gal) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 5) { d.moved = true; gal.classList.add('dragging'); }
      if (d.moved) gal.scrollLeft = d.startLeft - dx;
    };
    const onUp = () => {
      const d = drag.current;
      const gal = galRef.current;
      if (!d.down || !gal) return;
      d.down = false;
      if (d.moved) {
        gal.classList.remove('dragging');
        const s = step();
        gal.scrollTo({ left: Math.round(gal.scrollLeft / s) * s, behavior: 'smooth' });
      }
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('resize', sync);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [sync]);

  // When the lightbox changes photo, bring that thumbnail into view behind it
  useEffect(() => {
    if (lightbox === null) return;
    getItems()[lightbox]?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }, [lightbox]);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return; // touch uses native swipe
    drag.current = { down: true, moved: false, startX: e.clientX, startLeft: galRef.current!.scrollLeft };
  };

  // Swallow the click that ends a drag so it doesn't open the lightbox
  const onClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.stopPropagation();
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') scrollByStep(1);
    if (e.key === 'ArrowLeft') scrollByStep(-1);
  };

  return (
    <Section id="gallery" title="Gallery" intro="Other Products. Swipe through the looks. Tap a photo to enlarge." tint>
      <Reveal className="gallery-wrap">
        <button className="gallery__nav gallery__nav--prev" aria-label="Previous photos" disabled={atStart} onClick={() => scrollByStep(-1)}>&lsaquo;</button>
        <div
          ref={galRef}
          className="gallery"
          role="list"
          tabIndex={0}
          aria-label="Costume photos, swipe to browse"
          onScroll={() => requestAnimationFrame(sync)}
          onPointerDown={onPointerDown}
          onClickCapture={onClickCapture}
          onKeyDown={onKeyDown}
        >
          {photos.map((p, i) => (
            <Reveal
              as="button"
              type="button"
              className="gallery__item"
              role="listitem"
              key={p.src}
              delay={gridDelay(i)}
              onClick={() => setLightbox(i)}
            >
              <img src={p.src} alt={p.alt} loading="lazy" width={900} height={900} />
            </Reveal>
          ))}
        </div>
        <button className="gallery__nav gallery__nav--next" aria-label="Next photos" disabled={atEnd} onClick={() => scrollByStep(1)}>&rsaquo;</button>
      </Reveal>

      <div className="gallery__dots" aria-hidden="true">
        {photos.map((p, i) => <i key={p.src} className={i === active ? 'on' : undefined} />)}
      </div>

      <Lightbox photos={photos} index={lightbox} onChange={setLightbox} onClose={() => setLightbox(null)} />
    </Section>
  );
}
