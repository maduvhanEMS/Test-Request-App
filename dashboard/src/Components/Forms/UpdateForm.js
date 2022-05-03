import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FieldControl } from "./Styles";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Popup from "../Modal_form/Popup";
import {
  resetTestsSchedule,
  updateTestSchedule,
} from "../../features/testSchedule/testScheduleSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateForm = ({ currentId, setDisplay }) => {
  // const id = parseInt(currentId);
  console.log(currentId);

  const [start, setStart] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm();

  const handleChange = (e) => {
    setStart(e.target.value);
  };

  const onSubmit = (data) => {
    data["id"] = currentId;
    dispatch(updateTestSchedule(data));
    dispatch(resetTestsSchedule());
    toast.success("Successfully updated");
    navigate("/test_schedule");
    setDisplay("none");
  };

  const style = { width: "125px", fontSize: "18px", fontWeight: "500" };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <TextContainer>
          {" "}
          <label htmlFor="facility" style={style}>
            New Test Date <span style={{ color: "red" }}>*</span>
          </label>
        </TextContainer>
        <FieldControl>
          <input
            type="datetime-local"
            value={start}
            {...register("start", {
              required: true,
              onChange: (e) => {
                handleChange(e);
              },
            })}
          />
        </FieldControl>
      </Container>
      {start && (
        <Container>
          {" "}
          <Button type="submit">Submit</Button>
        </Container>
      )}
    </form>
  );
};

export default UpdateForm;

const Container = styled.div`
  text-align: center;
  width: 100%;
  margin: 10px auto;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 0px 80px;
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
