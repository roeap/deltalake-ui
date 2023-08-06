import { SVGProps } from "react";

export type IconProps<T = any> = {
  /**
   * id passed to root component
   */
  id?: string;

  /**
   * Overwrite the height property of the icon
   */
  height?: string | number;

  /**
   * Overwrite the width property of the icon
   */
  width?: string | number;

  /**
   * stroke color applied to the rendered icon
   */
  color?: string;

  /**
   * Denotes if the icon should be rendered in hand drawn style.
   */
  sketched?: boolean;

  /**
   * options applied to path elements
   */
  pathProps?: SVGProps<SVGPathElement>;

  data?: T;
};
