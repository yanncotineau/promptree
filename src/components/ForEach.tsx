import { PromptChild, PromptChildArray } from "../types";

interface ForEachProps<T> {
  items: T[];
  render: (item: T, index: number) => PromptChild;
  separator?: PromptChild;
  inline?: boolean; // new optional flag
}

export const ForEach = <T,>(props: ForEachProps<T>) => {
  const children: PromptChild[] = [];
  props.items.forEach((item, index) => {
    if (index > 0 && props.separator !== undefined) {
      children.push(props.separator);
    }
    children.push(props.render(item, index));
  });
  const arr = children as PromptChildArray;
  // If inline, do not add any extra separator when rendering the array.
  arr.separator = props.inline ? "" : "\n";
  return arr;
};