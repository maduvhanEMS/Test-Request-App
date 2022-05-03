import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BookInTable from "./BookIn";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TableList = () => {
  const params = useParams();
  const currentId = params.bookId;

  const request = useSelector((state) =>
    currentId
      ? state.testForms?.find(
          (request) => parseFloat(request.id) === parseFloat(currentId)
        )
      : null
  );
  const [data, setData] = useState([]);

  useEffect(() => {
    if (request) {
      setData(request);
    }
  }, [request]);

  return (
    <TableContainer>
      <Table>
        <div style={{ marginBottom: "40px" }}>
          {/* <TopSecton data="BookIn" /> */}
        </div>
        <BookInTable data={data} id={currentId} />
      </Table>
    </TableContainer>
  );
};

export default TableList;

const TableContainer = styled.div`
  // z-index: 9999;
  top: 0;
  flex: 4;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  // margin: 0 auto;
  // overflow: auto; /* Enable scroll if needed */
  // background-color: rgb(0, 0, 0); /* Fallback color */
  // background-color: rgba(0, 0, 0, 1); /* Black w/ opacity */
  // box-sizing: border-box;
`;

const Table = styled.div`
  // align-items: center;

  margin: 0 auto;
  justfy-content: center;
  padding: 20px 30px;
`;

const Button = styled.div``;
