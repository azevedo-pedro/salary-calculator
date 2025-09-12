'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

interface SummaryCardProps {
  totalDeductions: number;
  remainingAmount: number;
  formatCurrency: (value: number) => string;
}

const SummaryCard = React.memo(({
  totalDeductions,
  remainingAmount,
  formatCurrency
}: SummaryCardProps) => {
  const t = useTranslations();

  return (
    <div className="md:col-span-2 lg:col-span-3">
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6 text-white transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{t('summary.totalAllocations')}</h3>
            <p className="text-3xl font-bold text-red-400">{formatCurrency(totalDeductions)}</p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">{t('summary.remainingAmount')}</h3>
            <p className="text-3xl font-bold text-green-400">{formatCurrency(remainingAmount)}</p>
          </div>
        </div>
      </div>
    </div>
  );
});

SummaryCard.displayName = 'SummaryCard';

export default SummaryCard;