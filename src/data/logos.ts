import bahreGorgoriosSchools from '@/assets/images/logos/bahre-gorgorios-schools.svg';
import borderlessAfrica from '@/assets/images/logos/borderless-africa.svg';
import dtpShippingSolutions from '@/assets/images/logos/dtp-shipping-solutions.svg';
import enzirtMultimedia from '@/assets/images/logos/enzirt-multimedia.svg';
import esx from '@/assets/images/logos/esx.svg';
import fetanTicket from '@/assets/images/logos/fetan-ticket.svg';
import firmaoffice from '@/assets/images/logos/firmaoffice.svg';
import gabiLoungeBar from '@/assets/images/logos/gabi-lounge-bar.svg';
import habeshaEqub from '@/assets/images/logos/habesha-equb.svg';
import hayaZetegn from '@/assets/images/logos/haya-zetegn.svg';
import hen from '@/assets/images/logos/hen.svg';
import herolSignature from '@/assets/images/logos/herol-signature.svg';
import maledaCoffee from '@/assets/images/logos/maleda-coffee.svg';
import minnovation from '@/assets/images/logos/minnovation.svg';
import nisirMotivation from '@/assets/images/logos/nisir-motivation.svg';
import orbit from '@/assets/images/logos/orbit.svg';
import swedenEthiopia from '@/assets/images/logos/sweden-ethiopia.svg';
import whensIftar from '@/assets/images/logos/whens-iftar.svg';
import type { LogoItem } from '@/types/content';

/**
 * Logo tiles ordered row-major to match the Logos reference (three columns).
 * Each background is the sampled brand color from the design system (§6.4);
 * the full-bleed SVG already carries the artwork and its own background, so
 * the color also acts as a fallback while the file loads.
 */
export const logos: LogoItem[] = [
  {
    id: 'sweden-ethiopia',
    name: 'Sweden–Ethiopia',
    image: swedenEthiopia,
    background: '#1C3664',
  },
  {
    id: 'habesha-equb',
    name: 'Habesha Equb',
    image: habeshaEqub,
    background: '#1D1A4C',
  },
  {
    id: 'bahre-gorgorios-schools',
    name: 'Bahre Gorgorios Schools',
    image: bahreGorgoriosSchools,
    background: '#124D8C',
  },
  {
    id: 'esx',
    name: 'ESX Ethiopian Securities Exchange',
    image: esx,
    background: '#0C2344',
  },
  {
    id: 'dtp-shipping-solutions',
    name: 'DTP Shipping Solutions',
    image: dtpShippingSolutions,
    background: '#FFEAD9',
  },
  {
    id: 'borderless-africa',
    name: 'Borderless Africa',
    image: borderlessAfrica,
    background: '#0F0F0F',
  },
  {
    id: 'nisir-motivation',
    name: 'Nisir Motivation',
    image: nisirMotivation,
    background: '#FFE8D4',
  },
  {
    id: 'enzirt-multimedia',
    name: 'Enzirt Multimedia',
    image: enzirtMultimedia,
    background: '#5F3380',
  },
  {
    id: 'orbit',
    name: 'Orbit Consultancy & Events',
    image: orbit,
    background: '#FFF6E6',
  },
  {
    id: 'minnovation',
    name: 'Minnovation',
    image: minnovation,
    background: '#142A4A',
  },
  {
    id: 'hen',
    name: 'Hen',
    image: hen,
    background: '#EBC300',
  },
  {
    id: 'fetan-ticket',
    name: 'Fetan Ticket',
    image: fetanTicket,
    background: '#2E2E2E',
  },
  {
    id: 'gabi-lounge-bar',
    name: 'Gabi Lounge & Bar',
    image: gabiLoungeBar,
    background: '#2B0A33',
  },
  {
    id: 'haya-zetegn',
    name: 'Haya Zetegn Business Group',
    image: hayaZetegn,
    background: '#046646',
  },
  {
    id: 'whens-iftar',
    name: "When's Iftar",
    image: whensIftar,
    background: '#FFFFFF',
  },
  {
    id: 'herol-signature',
    name: 'Herol Signature',
    image: herolSignature,
    background: '#0C4A57',
  },
  {
    id: 'firmaoffice',
    name: 'FirmaOffice',
    image: firmaoffice,
    background: '#052432',
  },
  {
    id: 'maleda-coffee',
    name: 'Maleda Coffee',
    image: maledaCoffee,
    background: '#1D1C4C',
  },
];
