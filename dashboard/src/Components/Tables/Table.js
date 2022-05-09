import { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import PaginationFront from "../Pagination/PaginationFront";
import { useSortableData } from "../utils/useSortableData";
import SearchPopUp from "../Modal_form/SearchPopUp";
import { useFiltableData } from "../utils/useFilterSelect";
import { BiSearch } from "react-icons/bi";
import { RiFilterOffFill, RiFilterOffLine } from "react-icons/ri";

let PageSize = 10;

const Table = ({ data, currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const { items, requestSort, sortConfig } = useSortableData(data);
  const [tabData, setTabData] = useState([]);
  const [searchText, setSearchText] = useState("");

  // filter the data
  // useEffect(() => {
  //   const filtered = items.filter((item) =>
  //     item?.testSchedule?.length > 0
  //       ? item?.testSchedule[0].status !== "Completed"
  //       : item
  //   );

  //   setTabData(filtered);
  // }, [items]);

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
    return filteredItems
      ?.filter((item) =>
        item?.testSchedule?.length > 0
          ? item?.testSchedule[0].status !== "Completed"
          : item
      )
      .slice(firstPageIndex, lastPageIndex);
  }, [currentPage, filteredItems]);

  const Color = (status) => {
    if (status === "Completed") {
      return "green";
    } else if (status === "Received") {
      return "purple";
    } else if (status === "In Progress") {
      return "blue";
    } else if (status === "Booked In") {
      return "Orange";
    } else if (status === "Pending") {
      return "lightgreen";
    } else if (status === "Rejected") {
      return "red";
    }
  };

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const getDisplayFor = (name) => {
    if (!filterConfig) {
      return;
    }
    return filterConfig.column === name ? filterConfig.display : "none";
  };

  const handleClick = (value) => {
    setSearchText(value);
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableTr>
            <TableHeader>
              <button
                type="button"
                onClick={() => requestSort("reportNo")}
                className={getClassNamesFor("reportNo")}
              >
                Report Number
              </button>
            </TableHeader>
            <TableHeader>
              <button onClick={() => configDisplay("reportNo")}>
                Test Type
                <BiSearch />
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
            <TableHeader>Requestor</TableHeader>
            <TableHeader>
              <button onClick={() => configDisplay("products")}>
                Product Name
                <BiSearch />
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
            <TableHeader>Test(s)</TableHeader>
            <TableHeader>
              <button
                type="button"
                onClick={() => requestSort("createdAt")}
                className={getClassNamesFor("createdAt")}
              >
                Date Received
              </button>
            </TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>View PDF</TableHeader>
          </TableTr>
        </thead>
        <tbody>
          {currentTableData?.length > 0 &&
            currentTableData?.map((info, index) => {
              const {
                test_type,
                user,
                products,
                tests,
                createdAt,
                testSchedule,
                reportNo,
              } = info;
              // const tests = Object.entries(Tests).map(([key, value]) => {
              //   if (value) return key + ", ";
              // });
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

              return (
                <TableTr key={index}>
                  <Tbody>{reportNo}</Tbody>
                  <Tbody>{test_type}</Tbody>
                  <Tbody>{user?.username}</Tbody>

                  <Tbody>{products.join(" & ")}</Tbody>
                  <Tbody> {modifiedTest}</Tbody>
                  <Tbody>{moment(createdAt, "YYYY-MM-DD").fromNow()}</Tbody>
                  <Tbody>
                    {info.status === "Approved" ? (
                      <>
                        <Span
                          color={Color(
                            testSchedule?.length > 0 && testSchedule[0].status
                          )}
                        >
                          {testSchedule?.length > 0 && testSchedule[0].status}
                        </Span>
                        {info.status === "Received" && (
                          <Span>
                            <Button to={`/editForm/${reportNo}`}>Edit</Button>
                          </Span>
                        )}
                      </>
                    ) : info.status === "Pending" ? (
                      <>
                        <Span color={Color(info.status)}>{info.status}</Span>
                        {user?.id === currentUser?.id && (
                          <Span>
                            <Button to={`/editForm/${reportNo}`}>Edit</Button>
                          </Span>
                        )}
                      </>
                    ) : (
                      <Span color={Color(info.status)}>{info.status}</Span>
                    )}
                  </Tbody>
                  <Tbody>
                    {" "}
                    <Span>
                      <Button
                        to={`/pdfviewer/${reportNo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF
                      </Button>
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
          totalCount={tabData.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
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
  // min-height: 300px;
  box-sizing: border-box;
  width: 100%;
`;

const TableTr = styled.tr``;

const TableHeader = styled.th`
  border-bottom: 1px solid lightgrey;
  text-align: left;
  justify-content: center;
  height: 50px;
  padding-bottom: 0.5rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`;

const Tbody = styled.td`
  text-align: left;
  border-bottom: 0.5px solid lightgrey;
  padding: 15px 0;
  font-size: 12px;
`;

const Span = styled.span`
  background-color: ${(props) => props.color};
  padding: 5px 5px;
  color: white;
  font-weight: 500;
  border-radius: 5px;
`;

const Button = styled(Link)`
  color: blue;
`;

const PaginationContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 20px;
  margin: 20px 0;
`;
export default Table;
