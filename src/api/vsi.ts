import { vsiFileExtensionsToIcons, vsiFileNamesToIcons } from "../mappings/vsi/file-names";
import { vsiFolderNamesToIcons } from "../mappings/vsi/folder-names";
import { getIconFromMap } from "../utils/icon-map";

/**
 * Gets the VSCode Icon name for a given file name
 * @param fileName - The file name (with or without extension)
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getVSIFileIcon('index.ts');
 * // Returns: "typescript"
 * ```
 */
export function getVSIFileIcon(fileName: string): string {
  const lowerFileName = fileName.toLowerCase();
  const parts = lowerFileName.split(".");
  let iconName = "";

  // Try to match from most specific to least specific
  while (parts.length > 0) {
    const currentName = parts.join(".");

    // Check file names first
    const nameIcon = getIconFromMap(
      vsiFileNamesToIcons,
      currentName as keyof typeof vsiFileNamesToIcons
    );
    if (nameIcon) {
      iconName = nameIcon;
      break;
    }

    // Then check extensions
    const extIcon = getIconFromMap(
      vsiFileExtensionsToIcons,
      currentName as keyof typeof vsiFileExtensionsToIcons
    );
    if (extIcon) {
      iconName = extIcon;
      break;
    }

    parts.shift();
  }

  // Default to generic file icon
  if (!iconName) {
    iconName = "file";
  }

  return iconName;
}

/**
 * Gets the VSCode Icon name for a given folder name
 * @param folderName - The folder name
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getVSIFolderIcon('src');
 * ```
 */
export function getVSIFolderIcon(folderName: string): string {
  const lowerFolderName = folderName.toLowerCase();

  // Check if there's a specific icon for this folder name
  let iconName = getIconFromMap(
    vsiFolderNamesToIcons,
    lowerFolderName as keyof typeof vsiFolderNamesToIcons
  );

  // Default to generic folder icon
  if (!iconName) {
    iconName = "folder";
  }

  return iconName;
}
