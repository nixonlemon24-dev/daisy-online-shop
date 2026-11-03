import {
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from 'react';

const prefersNoMotion = () =>
  !('IntersectionObserver' in window) ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// One shared observer for every revealed element
type Listener = () => void;
const listeners = new WeakMap<Element, Listener>();
let observer: IntersectionObserver | null = null;

function observe(el: Element, onIn: Listener) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        listeners.get(entry.target)?.();
        listeners.delete(entry.target);
        observer?.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -24px 0px' },
  );
  listeners.set(el, onIn);
  observer.observe(el);
}

function unobserve(el: Element) {
  listeners.delete(el);
  observer?.unobserve(el);
}

/** Adds the `in` class once the element scrolls into view. */
export function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersNoMotion()) {
      setInView(true);
      return;
    }
    observe(el, () => setInView(true));
    return () => unobserve(el);
  }, []);

  return { ref, inView };
}

/** Stagger helpers matching the original design */
export const gridDelay = (i: number) => (i % 3) * 90;
export const stackDelay = (i: number) => i * 110;

type RevealProps<T extends ElementType> = {
  as?: T;
  /** transition delay in ms, exposed to the CSS as --d */
  delay?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'delay'>;

export default function Reveal<T extends ElementType = 'div'>({
  as,
  delay = 0,
  className,
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const { ref, inView } = useReveal<HTMLElement>();
  const cls = [className, inView ? 'in' : ''].filter(Boolean).join(' ');
  const mergedStyle = { ...(style as CSSProperties), '--d': `${delay}ms` } as CSSProperties;

  return (
    <Tag ref={ref} className={cls || undefined} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}
