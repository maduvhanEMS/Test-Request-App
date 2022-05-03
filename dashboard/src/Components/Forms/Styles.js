import styled from "styled-components";

export const FieldControl = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: no-wrap;
  margin-bottom: 10px;

  select {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
    min-width: 180px;
  }

  label {
    margin-right: 5px;
    align-items: center;
    min-width: 200px;
  }

  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
  }

  textarea {
    padding: 1rem 0.5rem;
    margin: 0.5em;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    border: none;
    border-radius: 3px;
    background: papayawhip;
    resize: vertical;
  }
`;

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 5px;
  width: 100%;
  place-items: start center;
  margin: 0 auto;
  //   background: white;
  padding: 0 20px;
`;
