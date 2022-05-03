import axios from "axios";

const API = "http://localhost:5000/api/";

const get_testInformation = async (id) => {
  const response = await axios.get(`${API}/CCtest_information/${id}`);
  return response.data;
};

const createTestInformation = async (data) => {
  const response = await axios.post(API + "CCtest_information", data);
  return response.data;
};

const update_testInformation = async (data) => {
  const response = await axios.put(
    `${API}/CCtest_information/${data.reportNo}`,
    data
  );
  return response.data;
};

const CCTestInformationService = {
  createTestInformation,
  get_testInformation,
  update_testInformation,
};

export default CCTestInformationService;
