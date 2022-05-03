import React from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 0,
    borderWidth: 1,
    borderColor: "black",
  },

  container: {
    marginTop: 10,
  },

  genenal: {
    fontWeight: "bold",
  },

  text: {
    fontSize: 7,
    paddingLeft: 8,
    paddingTop: 5,
    color: "red",
  },
});

function AdditionalInformation({ additional }) {
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}> Additional Information: </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{additional}</Text>
      </View>
    </View>
  );
}

export default AdditionalInformation;
