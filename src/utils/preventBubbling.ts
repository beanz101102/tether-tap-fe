import { SyntheticEvent } from "react";

export function preventBubbling(
  callback?: ((...args: never[]) => unknown) | null,
  noPreventDefault?: boolean,
) {
  return (e: SyntheticEvent): void => {
    e.stopPropagation();
    try {
      e.nativeEvent?.stopImmediatePropagation();
      e.nativeEvent?.stopPropagation();
    } catch (e) {
      console.error(e);
    }
    (e.currentTarget as any).blur();

    if (!noPreventDefault) {
      e.preventDefault();
    }
    if (callback) callback();
  };
}
