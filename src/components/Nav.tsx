import { useEffect, useState } from 'react';
import { SHOPEE_URL } from '../data';

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header className="nav" id="top">
      <a className="brand" href="#top" aria-label="Daisy Online Shop home">
        <img src="/images/logo.webp" alt="" width={40} height={40} />
        <span>Daisy Online Shop</span>
      </a>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="menu"
        aria-label="Menu"
        onClick={() => setOpen((o) => !o)}
      >
        <i></i><i></i>
      </button>
      <nav
        className={`nav__menu${open ? ' open' : ''}`}
        id="menu"
        aria-label="Main"
        onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}
      >
        <div className="nav__group nav__group--left">
          <a href="#collection">Products</a>
          <a href="#categories">Categories</a>
        </div>
        <div className="nav__group nav__group--right">
          <a href="#testimonials">Testimonials</a>
          <a href="#faq">FAQ</a>
          <a className="btn btn--sm" href={SHOPEE_URL} target="_blank" rel="noopener">Shop Now</a>
        </div>
      </nav>
    </header>
  );
}
