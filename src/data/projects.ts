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
 * My Works brand grid. The reference repeats the yellow identity mockup and
 * reserves the second slot for the blurred "Project Name" teaser, so the same
 * image pair is reused here until the real case-study mockups land.
 */
export const worksProjects: Project[] = [
  {
    id: 'golden-hour',
    title: 'Golden Hour',
    href: '/works/golden-hour',
    image: sharpImage,
  },
  {
    id: 'project-name',
    title: 'Project Name',
    href: '/works/project-name',
    image: blurredImage,
    blurred: true,
  },
  {
    id: 'aurelia',
    title: 'Aurelia',
    href: '/works/aurelia',
    image: sharpImage,
  },
  {
    id: 'solstice',
    title: 'Solstice',
    href: '/works/solstice',
    image: sharpImage,
  },
  {
    id: 'amber-and-co',
    title: 'Amber & Co.',
    href: '/works/amber-and-co',
    image: sharpImage,
  },
  {
    id: 'maison',
    title: 'Maison',
    href: '/works/maison',
    image: sharpImage,
  },
  {
    id: 'maleda-coffee',
    title: 'Maleda Coffee',
    href: '/works/maleda-coffee',
    image: sharpImage,
  },
  {
    id: 'hen',
    title: 'Hen',
    href: '/works/hen',
    image: sharpImage,
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
    image: blurredImage,
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
