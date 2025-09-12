'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { UseFormRegister, FieldErrors, UseFormWatch } from 'react-hook-form';
import { SalaryFormData, formatCurrencyInput, parseSalaryInput, MINIMUM_SALARY } from '@/lib/formValidation';

interface SalaryInputProps {
  register: UseFormRegister<SalaryFormData>;
  errors: FieldErrors<SalaryFormData>;
  watch: UseFormWatch<SalaryFormData>;
  onSubmit: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

const SalaryInput = React.memo(({
  register,
  errors,
  watch,
  onSubmit,
  isValid,
  isSubmitting
}: SalaryInputProps) => {
  const t = useTranslations();
  const salaryValue = watch('salary');

  return (
    <section aria-labelledby="salary-input-heading" className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
      <h2 id="salary-input-heading" className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-300 sr-only">
        {t('salaryInput.label')}
      </h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}>
        <div className="mb-6">
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
            {t('salaryInput.label')}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400" aria-hidden="true">R$</span>
            <input
              id="salary"
              type="text"
              {...register('salary', {
                required: 'O salário é obrigatório',
                validate: {
                  validNumber: (value: string) => {
                    const numericValue = parseSalaryInput(value);
                    if (isNaN(numericValue) || numericValue <= 0) {
                      return 'Digite um valor válido para o salário';
                    }
                    return true;
                  },
                  minimumWage: (value: string) => {
                    const numericValue = parseSalaryInput(value);
                    if (numericValue > 0 && numericValue < MINIMUM_SALARY) {
                      return `O salário deve ser pelo menos R$ ${MINIMUM_SALARY.toLocaleString('pt-BR')},00 (salário mínimo brasileiro)`;
                    }
                    return true;
                  }
                },
                onChange: (e) => {
                  const inputValue = e.target.value;
                  const numericOnly = inputValue.replace(/[^0-9]/g, '');
                  if (numericOnly.length <= 10) {
                    const formattedValue = numericOnly ? formatCurrencyInput(numericOnly) : '';
                    e.target.value = formattedValue;
                  } else {
                    e.target.value = salaryValue || '';
                  }
                }
              })}
              placeholder={t('salaryInput.placeholder')}
              aria-describedby="salary-help salary-error"
              aria-invalid={errors.salary ? 'true' : 'false'}
              aria-required="true"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 text-lg bg-white dark:bg-gray-700 transition-colors duration-300 ${
                errors.salary 
                  ? 'border-red-500 dark:border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900 dark:text-red-100' 
                  : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white'
              }`}
            />
            {errors.salary && (
              <p id="salary-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center" role="alert">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.salary.message}
              </p>
            )}
            <p id="salary-help" className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Salário mínimo: R$ {MINIMUM_SALARY.toLocaleString('pt-BR')},00
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={!isValid || isSubmitting || !salaryValue?.trim()}
          aria-describedby="calculate-help"
          className={`w-full font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform ${
            !isValid || isSubmitting || !salaryValue?.trim()
              ? 'bg-gray-400 dark:bg-gray-600 text-gray-200 dark:text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white hover:scale-105'
          }`}
        >
          {isSubmitting ? 'Calculando...' : t('calculate')}
        </button>
        <p id="calculate-help" className="sr-only">
          Digite um salário válido acima do valor mínimo para calcular as distribuições
        </p>
      </form>
    </section>
  );
});

SalaryInput.displayName = 'SalaryInput';

export default SalaryInput;