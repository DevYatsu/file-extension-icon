import { IconTheme } from "../engine";
import { fileIcons } from "../mappings/catppuccin/file-names";
import { folderIcons } from "../mappings/catppuccin/folder-names";
import { FileIconDefinition, FolderIconDefinition } from "../mappings/catppuccin/types";

const theme = new IconTheme({
  fileDefinitions: Object.entries(fileIcons).map(([icon, def]) => ({
    icon,
    fileNames: (def as FileIconDefinition).fileNames,
    extensions: (def as FileIconDefinition).fileExtensions,
  })),
  fileDefault: "file",
  folderDefinitions: Object.entries(folderIcons).map(([icon, def]) => ({
    icon,
    folderNames: (def as FolderIconDefinition).folderNames || [],
  })),
  folderDefault: "folder",
});

export const getCatppuccinFileIcon = (fileName: string) => theme.getFileIcon(fileName);
export const getCatppuccinFolderIcon = (folderName: string) => theme.getFolderIcon(folderName);
