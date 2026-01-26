export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return getDateKey(date) === getDateKey(today);
};

export const getDaysInYear = (year?: number): Date[] => {
  const targetYear = year || new Date().getFullYear();
  const start = new Date(targetYear, 0, 1);
  const days: Date[] = [];

  for (let i = 0; i < 366; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d.getFullYear() !== targetYear) break;
    days.push(d);
  }

  return days;
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
