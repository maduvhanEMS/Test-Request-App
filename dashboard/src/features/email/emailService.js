import axios from "axios";

const API = "http://localhost:5000/api/";

const sendRequestEmail = async (emailData) => {
  const response = await axios.post(API + "testOfficer", emailData);
  return response.data;
};

const emailService = {
  sendRequestEmail,
};

export default emailService;
