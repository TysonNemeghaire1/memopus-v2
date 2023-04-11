import { useLayoutEffect, useState } from "react";

export function useSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1536) setIsSmall(false);
      else setIsSmall(true);
    }

    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return isSmall;
}
