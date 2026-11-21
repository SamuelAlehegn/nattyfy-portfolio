import type { SocialLink } from '@/types/content';

/** Central contact details and social destinations from the latest CV. */
export const site = {
  name: 'Natnael Fikreyesus',
  email: 'fikreyesusn@gmail.com',
  phoneDisplay: '+251 912 070 233',
  phoneHref: 'tel:+251912070233',
  location: 'Addis Ababa, Ethiopia',
  roles: ['Senior Brand Strategist', 'Creative Designer'],
} as const;

export const socialLinks: SocialLink[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/nattyfy',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://instagram.com/nattyfy',
  },
];
