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
    editableValues,
    updateFieldValue,
    updateFieldPercentage,
    percentageStrings,
    salaryError,
    minimumSalary
  } = useSalaryCalculator();

  const parseValueInput = (value: string): number => {
    const cleanValue = value.replace(/[^0-9,.-]/g, '');
    return parseFloat(cleanValue.replace(',', '.')) || 0;
  };

  const formatValueForInput = (value: number): string => {
    return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
            {t('title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {t('subtitle')}
          </p>
        </header>

        <main role="main" aria-label={t('title')}>
          {/* Salary Input Section */}
          <section aria-labelledby="salary-input-heading" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
            <h2 id="salary-input-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300 sr-only">
              {t('salaryInput.label')}
            </h2>
            <div className="mb-6">
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                {t('salaryInput.label')}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" aria-hidden="true">R$</span>
                <input
                  id="salary"
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  placeholder={t('salaryInput.placeholder')}
                  aria-describedby="salary-help salary-error"
                  aria-invalid={salaryError ? 'true' : 'false'}
                  aria-required="true"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 text-lg bg-white dark:bg-gray-700 transition-colors duration-300 ${
                    salaryError 
                      ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 dark:text-red-100' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white'
                  }`}
                />
                {salaryError && (
                  <p id="salary-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center" role="alert">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {salaryError}
                  </p>
                )}
                <p id="salary-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Salário mínimo: R$ {minimumSalary.toLocaleString('pt-BR')},00
                </p>
              </div>
            </div>

            <button
              onClick={calculate}
              disabled={!salary.trim() || salaryError !== ''}
              aria-describedby="calculate-help"
              className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform ${
                !salary.trim() || salaryError !== ''
                  ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white hover:scale-105'
              }`}
            >
              {t('calculate')}
            </button>
            <p id="calculate-help" className="sr-only">
              Digite um salário válido acima do valor mínimo para calcular as distribuições
            </p>
          </section>

          {/* Results Section */}
          {result && (
            <section aria-labelledby="results-heading" aria-live="polite" className="space-y-6">
              <h2 id="results-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300 sr-only">
                Resultados da Calculadora
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="group" aria-labelledby="categories-heading">
                <h3 id="categories-heading" className="sr-only">Categorias de Distribuição do Salário</h3>
                
                {/* Investment Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-colors duration-300"
                         aria-labelledby="investments-title"
                         aria-describedby="investments-description">
                  <h4 id="investments-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">{t('categories.investments.title')}</h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="investments-controls-label">
                    <h5 id="investments-controls-label" className="sr-only">Controles de Investimento</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="investments-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400" 
                              id="investments-percentage-display"
                              aria-live="polite">
                          {percentageStrings.investments}%
                        </span>
                      </div>
                      <input
                        id="investments-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.investments)}
                        onChange={(e) => updateFieldPercentage('investments', e.target.value)}
                        aria-describedby="investments-percentage-display investments-description"
                        aria-label={`${t('categories.investments.title')} percentage: ${percentageStrings.investments}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 slider-green"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="investments-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="investments-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.investments || 0)}
                        onChange={(e) => updateFieldValue('investments', parseValueInput(e.target.value))}
                        aria-describedby="investments-description"
                        aria-label={`${t('categories.investments.title')} valor em reais`}
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="investments-description" 
                       className="text-xl font-bold text-green-600 dark:text-green-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.investments)}
                    </p>
                  </section>
                </article>

                {/* Summary */}
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
            </section>
          )}

          {/* Explanations Section */}
          <section aria-labelledby="explanations-heading" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8 transition-colors duration-300">
            <h2 id="explanations-heading" className="text-2xl font-bold text-gray-800 dark:text-white mb-6">{t('explanations.title')}</h2>
            {/* Explanations content would go here */}
          </section>

          {/* Language Selection Section */}
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
                  onChange={(e) => handleLanguageChange(e.target.value)}
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
        </main>
      </div>
    </div>
  );
}