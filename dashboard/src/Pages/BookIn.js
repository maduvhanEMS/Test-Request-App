import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import ModalForm from "../Components/Modal_form/ModalForm";
import BookInForm from "../Components/Forms/BookInForm";
import BookInMain from "../Components/Tables/BookInMain";
import { useSelector, useDispatch } from "react-redux";
import SearchForm from "../Components/Forms/Search";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { get_requests, reset } from "../features/Tests/testSlice";

const BookIn = () => {
  const navigate = useNavigate();

  const [display, setDisplay] = useState("none");
  const [checkin, setCheckIn] = useState("none");

  const [formData, setFormData] = useState("");
  const [search, setSearch] = useState("");
  const [bookinData, setBookinData] = useState([]);

  const dispatch = useDispatch();

  // const params = new URLSearchParams(
  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new URLSearchParams(window.location.search)]
  );
  const page = parseInt(params.get("page")) ? parseInt(params.get("page")) : 1;
  const status = "Received";

  const { isLoading, testData } = useSelector((state) => state.testRequest);

  useEffect(() => {
    const data = { page, status };
    dispatch(get_requests(data));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, page, search]);

  // let data;
  // let pager;
  // if (testData) {
  //   data = testData.data;
  //   pager = testData.pager;
  // }

  // useEffect(() => {
  //   navigate(`?page=${pager?.currentPage ? pager?.currentPage : 1}`);
  // }, [pager?.currentPage, navigate]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (testData.length > 0) {
      const filtered = testData?.filter((item) => {
        if (isNaN(Number(search))) {
          const sectionName = item.name.toLowerCase();
          return sectionName.includes(search);
        } else {
          const sectionName = parseInt(item.id);
          return sectionName === parseInt(search);
        }
      });

      if (search) {
        setBookinData(filtered);
      } else {
        setBookinData(testData);
      }
    }
  }, [search, testData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* <TopSecton data="BookIn" /> */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "30px",
        }}
      >
        <Button onClick={() => setDisplay("block")}>Book In</Button>
        <SearchForm setSearch={setSearch} search={search} />
      </div>
      <ModalForm display={display} setDisplay={setDisplay}>
        <BookInForm
          checkin={checkin}
          setCheckIn={setCheckIn}
          setDisplay={setDisplay}
          setFormData={setFormData}
          formData={formData}
        />
      </ModalForm>
      <BookInMain data={testData} />
    </Container>
  );
};

export default BookIn;

const Container = styled.div`
  padding: 20px 30px;
  place-items: center;
`;

const Button = styled.button`
  background: white;
  padding: 10px 20px;
  color: white;
  font-weight: 500;
  border-radius: 5px;
  cursor: pointer;
  transition: 2s ease-out;
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.8);
  border: none;
  // z-index: -1;

  &:hover {
    background: skyblue;
    color: black;
  }
`;
