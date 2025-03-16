/**
 * Truncates a number to a specific number of decimal places without rounding.
 *
 * @param num - The number to truncate.
 * @param decimals - The number of decimal places to keep.
 * @returns The truncated number.
 */
export function truncateNumber(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.floor(num * factor) / factor;
}
