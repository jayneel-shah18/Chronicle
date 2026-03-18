export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const pad2 = (value: number): string => value.toString().padStart(2, '0');

export const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  return `${year}-${month}-${day}`;
};

// Compatibility helper for data created before local date key logic.
export const getDateLookupKeys = (date: Date): string[] => {
  const localKey = getDateKey(date);
  const utcKey = date.toISOString().split('T')[0];
  return localKey === utcKey ? [localKey] : [localKey, utcKey];
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
