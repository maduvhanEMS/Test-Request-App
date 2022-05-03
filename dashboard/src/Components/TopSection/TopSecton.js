import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TopSecton = ({ data }) => {
  return (
    <Container>
      <Home to="/">Home</Home>
      <Span> / </Span>
      <Text>{data}</Text>
    </Container>
  );
};

export default TopSecton;

const Container = styled.div`
  font-size: 24px;
  font-weight: 400;
  width: 100%;
  background-color: white;
  padding: 15px 10px;
`;

const Home = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
`;

const Span = styled.span`
  font-size: 26px;
  font-weight: 600;
  width: 100%;
  color: #778899;
`;

const Text = styled.span`
  color: #c0c0c0;
`;
