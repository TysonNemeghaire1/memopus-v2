import { useLayoutEffect, useState } from "react";

const enum Breakpoints {
  SM = 640,
  MD = 768,
  LG = 1024,
  XL = 1280,
  XL2 = 1536,
}

/**
 * Renvoi TRUE si l'écran est en dessous d'un breakpoint défini sinon renvoi FALSE
 */
export function useSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > Breakpoints.XL) setIsSmall(false);
      else setIsSmall(true);
    }

    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return isSmall;
}
