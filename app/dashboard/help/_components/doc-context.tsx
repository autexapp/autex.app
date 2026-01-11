"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/docs/types';

interface DocContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const DocContext = createContext<DocContextType | undefined>(undefined);

export function DocProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('doc_language') as Language;
    if (saved && (saved === 'en' || saved === 'bn')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('doc_language', lang);
  };

  return (
    <DocContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </DocContext.Provider>
  );
}

export function useDocContext() {
  const context = useContext(DocContext);
  if (context === undefined) {
    throw new Error('useDocContext must be used within a DocProvider');
  }
  return context;
}
