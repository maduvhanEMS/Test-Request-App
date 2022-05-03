import { View, Text, StyleSheet } from "@react-pdf/renderer";
import React from "react";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import TableBlankSpace from "./TableBlankSpace";
import TableRowsCC from "./TableRowsCC";

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
    maxWidth: "100%",
  },

  genenal: {
    fontWeight: "bold",
  },
});

function Table({
  test_information,
  headers,
  facility_name,
  CC_info,
  development,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.genenal}> Test Information: </Text>
      <View style={styles.tableContainer}>
        <TableHeader
          headers={headers}
          facility_name={facility_name}
          development={development}
        />
        {facility_name?.toLowerCase().includes("combustible") ? (
          <TableRowsCC test_information={CC_info} />
        ) : (
          <TableRows
            test_information={test_information}
            facility_name={facility_name}
            development={development}
          />
        )}

        <TableBlankSpace />
      </View>
    </View>
  );
}

export default Table;
