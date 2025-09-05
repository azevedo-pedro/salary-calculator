'use client';

import { useSalaryCalculator } from '@/hooks/useSalaryCalculator';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

export default function SalaryCalculator() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const {
    salary,
    setSalary,
    result,
    calculate,
    formatCurrency,
  } = useSalaryCalculator();

  const handleLanguageChange = (newLocale: string) => {
    // Simply navigate to the new locale root since we're on the main page
    router.push(`/${newLocale}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <div className="mb-6">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              {t('salaryInput.label')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">R$</span>
              <input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder={t('salaryInput.placeholder')}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors duration-300"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            {t('calculate')}
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.investments.title')}</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.investments)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.investments.percentage')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.fixedCosts.title')}</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(result.fixedCosts)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.fixedCosts.percentage')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.meta.title')}</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(result.meta)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.meta.percentage')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.confy.title')}</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.confy)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.confy.percentage')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.entertainment.title')}</h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{formatCurrency(result.entertainment)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.entertainment.percentage')}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{t('categories.studies.title')}</h3>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(result.studies)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{t('categories.studies.percentage')}</p>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6 text-white transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{t('summary.totalAllocations')}</h3>
                    <p className="text-3xl font-bold text-red-400">{formatCurrency(result.totalDeductions)}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">{t('summary.remainingAmount')}</h3>
                    <p className="text-3xl font-bold text-green-400">{formatCurrency(result.remainingAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('explanations.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-600 dark:text-green-400">{t('categories.investments.title')} ({t('categories.investments.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.investments.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.investments.examples')}
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-red-600 dark:text-red-400">{t('categories.fixedCosts.title')} ({t('categories.fixedCosts.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.fixedCosts.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.fixedCosts.examples')}
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-purple-600 dark:text-purple-400">{t('categories.meta.title')} ({t('categories.meta.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.meta.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.meta.examples')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">{t('categories.confy.title')} ({t('categories.confy.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.confy.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.confy.examples')}
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">{t('categories.entertainment.title')} ({t('categories.entertainment.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.entertainment.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.entertainment.examples')}
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">{t('categories.studies.title')} ({t('categories.studies.percentage')})</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('categories.studies.description')}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {t('categories.studies.examples')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Location Select */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-8 transition-colors duration-300">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <label htmlFor="language-select" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('locationSelect.label')}:
              </label>
              <select
                id="language-select"
                onChange={(e) => handleLanguageChange(e.target.value)}
                value={locale}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors duration-300"
              >
                <option value="en">{t('locationSelect.english')}</option>
                <option value="pt">{t('locationSelect.portuguese')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}