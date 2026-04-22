/**
 * Extracts the base name from a file path.
 * Handles both Unix and Windows path separators.
 * @param path - The full or relative path
 * @returns The base name (e.g., "index.ts" from "src/index.ts")
 */
export function getBaseName(path: string): string {
  if (!path) return "";
  return path.split(/[\\/]/).filter(Boolean).pop() || "";
}
