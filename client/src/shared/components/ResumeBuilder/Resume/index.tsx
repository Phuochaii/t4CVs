"use client";

import { useAppSelector } from "../../../../utils/redux/hooks";
import { selectResume } from "../../../../utils/redux/resumeSlice";
import { selectSettings } from "../../../../utils/redux/settingsSlice";
import { useMemo, useState } from "react";
import { FlexboxSpacer } from "../FlexboxSpacer";
import { ResumeIFrameCSR } from "./ResumeIFrameCSR";
import { ResumePDF } from "./ResumePDF";
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHypenationCallback,
} from "../fonts/hooks";
import { ResumeControlBarCSR } from "./ResumeControlBarCSR";
import { usePDF } from "react-to-pdf";
import generatePDF from "react-to-pdf";

import { Button } from "@mui/material";
import { uploadFile } from "../../../../modules/upload-module";

export const Resume = () => {
  const [scale, setScale] = useState(0.8);
  const resume = useAppSelector(selectResume);
  const settings = useAppSelector(selectSettings);
  const document = useMemo(
    () => <ResumePDF resume={resume} settings={settings} isPDF={true} />,
    [resume, settings]
  );

  useRegisterReactPDFFont();
  useRegisterReactPDFHypenationCallback(settings.fontFamily);

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const handleSendToAPI = async () => {
    try {
      const document = await generatePDF(targetRef, {
        filename: `report${new Date().toISOString()}.pdf`,
        method: "build",
      });
      const base64 = document.output("datauristring");
      const byteCharacters = atob(base64.split(",")[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/pdf" });

      // Create a File object from the Blob
      const file = new File([blob], "resume.pdf", { type: "application/pdf" });

      const response = await uploadFile(file);
      console.log(response);
    } catch (error) {
      console.error("Error sending PDF to API:", error);
    }
  };

  return (
    <>
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer maxWidth={50} className="hidden md:block" />

        <div className="relative">
          <div className="flex justify-center items-center gap-4 m-4">
            <Button variant="contained" onClick={() => toPDF()} color="success">
              Tải xuống
            </Button>
            <Button
              variant="contained"
              onClick={handleSendToAPI}
              color="success"
            >
              Lưu và tải xuống
            </Button>
          </div>
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--resume-control-bar-height))] overflow-hidden md:p-[var(--resume-padding)]">
            <ResumeIFrameCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={false}
            >
              <div ref={targetRef}>
                <ResumePDF resume={resume} settings={settings} isPDF={false} />
              </div>
            </ResumeIFrameCSR>
          </section>
          <ResumeControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={resume.profile.name + " - Resume"}
          />
        </div>
      </div>
    </>
  );
};
