import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";
import { FormData } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "medium",
    marginBottom: 5,
  },
  address: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 5,
  },
  contactInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  contactText: {
    fontSize: 10,
  },
  divider: {
    borderBottomWidth: 1.5,
    marginTop: 8,
    marginBottom: 20,
  },
});

interface PersonalDetailsPdfProps {
  formData: FormData;
}

const PersonalDetailsPdf = ({ formData }: PersonalDetailsPdfProps) => {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.name,
          { color: formData?.themeColor || themeColors[0] },
        ]}
      >
        {formData?.firstName} {formData?.lastName}
      </Text>

      <Text style={styles.jobTitle}>{formData?.jobTitle}</Text>

      <Text
        style={[
          styles.address,
          { color: formData?.themeColor || themeColors[0] },
        ]}
      >
        {formData?.address}
      </Text>

      <View style={styles.contactInfo}>
        <Text
          style={[
            styles.contactText,
            { color: formData?.themeColor || themeColors[0] },
          ]}
        >
          {formData?.phone}
        </Text>

        <Text
          style={[
            styles.contactText,
            { color: formData?.themeColor || themeColors[0] },
          ]}
        >
          {formData?.email}
        </Text>
      </View>

      <View
        style={[
          styles.divider,
          { borderBottomColor: formData?.themeColor || themeColors[0] },
        ]}
      />
    </View>
  );
};

export default PersonalDetailsPdf;
