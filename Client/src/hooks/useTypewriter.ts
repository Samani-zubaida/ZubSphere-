import { useEffect, useRef, useState } from "react";

/**
 * Reveals `text` character by character. Pass `active=false` to render
 * the full text instantly — used for messages that already finished
 * typing, so scrolling/re-renders never retype old messages.
 */
export const useTypewriter = (text: string, active: boolean, speed = 16) => {
  const [displayed, setDisplayed] = useState(active ? "" : text);
  const [done, setDone] = useState(!active);
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);
    indexRef.current = 0;

    const id = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(id);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  return { displayed, done };
};