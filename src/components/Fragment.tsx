import { PromptChild, Prompt } from "../promptree";

// Props for Fragment and Line components
export interface FragmentProps {
  children?: PromptChild | PromptChild[];
}

export const Fragment: Prompt<FragmentProps> = (props) => {
  if (!props.children) return "";
  return Array.isArray(props.children) ? props.children : [props.children];
};
