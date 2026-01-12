'use client';

import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/hooks/useTranslation';
import { Moon, Sun, Languages, Shield, ShieldCheck } from 'lucide-react';

interface ControlsProps {
  onAdminClick: () => void;
}

export default function Controls({ onAdminClick }: ControlsProps) {
  const { theme, toggleTheme, language, toggleLanguage, isAdmin } = useApp();
  const { t } = useTranslation();

  return (
    <div className="fixed top-4 right-4 flex gap-2.5 z-20">
      <button
        onClick={toggleTheme}
        className="bg-[var(--card)] border-none px-4 py-2.5 rounded-[22px] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.2)] text-[var(--text)] hover:scale-105 transition-transform flex items-center gap-2"
        title={t('controls.themeToggle')}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button
        onClick={toggleLanguage}
        className="bg-[var(--card)] border-none px-4 py-2.5 rounded-[22px] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.2)] text-[var(--text)] hover:scale-105 transition-transform flex items-center gap-2"
        title={t('controls.languageToggle')}
      >
        <Languages size={20} />
        <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'AR'}</span>
      </button>
      <button
        onClick={onAdminClick}
        className={`border-none px-4 py-2.5 rounded-[22px] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.2)] hover:scale-105 transition-all flex items-center gap-2 ${
          isAdmin
            ? 'bg-[var(--green)] text-white animate-pulse'
            : 'bg-[var(--card)] text-[var(--text)]'
        }`}
        title={t(isAdmin ? 'controls.adminActive' : 'controls.adminLogin')}
      >
        {isAdmin ? <ShieldCheck size={20} /> : <Shield size={20} />}
        <span className="text-sm font-medium">{isAdmin ? '✓' : 'Admin'}</span>
      </button>
    </div>
  );
}
