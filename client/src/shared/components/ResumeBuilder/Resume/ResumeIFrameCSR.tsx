import React, { Suspense, lazy } from "react";

// Lazy load ResumeIFrame component
const ResumeIFrame = lazy(() => import("./ResumeIFrame"));

export const ResumeIFrameCSR = ({
  documentSize,
  scale,
  children,
  enablePDFViewer,
}: {
  documentSize: string;
  scale: number;
  children: React.ReactNode;
  enablePDFViewer?: boolean;
}) => (
  <Suspense fallback={<div>Loading...</div>}>
    <ResumeIFrame
      documentSize={documentSize}
      scale={scale}
      enablePDFViewer={enablePDFViewer}
    >
      {children}
    </ResumeIFrame>
  </Suspense>
);
