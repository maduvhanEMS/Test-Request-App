import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import { get_requests } from "../../features/Tests/singleTestSlice";
import PaginationFront from "../Pagination/PaginationFront";

let PageSize = 2;

const BookInMain = ({ data, currentUser }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data?.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);
  const { register } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Color = (status) => {
    if (status === "Completed") {
      return "green";
    } else if (status === "Received") {
      return "purple";
    } else if (status === "In Progress") {
      return "blue";
    } else if (status === "Booked In") {
      return "Orange";
    }
  };

  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (currentTableData) {
      const array = currentTableData?.map((item) => false);
      setChecked(array);
    }
  }, [currentTableData]);

  const handleChange = (e, i) => {
    let check = [...checked];
    check[i] = !checked[i];

    setChecked(check);
    if (check[i] === true) {
      toast(`${e.target.name} selected`);
    }
  };

  const handleSubmit = (id) => {
    // dispatch(getTestInformation(id));
    dispatch(get_requests(id));

    navigate(`/bookin/${id}`);
  };

  return (
    <Container>
      <TableContainer>
        <thead>
          <TableTr>
            <TableHeader>Test ID</TableHeader>
            <TableHeader>Requestor</TableHeader>
            <TableHeader>Product Name</TableHeader>
            <TableHeader>Test(s)</TableHeader>
            <TableHeader>Section</TableHeader>
            <TableHeader>Created At</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableTr>
        </thead>

        <tbody>
          {currentTableData?.length > 0 &&
            currentTableData?.map((item, index) => {
              const {
                products,
                reportNo,
                user,
                tests,
                test,
                createdAt,
                testSchedule,
              } = item;

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
                  <Tbody>
                    <form>
                      {testSchedule?.length > 0 &&
                        testSchedule[0].status === "Received" &&
                        !currentUser?.isAdmin && (
                          <input
                            type="checkbox"
                            checked={checked?.[index]}
                            {...register(`${reportNo}`, {
                              onChange: (e) => {
                                handleChange(e, index);
                              },
                            })}
                          />
                        )}
                      {reportNo}
                    </form>
                  </Tbody>
                  <Tbody>{user?.username}</Tbody>
                  <Tbody>{products.join(" & ")}</Tbody>
                  <Tbody>{modifiedTest}</Tbody>
                  <Tbody>{test?.facility_name}</Tbody>
                  <Tbody> {moment(createdAt, "YYYY-MM-DD").fromNow()}</Tbody>
                  <Tbody>
                    <Span
                      color={Color(
                        testSchedule?.length > 0 && testSchedule[0].status
                      )}
                    >
                      {testSchedule?.length > 0 && testSchedule[0].status}
                    </Span>
                    {checked?.[index] && (
                      <button
                        style={{
                          marginLeft: "10px",
                          color: "blue",
                          fontSize: "16px",
                          background: "none",
                        }}
                        onClick={() => handleSubmit(reportNo)}
                      >
                        Book In
                      </button>
                    )}
                  </Tbody>
                </TableTr>
              );
            })}
        </tbody>
      </TableContainer>
      {!currentTableData?.length > 0 && (
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
      </PaginationContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: white;
  padding: 10px 40px;
`;

const TableContainer = styled.table`
  border-collapse: collapse;
  z-index: 9999;
  box-sizing: border-box;
  width: 100%;
`;

const TableTr = styled.tr`
  input {
    padding: 0.5rem;
    margin: 0.5em;
    border: none;
    border-radius: 3px;
    outline: 1px solid ${(props) => (props.color ? "red" : "blue")};
    background: papayawhip;
  }

  button {
    font-size: 24px;
    font-weight: 600;
    padding: 2px 2px;
    border: none;
    border-radius: 50%;
    line-height: 20px;
    cursor: pointer;
    color: white;
    background-color: ${(props) => (props.add ? "blue" : "red")};
  }
`;

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
  padding: 15px 0;
  font-size: 12px;

  form {
    align-items: center;
    display: flex;
  }
`;

const Span = styled.span`
  background-color: ${(props) => props.color};
  padding: 5px 5px;
  color: white;
  font-weight: 500;
  border-radius: 5px;
`;

const Button = styled.button`
  text-transform: uppercase;
  align-items: right;
  justify-content: right;

  padding: 5px 10px;
  margin-top: 10px;
  color: blue;
  background-color: smokewhite;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const PaginationContainer = styled.div`
  background-color: white;
  width: 100%;
  height: 20px;
  margin: 20px 0;
`;

export default BookInMain;
