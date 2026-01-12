import { useApp } from '@/contexts/AppContext';
import enTranslations from '@/locales/en.json';
import arTranslations from '@/locales/ar.json';

type TranslationKey = string;
type TranslationParams = Record<string, string | number>;

export function useTranslation() {
  const { language } = useApp();
  
  const translations = language === 'ar' ? arTranslations : enTranslations;

  const t = (key: TranslationKey, params?: TranslationParams): string => {
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    let result = typeof value === 'string' ? value : key;
    
    // Replace template parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{{${paramKey}}}`, String(paramValue));
      });
    }
    
    return result;
  };

  return { t, language };
}
