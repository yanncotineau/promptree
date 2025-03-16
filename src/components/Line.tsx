import { PromptChild, Prompt, Promptree } from "../promptree";
import { FragmentProps } from "./Fragment";

// Line component: joins children without separators for a single line
export const Line: Prompt<FragmentProps> = (props) => {
  if (!props.children) return "";
  if (Array.isArray(props.children)) {
    return props.children.map(Promptree.render).join("");
  }
  return Promptree.render(props.children);
};