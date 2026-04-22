import { describe, expect, it } from "vitest";

import { getCatppuccinFileIcon, getCatppuccinFolderIcon } from "../api/catppuccin";

describe("Catppuccin Icons API", () => {
  describe("getCatppuccinFileIcon", () => {
    it("should return the icon name for standard extensions", () => {
      expect(getCatppuccinFileIcon("index.js")).toBe("javascript");
      expect(getCatppuccinFileIcon("styles.css")).toBe("css");
      expect(getCatppuccinFileIcon("index.html")).toBe("html");
      expect(getCatppuccinFileIcon("main.py")).toBe("python");
    });

    it("should handle files without extensions", () => {
      expect(getCatppuccinFileIcon("Dockerfile")).toBe("docker");
      expect(getCatppuccinFileIcon("Makefile")).toBe("makefile");
      expect(getCatppuccinFileIcon("LICENSE")).toBe("license");
      expect(getCatppuccinFileIcon("CODEOWNERS")).toBe("codeowners");
    });

    it("should handle lockfiles", () => {
      expect(getCatppuccinFileIcon("package-lock.json")).toBe("npm-lock");
      expect(getCatppuccinFileIcon("pnpm-lock.yaml")).toBe("pnpm-lock");

      expect(getCatppuccinFileIcon("yarn.lock")).toBe("yarn-lock");
      expect(getCatppuccinFileIcon("bun.lockb")).toBe("bun-lock");
      expect(getCatppuccinFileIcon("cargo.lock")).toBe("cargo-lock");
      expect(getCatppuccinFileIcon("deno.lock")).toBe("deno_lock");
    });

    it("should handle dotfiles and config files", () => {
      expect(getCatppuccinFileIcon(".gitignore")).toBe("git");
      expect(getCatppuccinFileIcon(".prettierrc")).toBe("prettier");
      expect(getCatppuccinFileIcon(".eslintrc.json")).toBe("eslint");
      expect(getCatppuccinFileIcon(".editorconfig")).toBe("editorconfig");
      expect(getCatppuccinFileIcon("circle.yml")).toBe("circle-ci");
    });

    it("should handle documentation and legal files", () => {
      expect(getCatppuccinFileIcon("CHANGELOG.md")).toBe("changelog");
      expect(getCatppuccinFileIcon("CONTRIBUTING.md")).toBe("contributing");
      expect(getCatppuccinFileIcon("README.md")).toBe("readme");
      expect(getCatppuccinFileIcon("CODE_OF_CONDUCT.md")).toBe("code-of-conduct");
    });

    it("should handle multiple dots (nested extensions)", () => {
      expect(getCatppuccinFileIcon("test.spec.ts")).toBe("typescript-test");
      expect(getCatppuccinFileIcon("component.test.jsx")).toBe("javascript-test");
    });

    it("should be case-insensitive", () => {
      expect(getCatppuccinFileIcon("FILE.JS")).toBe("javascript");
      expect(getCatppuccinFileIcon("DOCKERFILE")).toBe("docker");
    });

    it("should handle full paths and relative paths", () => {
      expect(getCatppuccinFileIcon("/path/to/index.js")).toBe("javascript");
      expect(getCatppuccinFileIcon("./local/Dockerfile")).toBe("docker");
      expect(getCatppuccinFileIcon("C:\\Windows\\system32\\drivers\\etc\\hosts")).toBe("_file");
    });

    it("should handle edge cases like empty strings or strings with only dots", () => {
      expect(getCatppuccinFileIcon("")).toBe("_file");
      expect(getCatppuccinFileIcon(".")).toBe("_file");
      expect(getCatppuccinFileIcon("..")).toBe("_file");
      expect(getCatppuccinFileIcon("file.")).toBe("_file");
    });

    it("should return 'file' for unknown files", () => {
      expect(getCatppuccinFileIcon("unknown.xyz123")).toBe("_file");
    });
  });

  describe("getCatppuccinFolderIcon", () => {
    it("should return the icon name for common folders", () => {
      expect(getCatppuccinFolderIcon("src")).toBe("src");
      expect(getCatppuccinFolderIcon("node_modules")).toBe("node");
      expect(getCatppuccinFolderIcon("tests")).toBe("tests");
    });

    it("should handle niche and framework folders", () => {
      expect(getCatppuccinFolderIcon(".github")).toBe("github");
      expect(getCatppuccinFolderIcon(".vscode")).toBe("vscode");
      expect(getCatppuccinFolderIcon(".husky")).toBe("husky");
      expect(getCatppuccinFolderIcon("__mocks__")).toBe("tests");
      expect(getCatppuccinFolderIcon("__tests__")).toBe("tests");
      expect(getCatppuccinFolderIcon(".vercel")).toBe("vercel");
    });

    it("should handle paths for folders", () => {
      expect(getCatppuccinFolderIcon("/path/to/src")).toBe("src");
      expect(getCatppuccinFolderIcon("./node_modules")).toBe("node");
    });

    it("should handle edge cases for folders", () => {
      expect(getCatppuccinFolderIcon("")).toBe("_folder");
      expect(getCatppuccinFolderIcon(".")).toBe("_folder");
    });

    it("should return 'folder' for unknown folders", () => {
      expect(getCatppuccinFolderIcon("unknown_random_folder")).toBe("_folder");
    });
  });
});
