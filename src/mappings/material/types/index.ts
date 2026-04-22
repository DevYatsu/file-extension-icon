import { DefaultIcon } from "./default-icon";
import { IconPack } from "./icon-pack";
import { LightSettingsWithCloneOptions } from "./light-settings";
import { RequireAtLeastOne } from "./requireAtLeastOne";

export * from "./default-icon";
export * from "./icon-pack";
export * from "./clone-options";
export * from "./light-settings";
export * from "./requireAtLeastOne";

export type Patterns = Readonly<Record<string, unknown>>; // Will be refined in patterns.ts or here

type BasicFileIcon = DefaultIcon &
  LightSettingsWithCloneOptions & {
    readonly fileExtensions?: readonly string[];
    readonly fileNames?: readonly string[];
    readonly patterns?: Patterns;
    readonly disabled?: boolean;
    readonly enabledFor?: readonly IconPack[];
  };

type RequireAtLeastOneFileIcon<T> = T extends BasicFileIcon
  ? RequireAtLeastOne<T, "fileExtensions" | "fileNames" | "patterns">
  : never;

export type MaterialFileIcon = RequireAtLeastOneFileIcon<BasicFileIcon>;

export type MaterialFileExtensions = {
  readonly defaultIcon: DefaultIcon;
  readonly icons: readonly MaterialFileIcon[];
};

type BasicFolderIcon = DefaultIcon &
  LightSettingsWithCloneOptions & {
    readonly folderNames: readonly string[];
    readonly rootFolderNames?: readonly string[];
    readonly disabled?: boolean;
    readonly enabledFor?: readonly IconPack[];
  };

type RequireAtLeastOneFolderIcon<T> = T extends BasicFolderIcon
  ? RequireAtLeastOne<T, "folderNames" | "rootFolderNames">
  : never;

export type MaterialFolderIcon = RequireAtLeastOneFolderIcon<BasicFolderIcon>;

export type FolderThemeName = "specific" | "classic" | "none";

export type MaterialFolderExtensions = {
  readonly name: FolderThemeName;
  readonly defaultIcon: DefaultIcon;
  readonly rootFolder?: DefaultIcon;
  readonly icons?: readonly MaterialFolderIcon[];
};
