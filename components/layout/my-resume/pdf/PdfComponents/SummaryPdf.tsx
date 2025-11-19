import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormData } from "@/lib/context/FormProvider";

const styles = StyleSheet.create({
  summaryText: {
    fontSize: 10,
    textAlign: "justify",
    marginBottom: 10,
  },
});

interface SummaryPdfProps {
  formData: FormData;
}

const SummaryPdf = ({ formData }: SummaryPdfProps) => {
  return (
    <View>
      {formData?.summary && (
        <Text style={styles.summaryText}>{formData.summary}</Text>
      )}
    </View>
  );
};

export default SummaryPdf;
