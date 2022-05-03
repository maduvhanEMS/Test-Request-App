import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FieldControl, FormContainer } from "./Styles";

import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { selectTestData } from "../../slices/forms";

const BookInForm = ({ setCheckIn, setDisplay, formData, setFormData }) => {
  const [initalState, setInitailState] = useState({
    question: "",
    test_id: "",
  });

  const request = useSelector(selectTestData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInitailState({ ...initalState, [name]: value });
  };

  const loader = () => {
    return <div className="loader"></div>;
  };

  useEffect(() => {
    const filteredData = request?.find(
      (item) => parseInt(item.id) === parseInt(initalState.test_id)
    );

    if (filteredData) return setFormData(filteredData);

    setFormData("");
  }, [initalState]);

  // const handleCheckin = () => {
  //   setCheckIn("block");
  //   setDisplay("none");
  // };

  const onSubmit = (data) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <TextContainer>Have you recieved a test request?</TextContainer>
        <FieldControl>
          <select
            {...register("question", {
              requried: true,
              onChange: (e) => {
                handleChange(e);
              },
            })}
          >
            <option>Please select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </FieldControl>
      </Container>
      {initalState.question === "yes" && (
        <Container>
          <TextContainer>Please enter test request ID: </TextContainer>
          <FieldControl>
            <input
              {...register("test_id", {
                required: true,
                onChange: (e) => {
                  handleChange(e);
                },
              })}
            />
          </FieldControl>
        </Container>
      )}
      {initalState.question === "no" && (
        <Container>
          {" "}
          <Button to="test_request">Create a test request</Button>
        </Container>
      )}
      <Container>
        {initalState.test_id !== "" && formData === "" ? loader() : ""}
      </Container>
      {formData && (
        <Container>
          {" "}
          <Button to={`/bookin/${initalState.test_id}`}>
            Proceed to BookIn
          </Button>
        </Container>
      )}
    </form>
  );
};

export default BookInForm;

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

const Button = styled(Link)`
  text-align: center;
  align-items: center;
  margin: 0 auto;
  padding: 10px 10px;
  background-color: blue;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  cursor: pointer;
`;

const Row = styled.div``;
