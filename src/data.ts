export const SHOPEE_URL = 'https://shopee.ph/daisyonlineshop2024';
export const SHOPEE_REVIEWS_URL = 'https://shopee.ph/buyer/568528673/rating?shop_id=568509088';

export interface Benefit { icon: string; title: string; text: string }
export interface Product { tag: string; image: string; alt: string; name: string; text: string }
export interface Photo { src: string; alt: string; fullAlt: string }
export interface WhyItem { icon: string; title: string; text: string }
export interface Category { icon: string; title: string; text: string }
export interface Review {
  user: string;
  date: string;       // ISO date for <time dateTime>
  dateLabel: string;
  item: string;
  paragraphs: string[];
  tags?: string;
}

export const benefits: Benefit[] = [
  { icon: '🧵', title: 'Comfortable fabric', text: 'Easy to wear through a whole school day or show.' },
  { icon: '🎨', title: 'Stylish design', text: 'Traditional patterns and classic character looks.' },
  { icon: '📏', title: 'Kids and adults', text: 'Costumes in kids and adult sizes.' },
  { icon: '🎉', title: 'Any occasion', text: 'School events, parties, cultural shows, cosplay.' },
];

export const products: Product[] = [
  { tag: 'Popular', image: 'peter-pan', name: 'Peter Pan Costume',
    alt: 'Peter Pan costume for kids with hat, shirt, belt, pants and shoes',
    text: 'Five pieces shown: feathered hat, jagged-hem shirt, belt, pants and shoes.' },
  { tag: 'Regional Wear', image: 'thailand', name: 'Thailand Costume',
    alt: 'Thailand boy and girl costume for kids',
    text: 'Boy and girl sets in woven-style blue and gold prints, with matching hats and sashes.' },
  { tag: 'Traditional', image: 'balintawak', name: 'Balintawak / Filipiniana',
    alt: 'Girls in floral Balintawak Filipiniana costumes',
    text: 'Floral girls costume with contrast sash and headscarf. Made for Buwan ng Wika.' },
  { tag: 'Regional Wear', image: 'japanese', name: 'Japanese Costume',
    alt: 'Japanese costume for kids, floral dress and red happi set',
    text: 'A floral wrap dress with obi sash for girls and a red top-and-pants set for boys.' },
  { tag: 'Character', image: 'dracula', name: 'Dracula Costume',
    alt: 'Dracula cape costume for kids and adults',
    text: 'Black flowing cape with a high red standing collar and tie. Kids and adults.' },
  { tag: 'Character', image: 'witch', name: 'Witch Costume',
    alt: 'Black witch costume for kids with jagged sleeves and hem',
    text: 'Black dress with a bow-tie neckline and jagged sleeves and hem. Hat not included.' },
];

export const photos: Photo[] = [
  { src: 'igorot', alt: 'Igorot costume', fullAlt: 'Igorot costume for kids' },
  { src: 'chinese', alt: 'Chinese costume', fullAlt: 'Chinese outfit for kids' },
  { src: 'muslim', alt: 'Muslim costume', fullAlt: 'Muslim costume for kids' },
  { src: 'korean', alt: 'Korean costume', fullAlt: 'Korean costume for kids' },
  { src: 'balintawak-adult', alt: 'Balintawak adult costume', fullAlt: 'Balintawak Filipiniana adult costume' },
  { src: 'priest', alt: 'Priest costume', fullAlt: 'Priest costume for kids' },
].map((p) => ({ ...p, src: `/images/${p.src}.webp` }));

export const whyItems: WhyItem[] = [
  { icon: 'kid', title: 'Looks that fit the event',
    text: 'Buwan ng Wika, Nutrition Month, Halloween, international day. Pick a costume that matches the program.' },
  { icon: 'clothes', title: 'Complete outfits',
    text: 'Peter Pan lists hat, shirt, belt, pants and shoes. Thailand sets pair a top with bottoms and a hat or sash.' },
  { icon: 'wear', title: 'Easy to wear',
    text: 'Lightweight and comfortable fabric, so kids can move, sit and perform.' },
  { icon: 'shop', title: 'A shop since 2020',
    text: 'Daisy Online Shop has been selling on Shopee since 2020.' },
];

export const categories: Category[] = [
  { icon: 'cat-character', title: 'Character Costumes',
    text: 'Dracula, Witch, Peter Pan and more storybook looks.' },
  { icon: 'cat-filipino', title: 'Filipino Traditional Wear',
    text: 'Balintawak and Filipiniana outfits for Buwan ng Wika and cultural events.' },
  { icon: 'cat-belts', title: 'Belts & Scarves',
    text: 'Finishing pieces to go with your costume.' },
  { icon: 'cat-deped', title: 'DepEd Teachers Uniform',
    text: 'Uniforms for DepEd teachers.' },
  { icon: 'cat-un', title: 'United Nations Costume',
    text: 'National costumes for UN Day and international events, like our Thailand and Japanese sets.' },
];

export const reviews: Review[] = [
  {
    user: 'jillelitsea', date: '2024-10-13', dateLabel: 'Oct 13, 2024',
    item: 'Thailand Boy and Girl Costume for Kids, S',
    paragraphs: ['Cute ng style ng costumes sa store nato. 😍 Medjo nalakihan lang ako sa small size for my 6 years old coz petite & not so tall ang anak ko (I bet American size pala ang costumes) pina resize ko lang yung pants sa anak ko. Niways, bait ni seller. Nag accommodate talaga sa queries ng costumer. Keep it up, seller! Will buy another costume soon! God bless. 💙💛'],
  },
  {
    user: 'c*****o', date: '2023-09-08', dateLabel: 'Sep 8, 2023',
    item: 'Traditional Floral Balintawak/Filipiniana Kids Costume, S: 5–6 yrs old',
    paragraphs: ['Kasya sa pinsan ko. Cutee nilang tignan. Bagay lang sa kanila. Maganda din tela neto at super cheap kumpara sa iba. Correct design at size ang dumating. Good job kay seller. More sales to come.'],
  },
  {
    user: 'streetballin', date: '2023-08-27', dateLabel: 'Aug 27, 2023',
    item: 'Traditional Floral Balintawak Filipiniana Dress Adult · Red Adult, L',
    paragraphs: ['True to size, delivered well and nice Filipiniana attire. Nagamit ko sa DepEd night namin. At gagamitin din ng anak ko'],
    tags: 'Appearance: nice · Material quality: good quality · Colour: floral red',
  },
];
