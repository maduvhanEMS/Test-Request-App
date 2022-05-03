import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PDFViewer } from "@react-pdf/renderer";
import Template from "../Components/PDFGenerator/Template";

import Loader from "../Components/Loader/Loader";
import { get_requests, reset } from "../features/Tests/singleTestSlice";

import { getFacility } from "../features/facility/facilitySlice";
import { getProductsByName } from "../features/products/productSlice";

function PDFViewerPage() {
  const [safetyData, setSafetyData] = useState([]);

  const dispatch = useDispatch();
  const params = useParams();
  const testRequestId = params.testRequestId;

  const { isLoading, testInfo } = useSelector(
    (state) => state.singleTestRequest
  );

  const { facilities } = useSelector((state) => state.facilities);
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(get_requests(testRequestId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, testRequestId]);

  useEffect(() => {
    if (testInfo?.facilityId) {
      dispatch(getFacility(testInfo?.facilityId));
    }

    if (testInfo?.products?.length > 0) {
      dispatch(getProductsByName(JSON.stringify(testInfo.products)));
    }
  }, [dispatch, testInfo.facilityId, testInfo.products]);

  useEffect(() => {
    setSafetyData(facilities);
  }, [facilities]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <PDFViewer
      width="1200"
      height="1000"
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        marginTop: "80px",
      }}
    >
      <Template data={testInfo} safetyData={safetyData} products={products} />
    </PDFViewer>
  );
}

export default PDFViewerPage;
