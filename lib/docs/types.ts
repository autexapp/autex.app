export type Language = 'en' | 'bn';

export interface BilingualText {
  en: string;
  bn: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  order: number;
  title: BilingualText;
  summary?: BilingualText;
  content: BilingualText;
  icon?: string;
  tags?: string[];
}

export interface DocSection {
  id: string;
  slug: string;
  order: number;
  title: BilingualText;
  icon: string; // Emoji character
  articles: DocArticle[];
}
