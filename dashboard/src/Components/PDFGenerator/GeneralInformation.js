import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

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
  },
  row1: {
    flexDirection: "column",
    flexWrap: "wrap",
    flexBasis: 100,
  },

  row2: {
    flexDirection: "column",
    flexBasis: 160,
  },

  row3: {
    flexDirection: "column",
    flexBasis: 100,
  },
  row4: {
    flexDirection: "column",
    flexBasis: 114,
  },

  genenal: {
    fontWeight: "bold",
  },

  requestor: {
    // width: "20%",
    textAlign: "left",
    fontSize: 8,
    borderRightColor: borderColor,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    borderRightWidth: 1,
    paddingLeft: 2,
    height: 12,
  },
});

function GeneralInformation({
  requestor,
  test_type,
  product_name,
  test_description,
  department,
  cost_center,
  date,
  products,
  ex_date,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}>General Information:</Text>
      <View style={styles.tableMainContainer}>
        <View style={styles.row1}>
          <Text style={styles.requestor}>Requestor</Text>
          <Text style={styles.requestor}>Date</Text>
          <Text style={styles.requestor}>Production/Development</Text>
          <Text style={styles.requestor}>Product Name</Text>
          <Text style={styles.requestor}>Test Description</Text>
        </View>
        <View style={styles.row2}>
          <Text style={styles.requestor}>{requestor}</Text>
          <Text style={styles.requestor}>{date}</Text>
          <Text style={styles.requestor}>{test_type}</Text>
          <Text style={styles.requestor}>
            {product_name?.length > 0 && product_name?.join(" & ")}
          </Text>
          <Text style={styles.requestor}>{test_description}</Text>
        </View>
        <View style={styles.row3}>
          <Text style={styles.requestor}>Department</Text>
          <Text style={styles.requestor}>Date(resulst expected)</Text>
          <Text style={styles.requestor}>Cost Center</Text>
          <Text style={styles.requestor}>Product Specification</Text>
          <Text style={styles.requestor}>Test Instruction or WP No.</Text>
        </View>
        <View style={styles.row4}>
          <Text style={styles.requestor}>{department}</Text>
          <Text style={styles.requestor}>{ex_date}</Text>
          <Text style={styles.requestor}>{cost_center}</Text>
          <Text style={styles.requestor}>
            {products.map((item) => item.specification).join("&")}
          </Text>
          <Text style={styles.requestor}></Text>
        </View>
      </View>
    </View>
  );
}

export default GeneralInformation;
