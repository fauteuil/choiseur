import { ComponentType, HTMLProps, ReactNode } from 'react';

/**
 * Base, generic types for composed types and interfaces.
 */

export enum sortDirections {
  ASC = 'ASC',
  DESC = 'DESC',
  noSort = '',
}

// Type declarations - ASC | DESC
export type SortDirection = Exclude<sortDirections, sortDirections.noSort>;
/** optional color string attribute */
export type Color = { color?: string };
/** generically type `data` object */
export type Data<T> = { data: T };
/** `data-test-id` attribute for use with `testing-library` */
export type DataTestId = {
  /** `data-test-id` attribute for use with `testing-library` */
  dataTestId?: string;
};
/** description string attribute */
export type Description = { description: string };
/** optional sort direction attribute - usually `ASC` or `DESC` */
export type Direction = { direction?: SortDirection };
/** generically typed `documents` list attribute */
export type Documents<T> = { documents: Partial<T>[] };
/** optional dueDate string attribute */
export type DueDate = { dueDate?: string };
/** file object attribute */
export type FileParam = { file: File };
/** optional id string attribute */
export type Id = Pick<HTMLProps<HTMLDivElement>, 'id'>;
/** optional boolean inactive attribute -
 * for components that should appear `disabled` but still be visible to screen readers */
export type Inactive = { inactive?: boolean };
/** optional label string attribute */
export type Label<T = string> = { label?: T };
/** message string attribute */
export type Message<T = string> = { message: T };
/** optional onClick handler attribute */
export type onMouseOver<T = ReactNode> = Pick<HTMLProps<T>, 'onMouseOver'>;
/** optional onClick handler attribute */
// export type OnClick<T = ReactNode> = Pick<HTMLProps<T>, 'onClick'>;
export type OnClick<T = HTMLElement> = Pick<HTMLProps<T>, 'onClick'>;
/** optional onClick handler attribute */
export type OnKeyDown<T = ReactNode> = Pick<HTMLProps<T>, 'onKeyDown'>;
/** optional boolean readOnly attribute */
export type ReadOnly = { readOnly?: boolean };
/** boolean selected attribute */
export type Selected = { selected?: boolean };
/** status attribute expects `StatusType` */
export type Status<StatusType = string> = { status: StatusType };
/** optional height attribute */
export type Height = Pick<HTMLProps<HTMLDivElement>, 'height'>;
/** optional text string attribute */
export type Text = { text?: ReactNode };
/** optional title string attribute */
export type Title = Pick<HTMLProps<HTMLDivElement>, 'title'>;
/** optional boolean visible attribute - for use with show/hide toggling */
export type Visible = { visible: boolean };
export type Width = Pick<HTMLProps<HTMLDivElement>, 'width'>;
/** numeric width attribute, integer for rem calculations */
export type RemIntegerWidth = { width?: number };

/**
 * Generic No Operation function with optional props
 * @description
 *    PropsType - defaults to void
 */
export type NoOpFunction<PropsType = unknown> = (props?: PropsType) => void;

/**
 * For use with Select
 * @param Value - pass in the type for the value attribute.
 */
export type SelectOption<Value> = Record<string, Value>;
