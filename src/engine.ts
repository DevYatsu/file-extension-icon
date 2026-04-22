import { getBaseName } from "./utils";

export interface IconDefinition {
  icon: string;
  fileNames?: readonly string[];
  extensions?: readonly string[];
  languages?: readonly {
    readonly ids?: string | readonly string[];
    readonly knownExtensions?: readonly string[];
    readonly knownFilenames?: readonly string[];
  }[];
  filename?: boolean;
  filenamesGlob?: readonly string[];
  extensionsGlob?: readonly string[];
  disabled?: boolean;
}

export interface FolderDefinition {
  icon: string;
  folderNames: readonly string[];
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

export class IconTheme {
  private fileMatcher: IconMatcher;
  private folderMatcher: FolderMatcher;

  constructor(options: {
    fileDefinitions: readonly IconDefinition[];
    fileDefault: string;
    folderDefinitions: readonly FolderDefinition[];
    folderDefault: string;
    folderRootDefault?: string;
  }) {
    this.fileMatcher = new IconMatcher(options.fileDefinitions, options.fileDefault);
    this.folderMatcher = new FolderMatcher(
      options.folderDefinitions,
      options.folderDefault,
      options.folderRootDefault
    );
  }

  public getFileIcon(fileName: string): string {
    return this.fileMatcher.getIcon(fileName);
  }

  public getFolderIcon(folderName: string, isRoot: boolean = false): string {
    return this.folderMatcher.getIcon(folderName, isRoot);
  }
}
