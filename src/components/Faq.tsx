import { useState, type ReactNode } from 'react';
import { SHOPEE_URL } from '../data';
import Reveal from './Reveal';
import Section from './Section';

interface Item { q: string; a: ReactNode }

const items: Item[] = [
  {
    q: 'Where can I buy your costumes?',
    a: <p>You can shop for our costumes directly from our Shopee store. Simply click any “Buy Now” or “Shop Now” button on this website to view our products and place your order.</p>,
  },
  {
    q: 'What sizes and colors are available?',
    a: <p>Available sizes and colors vary depending on the costume and current stock. Please visit the product listing on Shopee to check the available options before placing your order.</p>,
  },
  {
    q: 'How much do the costumes cost?',
    a: <p>Our prices may vary by costume and are listed on Shopee. Visit our store to see the latest prices, available promotions, and product details.</p>,
  },
  {
    q: 'Do you offer costumes for both kids and adults?',
    a: <p>Yes! We offer a variety of costumes primarily for kids, with selected designs also available for adults. Check our Shopee store to explore the available styles and sizes.</p>,
  },
  {
    q: 'What occasions are your costumes suitable for?',
    a: <p>Our costumes are perfect for school activities, themed parties, cultural performances, Halloween events, cosplay, stage shows, and other special occasions.</p>,
  },
  {
    q: 'How can I contact your shop?',
    a: (
      <>
        <p>We’re happy to help! If you have questions about our costumes, sizes, or orders, you can reach us through any of the following channels:</p>
        <ul>
          <li><strong>Facebook:</strong> <a href="https://www.facebook.com/deasythreads" target="_blank" rel="noopener noreferrer">Deasy Threads</a></li>
          <li><strong>Phone:</strong> <a href="tel:09279010506">0927 901 0506</a></li>
          <li><strong>Email:</strong> <a href="mailto:dcbvalentin@gmail.com">dcbvalentin@gmail.com</a></li>
          <li><strong>Shopee:</strong> <a href={SHOPEE_URL} target="_blank" rel="noopener noreferrer">Daisy Online Shop</a></li>
        </ul>
        <p>You can also message us directly through our Shopee store. We look forward to assisting you!</p>
      </>
    ),
  },
];

export default function Faq() {
  // Only one item open at a time
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq" title="Questions">
      <div className="faq">
        {items.map((item, i) => (
          <Reveal
            as="details"
            key={item.q}
            open={openIndex === i}
            onToggle={(e: React.SyntheticEvent<HTMLDetailsElement>) => {
              const isOpen = e.currentTarget.open;
              setOpenIndex((cur) => (isOpen ? i : cur === i ? null : cur));
            }}
          >
            <summary>{item.q}</summary>
            {item.a}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
