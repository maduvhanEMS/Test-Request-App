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

function TableRowsCC({ test_information }) {
  const rows = test_information?.map((item) => {
    const {
      CCC_Slurry_Batch_No,
      CCC_No,
      Coating_date,
      Coating_venue,
      Coating_number,
      Coating_mass,
      CC_type,
      Marked,
      Dry_mass,
    } = item;
    return (
      <View style={styles.row}>
        <Text style={styles.other}>{CCC_Slurry_Batch_No}</Text>
        <Text style={styles.other}>{CCC_No}</Text>
        <Text style={styles.other}>{Coating_date}</Text>
        <Text style={styles.other}>{Coating_venue}</Text>
        <Text style={styles.other}>{Coating_number}</Text>
        <Text style={styles.other}>{Coating_mass}</Text>
        <Text style={styles.other}>{Marked}</Text>
        <Text style={styles.other}>{Dry_mass}</Text>
      </View>
    );
  });

  return (
    <>
      {rows}
      <View style={styles.row}>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
        <Text style={styles.empty}>"</Text>
      </View>
    </>
  );
}

export default TableRowsCC;
