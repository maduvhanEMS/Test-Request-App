import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: -10,
  },

  textContainer: {
    margin: "0 auto",
    marginTop: "10px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },

  requestContainer: {
    paddingLeft: "20px",
    borderBottomColor: "black",
    // backgroundColor: "#bff0fd",
    borderBottomWidth: 2,
    display: "flex",
    flexDirection: "row",
  },
  requestTitle: {
    borderBottom: "solid 3px black",
    width: "100%",
  },
});

function TestSection({ reportNo, facility, move_ticket }) {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text>{facility} Facilty</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Test Request</Text>
      </View>
      <View style={styles.requestContainer}>
        <Text style={styles.requestTitle}>Request Number: {reportNo} </Text>
        <Text style={styles.requestTitle}>
          Move Ticket Number: {move_ticket}
        </Text>
      </View>
    </>
  );
}

export default TestSection;
