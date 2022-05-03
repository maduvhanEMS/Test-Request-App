import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { background } from "../Keyframes/Keyframe";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import ProgressBar from "../ProgressBar/ProgressBar";

const Card = ({ data }) => {
  const { description, shots, previous } = data;
  const [arrowColor, setArrowColor] = useState("black");
  const [value, setValue] = useState(0);
  const [percentValue, setPercentValue] = useState(0);

  const params = (color, percent, difference) => {
    setArrowColor(color);
    setPercentValue(percent);
    setValue(difference);
  };
  const shotsNumber = () => {
    // let value;
    const percent = Math.round(((shots - previous) / previous) * 100);

    if (percent >= 0 && percent < 80) {
      params("blue", percent, shots - previous);
    } else if (percent >= 80) {
      params("green", percent, shots - previous);
    } else if (percent < 0) {
      params("red", Math.abs(percent), previous - shots);
    }
  };

  useEffect(() => {
    shotsNumber();
  });

  const arrow =
    shots > previous ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />;
  return (
    <CardContainer>
      <CardHeader>{description}</CardHeader>
      {/* <Span /> */}
      <IconContext.Provider
        value={{ className: "arrowClass", color: `${arrowColor}` }}
      >
        <CardBody>
          {arrow} {value}
        </CardBody>
      </IconContext.Provider>
      <ProgressBar
        value={percentValue}
        max={100}
        color={arrowColor}
        percent={percentValue}
      />
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  box-shadow: 10px 10px 5px 0px rgba(255, 255, 255, 0);
  background: rgba(255, 255, 255, 0.9);
  margin: 20px 0;
  padding: 10px 20px;
  border-radius: 10px;
`;

const CardHeader = styled.p`
  text-align: left;
  padding: 20px 0px;
  margin: 0 auto;
  border-radius: 20px;
  font-weight: 500;
  font-size: 18px;
`;

const Span = styled.div`
  border-bottom: 2px solid rgba(0,0,0,0.4);,
  padding: 20px;
`;

const CardBody = styled.div`
  margin-top: 0px;
  width: 100%;
  font-weight: 600px;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.8);
  text-align: right;

  //   &:hover {
  //     animation: ${background} 15s ease-in;
  //     color: white;
  //     background-size: 400% 400%;
  //   }
`;
