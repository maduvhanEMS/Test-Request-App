import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import ReportsTable from "../Components/Tables/Reports";
import { Container } from "../globalStyles";
import { useNavigate } from "react-router-dom";
import { get_requests, reset } from "../features/Tests/testSlice";
import Loader from "../Components/Loader/Loader";
import SideModal from "../Components/Modal_form/Sidenodal";

export default function Reports() {
  const [display, setDisplay] = useState("none");
  const [currentId, setCurrentId] = useState(null);
  const [reports, setReports] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new URLSearchParams(window.location.search)]
  );

  const page = parseInt(params.get("page")) ? parseInt(params.get("page")) : 1;

  const { isLoading, testData } = useSelector((state) => state.testRequest);

  useEffect(() => {
    const data = { page, status: "Completed" };
    dispatch(get_requests(data));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, page]);

  // useEffect(() => {
  //   navigate(`?page=${pager?.currentPage ? pager?.currentPage : 1}`);
  // }, [pager?.currentPage, navigate]);

  //update reports data
  useEffect(() => {
    if (currentId) {
      const filter = testData.find((item) => item.reportNo === currentId);
      setReports(filter);
    }
  }, [currentId, testData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <TableContainer>
        <ReportsTable
          data={testData}
          setCurrentId={setCurrentId}
          setDisplay={setDisplay}
        />
      </TableContainer>
      <SideModal
        display={display}
        currentId={currentId}
        setDisplay={setDisplay}
        data={reports}
      />
    </Container>
  );
}

const TableContainer = styled.div`
  margin-top: 20px;
`;
