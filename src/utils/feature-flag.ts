export function featureFlag(flag: string): boolean {
  return ["true", "1", "True", "TRUE", true, 1].includes(
    process.env[flag] as any
  );
}