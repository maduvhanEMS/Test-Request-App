import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { right } from "../Keyframes/Keyframe";
import axios from "axios";
import { FormProvider } from "react-hook-form";

const API = "http://localhost:5000/public";

const SideModal = (props) => {
  const style = { backgroundColor: props.color, display: props.display };

  const viewHandler = async (fileName) => {
    const filename = fileName.split("/").pop();
    axios(`${API}`, {
      params: {
        id: filename,
      },
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        // create a blob
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFormat = () => {
    const format =
      props.data?.testSchedule?.length > 0 &&
      props.data?.testSchedule[0]?.files?.map((item) => {
        return JSON.parse(item);
      });

    return format;
  };

  return (
    <Container
      style={style}
      animate={right}
      onMouseLeave={() => props.setDisplay("none")}
    >
      <Card>
        <Span onClick={() => props.setDisplay("none")}>&times;</Span>
        <Col>
          <div>
            <p>Description</p>

            <ul>
              {handleFormat()?.length > 0 &&
                handleFormat()?.map((item) => <li>{Object?.keys(item)[0]}</li>)}
              {props.data?.test_information?.map((item, index) => (
                <li key={index}>{item.description + item.number}</li>
              ))}
            </ul>
          </div>
          <div>
            <p>Report</p>
            <ul>
              {handleFormat()?.length > 0 &&
                handleFormat()?.map((item, index) => (
                  <li key={index}>
                    <button
                      className="viewPoints"
                      onClick={() => viewHandler(Object?.values(item)[0])}
                    >
                      {Object?.values(item)[0].split("/").pop()}
                    </button>
                  </li>
                ))}
              {props.data?.test_information?.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => viewHandler(item.file)}
                    target="_blank"
                    rel="noreferrer"
                    className="viewPoints"
                  >
                    {item.filename}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Card>
    </Container>
  );
};

export default SideModal;

const Container = styled.div`
  display: ${(props) => props.display};
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  margin-bottom: 10px; /* Location of the box */
  bottom 0;
  right: 0;
  overflow: auto; /* Enable scroll if needed */
  color: white;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.1rem;
  background-color: white;
  animation: ${(props) => props.animate} 2s;
  animation-direction: reverse;
`;

const Card = styled.div`
  margin: 0 auto;
  padding: 30px;
  border: 2px solid #white;
  min-width: 500px;
  width: 100%;
  align-items: center;
  position: relative;
  p {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.6);
  }

  ul {
    color: rgba(0, 0, 0, 0.6);

    li {
      list-style: none;
      margin: 10px 0;
    }
  }
`;

const Col = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
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
