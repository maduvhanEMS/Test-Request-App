import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import Stats from "../Components/Card_stats/Stats";
import BarPlot from "../Components/Graphs/BarPlot";
import LineGraph from "../Components/Graphs/LineGraph";
import { Container } from "../globalStyles";
import { lineGraphData, set } from "../Assets/Data/GraphData";
import Table from "../Components/Tables/Table";
import FilterForm from "../Components/Forms/FilterForm";
import { useDispatch, useSelector } from "react-redux";
import WeeklyCalendar from "../Components/Calendar/WeeklyCalendar";
import BookInMain from "../Components/Tables/BookInMain";
import { fetchFacilities } from "../features/facility/facilitySlice";
import { fetchDepartments } from "../features/department/departmentSlice";
import { get_requests, reset } from "../features/Tests/testSlice";
import Loader from "../Components/Loader/Loader";
import moment from "moment";
import { getTestSchedule } from "../features/testSchedule/testScheduleSlice";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const { schedule } = useSelector((state) => state.schedule);
  const dispatch = useDispatch();

  const params = useMemo(
    () => new URLSearchParams(window.location.search),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new URLSearchParams(window.location.search)]
  );
  const page = parseInt(params.get("page")) || 1;

  const { isLoading, testData } = useSelector((state) => state.testRequest);
  const { user } = useSelector((state) => state.auth);

  // console.log(testData);

  useEffect(() => {
    const data = { page, status: "Received" };
    dispatch(fetchFacilities());
    dispatch(fetchDepartments());
    // dispatch(get_requests());
    dispatch(getTestSchedule());

    dispatch(get_requests(data));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, page]);

  const days = (day) => {
    var now = moment(new Date()); //todays date
    var end = moment(day); // another date
    var duration = moment.duration(now.diff(end));
    return duration.asDays();
  };

  useEffect(() => {
    const filterData = testData?.filter(
      (item) => days(moment(item.createdAt)) > 3
    );
    setData(filterData);
  }, [testData]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      {/* <TopSecton data="Dashboard" /> */}
      <Stats />
      <GraphCard height="400px" style={{ marginBottom: "20px" }}>
        <TextContent>Weekly Schedule</TextContent>
        <WeeklyCalendar currentEvents={schedule} />
      </GraphCard>
      <GraphCard style={{ marginBottom: "20px" }}>
        <TextContent>Overdue BookIn</TextContent>
        <BookInMain data={testData} currentUser={user} />
      </GraphCard>
      <GraphCard height="500px">
        <LineGraph data={set} />
      </GraphCard>
      <GraphContainer>
        <GraphCard>
          <BarPlot data={lineGraphData} />
        </GraphCard>
        <GraphCard>
          <LineGraph data={lineGraphData} />
        </GraphCard>
      </GraphContainer>
      <TableContainer>
        <FilterContainer>
          <Text>Test Summary: {new Date().getFullYear()}</Text>
          {/* <FilterForm handleChange={handleChange} data={requests} /> */}
        </FilterContainer>
        {/* <Table data={tabData} /> */}
      </TableContainer>
    </Container>
  );
};

export default Dashboard;

const GraphContainer = styled.div`
  display: grid;
  margin: 20px 0;
  // padding: 0 20px;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
`;

const GraphCard = styled.div`
  height: ${(props) => props.height};
  padding: 30px;
  width: 100%;
  background-color: white;
`;

const TableContainer = styled.div`
  background-color: white;
`;
const TextContent = styled.h3`
  margin-bottom: 20px;
  color: blue;
`;
const FilterContainer = styled.div`
  display: flex;
  padding: 20px 40px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;
const Text = styled.p`
  font-size: 18px;
  color: grey;
`;
