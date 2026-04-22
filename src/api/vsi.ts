import { extensions as fileExtensions } from "../mappings/vsi/file-names";
import { extensions as folderExtensions } from "../mappings/vsi/folder-names";
import { VSIFileIcon, VSIFolderIcon } from "../mappings/vsi/types";
import { getBaseName } from "../utils";

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
  const baseName = getBaseName(fileName);
  const lowerFileName = baseName.toLowerCase();

  if (!lowerFileName) return fileExtensions.default.file.icon;

  // 1. Try filename matches first (filename: true)
  for (const def of fileExtensions.supported) {
    const definition = def as VSIFileIcon;
    if (definition.disabled) continue;
    if (
      definition.filename &&
      definition.extensions.some((ext) => ext.toLowerCase() === lowerFileName)
    ) {
      return definition.icon;
    }
  }

  // 2. Try glob matches
  for (const def of fileExtensions.supported) {
    const definition = def as VSIFileIcon;
    if (definition.disabled) continue;
    if (definition.filenamesGlob && definition.extensionsGlob) {
      const matchFile = definition.filenamesGlob.some((f) =>
        lowerFileName.startsWith(f.toLowerCase())
      );
      const matchExt = definition.extensionsGlob.some((e) =>
        lowerFileName.endsWith(e.toLowerCase())
      );
      if (matchFile && matchExt) {
        return definition.icon;
      }
    }
  }

  // 3. Try extension matches (including languages)
  const parts = lowerFileName.split(".");
  while (parts.length > 1) {
    parts.shift();
    const ext = parts.join(".");
    for (const def of fileExtensions.supported) {
      const definition = def as VSIFileIcon;
      if (definition.disabled) continue;

      // Check extensions
      if (!definition.filename && definition.extensions.some((e) => e.toLowerCase() === ext)) {
        return definition.icon;
      }

      // Check languages
      if (definition.languages) {
        for (const lang of definition.languages) {
          if (lang.knownExtensions?.some((e) => e.toLowerCase() === ext)) {
            return definition.icon;
          }
        }
      }
    }
  }

  return fileExtensions.default.file.icon;
}

/**
 * Gets the VSCode Icon name for a given folder name
 * @param folderName - The folder name
 * @param isRoot - Whether the folder is at the root
 * @returns The icon name
 *
 * @example
 * ```ts
 * const icon = getVSIFolderIcon('src');
 * ```
 */
export function getVSIFolderIcon(folderName: string, isRoot: boolean = false): string {
  const baseName = getBaseName(folderName);
  const lowerFolderName = baseName.toLowerCase();

  if (!lowerFolderName)
    return isRoot
      ? folderExtensions.default.root_folder.icon
      : folderExtensions.default.folder.icon;

  for (const def of folderExtensions.supported) {
    const definition = def as VSIFolderIcon;
    if (definition.disabled) continue;
    if (definition.extensions.some((ext) => ext.toLowerCase() === lowerFolderName)) {
      return definition.icon;
    }
  }

  return isRoot ? folderExtensions.default.root_folder.icon : folderExtensions.default.folder.icon;
}
