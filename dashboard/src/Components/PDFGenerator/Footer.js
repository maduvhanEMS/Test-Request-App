import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "black",
  },

  container: {
    marginTop: 10,
  },

  general: {
    fontWeight: "bold",
  },

  text: {
    fontSize: 8,
    padding: 8,
    paddingTop: 5,
  },
});

function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.general}> Product and test safety declaration: </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          I declare that Regulation 2.7(f) of the Explosive act is in place and
          that all preparations is done according to standard procedures (or the
          attached work program), furthermore the product is safe for handling,
          preparation and testing as described.
        </Text>
      </View>
      {/* <View>
        <Text>Maduvha</Text>
        <Text>Technical Manager</Text>
      </View> */}
    </View>
  );
}

export default Footer;
