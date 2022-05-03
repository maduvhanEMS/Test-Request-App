import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 16,
    fontStyle: "bold",
  },
  description: {
    width: "40%",
    textAlign: "left",
    fontSize: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
    paddingLeft: 8,
  },

  other: {
    width: "25%",
    fontSize: 8,
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },

  empty: {
    width: "25%",
    fontSize: 8,
    color: "white",
    textAlign: "center",
    borderRightColor: borderColor,
    borderRightWidth: 1,
  },
});

function TableRows({ test_information, facility_name, development }) {
  const rows = test_information?.map((item) => (
    <View style={styles.row}>
      <Text style={styles.other}>
        {item.number > 0 ? item.description + item.number : item.description}
      </Text>
      {development !== "Development" && (
        <Text style={styles.other}>{item.batch_no}</Text>
      )}
      <Text style={styles.other}>
        {facility_name.toLowerCase().includes("flare")
          ? item.sample
          : facility_name.toLowerCase().includes("metrology")
          ? item.sample
          : item.reference_lot}
      </Text>
      <Text style={styles.other}>
        {facility_name.toLowerCase().includes("metrology")
          ? item.condition
          : item.sample}
      </Text>
      <Text style={styles.other}>
        {facility_name.toLowerCase().includes("metrology")
          ? item.details
          : item.condition}
      </Text>
    </View>
  ));

  return (
    <>
      {rows}
      <View style={styles.row}>
        <Text style={styles.empty}>"</Text>
        {development !== "Development" && <Text style={styles.empty}>"</Text>}
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
      </View>
    </>
  );
}

export default TableRows;
