import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const propTypes = {};

const Container = styled.div`
  margin-top: 20px;
  progress[value] {
    width: ${(props) => props.width};
    appearance: none;

    ::-webkit-progress-bar {
      height: 5px;
      border-radius: 20px;
      background-color: #eee;
    }

    ::-webkit-progress-value {
      height: 5px;
      border-radius: 20px;
      background-color: ${(props) => props.color};
    }
  }
`;

const Span = styled.span`
  color: ${(props) => props.color};
`;

const ProgressBar = (data) => {
  const { value, max, color, width, percent } = data;
  return (
    <Container color={color} width={width}>
      <Span color={color}>{percent}%</Span>
      <progress value={value} max={max} />
    </Container>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  max: propTypes.number,
  color: PropTypes.string,
  width: PropTypes.string,
};

ProgressBar.defaultProps = {
  max: 100,
  color: "#ff7979",
  width: "100%",
};

export default ProgressBar;
