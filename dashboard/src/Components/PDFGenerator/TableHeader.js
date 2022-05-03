import React from "react";
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const borderColor = "#90e5fc";

function TableHeader({ headers, facility_name, development }) {
  const height = facility_name?.toLowerCase().includes("combustible")
    ? "30px"
    : 18;
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      borderBottomColor: "black",
      backgroundColor: "black",
      borderBottomWidth: 1,
      alignItems: "center",
      height: height,
      textAlign: "center",
      fontStyle: "bold",
      flexGrow: 1,
      color: "white",
    },
    description: {
      width: "40%",
      fontSize: 9,
      borderRightColor: "black",
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    other: {
      width: "20%",
      height: "100%",
      justifyContent: "center",
      fontSize: 8,
      borderRightColor: "black",
      borderRightWidth: 1,
      paddingRight: 8,
    },
  });
  return (
    <View style={styles.container}>
      {headers?.map((item) => {
        return (
          <>
            {development === "Development" && item === "Batch No." ? (
              ""
            ) : (
              <Text
                style={
                  item.headerName === "Description"
                    ? styles.description
                    : styles.other
                }
              >
                {item.headerName}
              </Text>
            )}
          </>
        );
      })}
    </View>
  );
}

export default TableHeader;
