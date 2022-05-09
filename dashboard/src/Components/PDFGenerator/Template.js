import { Document, Page, StyleSheet, View, Text } from "@react-pdf/renderer";
import ReportHeader from "./ReportHeader";
import TestSection from "./TestSection";
import GeneralInformation from "./GeneralInformation";
import TestInformation from "./TestInformation";
import Table from "./Table";
import AdditionalInformation from "./AdditionalInformation";
import SafetyAnalyis from "./SafetyAnalysis";
import ProductClassification from "./ProductClassification";
import Footer from "./Footer";
import moment from "moment";
import Sign from "./Sign";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 30,
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 60,
    lineHeight: 1.5,
    flexDirection: "column",
  },
  logo: {
    width: 150,
    height: 66,
    marginLeft: "auto",
  },

  row: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },

  safety: {
    color: "red",
    marginTop: 10,
    fontSize: 10,
  },

  sign: {
    marginTop: 10,
    paddingTop: 10,
  },
});

function Template({ data, safetyData, products }) {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <ReportHeader />
        <TestSection
          reportNo={data?.reportNo}
          facility={data?.test?.facility_name}
          move_ticket={
            data?.testSchedule?.length > 0 && data.testSchedule[0].move_ticket
          }
        />
        <GeneralInformation
          requestor={data?.user?.username}
          test_type={data?.test_type}
          product_name={data?.products}
          test_description={data?.test_description}
          department={data?.department?.department_name}
          cost_center={
            data?.development?.length > 0
              ? data?.development[0]?.cost_center
              : ""
          }
          ex_date={
            data?.testSchedule?.length > 0 && data.testSchedule[0].expected_date
          }
          date={moment(data?.createdAt).format("LL")}
          products={products}
        />
        <TestInformation tests={data?.tests?.map((item) => JSON.parse(item))} />
        {data?.closed_vessel ? (
          <View style={{ marginTop: "10px" }}>
            <Text>
              Already fired in the closed vessel ? {data?.closed_vessel}
            </Text>
          </View>
        ) : (
          <View></View>
        )}

        <View style={styles.row}>
          <Table
            test_information={data?.test_information}
            headers={
              safetyData?.header?.length > 0
                ? safetyData?.header[0]?.name?.map((item) => JSON.parse(item))
                : []
            }
            facility_name={data?.test?.facility_name}
            CC_info={data?.CC_info}
            development={data?.test_type}
          />
        </View>

        <View>
          <AdditionalInformation additional={data?.additional} />
        </View>

        {data?.test_type === "Development" && (
          <>
            <View>
              <Text style={styles.safety}>
                The following section is only required for developments tests
                and must be completed by development scientiest
              </Text>
            </View>
            <SafetyAnalyis
              safety={
                data?.development?.length > 0
                  ? data?.development[0]?.safety?.map((item) =>
                      JSON.parse(item)
                    )
                  : []
              }
              facility={
                safetyData?.safety?.length > 0
                  ? safetyData?.safety[0]?.name?.map((item) => JSON.parse(item))
                  : []
              }
            />
            <ProductClassification
              products={data?.products}
              exp_class={
                data?.development?.length > 0
                  ? data?.development[0]?.exp_class
                  : []
              }
              group={
                data?.development?.length > 0 ? data?.development[0]?.group : []
              }
            />
            <Footer />
          </>
        )}
        <Sign development={data?.test_type} />
      </Page>
    </Document>
  );
}

export default Template;
