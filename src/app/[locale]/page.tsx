'use client';

import { useSalaryCalculator } from '@/hooks/useSalaryCalculator';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

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

  // Set the lang attribute for accessibility and SEO
  useEffect(() => {
    const langAttr = locale === 'en' ? 'en-US' : 'pt-BR';
    document.documentElement.lang = langAttr;
  }, [locale]);

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const isPortuguese = locale === 'pt';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://calculator.azevedodev';
    const currentUrl = `${baseUrl}/${locale}`;
    
    const webApplicationSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "@id": currentUrl,
      "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
      "alternateName": isPortuguese ? "SalaryCalc" : "Calculadora Salarial",
      "description": isPortuguese 
        ? "Calculadora financeira gratuita para distribuir seu salário em categorias como investimentos, gastos fixos e lazer. Planeje suas finanças pessoais de forma eficiente."
        : "Free financial calculator to distribute your salary across categories like investments, fixed costs, and entertainment. Plan your personal finances efficiently.",
      "url": currentUrl,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web Browser",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "featureList": [
        isPortuguese ? "Distribuição inteligente de salário" : "Smart salary distribution",
        isPortuguese ? "Planejamento financeiro pessoal" : "Personal financial planning",
        isPortuguese ? "Cálculo automático por categorias" : "Automatic calculation by categories",
        isPortuguese ? "Interface responsiva" : "Responsive interface",
        isPortuguese ? "Suporte a múltiplos idiomas" : "Multi-language support",
        isPortuguese ? "Ferramentas de gestão financeira" : "Financial management tools"
      ],
      "inLanguage": isPortuguese ? "pt-BR" : "en-US",
      "audience": {
        "@type": "Audience",
        "audienceType": isPortuguese ? "trabalhadores, profissionais, estudantes" : "workers, professionals, students"
      },
      "author": {
        "@type": "Organization",
        "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
        "url": baseUrl
      },
      "publisher": {
        "@type": "Organization", 
        "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
        "url": baseUrl
      },
      "sameAs": [
        `${baseUrl}/pt`,
        `${baseUrl}/en`
      ],
      "potentialAction": {
        "@type": "UseAction",
        "target": currentUrl,
        "object": {
          "@type": "WebApplication",
          "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator"
        }
      }
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": isPortuguese ? "Início" : "Home",
          "item": currentUrl
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": isPortuguese ? "Calculadora de Salário" : "Salary Calculator",
          "item": currentUrl
        }
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": isPortuguese ? "Como usar a calculadora de salário?" : "How to use the salary calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isPortuguese 
              ? "Digite seu salário líquido mensal e a ferramenta calculará automaticamente quanto você deve alocar para cada categoria: investimentos, gastos fixos, metas, conforto, entretenimento e estudos."
              : "Enter your monthly net salary and the tool will automatically calculate how much you should allocate to each category: investments, fixed costs, goals, comfort, entertainment, and studies."
          }
        },
        {
          "@type": "Question", 
          "name": isPortuguese ? "Qual é a distribuição recomendada?" : "What is the recommended distribution?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": isPortuguese
              ? "Recomendamos: 25% para investimentos, 30% para gastos fixos, 15% para metas, 15% para conforto, 10% para entretenimento e 5% para estudos."
              : "We recommend: 25% for investments, 30% for fixed costs, 15% for goals, 15% for comfort, 10% for entertainment, and 5% for studies."
          }
        }
      ]
    };

    return [webApplicationSchema, breadcrumbSchema, faqSchema];
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

                {/* Fixed Costs Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500 transition-colors duration-300"
                         aria-labelledby="fixedcosts-title"
                         aria-describedby="fixedcosts-description">
                  <h4 id="fixedcosts-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {locale === 'pt' ? 'Gastos Fixos' : 'Fixed Costs'}
                  </h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="fixedcosts-controls-label">
                    <h5 id="fixedcosts-controls-label" className="sr-only">Controles de Gastos Fixos</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="fixedcosts-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-red-600 dark:text-red-400" 
                              id="fixedcosts-percentage-display"
                              aria-live="polite">
                          {percentageStrings.fixedCosts}%
                        </span>
                      </div>
                      <input
                        id="fixedcosts-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.fixedCosts)}
                        onChange={(e) => updateFieldPercentage('fixedCosts', e.target.value)}
                        aria-describedby="fixedcosts-percentage-display fixedcosts-description"
                        aria-label={`Fixed Costs percentage: ${percentageStrings.fixedCosts}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 slider-red"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="fixedcosts-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="fixedcosts-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.fixedCosts || 0)}
                        onChange={(e) => updateFieldValue('fixedCosts', parseValueInput(e.target.value))}
                        aria-describedby="fixedcosts-description"
                        aria-label="Fixed Costs valor em reais"
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="fixedcosts-description" 
                       className="text-xl font-bold text-red-600 dark:text-red-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.fixedCosts)}
                    </p>
                  </section>
                </article>

                {/* Goals Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transition-colors duration-300"
                         aria-labelledby="goals-title"
                         aria-describedby="goals-description">
                  <h4 id="goals-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {locale === 'pt' ? 'Metas' : 'Goals'}
                  </h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="goals-controls-label">
                    <h5 id="goals-controls-label" className="sr-only">Controles de Metas</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="goals-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-purple-600 dark:text-purple-400" 
                              id="goals-percentage-display"
                              aria-live="polite">
                          {percentageStrings.meta}%
                        </span>
                      </div>
                      <input
                        id="goals-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.meta)}
                        onChange={(e) => updateFieldPercentage('meta', e.target.value)}
                        aria-describedby="goals-percentage-display goals-description"
                        aria-label={`Goals percentage: ${percentageStrings.meta}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 slider-purple"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="goals-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="goals-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.meta || 0)}
                        onChange={(e) => updateFieldValue('meta', parseValueInput(e.target.value))}
                        aria-describedby="goals-description"
                        aria-label="Goals valor em reais"
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="goals-description" 
                       className="text-xl font-bold text-purple-600 dark:text-purple-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.meta)}
                    </p>
                  </section>
                </article>

                {/* Comfort Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transition-colors duration-300"
                         aria-labelledby="comfort-title"
                         aria-describedby="comfort-description">
                  <h4 id="comfort-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {locale === 'pt' ? 'Conforto' : 'Comfort'}
                  </h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="comfort-controls-label">
                    <h5 id="comfort-controls-label" className="sr-only">Controles de Conforto</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="comfort-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400" 
                              id="comfort-percentage-display"
                              aria-live="polite">
                          {percentageStrings.confy}%
                        </span>
                      </div>
                      <input
                        id="comfort-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.confy)}
                        onChange={(e) => updateFieldPercentage('confy', e.target.value)}
                        aria-describedby="comfort-percentage-display comfort-description"
                        aria-label={`Comfort percentage: ${percentageStrings.confy}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 slider-blue"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="comfort-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="comfort-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.confy || 0)}
                        onChange={(e) => updateFieldValue('confy', parseValueInput(e.target.value))}
                        aria-describedby="comfort-description"
                        aria-label="Comfort valor em reais"
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="comfort-description" 
                       className="text-xl font-bold text-blue-600 dark:text-blue-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.confy)}
                    </p>
                  </section>
                </article>

                {/* Entertainment Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 transition-colors duration-300"
                         aria-labelledby="entertainment-title"
                         aria-describedby="entertainment-description">
                  <h4 id="entertainment-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {locale === 'pt' ? 'Entretenimento' : 'Entertainment'}
                  </h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="entertainment-controls-label">
                    <h5 id="entertainment-controls-label" className="sr-only">Controles de Entretenimento</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="entertainment-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400" 
                              id="entertainment-percentage-display"
                              aria-live="polite">
                          {percentageStrings.entertainment}%
                        </span>
                      </div>
                      <input
                        id="entertainment-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.entertainment)}
                        onChange={(e) => updateFieldPercentage('entertainment', e.target.value)}
                        aria-describedby="entertainment-percentage-display entertainment-description"
                        aria-label={`Entertainment percentage: ${percentageStrings.entertainment}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 slider-yellow"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="entertainment-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="entertainment-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.entertainment || 0)}
                        onChange={(e) => updateFieldValue('entertainment', parseValueInput(e.target.value))}
                        aria-describedby="entertainment-description"
                        aria-label="Entertainment valor em reais"
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-yellow-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="entertainment-description" 
                       className="text-xl font-bold text-yellow-600 dark:text-yellow-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.entertainment)}
                    </p>
                  </section>
                </article>

                {/* Studies Category */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 transition-colors duration-300"
                         aria-labelledby="studies-title"
                         aria-describedby="studies-description">
                  <h4 id="studies-title" className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                    {locale === 'pt' ? 'Estudos' : 'Studies'}
                  </h4>
                  
                  <section className="space-y-3" role="group" aria-labelledby="studies-controls-label">
                    <h5 id="studies-controls-label" className="sr-only">Controles de Estudos</h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label htmlFor="studies-percentage-slider" className="text-xs text-gray-500 dark:text-gray-400">Percentage</label>
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400" 
                              id="studies-percentage-display"
                              aria-live="polite">
                          {percentageStrings.studies}%
                        </span>
                      </div>
                      <input
                        id="studies-percentage-slider"
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={parseFloat(percentageStrings.studies)}
                        onChange={(e) => updateFieldPercentage('studies', e.target.value)}
                        aria-describedby="studies-percentage-display studies-description"
                        aria-label={`Studies percentage: ${percentageStrings.studies}%`}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 slider-indigo"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label htmlFor="studies-amount-input" className="text-xs text-gray-500 dark:text-gray-400 w-8">R$</label>
                      <input
                        id="studies-amount-input"
                        type="text"
                        value={formatValueForInput(editableValues.studies || 0)}
                        onChange={(e) => updateFieldValue('studies', parseValueInput(e.target.value))}
                        aria-describedby="studies-description"
                        aria-label="Studies valor em reais"
                        className="flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <p id="studies-description" 
                       className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
                       aria-live="polite"
                       role="status">
                      Total: {formatCurrency(result.studies)}
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <article className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">
                    {locale === 'pt' ? 'Investimentos (25%)' : 'Investments (25%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt' 
                      ? 'Reserve 25% do seu salário para investimentos de longo prazo e construção de patrimônio.'
                      : 'Reserve 25% of your salary for long-term investments and wealth building.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: ações, fundos, renda fixa, previdência privada'
                      : 'Examples: stocks, mutual funds, bonds, retirement savings'}
                  </p>
                </article>

                <article className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                    {locale === 'pt' ? 'Gastos Fixos (30%)' : 'Fixed Costs (30%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt'
                      ? 'Destine 30% para despesas essenciais e recorrentes do seu orçamento mensal.'
                      : 'Allocate 30% for essential and recurring expenses in your monthly budget.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: aluguel, financiamentos, seguros, condomínio'
                      : 'Examples: rent, loans, insurance, utilities'}
                  </p>
                </article>

                <article className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-purple-600 dark:text-purple-400 mb-2">
                    {locale === 'pt' ? 'Metas (15%)' : 'Goals (15%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt'
                      ? 'Economize 15% para objetivos específicos e realizações de médio prazo.'
                      : 'Save 15% for specific objectives and medium-term achievements.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: viagens, cursos, equipamentos, reserva de emergência'
                      : 'Examples: travel, courses, equipment, emergency fund'}
                  </p>
                </article>
              </div>

              <div className="space-y-4">
                <article className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                    {locale === 'pt' ? 'Conforto (15%)' : 'Comfort (15%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt'
                      ? 'Use 15% para melhorar sua qualidade de vida e bem-estar pessoal.'
                      : 'Use 15% to improve your quality of life and personal well-being.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: academia, tratamentos, decoração, tecnologia'
                      : 'Examples: gym, treatments, home decor, technology'}
                  </p>
                </article>

                <article className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
                    {locale === 'pt' ? 'Entretenimento (10%)' : 'Entertainment (10%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt'
                      ? 'Reserve 10% para atividades de lazer e diversão com responsabilidade financeira.'
                      : 'Reserve 10% for leisure activities and fun with financial responsibility.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: cinema, restaurantes, jogos, hobbies'
                      : 'Examples: movies, restaurants, games, hobbies'}
                  </p>
                </article>

                <article className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
                    {locale === 'pt' ? 'Estudos (5%)' : 'Studies (5%)'}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {locale === 'pt'
                      ? 'Invista 5% em educação continuada e desenvolvimento pessoal e profissional.'
                      : 'Invest 5% in continuing education and personal and professional development.'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {locale === 'pt'
                      ? 'Exemplos: livros, cursos online, certificações, workshops'
                      : 'Examples: books, online courses, certifications, workshops'}
                  </p>
                </article>
              </div>
            </div>

            {/* SEO Content */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                {locale === 'pt' 
                  ? 'Como usar nossa calculadora de distribuição salarial'
                  : 'How to use our salary distribution calculator'}
              </h3>
              <div className="prose prose-sm text-gray-600 dark:text-gray-300 max-w-none">
                <p>
                  {locale === 'pt'
                    ? 'Nossa calculadora de salário foi desenvolvida para ajudar você a organizar suas finanças pessoais de forma inteligente. Baseada no método 50-30-20 adaptado, ela oferece uma distribuição equilibrada que prioriza investimentos e crescimento patrimonial.'
                    : 'Our salary calculator was developed to help you organize your personal finances intelligently. Based on the adapted 50-30-20 method, it offers a balanced distribution that prioritizes investments and wealth growth.'}
                </p>
                <p>
                  {locale === 'pt'
                    ? 'Simplesmente digite seu salário líquido mensal e a ferramenta calculará automaticamente quanto você deve alocar para cada categoria. Você pode ajustar as porcentagens usando os controles deslizantes ou digitando valores específicos para personalizar sua estratégia financeira.'
                    : 'Simply enter your monthly net salary and the tool will automatically calculate how much you should allocate to each category. You can adjust the percentages using the sliders or enter specific values to customize your financial strategy.'}
                </p>
              </div>
            </div>
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

        {/* Structured Data for SEO */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData()),
          }}
        />
      </div>
    </div>
  );
}