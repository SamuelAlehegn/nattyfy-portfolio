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
  /** Blurred teaser card with the "Project Name →" overlay. */
  blurred?: boolean;
}

export interface LogoItem {
  id: string;
  name: string;
  image: string;
  /** Brand tile background sampled from the design system (§6.4). */
  background: string;
}

export type SocialNetwork = 'linkedin' | 'telegram' | 'instagram';

export interface SocialLink {
  id: SocialNetwork;
  label: string;
  href: string;
}
