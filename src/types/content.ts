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

export type SocialNetwork = 'linkedin' | 'telegram' | 'instagram';

export interface SocialLink {
  id: SocialNetwork;
  label: string;
  href: string;
}
