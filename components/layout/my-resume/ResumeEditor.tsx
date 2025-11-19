"use client";

import { FormProvider } from "@/lib/context/FormProvider";
import React from "react";
import ResumeEditForm from "./ResumeEditForm";
import ResumePreview from "./ResumePreview";
import { PDFViewer } from "@react-pdf/renderer";
import ResumePdfDocument from "./pdf/ResumePdfDocument";
import { useFormContext } from "@/lib/context/FormProvider";

const ResumeEditor = ({
  params,
  userId,
}: {
  params: { id: string };
  userId: string | undefined;
}) => {
  if (!userId) {
    return null;
  }

  const { formData } = useFormContext();

  return (
    <FormProvider params={params}>
      <div className="p-10 max-sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-center items-start pb-16 max-sm:pb-8">
          <ResumeEditForm params={params} userId={userId} />
          <PDFViewer width="100%" height="600px" className="rounded-lg">
            <ResumePdfDocument formData={formData} />
          </PDFViewer>
        </div>
      </div>
    </FormProvider>
  );
};

export default ResumeEditor;
