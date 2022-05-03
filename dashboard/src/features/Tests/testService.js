import axios from "axios";

const API = "http://localhost:5000/api";

const sendData = async (testdata) => {
  const response = await axios.post(
    "http://localhost:5000/api/test_requests/create",
    testdata
  );
  return response.data;
};

const getTestData = async (data) => {
  let response;
  if (data.search) {
    response = await axios.get(
      `${API}/test_requests?page=${data.page}&status=${data.status}&search=${data.search}`
    );
  } else {
    response = await axios.get(
      `${API}/test_requests?page=${data.page}&status=${data.status}`
    );
  }

  return response.data;
};

const getTestDataByID = async (reportNo) => {
  const response = await axios.get(`${API}/test_requests/${reportNo}`);
  return response.data;
};
const getTestDataByFacilityId = async (facility) => {
  const response = await axios.get(
    `${API}/Alltest_requests/${facility.facilityId}`
  );
  return response.data;
};

const getId = async (facility) => {
  const response = await axios.get(`${API}/test_request/latestId`);
  return response.data;
};

const updateTest = async (data) => {
  const response = await axios.put(
    `${API}/test_requests/${data.reportNo}`,
    data
  );
  return response.data;
};
// get data
const testService = {
  sendData,
  getTestData,
  getTestDataByID,
  updateTest,
  getTestDataByFacilityId,
  getId,
};

export default testService;
