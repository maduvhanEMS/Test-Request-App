import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

const SearchForm = ({ setSearch, search }) => {
  const { register, handleSubmit } = useForm();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <Form onSubmit={handleSubmit()}>
      <label htmlFor="search">Search</label>
      <input
        type="text"
        id="search"
        {...register("search", { onInput: (e) => handleChange(e) })}
      />
    </Form>
  );
};

export default SearchForm;

const Form = styled.form`
  input {
    padding: 5px 15px;
    border: 1px solid lightgrey;
    outline: none;

    font-size: 14px;
    text-align: left;
    line-height: 1.5;
    vertical-align: middle;
  }

  label {
    margin-right: 20px;
    font-weight: 500;
    font-size: 16px;
    border: none;
  }
`;
