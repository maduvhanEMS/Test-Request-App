const express = require("express");
const router = express.Router();

const {
  getCCTestInformation,
  addCCTestInformation,
  getCCTestInformationById,
  updateCCTestInformation,
} = require("../controllers/CCTestInformation");

router.get("/CCtest_information", getCCTestInformation);
router.post("/CCtest_information", addCCTestInformation);
router.get("/CCtest_information/:reportNo", getCCTestInformationById);
router.put("/CCtest_information/:reportNo", updateCCTestInformation);

module.exports = router;
