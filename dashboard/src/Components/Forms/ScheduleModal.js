import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FieldControl } from "./Styles";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getTestSchedule,
  updateTestSchedule,
  resetTestsScheduleUpadte,
} from "../../features/testSchedule/testScheduleSlice";

import { toast } from "react-toastify";

const ScheduleModal = ({ setDisplay, reportNo }) => {
  const [initialState, setInitalState] = useState({
    id: reportNo,
    start: "",
    status: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isUpdated } = useSelector((state) => state.schedule);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    dispatch(getTestSchedule());

    if (initialState.start && isUpdated) {
      toast.success("Test Successfully Scheduled");

      dispatch(resetTestsScheduleUpadte());
    }
  }, [dispatch, isUpdated, initialState.start]);

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
    setDisplay("none");
    navigate("/bookin");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <FieldControl>
          <label>Test Date: </label>
          <input
            type="date"
            {...register("start", {
              requried: true,
              onChange: (e) => {
                handleChange(e);
              },
            })}
            min={new Date().toISOString().split("T")[0]}
          />
        </FieldControl>
      </Container>

      {initialState.start && (
        <Container>
          <Button type="submit">Schedule a test</Button>
        </Container>
      )}
    </form>
  );
};

export default ScheduleModal;

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
