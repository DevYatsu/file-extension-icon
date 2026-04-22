import { fileIcons } from "../mappings/material/file-names";
import { folderIcons } from "../mappings/material/folder-names";
import { MaterialFileIcon, MaterialFolderIcon } from "../mappings/material/types";
import { getBaseName } from "../utils";

/**
 * Gets the Material Icon name for a given file name
 * @param fileName - The file name (with or without extension)
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getMaterialFileIcon('index.js');
 * // Returns: "javascript"
 * ```
 */
export function getMaterialFileIcon(fileName: string): string {
  const baseName = getBaseName(fileName);
  const lowerFileName = baseName.toLowerCase();

  if (!lowerFileName) return fileIcons.defaultIcon.name;

  // 1. Check exact file names
  for (const icon of fileIcons.icons) {
    const definition = icon as MaterialFileIcon;
    if (definition.fileNames?.some((name) => name.toLowerCase() === lowerFileName)) {
      return definition.name;
    }
  }

  // 2. Check extensions
  const parts = lowerFileName.split(".");
  while (parts.length > 1) {
    parts.shift();
    const ext = parts.join(".");
    for (const icon of fileIcons.icons) {
      const definition = icon as MaterialFileIcon;
      if (definition.fileExtensions?.some((e) => e.toLowerCase() === ext)) {
        return definition.name;
      }
    }
  }

  return fileIcons.defaultIcon.name;
}

/**
 * Gets the Material Icon name for a given folder name
 * @param folderName - The folder name
 * @param isRoot - Whether the folder is at the root
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getMaterialFolderIcon('components');
 * ```
 */
export function getMaterialFolderIcon(folderName: string, isRoot: boolean = false): string {
  const baseName = getBaseName(folderName);
  const lowerFolderName = baseName.toLowerCase();

  const specificPack = folderIcons[0];
  const defaultIcon = isRoot
    ? specificPack?.rootFolder?.name || "folder-root"
    : specificPack?.defaultIcon?.name || "folder";

  if (!lowerFolderName) return defaultIcon;

  if (specificPack && specificPack.icons) {
    for (const icon of specificPack.icons) {
      const definition = icon as MaterialFolderIcon;
      if (definition.folderNames?.some((name) => name.toLowerCase() === lowerFolderName)) {
        return definition.name;
      }
    }
    return defaultIcon;
  }

  return "folder";
}
