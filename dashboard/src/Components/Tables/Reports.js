import { useState, useMemo } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import PaginationFront from "../Pagination/PaginationFront";
import { RiFilterOffFill, RiFilterOffLine } from "react-icons/ri";
import { useFiltableData } from "../utils/useFilterSelect";
import SearchPopUp from "../Modal_form/SearchPopUp";
import { BiSearch } from "react-icons/bi";

let PageSize = 10;

const ReportsTable = ({ data, setCurrentId, setDisplay }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const {
    requestFilter,
    uniqueItems,
    filteredItems,
    searchButton,
    configDisplay,
    filterConfig,
  } = useFiltableData(data);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return filteredItems.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredItems]);

  const handleChange = (id) => {
    setDisplay("block");
    setCurrentId(id);
  };

  const handleClick = (value) => {
    setSearchText(value);
  };

  const getDisplayFor = (name) => {
    if (!filterConfig) {
      return;
    }
    return filterConfig.column === name ? filterConfig.display : "none";
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableTr>
            <TableHeader>
              <button onClick={() => configDisplay("reportNo")}>
                Test ID <BiSearch />
              </button>
              <SearchPopUp
                display={getDisplayFor("reportNo")}
                configDisplay={configDisplay}
                setSearchText={setSearchText}
                handleClick={handleClick}
                search
                searchButton={searchButton}
                column="reportNo"
                requestFilter={requestFilter}
                items={uniqueItems("reportNo")}
              />
            </TableHeader>
            <TableHeader>
              <button onClick={() => configDisplay("products")}>
                Product Name <BiSearch />
              </button>
              <SearchPopUp
                display={getDisplayFor("products")}
                configDisplay={configDisplay}
                setSearchText={setSearchText}
                handleClick={handleClick}
                search
                searchButton={searchButton}
                column="products"
                requestFilter={requestFilter}
                items={uniqueItems("products")}
              />
            </TableHeader>
            <TableHeader>
              <button onClick={() => configDisplay("facility_name")}>
                Section <RiFilterOffFill />
              </button>
              <SearchPopUp
                display={getDisplayFor("facility_name")}
                configDisplay={configDisplay}
                setSearchText={setSearchText}
                handleClick={handleClick}
                filter
                column="facility_name"
                secondKey="test"
                requestFilter={requestFilter}
                items={uniqueItems("facility_name", "test")}
              />
            </TableHeader>
            <TableHeader>Test(s)</TableHeader>
            <TableHeader>Lot(s)</TableHeader>
            <TableHeader>Created</TableHeader>
            <TableHeader>Report</TableHeader>
            <TableHeader>Test request PDF</TableHeader>
          </TableTr>
        </thead>
        <tbody>
          {currentTableData?.length > 0 &&
            currentTableData?.map((info, index) => {
              const {
                test_information,
                tests,
                test,
                createdAt,
                reportNo,
                products,
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
                item.Received === "true"
                  ? item.description + " " + item.batch_no
                  : null
              );
              const testInfoData = testInfo
                .filter((item) => {
                  return item !== null;
                })
                .toString();

              return (
                <TableTr key={index}>
                  <Tbody>{reportNo}</Tbody>
                  <Tbody>{products.join(" & ")}</Tbody>
                  <Tbody>{test.facility_name}</Tbody>
                  <Tbody>{modifiedTest}</Tbody>
                  <Tbody style={{ maxWidth: "100px" }}>
                    {testInfoData.substring(0, 100)}{" "}
                  </Tbody>
                  <Tbody>{moment(createdAt).fromNow()}</Tbody>
                  <Tbody>
                    <Button onClick={() => handleChange(reportNo)}>
                      View reports
                    </Button>
                  </Tbody>
                  <Tbody>
                    <Span>
                      <ButtonLink
                        to={`/pdfviewer/${reportNo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </ButtonLink>
                    </Span>
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

const ButtonLink = styled(Link)`
  color: blue;
`;

export default ReportsTable;
