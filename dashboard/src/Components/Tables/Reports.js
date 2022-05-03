import { useState, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import PaginationFront from "../Pagination/PaginationFront";

let PageSize = 10;

const ReportsTable = ({ data, setCurrentId, setDisplay }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const handleChange = (id) => {
    setDisplay("block");
    setCurrentId(id);
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableTr>
            <TableHeader>Test ID</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Section</TableHeader>
            <TableHeader>Test(s)</TableHeader>
            <TableHeader>Lot(s)</TableHeader>
            <TableHeader>Created</TableHeader>
            <TableHeader>Report</TableHeader>
          </TableTr>
        </thead>
        <tbody>
          {currentTableData?.length > 0 &&
            currentTableData?.map((info, index) => {
              const {
                test_information,
                product,
                tests,
                test,
                createdAt,
                reportNo,
              } = info;
              let modifiedTest;
              const testsDescrip = tests?.map((item) => JSON.parse(item));
              if (testsDescrip.length > 0) {
                modifiedTest = testsDescrip?.map((item, index) =>
                  Object.values(item)[0]
                    ? index !== testsDescrip.length - 1
                      ? Object.keys(item)[0] + ", "
                      : Object.keys(item)[0]
                    : ""
                );
              }

              const testInfo = test_information.map((item) =>
                item.Received === "true" ? item.description + item.number : null
              );
              const testInfoData = testInfo
                .filter((item) => {
                  return item !== null;
                })
                .toString();

              return (
                <TableTr key={index}>
                  <Tbody>{reportNo}</Tbody>
                  <Tbody>{product.product_name}</Tbody>
                  <Tbody>{test.facility_name}</Tbody>
                  <Tbody>{modifiedTest}</Tbody>
                  <Tbody>{testInfoData} </Tbody>
                  <Tbody>{moment(createdAt).fromNow()}</Tbody>
                  <Tbody>
                    <Button onClick={() => handleChange(reportNo)}>
                      View reports
                    </Button>
                  </Tbody>
                </TableTr>
              );
            })}
        </tbody>
      </TableContainer>
      {!data?.length > 0 && (
        <p
          style={{
            width: "100%",
            textAlign: "center",
            marginTop: "20px",
            color: "rgba(0,0,0,0.8)",
            fontSize: "17px",
          }}
        >
          No Data Available In Table
        </p>
      )}
      <PaginationContainer>
        <PaginationFront
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={data?.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
        {/* <Pagination pager={pager} /> */}
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding: 20px 40px;
`;

const TableContainer = styled.table`
  border-collapse: collapse;

  box-sizing: border-box;
  width: 100%;
`;

const TableTr = styled.tr``;

const TableHeader = styled.th`
  border-bottom: 1px solid lightgrey;
  text-align: left;
  justify-content: center;
  height: 50px;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

const Tbody = styled.td`
  text-align: left;
  border-bottom: 0.5px solid lightgrey;
  padding: 20px 0;
  font-size: 12px;
`;

const Span = styled.span`
  background-color: ${(props) => props.color};
  padding: 5px 5px;
  color: white;
  font-weight: 500;
  border-radius: 5px;
`;

const Button = styled.button`
  color: blue;
  background: none;
  border: none;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 20px;
  margin: 20px 0;
`;

export default ReportsTable;
