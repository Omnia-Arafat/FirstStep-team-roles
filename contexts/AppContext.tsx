'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Theme } from '@/types/team';

interface AppContextType {
  theme: Theme;
  language: Language;
  isAdmin: boolean;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  toggleAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [isAdmin, setIsAdmin] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedLang = localStorage.getItem('lang') as Language;
    const savedTheme = localStorage.getItem('theme') as Theme;
    
    if (savedLang) setLanguage(savedLang);
    if (savedTheme) setTheme(savedTheme);
    
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Apply theme class to document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply language direction
    if (language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    
    // Apply admin class
    if (isAdmin) {
      document.body.classList.add('admin');
    } else {
      document.body.classList.remove('admin');
    }
  }, [theme, language, isAdmin, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    localStorage.setItem('lang', newLang);
  };

  const toggleAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  if (!mounted) {
    return null;
  }

  return (
    <AppContext.Provider value={{ theme, language, isAdmin, toggleTheme, toggleLanguage, toggleAdmin }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
