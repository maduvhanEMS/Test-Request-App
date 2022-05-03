const express = require("express");
const {
  getDepartments,
  addDepartment,
  getDepartment,
  updateDepartment,
} = require("../controllers/departments");
const {
  getFacilities,
  addFacility,
  deleteFacility,
  getFacilityById,
} = require("../controllers/facilities");
const {
  addHeader,
  getHeaders,
  updateHeaders,
  getHeader,
} = require("../controllers/header");
const {
  getProducts,
  getProductsByName,
  addProduct,
  updateProduct,
  getProduct,
} = require("../controllers/products");
const {
  addSafety,
  getSafetys,
  updateSafetys,
  getSafety,
} = require("../controllers/safety");
const {
  getTestInformation,
  addTestInformation,
  getTestInformationById,
  updateTestInformation,
} = require("../controllers/testInformation");

const {
  addTest,
  getTests,
  updateTest,
  getTest,
} = require("../controllers/tests");
const {
  getSchedule,
  updateTestSchedule,
  updateTestScheduleBydD,
  addTestSchedule,
} = require("../controllers/testSchedule");
const { registerUser, loginUser, getUser } = require("../controllers/users");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

//users
router.post("/users", registerUser);
router.post("/users/login", loginUser);
router.post("/users/me", protect, getUser);

//schdule
router.route("/testSchedule").get(getSchedule).post(addTestSchedule);

router.put("/testSchedule", updateTestSchedule);
router.put("/testSchedules/:id", updateTestScheduleBydD);

//facilities
router.get("/facilities", getFacilities);
router.post("/facilities/create", addFacility);
router.delete("/facilities/:id", deleteFacility);
router.get("/facilities/:id", getFacilityById);

//departments
router.get("/departments", getDepartments);
router.get("/departments/:id", getDepartment);
router.post("/departments/create", addDepartment);
router.put("/departments/:departmentId", updateDepartment);

//test information
// router.get("/test_information", getTestInformation);
// router.post("/test_information", addTestInformation);
// router.get("/test_information/:reportNo", getTestInformationById);
// router.put("/test_information/:reportNo", updateTestInformation);
//headers
router.post("/headers/create", addHeader);
router.get("/headers", getHeaders);
router.put("/headers/:headerId", updateHeaders);
router.get("/headers/:id", getHeader);
//tests
router.post("/tests/create", addTest);
router.get("/tests", getTests);
router.put("/tests/:testId", updateTest);
router.get("/tests/:id", getTest);

//headers
router.post("/safety/create", addSafety);
router.get("/safety", getSafetys);
router.put("/safety/:safetyId", updateSafetys);
router.get("/safety/:id", getSafety);

module.exports = router;
