import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { FormData } from "@/lib/context/FormProvider";
import PersonalDetailsPdf from "./PdfComponents/PersonalDetailsPdf";
import SummaryPdf from "./PdfComponents/SummaryPdf";
import ExperiencePdf from "./PdfComponents/ExperiencePdf";
import EducationalPdf from "./PdfComponents/EducationalPdf";
import SkillsPdf from "./PdfComponents/SkillsPdf";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

interface ResumePdfDocumentProps {
  formData: FormData;
}

// Create Document Component
const ResumePdfDocument = ({ formData }: ResumePdfDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <PersonalDetailsPdf formData={formData} />
        <SummaryPdf formData={formData} />
        <ExperiencePdf formData={formData} />
        <EducationalPdf formData={formData} />
        <SkillsPdf formData={formData} />
      </View>
    </Page>
  </Document>
);

export default ResumePdfDocument;
