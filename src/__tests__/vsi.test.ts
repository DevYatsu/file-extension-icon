import { describe, expect, it } from "vitest";

import { getVSIFileIcon, getVSIFolderIcon } from "../api/vsi";

describe("VSI Icons API", () => {
  describe("getVSIFileIcon", () => {
    it("should return the icon name for standard extensions", () => {
      expect(getVSIFileIcon("index.ts")).toBe("typescript");
      expect(getVSIFileIcon("main.go")).toBe("go");
    });

    it("should handle exact filename matches", () => {
      expect(getVSIFileIcon("package.json")).toBe("npm");
      expect(getVSIFileIcon("composer.json")).toBe("composer");
      expect(getVSIFileIcon("composer.lock")).toBe("composer");
    });

    it("should handle glob matches", () => {
      expect(getVSIFileIcon("test.ts")).toBe("testts");
      expect(getVSIFileIcon("test.js")).toBe("testjs");
    });

    it("should handle language-based and framework matches", () => {
      expect(getVSIFileIcon("config.yaml")).toBe("esphome");
      expect(getVSIFileIcon("allurerc.js")).toBe("allure");

      expect(getVSIFileIcon("app.component.ts")).toBe("typescript");
      expect(getVSIFileIcon("app.service.ts")).toBe("typescript");
    });

    it("should handle CI/CD and pipeline files", () => {
      expect(getVSIFileIcon("bitbucket-pipelines.yml")).toBe("bitbucketpipeline");
      expect(getVSIFileIcon("azure-pipelines.yml")).toBe("azurepipelines");
      expect(getVSIFileIcon(".travis.yml")).toBe("travis");
    });

    it("should handle niche config files", () => {
      expect(getVSIFileIcon(".all-contributorsrc")).toBe("allcontributors");
    });

    it("should handle multiple dots", () => {
      expect(getVSIFileIcon("jest.config.js")).toBe("jest");
    });

    it("should handle full paths and relative paths", () => {
      expect(getVSIFileIcon("/path/to/index.ts")).toBe("typescript");
      expect(getVSIFileIcon("./local/main.go")).toBe("go");
    });

    it("should be case-insensitive", () => {
      expect(getVSIFileIcon("INDEX.TS")).toBe("typescript");
      expect(getVSIFileIcon("PACKAGE.JSON")).toBe("npm");
    });

    it("should handle edge cases like empty strings or strings with only dots", () => {
      expect(getVSIFileIcon("")).toBe("file");
      expect(getVSIFileIcon(".")).toBe("file");
      expect(getVSIFileIcon("..")).toBe("file");
    });

    it("should return 'file' for unknown files", () => {
      expect(getVSIFileIcon("unknown.xyz123")).toBe("file");
    });
  });

  describe("getVSIFolderIcon", () => {
    it("should return the icon name for common folders", () => {
      expect(getVSIFolderIcon("node_modules")).toBe("node");
      expect(getVSIFolderIcon("src")).toBe("src");
      expect(getVSIFolderIcon(".git")).toBe("git");
    });

    it("should handle niche folder names", () => {
      expect(getVSIFolderIcon("docker")).toBe("docker");
      expect(getVSIFolderIcon("kubernetes")).toBe("kubernetes");
      expect(getVSIFolderIcon("cypress")).toBe("cypress");
      expect(getVSIFolderIcon(".storybook")).toBe("story");
    });

    it("should handle root folders", () => {
      expect(getVSIFolderIcon("src", true)).toBe("src"); // specific folder takes precedence
      expect(getVSIFolderIcon("unknown", true)).toBe("root_folder");
      expect(getVSIFolderIcon("", true)).toBe("root_folder");
    });

    it("should handle paths for folders", () => {
      expect(getVSIFolderIcon("/path/to/src")).toBe("src");
      expect(getVSIFolderIcon("./node_modules")).toBe("node");
    });

    it("should handle edge cases for folders", () => {
      expect(getVSIFolderIcon("")).toBe("folder");
      expect(getVSIFolderIcon(".")).toBe("folder");
    });

    it("should return 'folder' for unknown folders", () => {
      expect(getVSIFolderIcon("some-unknown-folder")).toBe("folder");
    });
  });
});
