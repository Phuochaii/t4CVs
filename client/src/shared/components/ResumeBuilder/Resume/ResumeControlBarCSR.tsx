"use client";

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useSetDefaultScale } from "./hooks";
import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import React, { Suspense, lazy } from "react";

// Sử dụng React.lazy để lazy load component ResumeControlBar
const ResumeControlBar = lazy(() => import("./ResumeControlBar"));

export const ResumeControlBarCSR = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number;
  setScale: (scale: number) => void;
  documentSize: string;
  document: JSX.Element;
  fileName: string;
}) => {
  const { setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  });

  const [instance, update] = usePDF({ document });

  useEffect(() => {
    update(document);
  }, [update, document]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResumeControlBar
        scale={scale}
        setScale={setScale}
        documentSize={documentSize}
        document={document}
        fileName={fileName}
      />
    </Suspense>
  );
};
