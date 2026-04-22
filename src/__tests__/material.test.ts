import { describe, expect, it } from "vitest";

import { getMaterialFileIcon, getMaterialFolderIcon } from "../api/material";

describe("Material Icons API", () => {
  describe("getMaterialFileIcon", () => {
    it("should return the icon name for standard extensions", () => {
      expect(getMaterialFileIcon("index.mjs")).toBe("javascript");
      expect(getMaterialFileIcon("styles.css")).toBe("css");
    });

    it("should handle exact filename matches", () => {
      expect(getMaterialFileIcon("package.json")).toBe("nodejs");
      expect(getMaterialFileIcon("Dockerfile")).toBe("docker");
      expect(getMaterialFileIcon("justfile")).toBe("just");
    });

    it("should handle nested extensions and patterns", () => {
      expect(getMaterialFileIcon("my.spec.ts")).toBe("test-ts");
      expect(getMaterialFileIcon("user.service.ts")).toBe("angular-service");
      expect(getMaterialFileIcon("user.action.ts")).toBe("redux-action");
      expect(getMaterialFileIcon("user.reducer.ts")).toBe("redux-reducer");
      expect(getMaterialFileIcon("user.selector.ts")).toBe("redux-selector");
      expect(getMaterialFileIcon("user.store.ts")).toBe("redux-store");
    });

    it("should handle framework config files", () => {
      expect(getMaterialFileIcon("astro.config.mjs")).toBe("astro-config");
      expect(getMaterialFileIcon("keystatic.config.js")).toBe("keystatic");
      expect(getMaterialFileIcon("playwright.config.js")).toBe("playwright");
      expect(getMaterialFileIcon("typedoc.json")).toBe("typedoc");
    });

    it("should handle dotfiles", () => {
      expect(getMaterialFileIcon(".eslintrc.json")).toBe("eslint");
      expect(getMaterialFileIcon(".prettierrc")).toBe("prettier");
    });

    it("should handle niche names", () => {
      expect(getMaterialFileIcon("random.abc")).toBe("abc");
    });

    it("should handle full paths and relative paths", () => {
      expect(getMaterialFileIcon("/path/to/index.mjs")).toBe("javascript");
      expect(getMaterialFileIcon("./local/Dockerfile")).toBe("docker");
    });

    it("should be case-insensitive", () => {
      expect(getMaterialFileIcon("INDEX.MJS")).toBe("javascript");
      expect(getMaterialFileIcon("DOCKERFILE")).toBe("docker");
    });

    it("should handle edge cases like empty strings or strings with only dots", () => {
      expect(getMaterialFileIcon("")).toBe("file");
      expect(getMaterialFileIcon(".")).toBe("file");
      expect(getMaterialFileIcon("..")).toBe("file");
    });

    it("should return 'file' for unknown files", () => {
      expect(getMaterialFileIcon("random.abc123xyz")).toBe("file");
    });
  });

  describe("getMaterialFolderIcon", () => {
    it("should return the icon name for common folders", () => {
      expect(getMaterialFolderIcon("components")).toBe("folder-components");
      expect(getMaterialFolderIcon("src")).toBe("folder-src");
      expect(getMaterialFolderIcon("tests")).toBe("folder-test");
    });

    it("should handle niche folder names", () => {
      expect(getMaterialFolderIcon("aws")).toBe("folder-aws");
      expect(getMaterialFolderIcon("kubernetes")).toBe("folder-kubernetes");
      expect(getMaterialFolderIcon("cypress")).toBe("folder-cypress");
      expect(getMaterialFolderIcon("supabase")).toBe("folder-supabase");
    });

    it("should handle root folders", () => {
      expect(getMaterialFolderIcon("src", true)).toBe("folder-src"); // specific folder takes precedence
      expect(getMaterialFolderIcon("unknown", true)).toBe("folder-root");
      expect(getMaterialFolderIcon("", true)).toBe("folder-root");
    });

    it("should handle paths for folders", () => {
      expect(getMaterialFolderIcon("/path/to/src")).toBe("folder-src");
      expect(getMaterialFolderIcon("./components")).toBe("folder-components");
    });

    it("should handle edge cases for folders", () => {
      expect(getMaterialFolderIcon("")).toBe("folder");
      expect(getMaterialFolderIcon(".")).toBe("folder");
    });

    it("should return 'folder' for unknown folders", () => {
      expect(getMaterialFolderIcon("unknown-folder")).toBe("folder");
    });
  });
});
