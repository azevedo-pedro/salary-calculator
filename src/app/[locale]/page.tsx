'use client';

import { useSalaryCalculator } from '@/hooks/useSalaryCalculator';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import SalaryInput from '@/components/SalaryInput';
import CategoryGrid from '@/components/CategoryGrid';
import ExplanationsSection from '@/components/ExplanationsSection';
import LanguageSelector from '@/components/LanguageSelector';
import StructuredData from '@/components/StructuredData';
import { SalaryFormData } from '@/lib/formValidation';

const SalaryCalculator = React.memo(() => {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const {
    result,
    calculate,
    formatCurrency,
    editableValues,
    updateFieldValue,
    updateFieldPercentage,
    percentageStrings
  } = useSalaryCalculator();

  const form = useForm<SalaryFormData>({
    defaultValues: {
      salary: ''
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, watch } = form;

  const parseValueInput = (value: string): number => {
    const cleanValue = value.replace(/[^0-9,.-]/g, '');
    return parseFloat(cleanValue.replace(',', '.')) || 0;
  };

  const formatValueForInput = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const onSubmit = handleSubmit((data: SalaryFormData) => {
    calculate(data.salary);
  });

  const currentSalary = watch('salary');

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  // Set the lang attribute for accessibility and SEO
  useEffect(() => {
    const langAttr = locale === 'en' ? 'en-US' : 'pt-BR';
    document.documentElement.lang = langAttr;
  }, [locale]);

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
          <SalaryInput
            register={register}
            errors={errors}
            watch={watch}
            onSubmit={onSubmit}
            isValid={isValid}
            isSubmitting={isSubmitting}
          />

          <CategoryGrid
            result={result}
            editableValues={editableValues}
            percentageStrings={percentageStrings}
            updateFieldPercentage={(field, percentage) => updateFieldPercentage(field, percentage, currentSalary)}
            updateFieldValue={(field, value) => updateFieldValue(field, value, currentSalary)}
            formatCurrency={formatCurrency}
            formatValueForInput={formatValueForInput}
            parseValueInput={parseValueInput}
          />

          <ExplanationsSection />

          <LanguageSelector onLanguageChange={handleLanguageChange} />
        </main>

        <StructuredData />
      </div>
    </div>
  );
});

SalaryCalculator.displayName = 'SalaryCalculator';

export default SalaryCalculator;