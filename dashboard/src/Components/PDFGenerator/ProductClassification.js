import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";

const borderColor = "black";
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    maxWidth: "60%",
  },

  genenal: {
    fontWeight: "bold",
  },
  headers: {
    flexDirection: "row",
    borderBottomColor: "black",
    backgroundColor: "black",
    borderBottomWidth: 1,
    alignItems: "center",
    height: 18,
    textAlign: "center",
    fontStyle: "bold",
    flexGrow: 1,
    color: "white",
  },

  row: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    fontStyle: "bold",
  },
  description: {
    width: "60%",
    textAlign: "left",
    fontSize: 8,
    borderRightColor: borderColor,
    borderRightWidth: 1,
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
    fontSize: 8,
    textAlign: "center",
    paddingLeft: 8,
  },
});

function ProductClassification({ products, exp_class, group }) {
  const safety = [
    {
      name: "S365",
      description: 1.3,
      asnwer: "C",
    },
    {
      name: "S265",
      description: 1.3,
      asnwer: "C",
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}> Product Classification: </Text>
      <View style={styles.headers}>
        <Text style={styles.description}>Product</Text>
        <Text style={styles.other}>Class</Text>
        <Text style={styles.answer}>Group</Text>
      </View>

      {products?.map((item, index) => (
        <View style={styles.row}>
          <Text style={styles.description}>{item}</Text>
          <Text style={styles.other}>
            {exp_class?.length > 0 && exp_class[index]}
          </Text>
          <Text style={styles.answer}>{group?.length > 0 && group[index]}</Text>
        </View>
      ))}
    </View>
  );
}

export default ProductClassification;
