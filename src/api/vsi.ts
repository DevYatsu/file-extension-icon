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

export const getVSIFileIcon = (fileName: string) => theme.getFileIcon(fileName);
export const getVSIFolderIcon = (folderName: string, isRoot = false) =>
  theme.getFolderIcon(folderName, isRoot);
