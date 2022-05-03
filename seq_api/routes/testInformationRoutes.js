const express = require("express");
const router = express.Router();

const {
  getTestInformation,
  addTestInformation,
  getTestInformationById,
  updateTestInformation,
} = require("../controllers/testInformation");

router.get("/test_information", getTestInformation);
router.post("/test_information", addTestInformation);
router.get("/test_information/:reportNo", getTestInformationById);
router.put("/test_information/:reportNo", updateTestInformation);

module.exports = router;
