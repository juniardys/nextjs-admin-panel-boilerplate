import dayjs from "dayjs";

/**
 * Groups and sums data based on the given startOf unit.
 * @param data - The input data as an array of [timestamp, value] pairs.
 * @param startOfUnit - The unit to group by ('day', 'month', 'year', etc.).
 * @returns A formatted array of [groupedTimestamp, sum] pairs.
 */
export const groupAndSumData = (
  data: [number, number][],
  startOfUnit: 'day' | 'month' | 'year' = 'day'
): [number, number][] => {
  const groupedData: Record<number, number> = {};

  data.forEach(([timestamp, value]) => {
    const key = dayjs(timestamp).startOf(startOfUnit).valueOf(); // Normalize timestamp
    groupedData[key] = (groupedData[key] || 0) + value; // Sum values for the same unit
  });

  return Object.entries(groupedData).map(([date, sum]) => [Number(date), sum]);
};

export const generateRandomData = (days: number): [number, number][] => {
  const data: [number, number][] = [];

  for (let i = days; i >= 0; i--) {
    const timestamp = dayjs().subtract(i, 'day').valueOf();
    const value = Math.floor(Math.random() * 50) + 1; // Random value between 1-50
    data.push([timestamp, value]);
  }

  return data;
};