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
  skillsGrid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    justifyContent: "space-between", // Adjust as needed
  },
  skillItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "48%", // Approximately two columns
    marginBottom: 8,
  },
  skillName: {
    fontSize: 9,
    width: "30%", // Adjust based on desired layout
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#E5E7EB", // gray-200
    borderRadius: 9999, // rounded-full
    width: "65%", // Adjust based on desired layout
    marginLeft: 5,
  },
  progressBar: {
    height: "100%",
    borderRadius: 9999, // rounded-full
  },
});

interface SkillsPdfProps {
  formData: FormData;
}

const SkillsPdf = ({ formData }: SkillsPdfProps) => {
  return (
    <View style={styles.container}>
      {formData?.skills && formData.skills.length > 0 && (
        <>
          <Text
            style={[
              styles.heading,
              { color: formData?.themeColor || themeColors[0] },
            ]}
          >
            Skill{formData?.skills.length > 1 ? "s" : ""}
          </Text>
          <View
            style={[
              styles.divider,
              { borderBottomColor: formData?.themeColor || themeColors[0] },
            ]}
          />

          <View style={styles.skillsGrid}>
            {formData.skills.map((skill: any, index: number) => (
              <View key={index} style={styles.skillItem}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        backgroundColor:
                          formData?.themeColor || themeColors[0],
                        width: (skill?.rating || 0) * 20 + "%",
                      },
                    ]}
                  ></View>
                </View>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default SkillsPdf;
