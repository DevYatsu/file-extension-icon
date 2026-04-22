export type FileIconDefinition = {
  readonly languageIds?: readonly string[];
  readonly fileExtensions?: readonly string[];
  readonly fileNames?: readonly string[];
};

export type FileIcons = Record<string, FileIconDefinition>;

export type FolderIconDefinition = {
  readonly folderNames?: readonly string[];
};

export type FolderIcons = Record<string, FolderIconDefinition>;
