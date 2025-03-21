import { Fragment } from "./components/Fragment";
import { Prompt, PromptChild, PromptChildArray, PromptElement } from "./types";

export function createElement<P>(
  type: string | Prompt<P>,
  props: (P & { children?: PromptChild | PromptChild[] }) | null,
  ...children: PromptChild[]
): PromptChild | PromptElement<P> {
  if (typeof type === "string") {
    return children.length > 0
      ? children.map(render).filter(Boolean).join("")
      : "";
  }

  const normalizedChildren = children
    .filter((child) => child !== null && child !== undefined && typeof child !== "boolean")
    .flatMap((child) =>
      Array.isArray(child) && (child as PromptChildArray).separator === undefined
        ? child
        : [child]
    );

  const mergedProps = {
    ...(props ?? {}),
    children: normalizedChildren.length > 0 ? normalizedChildren : props?.children,
  };

  return { type, props: mergedProps as P & { children?: PromptChild | PromptChild[] } };
}

export function render(element: PromptChild): string {
  const parts: string[] = [];
  const stack: PromptChild[] = [element];

  while (stack.length > 0) {
    const elem = stack.pop();
    if (elem === null || elem === undefined || typeof elem === "boolean") {
      continue;
    }
    if (typeof elem === "string" || typeof elem === "number") {
      parts.push(elem.toString());
    } else if (Array.isArray(elem)) {
      const separator = (elem as PromptChildArray).separator ?? "\n";
      for (let i = elem.length - 1; i >= 0; i--) {
        stack.push(elem[i]);
        if (i > 0) stack.push(separator);
      }
    } else if ("type" in elem && typeof elem.type === "function") {
      const component = elem.type as Prompt<any>;
      const result = component(elem.props);
      stack.push(result);
    }
  }

  return parts.join("");
}

export function format<P>(component: Prompt<P>, props: P): string {
  const element = createElement(component, props as P & { children?: PromptChild | PromptChild[] });
  return render(element);
}

export const Promptree = {
  createElement,
  render,
  format,
  Fragment,
};