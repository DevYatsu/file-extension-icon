import {
  materialFileExtensionsToIcons,
  materialFileNamesToIcons,
} from "../mappings/material/file-names";
import { materialFolderNamesToIcons } from "../mappings/material/folder-names";
import { vsiFileExtensionsToIcons, vsiFileNamesToIcons } from "../mappings/vsi/file-names";
import { vsiFolderNamesToIcons } from "../mappings/vsi/folder-names";

/**
 * Represents a mapping from icon names to their SVG content
 */
export type IconMap = Record<string, string>;

/**
 * The Material File Extension Keys
 */
export type MaterialFileExtensionKeys = keyof typeof materialFileExtensionsToIcons;

/**
 * The Material File Name Keys
 */
export type MaterialFileNameKeys = keyof typeof materialFileNamesToIcons;

/**
 * The Material Folder Name Keys
 */
export type MaterialFolderNameKeys = keyof typeof materialFolderNamesToIcons;

/**
 * The VSCode File Extension Keys
 */
export type VSIFileExtensionKeys = keyof typeof vsiFileExtensionsToIcons;

/**
 * The VSCode File Name Keys
 */
export type VSIFileNameKeys = keyof typeof vsiFileNamesToIcons;

/**
 * The VSCode Folder Name Keys
 */
export type VSIFolderNameKeys = keyof typeof vsiFolderNamesToIcons;
