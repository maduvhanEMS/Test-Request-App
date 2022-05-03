const models = require("../models");
const asyncHandler = require("express-async-handler");

const getSchedule = asyncHandler(async (req, res) => {
  const results = await models.TestSchedule.findAll({
    where: { status: "In Progress" },
  });
  if (results) {
    res.status(200).json(results);
  } else {
    res.status(401);
    throw new Error("No Information");
  }
});

const addTestSchedule = asyncHandler(async (req, res) => {
  const results = await models.TestSchedule.create(req.body);
  res.status(200).json(results);
  throw new Error("No data");
});

const updateTestSchedule = async (req, res) => {
  const { reportNo, id } = req.query;

  try {
    if (reportNo !== "undefined") {
      const results = await models.TestSchedule.findOne({
        where: { reportNo: reportNo },
      });
      if (results) {
        const test = await models.TestSchedule.update(req.body, {
          where: { reportNo: reportNo },
        });
        return res.status(200).json(test);
      }
      res.status(401);
      throw new Error(`${reportNo} does not exist`);
    } else {
      const results = await models.TestSchedule.findOne({
        where: { id: id },
      });
      if (results) {
        const test = await models.TestSchedule.update(req.body, {
          where: { id: id },
        });
        return res.status(200).json(test);
      }
      res.status(401);
      throw new Error(`${reportNo} does not exist`);
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateTestScheduleBydD = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await models.TestSchedule.findOne({
      where: { id: id },
    });
    if (results) {
      const test = await models.TestSchedule.update(req.body, {
        where: { id: id },
      });
      return res.status(200).json({ test });
    }
    res.status(401);
    throw new Error(`${reportNo} does not exist`);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getSchedule,
  addTestSchedule,
  updateTestSchedule,
  updateTestScheduleBydD,
};
