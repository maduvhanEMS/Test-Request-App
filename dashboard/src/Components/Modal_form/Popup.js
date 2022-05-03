import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { right } from "../Keyframes/Keyframe";

const Popup = (props) => {
  useEffect(() => {
    const time = setTimeout(() => props.setDisplay("none"), 10000);
    return () => {
      clearTimeout(time);
    };
  }, [props.display]);

  const style = { backgroundColor: props.color, display: props.display };
  return (
    <Container style={style} animate={right}>
      <Card>
        {props.text}
        <Span onClick={() => props.setDisplay("none")}>&times;</Span>
      </Card>
    </Container>
  );
};

export default Popup;

const Container = styled.div`
  display: ${(props) => props.display};
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  margin-top: 100px; /* Location of the box */
  right: 0;
  top: 0;
  overflow: auto; /* Enable scroll if needed */
  color: white;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.1rem;
  background-color: ${(props) => props.backgroundColor};
  animation: ${(props) => props.animate} 2s;
  animation-direction: reverse;
`;

const Card = styled.div`
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #888;
  min-width: 400px;
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  position: relative;
  p {
    font-size: 24px;
  }
`;

const Span = styled.span`
  color: #aaaaaa;
  float: right;
  font-size: 28px;

  font-weight: bold;
  margin: 0 10px;
  outline: none;

  &:hover {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;
