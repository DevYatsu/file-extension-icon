# vscode-icon-resolver

![VSCode Icon Resolver Cover](/cover.jpeg)

> High-performance, lightweight library to resolve file and folder icon names for Material, Catppuccin, and VSCode icon themes.

A modernized, high-performance icon name resolver for Web and Node.js apps. Inspired by `vscode-icons-js` but expanded to support multiple popular icon sets with **O(1)** lookup complexity.

[![npm version](https://img.shields.io/npm/v/vscode-icon-resolver)](https://www.npmjs.com/package/vscode-icon-resolver)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- **Multiple Themes**: Supports Material Icon Theme, Catppuccin, and VSCode Icons.
- **Extreme Performance**: Uses `Map`-based lookups for **O(1)** resolution.
- **Zero Dependencies**: Pure logic, no runtime overhead.
- **TypeScript First**: Full type safety with comprehensive definitions.
- **Tree-shakeable**: You only pay for what you use. Optimized for modern bundlers.
- **Dual Format**: Native ESM and CJS support.

## Installation

```bash
npm install vscode-icon-resolver
```

## Usage

This package returns the **canonical icon name** (e.g., `folder-src`, `file-typescript`). You can use these names to load your own SVG assets or CSS classes.

### Basic Usage

```ts
import { getCatppuccinFileIcon, getMaterialFileIcon, getVSIFileIcon } from "vscode-icon-resolver";

// Material Theme
const material = getMaterialFileIcon("index.ts"); // "file-typescript"

// Catppuccin Theme
const catppuccin = getCatppuccinFileIcon("package.json"); // "file-npm"

// VSCode Icons (VSI)
const vsi = getVSIFileIcon("docker-compose.yml"); // "file-docker"
```

### Folder Resolution

```ts
import { getMaterialFolderIcon, getVSIFolderIcon } from "vscode-icon-resolver";

// Standard folders
getMaterialFolderIcon("src"); // "folder-src"

// Root folder detection (Material/VSI support specific root icons)
getMaterialFolderIcon(".git", true); // "folder-root"
```

## 📚 API Reference

### Material Icons

- `getMaterialFileIcon(fileName: string): string`
- `getMaterialFolderIcon(folderName: string, isRoot?: boolean): string`

### Catppuccin Icons

- `getCatppuccinFileIcon(fileName: string): string`
- `getCatppuccinFolderIcon(folderName: string): string`

### VSCode Icons (VSI)

- `getVSIFileIcon(fileName: string): string`
- `getVSIFolderIcon(folderName: string, isRoot?: boolean): string`

## Performance

Unlike other libraries that use linear array searches (**O(N)**), `vscode-icon-resolver` uses a pre-indexed `Map` system. This makes icon resolution **O(1)** regardless of the number of mappings, making it suitable for high-performance file trees and IDE-like applications.

## Credits

Inspired by:

- [vscode-icons-js](https://github.com/dderevjanik/vscode-icons-js)
- [Material Icon Theme](https://github.com/PKief/vscode-material-icon-theme)
- [Catppuccin Icons](https://github.com/catppuccin/vscode-icons)
- [VSCode Icons](https://github.com/vscode-icons/vscode-icons)

## License

MIT © [Yanis (DevYatsu)](https://github.com/DevYatsu)
