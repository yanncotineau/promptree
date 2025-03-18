// Represents an array of PromptChild elements with an optional separator
export interface PromptChildArray extends Array<PromptChild> {
  separator?: string;
}

// Define allowed types for children
export type PromptChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | PromptElement<any>
  | PromptChildArray;

// Represents a node in the prompt tree
export interface PromptElement<P = {}> {
  type: string | Prompt<P>;
  props: P & { children?: PromptChild | PromptChild[] };
}

// A component function that processes props and returns content
export type Prompt<P = {}> = (
  props: P & { children?: PromptChild | PromptChild[] }
) => PromptChild;