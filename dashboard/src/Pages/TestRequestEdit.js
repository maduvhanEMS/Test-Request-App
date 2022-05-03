import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import EditTestForm from "../Components/Forms/EditForm";
import Loader from "../Components/Loader/Loader";
import { get_requests, reset } from "../features/Tests/singleTestSlice";

import { fetchDepartments } from "../features/department/departmentSlice";

function TestRequestEdit() {
  const dispatch = useDispatch();
  const params = useParams();

  const testRequestId = params.testRequestId;

  const { isLoading, testInfo } = useSelector(
    (state) => state.singleTestRequest
  );

  const { departments } = useSelector((state) => state.departments);

  useEffect(() => {
    dispatch(get_requests(testRequestId));
    dispatch(fetchDepartments());

    return () => {
      dispatch(reset());
    };
  }, [dispatch, testRequestId]);

  if (isLoading) {
    return <Loader />;
  }

  // get test request by Id
  return (
    <Container>
      <EditTestForm test={testInfo} departments={departments} />
    </Container>
  );
}

export default TestRequestEdit;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px 20px;
  align-items: center;
`;
