export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const calculateTotal = (expenses: Array<{ amount: number }>): number => {
  return expenses.reduce((sum, exp) => sum + exp.amount, 0);
};
