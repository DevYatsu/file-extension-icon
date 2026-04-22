import { getBaseName } from "./utils";

/**
 * Configuration for a file icon mapping.
 */
export interface IconDefinition {
  /** Canonical icon name (e.g., "file-typescript") */
  icon: string;
  /** Exact file names that should match this icon */
  fileNames?: readonly string[];
  /** File extensions (without dot) that should match this icon */
  extensions?: readonly string[];
  /** Language-specific definitions from VSCode themes */
  languages?: readonly {
    readonly ids?: string | readonly string[];
    readonly knownExtensions?: readonly string[];
    readonly knownFilenames?: readonly string[];
  }[];
  /** If true, the extension is treated as a full filename match */
  filename?: boolean;
  /** Glob-like patterns for filename prefixes */
  filenamesGlob?: readonly string[];
  /** Glob-like patterns for filename suffixes/extensions */
  extensionsGlob?: readonly string[];
  /** Whether this mapping is disabled */
  disabled?: boolean;
}

/**
 * Configuration for a folder icon mapping.
 */
export interface FolderDefinition {
  /** Canonical icon name (e.g., "folder-src") */
  icon: string;
  /** Exact folder names that should match this icon */
  folderNames: readonly string[];
  /** Whether this mapping is disabled */
  disabled?: boolean;
}

class IconMatcher {
  private fileNameMap = new Map<string, string>();
  private extensionMap = new Map<string, string>();
  private globMatchers: IconDefinition[] = [];

  constructor(
    private definitions: readonly IconDefinition[],
    private defaultIcon: string
  ) {
    for (const def of this.definitions) {
      if (def.disabled) continue;

      def.fileNames?.forEach((name) => {
        const lowerName = name.toLowerCase();
        if (!this.fileNameMap.has(lowerName)) this.fileNameMap.set(lowerName, def.icon);
      });

      def.extensions?.forEach((ext) => {
        const lowerExt = ext.toLowerCase();
        if (def.filename) {
          if (!this.fileNameMap.has(lowerExt)) this.fileNameMap.set(lowerExt, def.icon);
        } else {
          if (!this.extensionMap.has(lowerExt)) this.extensionMap.set(lowerExt, def.icon);
        }
      });

      def.languages?.forEach((lang) => {
        lang.knownExtensions?.forEach((ext) => {
          const lowerExt = ext.toLowerCase();
          if (!this.extensionMap.has(lowerExt)) this.extensionMap.set(lowerExt, def.icon);
        });
      });

      if (def.filenamesGlob && def.extensionsGlob) this.globMatchers.push(def);
    }
  }

  public getIcon(fileName: string): string {
    const baseName = getBaseName(fileName);
    const lowerName = baseName.toLowerCase();
    if (!lowerName) return this.defaultIcon;

    const exactMatch = this.fileNameMap.get(lowerName);
    if (exactMatch) return exactMatch;

    for (const def of this.globMatchers) {
      if (
        def.filenamesGlob?.some((f) => lowerName.startsWith(f.toLowerCase())) &&
        def.extensionsGlob?.some((e) => lowerName.endsWith(e.toLowerCase()))
      )
        return def.icon;
    }

    const parts = lowerName.split(".");
    for (let i = 1; i < parts.length; i++) {
      const match = this.extensionMap.get(parts.slice(i).join("."));
      if (match) return match;
    }

    return this.defaultIcon;
  }
}

class FolderMatcher {
  private folderMap = new Map<string, string>();

  constructor(
    definitions: readonly FolderDefinition[],
    private defaultIcon: string,
    private rootDefaultIcon?: string
  ) {
    for (const def of definitions) {
      if (def.disabled) continue;
      def.folderNames.forEach((name) => {
        const lowerName = name.toLowerCase();
        if (!this.folderMap.has(lowerName)) this.folderMap.set(lowerName, def.icon);
      });
    }
  }

  public getIcon(folderName: string, isRoot: boolean = false): string {
    const lowerName = getBaseName(folderName).toLowerCase();
    const def = isRoot ? this.rootDefaultIcon || this.defaultIcon : this.defaultIcon;
    if (!lowerName) return def;
    return this.folderMap.get(lowerName) || def;
  }
}

/**
 * Represents a complete icon theme with file and folder matching capabilities.
 */
export class IconTheme {
  private fileMatcher: IconMatcher;
  private folderMatcher: FolderMatcher;

  constructor(options: {
    /** List of file icon definitions */
    fileDefinitions: readonly IconDefinition[];
    /** Default icon to return for files if no match is found */
    fileDefault: string;
    /** List of folder icon definitions */
    folderDefinitions: readonly FolderDefinition[];
    /** Default icon to return for folders if no match is found */
    folderDefault: string;
    /** Default icon to return for root folders */
    folderRootDefault?: string;
  }) {
    this.fileMatcher = new IconMatcher(options.fileDefinitions, options.fileDefault);
    this.folderMatcher = new FolderMatcher(
      options.folderDefinitions,
      options.folderDefault,
      options.folderRootDefault
    );
  }

  /**
   * Resolves the icon name for a given file.
   * @param fileName - The name of the file or path
   * @returns The resolved icon name
   */
  public getFileIcon(fileName: string): string {
    return this.fileMatcher.getIcon(fileName);
  }

  /**
   * Resolves the icon name for a given folder.
   * @param folderName - The name of the folder or path
   * @param isRoot - Whether to resolve for a root folder
   * @returns The resolved icon name
   */
  public getFolderIcon(folderName: string, isRoot: boolean = false): string {
    return this.folderMatcher.getIcon(folderName, isRoot);
  }
}
