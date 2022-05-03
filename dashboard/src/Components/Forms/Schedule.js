import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FieldControl } from "./Styles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getTestSchedule,
  resetTestsSchedule,
  updateTestSchedule,
  resetTestsScheduleUpadte,
} from "../../features/testSchedule/testScheduleSlice";
import { getAll_requests } from "../../features/Tests/singleTestSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { fetchFacilities } from "../../features/facility/facilitySlice";

const Schedule = ({ setDisplay }) => {
  const [initialState, setInitalState] = useState({
    question: "",
    id: "",
    title: "",
    start: "",
    status: "",
  });

  const dispatch = useDispatch();

  const currentTime = new Date();

  const navigate = useNavigate();

  const { facilities } = useSelector((state) => state.facilities);
  const { isUpdated } = useSelector((state) => state.schedule);

  const { testInfo, isLoading } = useSelector(
    (state) => state.singleTestRequest
  );

  const [formData, setFormData] = useState("");

  useEffect(() => {
    if (testInfo?.length > 0) {
      const filteredData = testInfo?.find(
        (item) => item.reportNo === initialState.id
      );

      if (
        filteredData?.status === "In Progress" ||
        filteredData?.status === "Completed"
      ) {
      } else {
        setFormData(filteredData);
      }

      if (filteredData) {
        navigate(
          `?facilityId=${filteredData?.test?.facility_name}&id=${initialState.id}`
        );
      }
    }
  }, [initialState, testInfo, navigate]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(fetchFacilities());
    dispatch(getAll_requests({ facilityId: initialState.title }));
    dispatch(getTestSchedule());
    dispatch(resetTestsSchedule());
    if (isUpdated) {
      toast.success("Successfully updated");
      navigate("/product?page=1");
      setDisplay("none");
      setFormData("");
      dispatch(resetTestsScheduleUpadte());
    }
  }, [dispatch, initialState.title, isUpdated, navigate, setDisplay]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitalState({ ...initialState, [name]: value });
  };

  const onSubmit = (data) => {
    const testData = {
      reportNo: initialState.id,
      start: initialState.start,
      status: "In Progress",
    };
    dispatch(updateTestSchedule(testData));
    setInitalState({ question: "", id: "", title: "", start: "" });
  };

  const style = { minWidth: "125px", fontSize: "16px", fontWeight: "500" };

  const loader = () => {
    return <div className="loader"></div>;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <TextContainer>Do you know the test ID?</TextContainer>
        <FieldControl>
          <select
            value={initialState.question}
            {...register("question", {
              requried: true,
              onChange: (e) => {
                handleChange(e);
              },
            })}
          >
            <option value="">Please select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FieldControl>
      </Container>
      {initialState.question === "yes" && (
        <Container>
          <TextContainer>
            <label>Please enter test request ID: </label>
          </TextContainer>
          <FieldControl>
            <input
              value={initialState.id}
              {...register("id", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
              })}
            />
          </FieldControl>
        </Container>
      )}

      {formData && initialState.question === "yes" && (
        <Container>
          {" "}
          <FieldControl>
            <input
              type="datetime-local"
              {...register("start", {
                requried: true,
                onChange: (e) => {
                  handleChange(e);
                },
              })}
              min={currentTime}
            />
          </FieldControl>
        </Container>
      )}
      <Container>
        {initialState.id !== "" &&
        formData === "" &&
        initialState.question === "yes"
          ? loader()
          : ""}
      </Container>
      {formData && initialState.question === "yes" && (
        <Container>
          {" "}
          <Button type="submit">Schedule a test</Button>
        </Container>
      )}
      {initialState.question === "no" && (
        <Container>
          <TextContainer>
            {" "}
            <label htmlFor="facility" style={style}>
              Please select facility <span style={{ color: "red" }}>*</span>
            </label>
          </TextContainer>
          <FieldControl>
            <select
              value={initialState.title}
              {...register("title", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
              })}
              id="facility"
            >
              <option value="">Please select</option>
              {facilities?.map((item, index) => {
                return (
                  <option key={index} value={item.id}>
                    {item.facility_name}
                  </option>
                );
              })}
            </select>
          </FieldControl>
        </Container>
      )}
      {initialState.title && initialState.question === "no" && (
        <Container>
          <TextContainer>
            <label htmlFor="Test_id" style={style}>
              Test ID <span style={{ color: "red" }}>*</span>
            </label>
          </TextContainer>
          <FieldControl>
            <select
              value={initialState.id}
              {...register("id", {
                required: true,
                onChange: (e) => handleChange(e),
              })}
            >
              <option value="">Please select</option>
              {testInfo?.length > 0 &&
                testInfo?.map((item, index) => {
                  return (
                    <option key={index} value={item.reportNo}>
                      {item.reportNo}
                    </option>
                  );
                })}
            </select>
          </FieldControl>
        </Container>
      )}

      {formData?.testSchedule?.length > 0 &&
      formData?.testSchedule[0].status === "Received" ? (
        <>
          <Container>
            <TextContainer style={{ color: "red" }}>
              Please Book it in First
            </TextContainer>
            <LinkButton to={`/bookin/${formData.reportNo}`}>
              Proceed to BookIn
            </LinkButton>
          </Container>
        </>
      ) : (
        <>
          {initialState.title &&
            formData &&
            initialState.id &&
            initialState.question === "no" && (
              <Container>
                <TextContainer>
                  <label htmlFor="Test_id" style={style}>
                    Test Date <span style={{ color: "red" }}>*</span>
                  </label>
                </TextContainer>
                <FieldControl>
                  <input
                    type="datetime-local"
                    {...register("start", {
                      requried: true,
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    min={currentTime}
                  />
                </FieldControl>
              </Container>
            )}
        </>
      )}

      {initialState.title &&
        formData &&
        initialState.id &&
        initialState.question === "no" &&
        initialState.start && (
          <Container>
            <Button type="submit">Schedule a test</Button>
          </Container>
        )}
    </form>
  );
};

export default Schedule;

const Container = styled.div`
  text-align: center;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0px 20px;
  justify-content: center;
`;

const TextContainer = styled.p`
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.15rem;
  margin-right: 20px;
  width: 70%;
`;

const Button = styled.button`
  padding: 10px;
  background-color: ${(props) => (props.clear ? "red" : "blue")};
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 2s ease-out;
  text-transform: uppercase;
  margin: 0 20px 20px 0;

  &:hover {
    background-color: ${(props) => (props.clear ? "red" : "lightblue")};
    color: black;
  }
`;

const LinkButton = styled(Link)`
  padding: 10px;
  background-color: ${(props) => (props.clear ? "red" : "blue")};
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 5px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 2s ease-out;
  text-transform: uppercase;
  margin: 0 20px 20px 0;

  &:hover {
    background-color: ${(props) => (props.clear ? "red" : "lightblue")};
    color: black;
  }
`;
