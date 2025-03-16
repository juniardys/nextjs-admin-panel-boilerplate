export const capitalizeWords = (str: string): string => {
  if (!str) return str;

  return str
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
};

export const formatNumber = (value: number): string => {
  if (typeof value !== "number" || isNaN(value) || value < 0) {
    return "N/A";
  }

  const suffixes = ["", "k", "m", "b", "t"];
  let suffixIndex = 0;
  let formattedValue = value;

  while (formattedValue >= 1000 && suffixIndex < suffixes.length - 1) {
    formattedValue /= 1000;
    suffixIndex++;
  }

  // Format the short value with commas and replace dot with comma for decimal
  const formattedString = formattedValue
    .toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })
    .replace(".", ",");

  return `${formattedString}${suffixes[suffixIndex]}`;
};

export const formatNumberToUSD = (value: number): string => {
  const formattedValue = formatNumber(value);

  if (formattedValue === "N/A") return formattedValue;

  return `$${formatNumber(value)}`;
};

export const renderWalletAddress = (
  address?: string | null,
  length = 2
): string => {
  if (address) {
    return `${address.substring(0, length + 2)}...${address.substring(
      address.length - (length + 1),
      address.length
    )}`;
  }
  return "";
};

export const copyText = (entryText: string): void => {
  navigator.clipboard.writeText(entryText);
};
