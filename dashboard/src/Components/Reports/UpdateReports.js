import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TopSecton from "../TopSection/TopSecton";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CompleteSchedule from "../Tables/CompleteSchedule";
import { get_requests } from "../../features/Tests/singleTestSlice";
import Loader from "../Loader/Loader";

const UpdateReports = () => {
  const params = useParams();
  const testRequestId = params.testId;

  const dispatch = useDispatch();

  const { isLoading, testInfo } = useSelector(
    (state) => state.singleTestRequest
  );

  useEffect(() => {
    dispatch(get_requests(testRequestId));
  }, [dispatch, testRequestId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <TableContainer>
      <Table>
        <div style={{ marginBottom: "20px" }}>
          {/* <TopSecton data="Upload Reports" /> */}
        </div>
        <CompleteSchedule data={testInfo} />
      </Table>
    </TableContainer>
  );
};

export default UpdateReports;

const TableContainer = styled.div`
  top: 0;
  flex: 4;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  margin: 0 auto;
`;

const Table = styled.div`
  margin: 0 auto;
  justfy-content: center;
  padding: 20px 30px;
`;

const Button = styled.div``;
