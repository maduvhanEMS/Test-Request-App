import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { right } from "../Keyframes/Keyframe";
import { BiSearch } from "react-icons/bi";

const SearchPopUp = (props) => {
  const style = { backgroundColor: props.color, display: props.display };

  return (
    <Container style={style} animate={right}>
      <Span onClick={() => props.configDisplay(props.column)}>&times;</Span>
      <Card>
        {props.search && (
          <Search>
            <input
              type="text"
              name="search"
              onChange={(e) => {
                props.searchButton(e.target.value, props.column);
              }}
            />
            <span>
              <BiSearch />
            </span>
          </Search>
        )}

        {props.filter &&
          props.items.map((item) => {
            return (
              <Columns>
                <Row>
                  <input
                    type="checkbox"
                    value={item}
                    onChange={(e) => {
                      props.requestFilter(
                        e.target.value,
                        props.column,
                        props.secondKey
                      );
                    }}
                  />
                </Row>
                <Row>{item}</Row>
              </Columns>
            );
          })}
      </Card>
    </Container>
  );
};

export default SearchPopUp;

const Container = styled.div`
  display: ${(props) => props.display};
  position: fixed; /* Stay in place */
  z-index: 99; /* Sit on top */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border: none;
  color: white;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: 0.1rem;
  background-color: white;
  // animation: ${(props) => props.animate} 2s;
  // animation-direction: reverse;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const Search = styled.div`
  width: 100%;
  margin: 10px;
  display: flex;
  position: relative;

  input {
    padding: 10px 5px;
    width: 100%;
    font-size: 12px;
    border: none;
    border-bottom: solid 2px lightgrey;
  }

  span {
    color: grey;
    display: block;
    position: absolute;
    font-size: 24px;
    top: 25%;
    right: 0;
  }
`;

const Card = styled.div`
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  just p {
    font-size: 24px;
  }
`;

const Columns = styled.div`
  display: flex;
  padding: 10px;
`;

const Row = styled.div`
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  padding-left: 10px;

  input {
    width: 15px;
  }
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
