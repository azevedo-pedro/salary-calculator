export interface SalaryFormData {
  salary: string;
}

export const MINIMUM_SALARY = 1518; // Brazilian minimum wage

export const parseSalaryInput = (salaryInput: string): number => {
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

export const formatCurrencyInput = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  const number = parseFloat(numericValue) / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  }).format(number);
};

export const salaryValidation = {
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
  }
};