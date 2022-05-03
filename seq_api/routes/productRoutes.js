const {
  getProducts,
  getProductsByName,
  addProduct,
  updateProduct,
  getProduct,
} = require("../controllers/products");
const express = require("express");

const router = express.Router();
//products
router.get("/products", getProducts);
router.get("/product/:name", getProductsByName);
router.get("/products/:id", getProduct);
router.post("/products", addProduct);
router.put("/products/:productId", updateProduct);

module.exports = router;
