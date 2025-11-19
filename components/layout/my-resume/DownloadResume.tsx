"use client";

import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { useFormContext } from "@/lib/context/FormProvider";
import ResumePdfDocument from "./pdf/ResumePdfDocument";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const DownloadResume = () => {
  const { formData } = useFormContext();

  return (
    <PDFDownloadLink
      document={<ResumePdfDocument formData={formData} />}
      fileName={`${formData?.firstName || "resume"}_${
        formData?.lastName || ""
      }.pdf`}
    >
      {({ loading }) => (
        <Button
          className="flex px-12 py-6 gap-2 rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-700/30 text-white"
          disabled={loading}
        >
          <DownloadIcon className="size-6" />{" "}
          {loading ? "Loading document..." : "Download"}
        </Button>
      )}
    </PDFDownloadLink>
  );
};

export default DownloadResume;
