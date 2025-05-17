export interface BusinessHours {
  day: string;
  time: string;
}

export interface FooterLink {
  text: string;
  url: string;
}

export interface SocialMedia {
  platform: string;
  icon: any; // FontAwesome icon type
  url: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

export interface AppDownload {
  platform: 'ios' | 'android';
  qrCodeUrl: string;
  label: string;
}
