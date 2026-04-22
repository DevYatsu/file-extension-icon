/**
 * Gets the base name of a path (file or folder)
 * @param path - The path to get the base name from
 * @returns The base name
 */
export function getBaseName(path: string): string {
  if (!path) return "";
  // Handle both Unix and Windows separators
  return path.split(/[\\/]/).filter(Boolean).pop() || "";
}
