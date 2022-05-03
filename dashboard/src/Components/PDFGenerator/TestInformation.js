import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  tableMainContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderTopColor: "black",
    borderLeftColor: "black",
    width: 260,
  },
  row1: {
    flexDirection: "column",
    flexWrap: "wrap",
    flexBasis: 100,
  },

  row2: {
    flexDirection: "column",
    flexBasis: 159,
    textAlign: "left",
  },

  genenal: {
    fontWeight: "bold",
  },

  requestor: {
    textAlign: "left",
    fontSize: 8,
    borderRightColor: borderColor,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 2,
    height: 12,
  },

  results: {
    textAlign: "center",
    fontSize: 8,
    borderRightColor: borderColor,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 2,
    height: 12,
  },
});

function TestInformation({ tests }) {
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}> Test(s) Required: </Text>
      <View style={styles.tableMainContainer}>
        <View style={styles.row1}>
          {tests?.map((item) => {
            return <Text style={styles.requestor}>{Object.keys(item)[0]}</Text>;
          })}
        </View>
        <View style={styles.row2}>
          {tests?.map((item) => {
            return (
              <Text style={styles.results}>
                {Object.values(item)[0] ? "X" : ""}
              </Text>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default TestInformation;
