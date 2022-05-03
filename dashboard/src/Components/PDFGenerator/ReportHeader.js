import React from "react";
import { View, Text, StyleSheet, Image } from "@react-pdf/renderer";
import logo from "../../Assets/images/rdm.png";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  reportTitle: {
    color: "black",
    fontWeight: "bold",
    // letterSpacing: 4,
    fontSize: 20,
    textAlign: "center",
    textTransform: "uppercase",
  },

  logo: {
    width: 150,
    height: 40,
    marginLeft: "auto",
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
  },
  requestTitle: {
    borderBottom: "solid 3px black",
    width: "100%",
  },
});

function ReportHeader() {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.reportTitle}>N25 Test Facility</Text>
        <Image src={logo} style={styles.logo} />
      </View>
    </>
  );
}

export default ReportHeader;
