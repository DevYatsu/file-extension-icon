export type DefaultIcon = {
  /**
   * Name of the icon, e.g. `src`
   */
  readonly name: string;

  /**
   * Define if there is a light icon available.
   */
  readonly light?: boolean;

  /**
   * Define if there is a high contrast icon available.
   */
  readonly highContrast?: boolean;
};
