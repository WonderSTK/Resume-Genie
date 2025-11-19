import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormData } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  heading: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 10,
    marginBottom: 5,
  },
  divider: {
    borderBottomWidth: 1.5,
    marginBottom: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  universityName: {
    fontSize: 10,
    fontWeight: "bold",
    color: themeColors[0], // Will be overridden by themeColor
  },
  degreeInfo: {
    fontSize: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  description: {
    fontSize: 9,
    textAlign: "justify",
  },
});

interface EducationalPdfProps {
  formData: FormData;
}

const EducationalPdf = ({ formData }: EducationalPdfProps) => {
  return (
    <View style={styles.container}>
      {formData?.education && formData.education.length > 0 && (
        <>
          <Text
            style={[
              styles.heading,
              { color: formData?.themeColor || themeColors[0] },
            ]}
          >
            Education
          </Text>
          <View
            style={[
              styles.divider,
              { borderBottomColor: formData?.themeColor || themeColors[0] },
            ]}
          />

          {formData.education.map((education: any, index: number) => (
            <View key={index} style={styles.educationItem}>
              <Text
                style={[
                  styles.universityName,
                  { color: formData?.themeColor || themeColors[0] },
                ]}
              >
                {education.universityName}
              </Text>
              <View style={styles.degreeInfo}>
                <Text>
                  {education?.degree}
                  {education?.degree && education?.major && " in "}
                  {education?.major}
                </Text>
                <Text>
                  {education?.startDate}
                  {education?.startDate &&
                    (education?.endDate || education?.endDate === "") &&
                    " to "}
                  {education?.startDate && education?.endDate == ""
                    ? "Present"
                    : education.endDate}
                </Text>
              </View>
              {education?.description && (
                <Text style={styles.description}>{education.description}</Text>
              )}
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default EducationalPdf;
