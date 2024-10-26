import { useState, useEffect } from "react";

function getDocumentDimensions() {
  const { offsetWidth: width, offsetHeight: height } = window.document.body;
  return {
    width,
    height,
  };
}

export default function useDocumentDimensions() {
  const [documentDimensions, setDocumentDimensions] = useState(
    getDocumentDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setDocumentDimensions(getDocumentDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return documentDimensions;
}
