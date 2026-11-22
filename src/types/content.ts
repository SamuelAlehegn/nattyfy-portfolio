export interface ImageAsset {
  src: string;
  srcSet: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  title: string;
  href: string;
  image: ImageAsset;
  /** Optional artwork revealed on hover/focus; used by the blurred teaser card. */
  hoverImage?: ImageAsset;
  /** Teaser card whose image blurs and reveals the "Project Name →" overlay on hover. */
  blurred?: boolean;
  /** Case-study paragraphs. Optional so a project can ship before its copy is ready. */
  description?: string[];
  /** Case-study gallery images. Optional so a project can ship before its imagery is ready. */
  gallery?: ImageAsset[];
}

export interface LogoItem {
  id: string;
  name: string;
  image: string;
  /** Brand tile background sampled from the design system (§6.4). */
  background: string;
}

export interface SocialPost {
  id: string;
  /** Human-readable campaign name used for the card's accessible label. */
  title: string;
  image: ImageAsset;
  alt: string;
  username: string;
  likes: number;
  caption: string;
  hashtags: string[];
  /** Desktop rotation in degrees; the card straightens on hover. */
  tilt: number;
}

export type SocialNetwork = 'linkedin' | 'telegram' | 'instagram';

export interface SocialLink {
  id: SocialNetwork;
  label: string;
  href: string;
}
