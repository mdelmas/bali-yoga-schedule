// import useEventListener from "hooks/useEventListener";
import { useCallback, useEffect, useState } from "react";

const useElementDimensions = ({
  ref,
}: {
  ref: React.RefObject<HTMLElement>;
}) => {
  const [dimensions, setDimensions] = useState<DOMRect | null>(null);

  const refresh = useCallback(() => {
    const domRect = ref.current?.getBoundingClientRect();
    if (domRect) {
      setDimensions(domRect);
    }
  }, [ref]);

  window.addEventListener("resize", refresh);
  window.addEventListener("scroll", refresh, true);

  useEffect(() => {
    refresh();
  }, [refresh, ref]);

  return {
    dimensions: dimensions
      ? { width: dimensions.width, height: dimensions.height }
      : null,
    ref,
  };
};

export default useElementDimensions;
