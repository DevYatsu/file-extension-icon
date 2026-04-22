import { IconTheme } from "../engine";
import { fileIcons } from "../mappings/material/file-names";
import { folderIcons } from "../mappings/material/folder-names";
import { MaterialFileIcon, MaterialFolderIcon } from "../mappings/material/types";

const specificPack = folderIcons[0];

const theme = new IconTheme({
  fileDefinitions: fileIcons.icons.map((def) => ({
    icon: (def as MaterialFileIcon).name,
    fileNames: (def as MaterialFileIcon).fileNames,
    extensions: (def as MaterialFileIcon).fileExtensions,
  })),
  fileDefault: fileIcons.defaultIcon.name,
  folderDefinitions: (specificPack?.icons || []).map((def) => ({
    icon: (def as MaterialFolderIcon).name,
    folderNames: (def as MaterialFolderIcon).folderNames || [],
  })),
  folderDefault: specificPack?.defaultIcon?.name || "folder",
  folderRootDefault: specificPack?.rootFolder?.name || "folder-root",
});

/**
 * Resolves the Material icon name for a given file.
 * @param fileName - The name of the file (including extension if applicable)
 * @returns The resolved icon name
 */
export const getMaterialFileIcon = (fileName: string) => theme.getFileIcon(fileName);

/**
 * Resolves the Material icon name for a given folder.
 * @param folderName - The name of the folder
 * @param isRoot - Whether the folder is at the root of the workspace
 * @returns The resolved icon name
 */
export const getMaterialFolderIcon = (folderName: string, isRoot = false) =>
  theme.getFolderIcon(folderName, isRoot);
