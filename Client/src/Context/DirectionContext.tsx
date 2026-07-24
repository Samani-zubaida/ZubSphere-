import { createContext, useContext } from "react";

// Broadcasts the current scroll-navigation direction (1 = forward,
// -1 = backward) down to whatever page is currently rendering, WITHOUT
// needing to prop-drill it through every page component's signature.
const DirectionContext = createContext<number>(1);

export const DirectionProvider = DirectionContext.Provider;

export function useDirection(): number {
  return useContext(DirectionContext);
}