import buildingArt from '@/assets/images/social/post-building.webp';
import desertArt from '@/assets/images/social/post-desert.webp';
import waterArt from '@/assets/images/social/post-water.webp';
import type { SocialPost } from '@/types/content';

/**
 * Square post artwork exported from the supplied social samples, paired with
 * live Instagram chrome in `InstagramCard`. Keep captions and hashtags here so
 * new campaigns only need a data entry and artwork file.
 */
export const socialPosts: SocialPost[] = [
  {
    id: 'ovid-real-estate',
    title: 'Ovid Real Estate',
    image: buildingArt,
    alt: 'Ovid Real Estate post with high-rise buildings rising above a field of yellow flowers and an Amharic headline.',
    username: 'heyy_user',
    likes: 1992,
    caption: 'The quick brown fox',
    hashtags: ['#OMG', '#NICE', '#cats', '#fine', '#lovely', '#family'],
    tilt: -14,
  },
  {
    id: 'miawa-spring-water',
    title: 'Miawa Spring Water',
    image: waterArt,
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
    image: desertArt,
    alt: 'HayaSebat post with red branding, a lone tree on desert sand, and Amharic typography.',
    username: 'heyy_user',
    likes: 1992,
    caption: 'The quick brown fox',
    hashtags: ['#OMG', '#NICE', '#cats', '#fine', '#lovely', '#family'],
    tilt: -15,
  },
];
