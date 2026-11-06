// ===== Mobile menu =====
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');

function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('open', open);
}

toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// ===== Lightbox (open) =====
const box = document.querySelector('.lightbox');
const boxImg = box.querySelector('img');

document.querySelectorAll('.gallery__item').forEach((item) => {
  item.addEventListener('click', () => {
    boxImg.src = item.dataset.full;
    boxImg.alt = item.dataset.alt || '';
    box.showModal();
  });
});

box.querySelector('.lightbox__close').addEventListener('click', () => box.close());
box.addEventListener('click', (e) => { if (e.target === box) box.close(); });

// ===== FAQ: open one item at a time =====
const faqs = document.querySelectorAll('.faq details');
faqs.forEach((d) => d.addEventListener('toggle', () => {
  if (d.open) faqs.forEach((o) => { if (o !== d) o.open = false; });
}));

// ===== Gallery: arrows, dots, mouse drag =====
const gal = document.querySelector('.gallery');
const items = [...gal.querySelectorAll('.gallery__item')];
const dots = document.querySelector('.gallery__dots');
const prevBtn = document.querySelector('.gallery__nav--prev');
const nextBtn = document.querySelector('.gallery__nav--next');
items.forEach(() => dots.appendChild(document.createElement('i')));

const step = () => items[0].getBoundingClientRect().width + 12;

function syncGallery() {
  const i = Math.min(items.length - 1, Math.round(gal.scrollLeft / step()));
  [...dots.children].forEach((d, n) => d.classList.toggle('on', n === i));
  prevBtn.disabled = gal.scrollLeft < 4;
  nextBtn.disabled = gal.scrollLeft + gal.clientWidth >= gal.scrollWidth - 4;
}

gal.addEventListener('scroll', () => requestAnimationFrame(syncGallery), { passive: true });
window.addEventListener('resize', syncGallery);
prevBtn.addEventListener('click', () => gal.scrollBy({ left: -step(), behavior: 'smooth' }));
nextBtn.addEventListener('click', () => gal.scrollBy({ left: step(), behavior: 'smooth' }));
gal.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') gal.scrollBy({ left: step(), behavior: 'smooth' });
  if (e.key === 'ArrowLeft') gal.scrollBy({ left: -step(), behavior: 'smooth' });
});

// Mouse drag (touch uses native swipe)
let down = false, moved = false, startX = 0, startLeft = 0;
gal.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse') return;
  down = true; moved = false; startX = e.clientX; startLeft = gal.scrollLeft;
});
window.addEventListener('pointermove', (e) => {
  if (!down) return;
  const dx = e.clientX - startX;
  if (Math.abs(dx) > 5) { moved = true; gal.classList.add('dragging'); }
  if (moved) gal.scrollLeft = startLeft - dx;
});
window.addEventListener('pointerup', () => {
  if (!down) return;
  down = false;
  if (moved) {
    gal.classList.remove('dragging');
    gal.scrollTo({ left: Math.round(gal.scrollLeft / step()) * step(), behavior: 'smooth' });
  }
});
// Swallow the click that ends a drag so it doesn't open the lightbox
gal.addEventListener('click', (e) => {
  if (moved) { e.stopImmediatePropagation(); e.preventDefault(); moved = false; }
}, true);
syncGallery();

// ===== Lightbox navigation (prev / next / keys / swipe) =====
let current = 0;

function showPhoto(i) {
  current = (i + items.length) % items.length;
  boxImg.src = items[current].dataset.full;
  boxImg.alt = items[current].dataset.alt || '';
  items[current].scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
}

items.forEach((item, i) => item.addEventListener('click', () => { current = i; }));
box.querySelector('.lightbox__nav--prev').addEventListener('click', () => showPhoto(current - 1));
box.querySelector('.lightbox__nav--next').addEventListener('click', () => showPhoto(current + 1));
box.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') showPhoto(current + 1);
  if (e.key === 'ArrowLeft') showPhoto(current - 1);
});

let tx = 0;
boxImg.addEventListener('touchstart', (e) => { tx = e.touches[0].clientX; }, { passive: true });
boxImg.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) showPhoto(current + (dx < 0 ? 1 : -1));
}, { passive: true });

// ===== Scroll reveal animations =====
const revealSel = '.section__head,.card,.cats li,.why li,.review,.benefits li,.gallery-wrap,.gallery__item,.faq details,.card__container,.cta > *,.footer > *';
const revealEls = [...document.querySelectorAll(revealSel)];

// Stagger items that sit next to each other (cards, categories, reviews...)
revealEls.forEach((el) => {
  const sibs = [...el.parentElement.children].filter((c) => c.matches(revealSel));
  const i = sibs.indexOf(el);
  const stack = el.parentElement.matches('.cta, .footer');   // single column: one after another
  el.style.setProperty('--d', (stack ? i * 110 : (i % 3) * 90) + 'ms');
});

if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealEls.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });
  revealEls.forEach((el) => io.observe(el));
}