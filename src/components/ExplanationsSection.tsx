'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

const ExplanationsSection = React.memo(() => {
  const locale = useLocale();
  const t = useTranslations();

  const categories = [
    {
      title: locale === 'pt' ? 'Investimentos (25%)' : 'Investments (25%)',
      description: locale === 'pt' 
        ? 'Reserve 25% do seu salário para investimentos de longo prazo e construção de patrimônio.'
        : 'Reserve 25% of your salary for long-term investments and wealth building.',
      examples: locale === 'pt'
        ? 'Exemplos: ações, fundos, renda fixa, previdência privada'
        : 'Examples: stocks, mutual funds, bonds, retirement savings',
      borderColor: 'border-green-500',
      textColor: 'text-green-600 dark:text-green-400'
    },
    {
      title: locale === 'pt' ? 'Gastos Fixos (30%)' : 'Fixed Costs (30%)',
      description: locale === 'pt'
        ? 'Destine 30% para despesas essenciais e recorrentes do seu orçamento mensal.'
        : 'Allocate 30% for essential and recurring expenses in your monthly budget.',
      examples: locale === 'pt'
        ? 'Exemplos: aluguel, financiamentos, seguros, condomínio'
        : 'Examples: rent, loans, insurance, utilities',
      borderColor: 'border-red-500',
      textColor: 'text-red-600 dark:text-red-400'
    },
    {
      title: locale === 'pt' ? 'Metas (15%)' : 'Goals (15%)',
      description: locale === 'pt'
        ? 'Economize 15% para objetivos específicos e realizações de médio prazo.'
        : 'Save 15% for specific objectives and medium-term achievements.',
      examples: locale === 'pt'
        ? 'Exemplos: viagens, cursos, equipamentos, reserva de emergência'
        : 'Examples: travel, courses, equipment, emergency fund',
      borderColor: 'border-purple-500',
      textColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      title: locale === 'pt' ? 'Conforto (15%)' : 'Comfort (15%)',
      description: locale === 'pt'
        ? 'Use 15% para melhorar sua qualidade de vida e bem-estar pessoal.'
        : 'Use 15% to improve your quality of life and personal well-being.',
      examples: locale === 'pt'
        ? 'Exemplos: academia, tratamentos, decoração, tecnologia'
        : 'Examples: gym, treatments, home decor, technology',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      title: locale === 'pt' ? 'Entretenimento (10%)' : 'Entertainment (10%)',
      description: locale === 'pt'
        ? 'Reserve 10% para atividades de lazer e diversão com responsabilidade financeira.'
        : 'Reserve 10% for leisure activities and fun with financial responsibility.',
      examples: locale === 'pt'
        ? 'Exemplos: cinema, restaurantes, jogos, hobbies'
        : 'Examples: movies, restaurants, games, hobbies',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      title: locale === 'pt' ? 'Estudos (5%)' : 'Studies (5%)',
      description: locale === 'pt'
        ? 'Invista 5% em educação continuada e desenvolvimento pessoal e profissional.'
        : 'Invest 5% in continuing education and personal and professional development.',
      examples: locale === 'pt'
        ? 'Exemplos: livros, cursos online, certificações, workshops'
        : 'Examples: books, online courses, certifications, workshops',
      borderColor: 'border-indigo-500',
      textColor: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  return (
    <section aria-labelledby="explanations-heading" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8 transition-colors duration-300">
      <h2 id="explanations-heading" className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        {t('explanations.title')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category, index) => (
          <div key={index} className="space-y-4">
            <article className={`border-l-4 ${category.borderColor} pl-4`}>
              <h3 className={`font-semibold ${category.textColor} mb-2`}>
                {category.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                {category.description}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {category.examples}
              </p>
            </article>
          </div>
        ))}
      </div>

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
  );
});

ExplanationsSection.displayName = 'ExplanationsSection';

export default ExplanationsSection;