import { Promptree } from "../promptree";
import { Prompt, PromptChild } from "../types";

interface LineProps {
  children?: PromptChild | PromptChild[];
}

// Line component: joins children without separators for a single line
export const Line: Prompt<LineProps> = (props) => {
  if (!props.children) return "";
  if (Array.isArray(props.children)) {
    return props.children.map(Promptree.render).join("");
  }
  return Promptree.render(props.children);
};