import { useState } from 'react';

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
  const [salary, setSalary] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const parseSalaryInput = (salaryInput: string): number => {
    if (!salaryInput || salaryInput.trim() === '') {
      return 0;
    }
    
    // Handle Brazilian number format (7.855,77) and international format (7,855.77)
    let cleanInput = salaryInput.trim();
    
    // Remove any currency symbols
    cleanInput = cleanInput.replace(/[R$\s]/g, '');
    
    // Check if it's Brazilian format (dots for thousands, comma for decimal)
    if (cleanInput.includes(',') && cleanInput.lastIndexOf(',') > cleanInput.lastIndexOf('.')) {
      // Brazilian format: 7.855,77
      cleanInput = cleanInput.replace(/\./g, '').replace(',', '.');
    } else if (cleanInput.includes('.') && cleanInput.includes(',') && cleanInput.lastIndexOf('.') > cleanInput.lastIndexOf(',')) {
      // International format: 7,855.77
      cleanInput = cleanInput.replace(/,/g, '');
    } else if (cleanInput.includes(',') && !cleanInput.includes('.')) {
      // Only comma, assume it's decimal separator: 7855,77
      cleanInput = cleanInput.replace(',', '.');
    }
    // If only dots or no separators, assume it's already in correct format
    
    const parsed = parseFloat(cleanInput);
    const result = isNaN(parsed) ? 0 : parsed;
    
    return result;
  };

  const calculateSalaryDistribution = (
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
  };

  const calculate = () => {
    const numericSalary = parseSalaryInput(salary);
    
    if (!numericSalary || numericSalary <= 0 || isNaN(numericSalary)) {
      setResult(null);
      return;
    }

    const calculationResult = calculateSalaryDistribution(numericSalary);
    setResult(calculationResult);
  };

  const formatCurrency = (amount: number): string => {
    if (isNaN(amount) || !isFinite(amount)) {
      return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const isValidSalary = (): boolean => {
    const numericSalary = parseSalaryInput(salary);
    return numericSalary > 0 && !isNaN(numericSalary);
  };

  return {
    salary,
    setSalary,
    result,
    calculate,
    formatCurrency,
    isValidSalary,
    defaultDistribution: DEFAULT_DISTRIBUTION
  };
};
