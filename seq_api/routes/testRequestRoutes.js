const express = require("express");
const router = express.Router();

const {
  getTestRequests,
  addTestRequest,
  getTestRequestbyId,
  updateTestRequestbyId,
  getAllTestRequest,
  getLastID,
} = require("../controllers/testrequest");

//test request
router.get("/test_requests", getTestRequests);
router.get("/test_requests/:reportNo", getTestRequestbyId);
router.post("/test_requests/create", addTestRequest);
router.put("/test_requests/:reportNo", updateTestRequestbyId);
router.get("/Alltest_requests/:facilityId", getAllTestRequest);
router.get("/test_request/latestId", getLastID);

module.exports = router;
