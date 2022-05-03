import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditTestForm from "../Forms/EditForm";
import Tab from "./Tab";
import { useSelector, useDispatch } from "react-redux";
import { fetchFacilities } from "../../features/facility/facilitySlice";
import Loader from "../Loader/Loader";
import { fetchDepartments } from "../../features/department/departmentSlice";
import TestRequest from "../Forms/TestRequest";

const Tabs = () => {
  const [currentForm, setCurrentForm] = useState("Closed Vessel");
  const [id, setId] = useState(1);
  const [dept, setDept] = useState({});
  const [number, setNumber] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFacilities());
    dispatch(fetchDepartments());
  }, [dispatch]);

  const [currentData, setCurrentData] = useState([]);

  const { facilities, isLoading, isSuccess } = useSelector(
    (state) => state.facilities
  );
  const { departments } = useSelector((state) => state.departments);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (facilities && isSuccess) {
      const filterData = facilities?.find((item) => {
        return item.id === id;
      });

      setCurrentData(filterData);
      setId(filterData?.id);
    }
    setDept(departments);
  }, [id, facilities, isSuccess, departments]);

  const active = {
    backgroundColor: "blue",
    color: "white",
    borderRadius: "20px",
  };

  const notActive = {};

  if (isLoading) {
    return (
      <div style={{ height: "80vh", alignItems: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <Container>
      <CardContainer>
        {facilities?.map((item, index) => {
          const { facility_name, id } = item;
          return (
            <Tab
              style={number === index ? active : notActive}
              key={index}
              name={facility_name}
              id={id}
              setId={setId}
              index={index}
              setNumber={setNumber}
            />
          );
        })}
      </CardContainer>
      <TestRequest
        data={currentData}
        loading={isLoading}
        id={id}
        departments={dept}
        user={user}
      />
    </Container>
  );
};

export default Tabs;

const Container = styled.div`
  margin: 0 auto;
  padding: 20px 30px;
  align-items: center;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  justify-content: space-even;
`;
