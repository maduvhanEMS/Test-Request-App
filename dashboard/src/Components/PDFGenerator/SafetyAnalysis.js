import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const borderColor = "black";
const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    borderWidth: 1,
    borderColor: "black",
    marginRight: 10,
  },

  container: {
    marginTop: 10,
  },

  genenal: {
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    padding: " 2px 0",
    alignItems: "center",
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    fontSize: 8,
    borderRightColor: borderColor,
    borderRightWidth: 0.5,
    paddingLeft: 8,
  },

  other: {
    width: "20%",
    fontSize: 8,
    textAlign: "left",
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },

  answer: {
    width: "20%",
    fontSize: 7,
    textAlign: "center",
    paddingLeft: 8,
  },
});

function SafetyAnalyis({ safety, facility }) {
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}> Safety Analysis: </Text>

      {facility?.map((item, index) => (
        <View style={styles.row}>
          <Text style={styles.other}>{item.safetyName}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.answer}>
            {safety?.length > 0 && safety[index][item.safetyName].toUpperCase()}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default SafetyAnalyis;
