import buildingArt450 from '@/assets/images/social/post-building-450.webp';
import buildingArt from '@/assets/images/social/post-building.webp';
import desertArt450 from '@/assets/images/social/post-desert-450.webp';
import desertArt from '@/assets/images/social/post-desert.webp';
import waterArt450 from '@/assets/images/social/post-water-450.webp';
import waterArt from '@/assets/images/social/post-water.webp';
import type { ImageAsset, SocialPost } from '@/types/content';

function postImage(src: string, src450: string): ImageAsset {
  return {
    src,
    srcSet: `${src450} 450w, ${src} 900w`,
    width: 900,
    height: 900,
  };
}

/**
 * Square post artwork exported from the supplied social samples, paired with
 * live Instagram chrome in `InstagramCard`. Keep captions and hashtags here so
 * new campaigns only need a data entry and artwork file.
 *
 * The reference collage leans every card the same way; the stair-step look
 * comes from rotating identical cards inside the grid. The grid repeats the
 * designs across three rows to match the reference.
 */
export const socialPosts: SocialPost[] = [
  {
    id: 'ovid-real-estate',
    title: 'Ovid Real Estate',
    image: postImage(buildingArt, buildingArt450),
    alt: 'Ovid Real Estate post with high-rise buildings rising above a field of yellow flowers and an Amharic headline.',
    username: 'heyy_user',
    likes: 1992,
    caption: 'The quick brown fox',
    hashtags: ['#OMG', '#NICE', '#cats', '#fine', '#lovely', '#family'],
    tilt: -16,
  },
  {
    id: 'miawa-spring-water',
    title: 'Miawa Spring Water',
    image: postImage(waterArt, waterArt450),
    alt: 'Miawa Spring Water post with a clear bottle against a droplet-covered teal background and Amharic copy.',
    username: 'heyy_user',
    likes: 1992,
    caption: 'The quick brown fox',
    hashtags: ['#OMG', '#NICE', '#cats', '#fine', '#lovely', '#family'],
    tilt: -16,
  },
  {
    id: 'haya-sebat',
    title: 'HayaSebat Marketing & Branding',
    image: postImage(desertArt, desertArt450),
    alt: 'HayaSebat post with red branding, a lone tree on desert sand, and Amharic typography.',
    username: 'heyy_user',
    likes: 1992,
    caption: 'The quick brown fox',
    hashtags: ['#OMG', '#NICE', '#cats', '#fine', '#lovely', '#family'],
    tilt: -16,
  },
];
