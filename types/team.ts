export interface BilingualText {
  en: string;
  ar: string;
}

export type RoleType = 'owner' | 'cto' | 'pm' | 'design' | 'frontend' | 'backend' | 'mobile' | 'support';

export interface TeamMember {
  id: string;
  name: BilingualText;
  role: BilingualText;
  roleType: RoleType;
  desc: BilingualText;
  details: {
    en: string[];
    ar: string[];
  };
}

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
