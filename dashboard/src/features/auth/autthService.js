import axios from "axios";

const API = "http://localhost:5000/api/";

const login = async (formData) => {
  console.log("SUbmit", formData);
  const response = await axios.post(`${API}/users/login`, formData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

// get data
const authService = {
  login,
  logout,
};

export default authService;
