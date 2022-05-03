import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Table from "../Components/Tables/Table";
import TopSecton from "../Components/TopSection/TopSecton";
import { Container } from "../globalStyles";
import ModalForm from "../Components/Modal_form/ModalForm";
import Schedule from "../Components/Forms/Schedule";
import Loader from "../Components/Loader/Loader";
import { get_requests, reset } from "../features/Tests/testSlice";
import { getAll_requests } from "../features/Tests/singleTestSlice";

const TestRequest = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState("none");
  const [data, setData] = useState([]);

  const { isLoading, testData } = useSelector((state) => state.testRequest);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const data = { status: "" };
    dispatch(get_requests(data));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (user.isAdmin) {
      return setData(testData);
    }
    if (user.name === "guest@gmail.com") {
      return setData(testData);
    }
    const filteredData = testData.filter((item) => item.user.id === user.id);
    setData(filteredData);
  }, [testData, user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* <TopSecton data="Test Requests" /> */}
      <TableContainer>
        <ButtonContainer>
          {user.isAdmin && (
            <ModalButton onClick={() => setDisplay("block")}>
              Schedule Test
            </ModalButton>
          )}
          {user.name !== "guest@gmail.com" && (
            <Button to="/testrequest">Add new request</Button>
          )}
        </ButtonContainer>
        <ModalForm display={display} setDisplay={setDisplay}>
          <Schedule setDisplay={setDisplay} />
        </ModalForm>
        <Table data={testData} currentUser={user} />
      </TableContainer>
    </Container>
  );
};

export default TestRequest;

const TableContainer = styled.div`
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  // background-color: white;
  margin: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Button = styled(Link)`
  padding: 20px;
  border: 1px solid white;
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  transition: 1s ease-out;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

const ModalButton = styled.div`
  padding: 20px;
  border: 1px solid white;
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  transition: 1s ease-out;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;
