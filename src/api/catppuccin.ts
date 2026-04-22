import { fileIcons } from "../mappings/catppuccin/file-names";
import { folderIcons } from "../mappings/catppuccin/folder-names";
import { FileIconDefinition, FolderIconDefinition } from "../mappings/catppuccin/types";
import { getBaseName } from "../utils";

/**
 * Gets the Catppuccin Icon name for a given file name
 * @param fileName - The file name (with or without extension)
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getCatppuccinFileIcon('index.js');
 * // Returns: "javascript"
 * ```
 */
export function getCatppuccinFileIcon(fileName: string): string {
  const baseName = getBaseName(fileName);
  const lowerFileName = baseName.toLowerCase();

  if (!lowerFileName) return "file";

  // 1. Check exact file names
  for (const [iconName, def] of Object.entries(fileIcons)) {
    const definition = def as FileIconDefinition;
    if (definition.fileNames?.some((name) => name.toLowerCase() === lowerFileName)) {
      return iconName;
    }
  }

  // 2. Check extensions
  const parts = lowerFileName.split(".");
  while (parts.length > 1) {
    parts.shift();
    const ext = parts.join(".");
    for (const [iconName, def] of Object.entries(fileIcons)) {
      const definition = def as FileIconDefinition;
      if (definition.fileExtensions?.some((e) => e.toLowerCase() === ext)) {
        return iconName;
      }
    }
  }

  return "file";
}

/**
 * Gets the Catppuccin Icon name for a given folder name
 * @param folderName - The folder name
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getCatppuccinFolderIcon('components');
 * ```
 */
export function getCatppuccinFolderIcon(folderName: string): string {
  const baseName = getBaseName(folderName);
  const lowerFolderName = baseName.toLowerCase();

  if (!lowerFolderName) return "folder";

  for (const [iconName, def] of Object.entries(folderIcons)) {
    const definition = def as FolderIconDefinition;
    if (definition.folderNames?.some((name) => name.toLowerCase() === lowerFolderName)) {
      return iconName;
    }
  }

  return "folder";
}
