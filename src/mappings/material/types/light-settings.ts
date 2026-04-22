import type { CloneOptions } from "./clone-options";

/**
 * Settings for light mode, determining the behavior of `clone` and `lightColor` based on `light`.
 */
export type LightSettingsWithCloneOptions =
  | {
      /** Enables light mode; requires `clone` with `lightColor`. */
      readonly light: true;

      /** Clone configuration with a required `lightColor`. */
      readonly clone: CloneOptions & {
        /** Specifies the color for light mode (required). */
        readonly lightColor: string;
      };
    }
  | {
      /** Enables light mode; `clone` is not provided. */
      readonly light: true;

      /** No clone configuration when absent in light mode. */
      readonly clone?: never;
    }
  | {
      /** Disables light mode; prohibits `lightColor` in `clone`. */
      readonly light?: false;

      /** Optional clone configuration for dark mode. */
      readonly clone?: CloneOptions & {
        /** Must not exist when `light` is `false`. */
        readonly lightColor?: never;
      };
    };
