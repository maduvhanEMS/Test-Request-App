import axios from "axios";

const API = "http://localhost:5000/api/developments";

const createDevelopment = async (data) => {
  const response = await axios.post(API, data);

  return response.data;
};

const developmentService = {
  createDevelopment,
};

export default developmentService;
