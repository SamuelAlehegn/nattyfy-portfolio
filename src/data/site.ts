import type { SocialLink } from '@/types/content';

/**
 * Central contact details and social destinations. The profile URLs are
 * placeholders until the final handles are confirmed.
 */
export const site = {
  name: 'Natnael Fikreyesus',
  email: 'fikreyesusn@gmail.com',
  phoneDisplay: '+251 912 070 233',
  phoneHref: 'tel:+251912070233',
  roles: ['Logo Design and', 'Brand Identity Design'],
} as const;

export const socialLinks: SocialLink[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/natnael-fikreyesus/',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/nattyfy',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/nattyfy/',
  },
];
