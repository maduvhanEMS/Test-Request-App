import React from "react";
import styled from "styled-components";

const Slide = () => {
  return (
    <TextContainer>
      <Text>Welcome To N25 Destructive Testing Facility</Text>
    </TextContainer>
  );
};

export default Slide;

const TextContainer = styled.div`
  width: 100%;
  height: 100%;
  width: 650px;
  color: white;
  text-align: center;
  z-index: 2;
`;

const Text = styled.h1`
  font-weight: 600;
  font-size: 52px;
  letter-spacing: 0.4rem;
  line-height: 100px;
  z-index: 3;
  color: white;
`;
