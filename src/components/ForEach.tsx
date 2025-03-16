import { Promptree, PromptChild, PromptChildArray } from "../promptree";
import { Fragment } from "./Fragment";

export interface ForEachProps<T> {
  items: T[];
  render: (item: T, index: number) => PromptChild;
  separator?: PromptChild;
  inline?: boolean; // new optional flag
}

export const ForEach = <T,>(props: ForEachProps<T>): PromptChild => {
  const children: PromptChild[] = [];
  props.items.forEach((item, index) => {
    if (index > 0 && props.separator !== undefined) {
      children.push(props.separator);
    }
    children.push(props.render(item, index));
  });
  if (props.inline) {
    // Return the children array with a custom separator property (empty string) to avoid newlines.
    const arr = children as PromptChildArray;
    arr.separator = "";
    return arr;
  }
  return Promptree.createElement(Fragment, { children });
};
