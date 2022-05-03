import React from "react";
import styled from "styled-components";
import Card from "./Card";
import { Monthly } from "../../Assets/Data/StatsData";

const Stats = () => {
  return (
    <Container>
      {Monthly.map((data, index) => {
        return <Card key={index} data={data} />;
      })}
    </Container>
  );
};

export default Stats;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
`;
