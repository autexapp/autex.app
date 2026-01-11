import { DocSection } from './types';
import { gettingStartedSection } from './sections/01-getting-started';
import { productsSection } from './sections/02-products';
import { conversationsSection } from './sections/03-conversations';
import { ordersSection } from './sections/04-orders';
import { aiFeaturesSection } from './sections/05-ai-features';
import { settingsSection } from './sections/06-settings';
import { faqSection } from './sections/07-faq';

// Register all sections here
export const docSections: DocSection[] = [
  gettingStartedSection,
  productsSection,
  conversationsSection,
  ordersSection,
  aiFeaturesSection,
  settingsSection,
  faqSection,
].sort((a, b) => a.order - b.order);

export function getSectionBySlug(slug: string): DocSection | undefined {
  return docSections.find(s => s.slug === slug);
}

export function getArticleBySlug(sectionSlug: string, articleSlug: string) {
  const section = getSectionBySlug(sectionSlug);
  if (!section) return null;
  
  const article = section.articles.find(a => a.slug === articleSlug);
  if (!article) return null;

  return { section, article };
}

export function searchDocs(query: string, lang: 'en' | 'bn') {
  const q = query.toLowerCase();
  const results = [];

  for (const section of docSections) {
    for (const article of section.articles) {
      const title = article.title[lang].toLowerCase();
      const content = article.content[lang].toLowerCase();
      
      if (title.includes(q) || content.includes(q)) {
        results.push({ section, article });
      }
    }
  }
  return results;
}
