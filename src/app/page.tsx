'use client';

import { useSalaryCalculator } from '@/hooks/useSalaryCalculator';

export default function SalaryCalculator() {
  const {
    salary,
    setSalary,
    result,
    calculate,
    formatCurrency,
  } = useSalaryCalculator();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">
            Financial Salary Calculator
          </h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Calculate your salary distribution across different categories
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-300">
          <div className="mb-6">
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
              Monthly Salary
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 dark:text-gray-400">R$</span>
              <input
                id="salary"
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="Enter your monthly salary"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-gray-900 dark:text-white bg-white dark:bg-gray-700 transition-colors duration-300"
              />
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Calculate Distribution
          </button>
        </div>

        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-green-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Investments</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{formatCurrency(result.investments)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">25% of salary</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-red-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Fixed Costs</h3>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{formatCurrency(result.fixedCosts)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">30% of salary</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-purple-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Meta</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{formatCurrency(result.meta)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">15% of salary</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-blue-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Confy</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{formatCurrency(result.confy)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">15% of salary</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Entertainment</h3>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{formatCurrency(result.entertainment)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">10% of salary</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 transition-colors duration-300">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Studies</h3>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{formatCurrency(result.studies)}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5% of salary</p>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 rounded-xl shadow-lg p-6 text-white transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Total Allocations</h3>
                    <p className="text-3xl font-bold text-red-400">{formatCurrency(result.totalDeductions)}</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Remaining Amount</h3>
                    <p className="text-3xl font-bold text-green-400">{formatCurrency(result.remainingAmount)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8 transition-colors duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Field Explanations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-green-600 dark:text-green-400">Investments (25%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Money set aside for future growth and financial security.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Stocks, bonds, mutual funds, retirement savings, emergency fund
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="font-semibold text-red-600 dark:text-red-400">Fixed Costs (30%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Essential monthly expenses that remain constant.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Rent/mortgage, utilities, insurance, phone bill, internet
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-purple-600 dark:text-purple-400">Meta (15%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Goal-oriented savings for specific future objectives.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: House down payment, car purchase, vacation, wedding
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-blue-600 dark:text-blue-400">Confy (15%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Comfort and lifestyle enhancement expenses.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Quality clothing, home improvements, gadgets, premium services
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4">
                <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Entertainment (10%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Fun activities and leisure spending.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Movies, dining out, concerts, games, hobbies, sports
                </p>
              </div>

              <div className="border-l-4 border-indigo-500 pl-4">
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400">Studies (5%)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Investment in personal and professional development.
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Examples: Courses, books, certifications, workshops, conferences
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
