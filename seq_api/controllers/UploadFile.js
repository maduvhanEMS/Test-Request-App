const asyncHandler = require("express-async-handler");
const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const models = require("../models");

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("File type not accepted (.png, .jpg, .jpeg)"));
    }
  },
});

router.post(
  "/upload",
  upload.array("file"),
  asyncHandler(async (req, res, next) => {
    const reqFiles = [];

    const url = req.protocol + "://" + req.get("host");

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/public/" + req.files[i].filename);
    }

    //update  the state
    let results = [];
    for (let i = 0; i < req.body.id.length; i++) {
      const testInfo = await models.TestInformation.findOne({
        where: { id: parseInt(req.body.id[i]) },
      });

      if (testInfo) {
        const updateState = await models.TestInformation.update(
          { file: reqFiles[i], filename: req.body.filename[i] },
          { where: { id: parseInt(req.body.id[i]) } }
        );
        results.push(updateState);
      }
    }

    res.status(200).json(results);
  })
);

router.post(
  "/uploadReports",
  upload.array("file"),
  asyncHandler(async (req, res, next) => {
    const reqFiles = [];

    const url = req.protocol + "://" + req.get("host");

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push(url + "/public/" + req.files[i].filename);
    }

    //update  the state
    let results = [];
    for (let i = 0; i < req.body.reportNo.length; i++) {
      // create an object
      let obj = {};
      obj[req.body.testname[i]] = reqFiles[i] === undefined ? "" : reqFiles[i];
      results.push(obj);
    }

    if (reqFiles.length > 0) {
      const testInfo = await models.TestSchedule.findOne({
        where: { reportNo: req.body.reportNo[0] },
      });

      if (testInfo) {
        const updateState = await models.TestSchedule.update(
          { files: results },
          { where: { reportNo: req.body.reportNo[0] } }
        );

        res.status(200).json(updateState);
      }
    } else {
      res.status(404);
      throw new Error("No record found");
    }
  })
);

module.exports = router;
