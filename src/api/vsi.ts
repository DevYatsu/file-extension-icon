import { IconTheme } from "../engine";
import { extensions as fileExtensions } from "../mappings/vsi/file-names";
import { extensions as folderExtensions } from "../mappings/vsi/folder-names";
import { VSIFolderIcon } from "../mappings/vsi/types";

const theme = new IconTheme({
  fileDefinitions: fileExtensions.supported,
  fileDefault: fileExtensions.default.file.icon,
  folderDefinitions: folderExtensions.supported.map((def) => ({
    icon: def.icon,
    folderNames: (def as VSIFolderIcon).extensions,
    disabled: (def as VSIFolderIcon).disabled,
  })),
  folderDefault: folderExtensions.default.folder.icon,
  folderRootDefault: folderExtensions.default.root_folder.icon,
});

/**
 * Resolves the VSCode Icon (VSI) name for a given file.
 * @param fileName - The name of the file (including extension if applicable)
 * @returns The resolved icon name
 */
export const getVSIFileIcon = (fileName: string) => theme.getFileIcon(fileName);

/**
 * Resolves the VSCode Icon (VSI) name for a given folder.
 * @param folderName - The name of the folder
 * @param isRoot - Whether the folder is at the root of the workspace
 * @returns The resolved icon name
 */
export const getVSIFolderIcon = (folderName: string, isRoot = false) =>
  theme.getFolderIcon(folderName, isRoot);
