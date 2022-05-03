import React from "react";
import styled from "styled-components";

const propTypes = {};

const defaultProps = {};

const FilterForm = ({ handleChange, data }) => {
  const uniquePropellant = [];

  data.map((item) => {
    if (uniquePropellant.indexOf(item.Product_name) === -1) {
      uniquePropellant.push(item.Product_name);
    }
    return uniquePropellant;
  });

  return (
    <Form onChange={handleChange}>
      <select>
        <option value="null">All</option>
        {uniquePropellant.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Form>
  );
};

FilterForm.propTypes = propTypes;
FilterForm.defaultProps = defaultProps;
// #endregion

export default FilterForm;

const Form = styled.form`
  select {
    padding: 5px 15px;
    border: 1px solid lightgrey;
    outline: none;
    background-color: whitesmoke;
    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    vertical-align: middle;
  }

  option {
  }
`;
