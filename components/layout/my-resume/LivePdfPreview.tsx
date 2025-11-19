"use client";

import React, { useMemo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useFormContext } from "@/lib/context/FormProvider";
import ResumePdfDocument from "./pdf/ResumePdfDocument";

const LivePdfPreview = () => {
  const { formData } = useFormContext();

  const memoizedPdf = useMemo(
    () => <ResumePdfDocument formData={formData} />,
    [formData]
  );

  return (
    <PDFViewer width="100%" height="600px" className="rounded-lg">
      {memoizedPdf}
    </PDFViewer>
  );
};

export default LivePdfPreview;
