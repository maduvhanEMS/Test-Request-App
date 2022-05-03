import React from "react";
import styled from "styled-components";

const Tab = ({ name, setId, id, style, setNumber, index }) => {
  const handleClick = () => {
    setId(id);
    setNumber(index);
  };

  return (
    <Card style={style}>
      <CardHeader onClick={handleClick}>{name}</CardHeader>
    </Card>
  );
};

export default Tab;

const Card = styled.div`
  text-align: center;
  margin: 20px 0;

  padding: 20px;
  //   width: 300px;
  //   height: 80px;
  background: white;
  box-shadow: 10px 10px 5px 0px rgba(255, 255, 255, 0.75);
  -webkit-box-shadow: 10px 10px 5px 0px rgba(255, 255, 255, 0.75);
  -moz-box-shadow: 10px 10px 5px 0px rgba(255, 255, 255, 0.75);
`;

const CardHeader = styled.p`
  width: 100%;
  cursor: pointer;
  text-align: center;
`;
