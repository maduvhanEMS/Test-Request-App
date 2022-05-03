const express = require("express");
const { postDimensions } = require("../controllers/UploadFile");

const router = express.Router();

router.post("/dimensions", postDimensions);

module.exports = router;
