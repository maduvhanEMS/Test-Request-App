import axios from "axios";

const API = "http://localhost:5000/api/";

const getProductsByName = async (data) => {
  const response = await axios.get(`${API}/product/${data}`);
  return response.data;
};

const createProduct = async (data) => {
  const response = await axios.post(`${API}/products`, data);
  return response.data;
};
// get data
const productsService = {
  getProductsByName,
  createProduct,
};

export default productsService;
