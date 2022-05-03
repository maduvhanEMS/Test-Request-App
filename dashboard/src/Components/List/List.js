import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const List = ({ events, handleClick }) => {
  const { register } = useForm();
  const [checked, setChecked] = useState(events?.map((item) => false));

  const handleChange = (e, i) => {
    let check = [...checked];
    check[i] = !checked[i];
    setChecked(check);
  };

  return (
    <Container>
      <Header>Planned Tests</Header>
      <ItemsList>
        {events.map((item, index) => (
          <Item key={index}>
            <input
              type="checkbox"
              checked={checked[index]}
              {...register(`checked+${index}`, {
                onChange: (e) => handleChange(e, index),
              })}
            />
            {item.title}{" "}
            {checked[index] && (
              <ButtonContainer>
                <Button to={`/schedule/com/${item.reportNo}`} color>
                  Upload
                </Button>
                <UpdateB onClick={() => handleClick(item.id)}>
                  Reschedule
                </UpdateB>
              </ButtonContainer>
            )}
          </Item>
        ))}
      </ItemsList>
    </Container>
  );
};

export default List;

const Container = styled.div`
  width: 400px;
  line-hight: 1.5;
  background: linear-gradient(-45deg, white, white, white);
  border-right: 1px solid #d3e2e8;
`;

const Header = styled.h2`
  font-weight: 500;
  font-size: 18px;
  padding: 20px 20px;
  color: grey;
`;

const ItemsList = styled.ul`
  padding: 10px 10px;
  align-items: left;
`;

const Item = styled.li`
  list-style-type: none;
  padding: 10px 0;
  border-bottom: 0.1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  text-align: left;
  // justify-content: s;
  line-height: 20px;
  color: black;
  font-weight: 500;
  display: flex;
  align-items: center;
  margin: auto 0;
  input {
    margin-right: 10px;
  }

  input[checked] {
    color: red;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: 10px;
`;

const Button = styled(Link)`
  margin-right: 10px;
  background-color: ${(props) => (props.color ? "green" : "Blue")};
  padding: 10px 15px;
  color: white;
`;

const UpdateB = styled.span`
  margin-right: 10px;
  background-color: ${(props) => (props.color ? "green" : "Blue")};
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  color: white;
`;
