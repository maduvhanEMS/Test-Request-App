import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { background } from "../Keyframes/Keyframe";

const Card = ({ data }) => {
  const { name, icon, path } = data;
  return (
    <CardContainer>
      <CardHeader>
        <IconContext.Provider value={{ className: "iconsClass" }}>
          <div>{icon}</div>
        </IconContext.Provider>
      </CardHeader>
      <Span />
      <Link to={path}>
        <CardBody>{name}</CardBody>
      </Link>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  box-shadow: 10px 10px 5px 0px rgba(255, 255, 255, 0.75);
  background: rgba(255, 255, 255, 0.9);
  padding: 20px 20px;
  width: 200px;
  z-index: 2;
`;

const CardHeader = styled.div`
  align-items: center;
  margin: 0 auto;
  height: 80px;
  width: 80px;
  border-radius: 20px;
`;

const Span = styled.div`
  border-bottom: 2px solid lightblue;,
  padding: 20px;
`;

const CardBody = styled.div`
  margin-top: 20px;
  cursor: pointer;
  padding: 10px 5px;
  width: 100%;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, blue);
  font-weight: 600px;
  font-size: 20px;
  color: whitesmoke;

  &:hover {
    animation: ${background} 15s ease-in;
    color: white;
    background-size: 400% 400%;
  }
`;
