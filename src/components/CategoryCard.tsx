'use client';

import React from 'react';

interface CategoryCardProps {
  title: string;
  value: number;
  percentage: string;
  editableValue: number;
  onPercentageChange: (percentage: string) => void;
  onValueChange: (value: number) => void;
  formatCurrency: (value: number) => string;
  formatValueForInput: (value: number) => string;
  parseValueInput: (value: string) => number;
  borderColor: string;
  colorTheme: string;
  categoryKey: string;
}

const CategoryCard = React.memo(({
  title,
  value,
  percentage,
  editableValue,
  onPercentageChange,
  onValueChange,
  formatCurrency,
  formatValueForInput,
  parseValueInput,
  borderColor,
  colorTheme,
  categoryKey
}: CategoryCardProps) => {
  const titleId = `${categoryKey}-title`;
  const descriptionId = `${categoryKey}-description`;
  const controlsLabelId = `${categoryKey}-controls-label`;
  const percentageDisplayId = `${categoryKey}-percentage-display`;
  const percentageSliderId = `${categoryKey}-percentage-slider`;
  const amountInputId = `${categoryKey}-amount-input`;

  return (
    <article 
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 ${borderColor} transition-colors duration-300`}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <h4 id={titleId} className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
        {title}
      </h4>
      
      <section className="space-y-3" role="group" aria-labelledby={controlsLabelId}>
        <h5 id={controlsLabelId} className="sr-only">Controles de {title}</h5>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor={percentageSliderId} className="text-xs text-gray-500 dark:text-gray-400">
              Percentage
            </label>
            <span 
              className={`text-xs font-semibold ${colorTheme}`}
              id={percentageDisplayId}
              aria-live="polite"
            >
              {percentage}%
            </span>
          </div>
          <input
            id={percentageSliderId}
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={parseFloat(percentage)}
            onChange={(e) => onPercentageChange(e.target.value)}
            aria-describedby={`${percentageDisplayId} ${descriptionId}`}
            aria-label={`${title} percentage: ${percentage}%`}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-${categoryKey}-500 slider-${categoryKey}`}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <label htmlFor={amountInputId} className="text-xs text-gray-500 dark:text-gray-400 w-8">
            Valor
          </label>
          <input
            id={amountInputId}
            type="text"
            value={formatValueForInput(editableValue || 0)}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/[R$\s]/g, '');
              onValueChange(parseValueInput(rawValue));
            }}
            aria-describedby={descriptionId}
            aria-label={`${title} valor em reais`}
            className={`flex-1 px-2 py-1 text-sm border rounded focus:ring-1 focus:ring-${categoryKey}-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
          />
        </div>
        
        <p 
          id={descriptionId}
          className={`text-xl font-bold ${colorTheme}`}
          aria-live="polite"
          role="status"
        >
          Total: {formatCurrency(value)}
        </p>
      </section>
    </article>
  );
});

CategoryCard.displayName = 'CategoryCard';

export default CategoryCard;