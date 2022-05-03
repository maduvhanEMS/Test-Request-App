import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    display: "flex",
    flexDirection: "row",
  },

  contentContainer: {
    display: "flex",
    flexDirection: "row",
  },

  underline: {
    width: "130px",
    textAlign: "left",
    fontSize: 8,
    borderBottomColor: borderColor,
    borderBottomWidth: 1,
    paddingLeft: 8,
  },

  N25: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
  },
});

function Sign({ development }) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text>
            {development === "Development"
              ? "Development Manager:"
              : "Production Supervisor:"}
          </Text>
          <Text style={styles.underline}>Maduvha Nemadandila</Text>

          <View style={styles.contentContainer}>
            <Text>Test Officer: </Text>
            <Text style={styles.underline}>Maduvha Nemadandila</Text>
          </View>
        </View>
      </View>
      {development === "Development" && (
        <View style={styles.N25}>
          <Text style={{ marginRight: 5 }}>N25 Facility Manager: </Text>
          <Text style={styles.underline}>Maduvha Nemadandila</Text>
        </View>
      )}
    </View>
  );
}

export default Sign;
