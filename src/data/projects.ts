import blur800 from '@/assets/images/portfolio/portfolio-yellow-blur-800.webp';
import blur1400 from '@/assets/images/portfolio/portfolio-yellow-blur-1400.webp';
import yellow800 from '@/assets/images/portfolio/portfolio-yellow-800.webp';
import yellow1400 from '@/assets/images/portfolio/portfolio-yellow-1400.webp';
import type { Project } from '@/types/content';

const sharpImage = {
  src: yellow1400,
  srcSet: `${yellow800} 800w, ${yellow1400} 1400w`,
  width: 1400,
  height: 998,
};

const blurredImage = {
  src: blur1400,
  srcSet: `${blur800} 800w, ${blur1400} 1400w`,
  width: 1400,
  height: 1022,
};

/**
 * The reference repeats the yellow identity mockup, so the same case-study
 * gallery is reused here until the real project mockups land. "Project Name"
 * is the confidential teaser and intentionally ships without a gallery to
 * exercise the details page's empty state.
 */
const caseStudyGallery = [sharpImage, sharpImage];

/**
 * My Works brand grid and case-study source. The reference repeats the yellow
 * identity mockup and reserves the second slot for the "Project Name" teaser,
 * whose sharp artwork blurs on hover. The same image pair is reused here until
 * real mockups land.
 */
export const worksProjects: Project[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    href: '/works/golden-hour',
    image: sharpImage,
    description: [
      'Golden Hour is a boutique photography studio built around warm light and quiet confidence. The identity pairs a sun-washed gold palette with a hand-drawn bloom mark, giving every touchpoint a soft, editorial rhythm. The mark began as a simple petal study and grew into a flexible symbol that works equally well embossed on paper or animated on screen.',
      'The system spans stationery, packaging, and a flexible social toolkit. Restrained typography and generous negative space keep the photography in focus, while the gold accents make the brand instantly recognisable across print and screen. A concise set of templates lets the studio publish new work without losing the calm, consistent tone.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'project-name',
    title: 'Project Name',
    href: '/works/project-name',
    image: sharpImage,
    hoverImage: blurredImage,
    blurred: true,
    description: [
      'A confidential identity project currently taking shape behind the scenes. The work explores a calm, contemporary visual language for a brand preparing its first public release. The direction favours quiet typography, tactile materials, and a restrained palette that can grow with the brand.',
      'The full case study — including the mark, palette, and applied system — will be shared once the launch is live. The teaser card on My Works hints at the direction without giving the story away. A preview of the identity is available on request.',
    ],
  },
  {
    id: 'aurelia',
    title: 'Aurelia',
    href: '/works/aurelia',
    image: sharpImage,
    description: [
      'Aurelia is a modern jewellery label rooted in sculptural forms and everyday ritual. The identity centres on a fluid monogram, warm metallics, and a palette that shifts between soft ivory and deep bronze. Each piece is designed to layer, stack, and catch the light, and the identity follows the same logic.',
      'Packaging, lookbook layouts, and digital templates extend the system with an emphasis on tactility. The result is a brand that feels considered, intimate, and quietly luxurious at every scale. The wordmark scales from a tiny jewellery tag to a full campaign headline without losing its poise.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'solstice',
    title: 'Solstice',
    href: '/works/solstice',
    image: sharpImage,
    description: [
      'Solstice is a seasonal food and drink concept inspired by long summer evenings. The identity uses a sun-bleached palette, bold geometric type, and a circular mark that moves across packaging and menus. The palette moves from pale sand to deep terracotta, echoing the shift from afternoon to dusk.',
      'A flexible grid and a set of illustrated ingredients keep the system playful without losing clarity. The rollout covers everything from takeaway cups to a responsive launch site. Signage and seasonal menus can be swapped in minutes, keeping the concept fresh from one season to the next.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'amber-and-co',
    title: 'Amber & Co.',
    href: '/works/amber-and-co',
    image: sharpImage,
    description: [
      'Amber & Co. is a fragrance house built around memory, warmth, and slow craft. The brand pairs a refined serif wordmark with amber-toned photography and a minimal apothecary-style label system. A custom bottle silhouette and tactile label stock carry the warmth of the scent before it is even opened.',
      'The identity extends across bottle labels, discovery sets, and editorial campaign assets. Every detail is designed to feel collected rather than purchased, with texture and restraint at the centre. Campaign photography is art-directed around shadow and grain, giving the brand a lived-in, collectible feel.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'maison',
    title: 'Maison',
    href: '/works/maison',
    image: sharpImage,
    description: [
      'Maison is a residential interiors studio with a quiet, architectural point of view. The identity relies on precise typography, a muted stone palette, and a monogram inspired by floor plans and doorways. The wordmark is spaced to feel architectural, with a small doorway detail tucked into the counter of the M.',
      'Project books, stationery, and a modular website system give the studio room to grow. The result is a brand that steps back and lets the spaces speak, while still feeling unmistakably authored. The identity is intentionally quiet, allowing material samples and project photography to take the lead.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'maleda-coffee',
    title: 'Maleda Coffee',
    href: '/works/maleda-coffee',
    image: sharpImage,
    description: [
      'Maleda Coffee is a specialty roaster celebrating Ethiopian coffee culture and the ritual of the shared cup. The identity draws on traditional patterns, a deep green palette, and a warm, contemporary wordmark. The wordmark echoes the curve of a coffee cup while the pattern system references woven textiles.',
      'Bag labels, café menus, and a flexible illustration set carry the story from origin to counter. The system balances heritage cues with a clean, modern finish that works across wholesale and retail. A wholesale kit and retail display set make the brand easy to roll out across cafés and stockists.',
    ],
    gallery: caseStudyGallery,
  },
  {
    id: 'hen',
    title: 'Hen',
    href: '/works/hen',
    image: sharpImage,
    description: [
      'Hen is a playful lifestyle brand for modern families, built around curiosity and everyday togetherness. The identity uses a soft coral palette, rounded forms, and a character-led mark that feels instantly friendly. The character is built from simple shapes so it can be redrawn, animated, and adapted by the in-house team.',
      'Packaging, apparel, and a social template library extend the brand with a light touch. The system is deliberately simple, giving the character room to appear in new poses and contexts over time. Seasonal colourways and a warm photography style keep the brand fresh without changing its core.',
    ],
    gallery: caseStudyGallery,
  },
];

/**
 * Homepage portfolio highlight. Replace these entries with real project data
 * when the project details routes land in Phase 4.
 */
export const homeProjects: Project[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    href: '/works',
    image: sharpImage,
  },
  {
    id: 'project-name',
    title: 'Project Name',
    href: '/works',
    image: sharpImage,
    hoverImage: blurredImage,
    blurred: true,
  },
  {
    id: 'aurelia',
    title: 'Aurelia',
    href: '/works',
    image: sharpImage,
  },
  {
    id: 'solstice',
    title: 'Solstice',
    href: '/works',
    image: sharpImage,
  },
  {
    id: 'amber-and-co',
    title: 'Amber & Co.',
    href: '/works',
    image: sharpImage,
  },
  {
    id: 'maison',
    title: 'Maison',
    href: '/works',
    image: sharpImage,
  },
];
