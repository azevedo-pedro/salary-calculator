'use client';

import React from 'react';
import { useTranslations, useLocale } from 'next-intl';

interface LanguageSelectorProps {
  onLanguageChange: (newLocale: string) => void;
}

const LanguageSelector = React.memo(({ onLanguageChange }: LanguageSelectorProps) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section aria-labelledby="language-section-heading" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8 transition-colors duration-300">
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <label htmlFor="language-select" 
                 id="language-section-heading"
                 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('locationSelect.label')}:
          </label>
          <select
            id="language-select"
            onChange={(e) => onLanguageChange(e.target.value)}
            value={locale}
            aria-describedby="language-section-heading"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors duration-300"
          >
            <option value="en">{t('locationSelect.english')}</option>
            <option value="pt">{t('locationSelect.portuguese')}</option>
          </select>
        </div>
      </div>
    </section>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

export default LanguageSelector;