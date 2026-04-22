export type Language = {
  readonly ids: string | readonly string[];
  readonly knownExtensions?: readonly string[];
  readonly knownFilenames?: readonly string[];
};

export type VSIFileIcon = {
  readonly icon: string;
  readonly extensions: readonly string[];
  readonly extensionsGlob?: readonly string[];
  readonly disabled?: boolean;
  readonly light?: boolean;
  readonly languages?: readonly Language[];
  readonly filename?: boolean;
  readonly filenamesGlob?: readonly string[];
};

export type VSIFileExtensions = {
  readonly default: {
    readonly file: {
      readonly icon: string;
    };
  };
  readonly supported: readonly VSIFileIcon[];
};

export type VSIFolderIcon = {
  readonly icon: string;
  readonly extensions: readonly string[];
  readonly disabled?: boolean;
  readonly light?: boolean;
};

export type VSIFolderExtensions = {
  readonly default: {
    readonly folder: {
      readonly icon: string;
    };
    readonly root_folder: {
      readonly icon: string;
    };
  };
  readonly supported: readonly VSIFolderIcon[];
};
