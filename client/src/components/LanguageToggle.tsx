import type { Language } from '../data/siteContent';

type LanguageToggleProps = {
  language: Language;
  label: string;
  onToggle: () => void;
};

export function LanguageToggle({ language, label, onToggle }: LanguageToggleProps) {
  return (
    <button className="languageToggle" onClick={onToggle} type="button" aria-label={`Switch language to ${label}`}>
      <span>{language === 'en' ? 'EN' : 'PT'}</span>
      {label}
    </button>
  );
}
