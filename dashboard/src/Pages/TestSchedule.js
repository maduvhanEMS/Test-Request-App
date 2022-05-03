import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../Components/Calendar/Calendar";
import List from "../Components/List/List";
import { Container } from "../globalStyles";
import ModalForm from "../Components/Modal_form/ModalForm";
import UpdateForm from "../Components/Forms/UpdateForm";
import { useSelector } from "react-redux";
import { getTestSchedule } from "../features/testSchedule/testScheduleSlice";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader/Loader";
import { useNavigate } from "react-router";

const TestSchedule = () => {
  const [currentId, setCurrentId] = useState("");
  const [display, setDisplay] = useState("none");
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { schedule, isLoading } = useSelector((state) => state.schedule);

  useEffect(() => {
    dispatch(getTestSchedule());
  }, [dispatch, display]);

  const handleClick = (id) => {
    setCurrentId(id);
    setDisplay("block");
  };

  if (isLoading) {
    return <Loader />;
  }

  console.log(user);

  return (
    <Container>
      <ModalForm display={display} setDisplay={setDisplay}>
        <UpdateForm
          events={schedule}
          currentId={currentId}
          setDisplay={setDisplay}
        />
      </ModalForm>
      <CalendarWrapper>
        <Calendar currentEvents={schedule} />
        {user.isAdmin && <List events={schedule} handleClick={handleClick} />}
      </CalendarWrapper>
    </Container>
  );
};

export default TestSchedule;

const CalendarWrapper = styled.div`
  margin-top: 10px;
  padding: 10px 0;
  display: flex;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
`;
