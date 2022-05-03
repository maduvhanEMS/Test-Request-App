import axios from "axios";

const API = "http://localhost:5000/api/";

const createTestSchedule = async (scheduleData) => {
  const response = await axios.post(API + "testSchedule", scheduleData);
  return response.data;
};

const updateTestSchedule = async (data) => {
  const response = await axios.put(
    `${API}/testSchedule?reportNo=${data.reportNo}&id=${data.id}`,
    data
  );
  return response.data;
};

const getTestSchedule = async () => {
  const response = await axios.get(`${API}/testSchedule`);
  return response.data;
};
// get data
const testScheduleService = {
  createTestSchedule,
  updateTestSchedule,
  getTestSchedule,
};

export default testScheduleService;
