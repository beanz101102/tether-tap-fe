import { useState, useEffect, useMemo } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    // Call handleResize immediately to set initial size
    handleResize();

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = useMemo(() => windowSize?.width < 640, [windowSize?.width]);

  return {
    ...windowSize,
    isMobile,
  };
}
