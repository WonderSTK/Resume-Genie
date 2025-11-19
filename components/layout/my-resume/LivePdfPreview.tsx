"use client";

import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useFormContext } from "@/lib/context/FormProvider";
import ResumePdfDocument from "./pdf/ResumePdfDocument";

const LivePdfPreview = () => {
  const { formData } = useFormContext();

  return (
    <PDFViewer width="100%" height="600px" className="rounded-lg">
      <ResumePdfDocument formData={formData} />
    </PDFViewer>
  );
};

export default LivePdfPreview;
