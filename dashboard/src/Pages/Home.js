import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cards from "../Components/Cards/Cards";
import Slides from "../Components/Sliders/Slides";
import slideData from "../Assets/Data/slideData";

const Home = () => {
  const [backImage, setBackImage] = useState(slideData[0].image);
  const [count, setCount] = useState(0);

  const add = () => {
    if (count === slideData.length - 1) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
    setBackImage(slideData[count].image);
  };

  useEffect(() => {
    const time = setTimeout(add, 10000);
    return () => {
      clearTimeout(time);
    };
  });

  return (
    <Container image={backImage}>
      <Slides />
      <Cards />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  display: inline-grid;
  width: 100%;
  height: 100vh;
  place-items: center;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px 20px;
  background-image: url(${(props) => props.image});
  background-position: center center;
  text-transform: uppercase;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
