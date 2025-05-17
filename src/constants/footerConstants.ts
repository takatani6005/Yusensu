import {
  faFacebook,
  faInstagram,
  faTwitter,
  faPinterest,
  faTiktok,
  faYoutube,
  faApple,
  faGooglePlay
} from '@fortawesome/free-brands-svg-icons';
import { BusinessHours, FooterLink, SocialMedia, AppDownload } from '../types/footer';

export const BUSINESS_HOURS: BusinessHours[] = [
  { day: 'Monday - Thursday', time: '11:00 - 22:00' },
  { day: 'Friday - Saturday', time: '11:00 - 23:00' },
  { day: 'Sunday', time: '12:00 - 21:00' }
];

export const AWARDS = [
  "Michelin Recommended",
  "Best Sushi 2023",
  "Top 10 Japanese",
  "Luxury Dining Award"
];

export const SOCIAL_MEDIA: SocialMedia[] = [
  { platform: 'Facebook', icon: faFacebook, url: '#' },
  { platform: 'Instagram', icon: faInstagram, url: '#' },
  { platform: 'Twitter', icon: faTwitter, url: '#' },
  { platform: 'Pinterest', icon: faPinterest, url: '#' },
  { platform: 'TikTok', icon: faTiktok, url: '#' },
  { platform: 'YouTube', icon: faYoutube, url: '#' }
];

export const LEGAL_LINKS: FooterLink[] = [
  { text: 'Privacy Policy', url: '#' },
  { text: 'Terms of Service', url: '#' },
  { text: 'Sitemap', url: '#' },
  { text: 'Help Center', url: '#' }
];

export const LANGUAGES = [
  'English',
  '日本語',
  '中文',
  'Español',
  'Français'
];

export const APP_DOWNLOADS: AppDownload[] = [
  {
    platform: 'ios',
    qrCodeUrl: '/assets/AppsDownload/QRcodeApp.png',
    label: 'iOS'
  },
  {
    platform: 'android',
    qrCodeUrl: '/assets/AppsDownload/QRcodeGGPlay.png',
    label: 'Android'
  }
];
