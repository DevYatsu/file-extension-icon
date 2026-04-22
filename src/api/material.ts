import {
  materialFileExtensionsToIcons,
  materialFileNamesToIcons,
} from "../mappings/material/file-names";
import { materialFolderNamesToIcons } from "../mappings/material/folder-names";
import { getIconFromMap } from "../utils/icon-map";

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
  const lowerFileName = fileName.toLowerCase();
  const parts = lowerFileName.split(".");
  let iconName = "";

  // Try to match from most specific to least specific
  // e.g., for "test.spec.ts", try "test.spec.ts", then "spec.ts", then "ts"
  while (parts.length > 0) {
    const currentName = parts.join(".");

    // Check file names first (e.g., "package.json")
    const nameIcon = getIconFromMap(
      materialFileNamesToIcons,
      currentName as keyof typeof materialFileNamesToIcons
    );
    if (nameIcon) {
      iconName = nameIcon;
      break;
    }

    // Then check extensions (e.g., "json")
    const extIcon = getIconFromMap(
      materialFileExtensionsToIcons,
      currentName as keyof typeof materialFileExtensionsToIcons
    );
    if (extIcon) {
      iconName = extIcon;
      break;
    }

    parts.shift(); // Remove first part and try again
  }

  // Default to generic file icon if no match found
  if (!iconName) {
    iconName = "file";
  }

  return iconName;
}

/**
 * Gets the Material Icon name for a given folder name
 * @param folderName - The folder name
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getMaterialFolderIcon('components');
 * ```
 */
export function getMaterialFolderIcon(folderName: string): string {
  const lowerFolderName = folderName.toLowerCase();

  // Check if there's a specific icon for this folder name
  let iconName = getIconFromMap(
    materialFolderNamesToIcons,
    lowerFolderName as keyof typeof materialFolderNamesToIcons
  );

  // Default to generic folder icon if no match found
  if (!iconName) {
    iconName = "folder";
  }

  return iconName;
}
