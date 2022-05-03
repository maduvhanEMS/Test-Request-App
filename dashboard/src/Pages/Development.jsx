import React from "react";
import { Container } from "../globalStyles";
import "../style.css";

function Development() {
  return (
    <Container>
      <div className="multiselect-dropdown">
        <select
          name="cars"
          multiple
          multiselect-select-all="true"
          multiselect-search="true"
        >
          <option>Abarth</option>
          <option selected>Alfa Romeo</option>
          <option>Aston Martin</option>
          <option>Audi</option>
          <option>Bentley</option>
          <option>BMW</option>
        </select>
      </div>
    </Container>
  );
}

export default Development;
