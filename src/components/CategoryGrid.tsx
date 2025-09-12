'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';
import CategoryCard from './CategoryCard';
import SummaryCard from './SummaryCard';
import { CalculationResult, SalaryDistributionConfig } from '@/hooks/useSalaryCalculator';

interface CategoryGridProps {
  result: CalculationResult | null;
  editableValues: Partial<CalculationResult>;
  percentageStrings: Record<keyof SalaryDistributionConfig, string>;
  updateFieldPercentage: (field: keyof SalaryDistributionConfig, percentage: string) => void;
  updateFieldValue: (field: keyof CalculationResult, value: number) => void;
  formatCurrency: (value: number) => string;
  formatValueForInput: (value: number) => string;
  parseValueInput: (value: string) => number;
}

const CategoryGrid = React.memo(({
  result,
  editableValues,
  percentageStrings,
  updateFieldPercentage,
  updateFieldValue,
  formatCurrency,
  formatValueForInput,
  parseValueInput
}: CategoryGridProps) => {
  const locale = useLocale();
  const t = useTranslations();

  const categories = [
    {
      key: 'investments' as keyof SalaryDistributionConfig,
      title: t('categories.investments.title'),
      value: result?.investments || 0,
      percentage: percentageStrings.investments,
      editableValue: editableValues.investments || 0,
      borderColor: 'border-green-500',
      colorTheme: 'text-green-600 dark:text-green-400'
    },
    {
      key: 'fixedCosts' as keyof SalaryDistributionConfig,
      title: locale === 'pt' ? 'Gastos Fixos' : 'Fixed Costs',
      value: result?.fixedCosts || 0,
      percentage: percentageStrings.fixedCosts,
      editableValue: editableValues.fixedCosts || 0,
      borderColor: 'border-red-500',
      colorTheme: 'text-red-600 dark:text-red-400'
    },
    {
      key: 'meta' as keyof SalaryDistributionConfig,
      title: locale === 'pt' ? 'Metas' : 'Goals',
      value: result?.meta || 0,
      percentage: percentageStrings.meta,
      editableValue: editableValues.meta || 0,
      borderColor: 'border-purple-500',
      colorTheme: 'text-purple-600 dark:text-purple-400'
    },
    {
      key: 'confy' as keyof SalaryDistributionConfig,
      title: locale === 'pt' ? 'Conforto' : 'Comfort',
      value: result?.confy || 0,
      percentage: percentageStrings.confy,
      editableValue: editableValues.confy || 0,
      borderColor: 'border-blue-500',
      colorTheme: 'text-blue-600 dark:text-blue-400'
    },
    {
      key: 'entertainment' as keyof SalaryDistributionConfig,
      title: locale === 'pt' ? 'Entretenimento' : 'Entertainment',
      value: result?.entertainment || 0,
      percentage: percentageStrings.entertainment,
      editableValue: editableValues.entertainment || 0,
      borderColor: 'border-yellow-500',
      colorTheme: 'text-yellow-600 dark:text-yellow-400'
    },
    {
      key: 'studies' as keyof SalaryDistributionConfig,
      title: locale === 'pt' ? 'Estudos' : 'Studies',
      value: result?.studies || 0,
      percentage: percentageStrings.studies,
      editableValue: editableValues.studies || 0,
      borderColor: 'border-indigo-500',
      colorTheme: 'text-indigo-600 dark:text-indigo-400'
    }
  ];

  if (!result) {
    return null;
  }

  return (
    <section aria-labelledby="results-heading" aria-live="polite" className="space-y-6">
      <h2 id="results-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300 sr-only">
        Resultados da Calculadora
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="group" aria-labelledby="categories-heading">
        <h3 id="categories-heading" className="sr-only">Categorias de Distribuição do Salário</h3>

        {categories.map((category) => (
          <CategoryCard
            key={category.key}
            title={category.title}
            value={category.value}
            percentage={category.percentage}
            editableValue={category.editableValue}
            onPercentageChange={(percentage) => updateFieldPercentage(category.key, percentage)}
            onValueChange={(value) => updateFieldValue(category.key, value)}
            formatCurrency={formatCurrency}
            formatValueForInput={formatValueForInput}
            parseValueInput={parseValueInput}
            borderColor={category.borderColor}
            colorTheme={category.colorTheme}
            categoryKey={category.key}
          />
        ))}

        <SummaryCard
          totalDeductions={result?.totalDeductions || 0}
          remainingAmount={result?.remainingAmount || 0}
          formatCurrency={formatCurrency}
        />
      </div>
    </section>
  );
});

CategoryGrid.displayName = 'CategoryGrid';

export default CategoryGrid;
