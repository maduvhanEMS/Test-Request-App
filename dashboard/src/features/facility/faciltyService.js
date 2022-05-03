import axios from "axios";

//http request

const API = "http://localhost:5000/api/";

// get data
const getFacilities = async () => {
  const response = await axios.get("http://localhost:5000/api/facilities");

  return response.data;
};

// get data
const getFacility = async (id) => {
  console.log(id);
  const response = await axios.get(`${API}/facilities/${id}`);

  return response.data;
};

const facilityService = {
  getFacilities,
  getFacility,
};

export default facilityService;
