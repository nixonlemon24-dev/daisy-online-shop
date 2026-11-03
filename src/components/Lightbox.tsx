import { useEffect, useRef, type TouchEvent } from 'react';
import type { Photo } from '../data';

interface Props {
  photos: Photo[];
  /** index of the open photo, or null when closed */
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
}

export default function Lightbox({ photos, index, onChange, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastIndex = useRef(0);        // keeps the last photo visible while the dialog closes
  const touchStartX = useRef(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (index !== null) {
      lastIndex.current = index;
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [index]);

  const current = index ?? lastIndex.current;
  const photo = photos[current];
  const go = (delta: number) => onChange((current + delta + photos.length) % photos.length);

  const onTouchEnd = (e: TouchEvent<HTMLImageElement>) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label="Enlarged photo"
      onClose={onClose}                       // fires on Escape too
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1);
        if (e.key === 'ArrowLeft') go(-1);
      }}
    >
      <img
        src={photo.src}
        alt={photo.fullAlt}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={onTouchEnd}
      />
      <button className="lightbox__close" aria-label="Close" onClick={onClose}>&times;</button>
      <button className="lightbox__nav lightbox__nav--prev" aria-label="Previous photo" onClick={() => go(-1)}>&lsaquo;</button>
      <button className="lightbox__nav lightbox__nav--next" aria-label="Next photo" onClick={() => go(1)}>&rsaquo;</button>
    </dialog>
  );
}
