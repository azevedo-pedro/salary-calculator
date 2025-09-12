import { useState, useCallback } from 'react';
import { parseSalaryInput } from '@/lib/formValidation';

export interface CalculationResult {
  investments: number;
  fixedCosts: number;
  meta: number;
  confy: number;
  entertainment: number;
  studies: number;
  totalDeductions: number;
  remainingAmount: number;
}

export interface SalaryDistributionConfig {
  investments: number;
  fixedCosts: number;
  meta: number;
  confy: number;
  entertainment: number;
  studies: number;
}

const DEFAULT_DISTRIBUTION: SalaryDistributionConfig = {
  investments: 0.25,
  fixedCosts: 0.30,
  meta: 0.15,
  confy: 0.15,
  entertainment: 0.10,
  studies: 0.05,
};

export const useSalaryCalculator = () => {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [distribution, setDistribution] = useState<SalaryDistributionConfig>(DEFAULT_DISTRIBUTION);
  const [editableValues, setEditableValues] = useState<Partial<CalculationResult>>({});
  const [percentageStrings, setPercentageStrings] = useState<Record<keyof SalaryDistributionConfig, string>>({
    investments: '25',
    fixedCosts: '30',
    meta: '15',
    confy: '15',
    entertainment: '10',
    studies: '5'
  });

  const calculateSalaryDistribution = useCallback((
    numericSalary: number,
    config: SalaryDistributionConfig = DEFAULT_DISTRIBUTION
  ): CalculationResult => {
    const investments = numericSalary * config.investments;
    const fixedCosts = numericSalary * config.fixedCosts;
    const meta = numericSalary * config.meta;
    const confy = numericSalary * config.confy;
    const entertainment = numericSalary * config.entertainment;
    const studies = numericSalary * config.studies;
    
    const totalDeductions = investments + fixedCosts + meta + confy + entertainment + studies;
    const remainingAmount = numericSalary - totalDeductions;
    return {
      investments,
      fixedCosts,
      meta,
      confy,
      entertainment,
      studies,
      totalDeductions,
      remainingAmount
    };
  }, []);

  const calculate = useCallback((salary: string) => {
    performance.mark('calculation-start');
    const numericSalary = parseSalaryInput(salary);
    
    if (!numericSalary || numericSalary <= 0 || isNaN(numericSalary)) {
      setResult(null);
      setEditableValues({});
      performance.mark('calculation-end');
      return;
    }

    const calculationResult = calculateSalaryDistribution(numericSalary, distribution);
    setResult(calculationResult);
    setEditableValues(calculationResult);
    
    // Sync percentage strings with current distribution
    const newPercentageStrings = { ...percentageStrings };
    Object.keys(distribution).forEach(key => {
      const field = key as keyof SalaryDistributionConfig;
      newPercentageStrings[field] = (distribution[field] * 100).toFixed(1);
    });
    setPercentageStrings(newPercentageStrings);
    
    performance.mark('calculation-end');
    performance.measure('salary-calculation', 'calculation-start', 'calculation-end');
  }, [distribution, percentageStrings, calculateSalaryDistribution]);

  const updateFieldValue = useCallback((field: keyof CalculationResult, value: number, salary: string) => {
    performance.mark('field-update-start');
    const numericSalary = parseSalaryInput(salary);
    if (!numericSalary || numericSalary <= 0) return;

    const newEditableValues = { ...editableValues, [field]: value };
    
    // Calculate total of all categories except totalDeductions and remainingAmount
    const categoryFields: (keyof CalculationResult)[] = ['investments', 'fixedCosts', 'meta', 'confy', 'entertainment', 'studies'];
    const totalCategoriesValue = categoryFields.reduce((sum, key) => {
      return sum + (newEditableValues[key] || 0);
    }, 0);
    
    const remainingAmount = numericSalary - totalCategoriesValue;
    
    // If there's remaining cash, distribute it proportionally to other categories
    if (remainingAmount !== 0) {
      const otherFields = categoryFields.filter(f => f !== field);
      const totalOtherValues = otherFields.reduce((sum, key) => sum + (newEditableValues[key] || 0), 0);
      
      if (totalOtherValues > 0) {
        otherFields.forEach(otherField => {
          const currentValue = newEditableValues[otherField] || 0;
          const proportion = currentValue / totalOtherValues;
          newEditableValues[otherField] = currentValue + (remainingAmount * proportion);
        });
      }
    }
    
    // Recalculate percentages based on new values
    const newDistribution = { ...distribution };
    const newPercentageStrings = { ...percentageStrings };
    categoryFields.forEach(categoryField => {
      const categoryValue = newEditableValues[categoryField] || 0;
      const percentage = (categoryValue / numericSalary) * 100;
      newDistribution[categoryField as keyof SalaryDistributionConfig] = percentage / 100;
      newPercentageStrings[categoryField as keyof SalaryDistributionConfig] = percentage.toFixed(1);
    });
    
    const totalDeductions = categoryFields.reduce((sum, key) => sum + (newEditableValues[key] || 0), 0);
    const finalRemainingAmount = numericSalary - totalDeductions;
    
    const updatedResult = {
      ...newEditableValues,
      totalDeductions,
      remainingAmount: finalRemainingAmount
    } as CalculationResult;
    
    setEditableValues(newEditableValues);
    setDistribution(newDistribution);
    setPercentageStrings(newPercentageStrings);
    setResult(updatedResult);
    
    performance.mark('field-update-end');
    performance.measure('field-update', 'field-update-start', 'field-update-end');
  }, [editableValues, distribution, percentageStrings]);

  const updateFieldPercentage = useCallback((field: keyof SalaryDistributionConfig, percentageString: string, salary: string) => {
    performance.mark('percentage-update-start');
    const percentage = parseFloat(percentageString) || 0;
    const newPercentageStrings = { ...percentageStrings, [field]: percentageString };
    
    // Calculate the new percentage value
    const newPercentageValue = Math.max(0, Math.min(100, percentage)) / 100;
    const newDistribution = { ...distribution, [field]: newPercentageValue };
    
    // Calculate total of all percentages
    const totalPercentage = Object.keys(newDistribution).reduce((sum, key) => {
      return sum + newDistribution[key as keyof SalaryDistributionConfig];
    }, 0);
    
    // If total exceeds 100%, proportionally adjust other fields
    if (totalPercentage > 1) {
      const otherFields = Object.keys(newDistribution).filter(f => f !== field) as (keyof SalaryDistributionConfig)[];
      const otherFieldsTotal = otherFields.reduce((sum, key) => sum + newDistribution[key], 0);
      
      if (otherFieldsTotal > 0) {
        const adjustmentFactor = (1 - newPercentageValue) / otherFieldsTotal;
        otherFields.forEach(otherField => {
          newDistribution[otherField] = newDistribution[otherField] * adjustmentFactor;
          newPercentageStrings[otherField] = (newDistribution[otherField] * 100).toFixed(1);
        });
      }
    }
    
    const numericSalary = parseSalaryInput(salary);
    if (numericSalary > 0) {
      const calculationResult = calculateSalaryDistribution(numericSalary, newDistribution);
      setResult(calculationResult);
      setEditableValues(calculationResult);
    }
    
    setDistribution(newDistribution);
    setPercentageStrings(newPercentageStrings);
    
    performance.mark('percentage-update-end');
    performance.measure('percentage-update', 'percentage-update-start', 'percentage-update-end');
  }, [percentageStrings, distribution, calculateSalaryDistribution]);

  const formatCurrency = useCallback((amount: number): string => {
    if (isNaN(amount) || !isFinite(amount)) {
      return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }, []);

  return {
    result,
    calculate,
    formatCurrency,
    defaultDistribution: DEFAULT_DISTRIBUTION,
    distribution,
    editableValues,
    updateFieldValue,
    updateFieldPercentage,
    percentageStrings
  };
};
