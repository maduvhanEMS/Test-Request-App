import axios from "axios";

//http request

const API = "http://localhost:5000/api/";

// get data
const getDepartments = async () => {
  const response = await axios.get("http://localhost:5000/api/departments");

  return response.data;
};

const departmentService = {
  getDepartments,
};

export default departmentService;
