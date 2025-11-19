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
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: themeColors[0], // Will be overridden by themeColor
  },
  companyInfo: {
    fontSize: 9,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  workSummary: {
    fontSize: 9,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 2,
  },
  bullet: {
    width: 8,
    fontSize: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 9,
  },
});

interface ExperiencePdfProps {
  formData: FormData;
}

const ExperiencePdf = ({ formData }: ExperiencePdfProps) => {
  const parseWorkSummary = (htmlString: string) => {
    // This is a simplified parser. For complex HTML, a dedicated library would be needed.
    // It attempts to extract list items or plain text.
    const doc = new DOMParser().parseFromString(htmlString, "text/html");
    const listItems = doc.querySelectorAll("li");

    if (listItems.length > 0) {
      return Array.from(listItems).map((li, i) => (
        <View key={i} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.itemText}>{li.textContent}</Text>
        </View>
      ));
    }
    // Fallback for plain text or other HTML not parsed
    return <Text style={styles.workSummary}>{doc.body.textContent}</Text>;
  };

  return (
    <View style={styles.container}>
      {formData?.experience && formData.experience.length > 0 && (
        <>
          <Text
            style={[
              styles.heading,
              { color: formData?.themeColor || themeColors[0] },
            ]}
          >
            Professional Experience
          </Text>
          <View
            style={[
              styles.divider,
              { borderBottomColor: formData?.themeColor || themeColors[0] },
            ]}
          />

          {formData.experience.map((experience: any, index: number) => (
            <View key={index} style={styles.experienceItem}>
              <Text
                style={[
                  styles.jobTitle,
                  { color: formData?.themeColor || themeColors[0] },
                ]}
              >
                {experience?.title}
              </Text>
              <View style={styles.companyInfo}>
                <Text>
                  {experience?.companyName}
                  {experience?.companyName && experience?.city && ", "}
                  {experience?.city}
                  {experience?.city && experience?.state && ", "}
                  {experience?.state}
                </Text>
                <Text>
                  {experience?.startDate}
                  {experience?.startDate &&
                    (experience?.endDate || experience?.endDate === "") &&
                    " to "}
                  {experience?.startDate && experience?.endDate == ""
                    ? "Present"
                    : experience.endDate}
                </Text>
              </View>
              {experience?.workSummary &&
                parseWorkSummary(experience.workSummary)}
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default ExperiencePdf;
