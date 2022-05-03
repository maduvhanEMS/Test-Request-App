const express = require("express");
const { createDevelopment } = require("../controllers/development");
const router = express.Router();

//test request
router.post("/developments", createDevelopment);

module.exports = router;
