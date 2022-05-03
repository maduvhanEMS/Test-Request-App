import React from "react";
import styled from "styled-components";
import Card from "../Card/Card";
import MenuData from "../../Assets/Data/MenuData";

const Cards = () => {
  return (
    <Container>
      <TextContent>Navigate To...</TextContent>
      <CardContainer>
        {MenuData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </CardContainer>
    </Container>
  );
};

export default Cards;

const Container = styled.div`
  max-height: 100vh;
  display: grid;
  grid-gap: 20px;
  z-index: 2;
`;

const TextContent = styled.h2`
  font-size: 36px;
  line-height: 20px;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 0.3rem;
  align-text: left;
  color: whitesmoke;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: masonry;
  grid-gap: 5rem;
  place-items: center;
`;
