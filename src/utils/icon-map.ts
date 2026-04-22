import type { IconMap } from "../types/icons";

/**
 * Safely retrieves an icon name from an icon map with full type safety
 * @param map - The icon map to search
 * @param key - The key to look up
 * @returns The icon name if found, undefined otherwise
 *
 * @example
 * ```ts
 * // With type inference
 * const icon = getIconFromMap(materialFileExtensionsToIcons, 'js'); // TypeScript knows valid keys!
 * ```
 */
export function getIconFromMap<T extends IconMap>(map: T, key: keyof T): T[keyof T] | undefined {
  if (key in map) {
    return map[key as keyof T];
  }
  return undefined;
}
