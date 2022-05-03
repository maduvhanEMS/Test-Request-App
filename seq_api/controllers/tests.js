const models = require("../models");

const addTest = async (req, res) => {
  try {
    const test = await models.Test.create(req.body);

    return res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTests = async (req, res) => {
  try {
    const test = await models.Test.findAll({
      include: [{ model: models.Facility, as: "tests" }],
    });

    res.set("Content-Range", `headers ${test.length}/${test.length}`);
    return res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTest = async (req, res) => {
  console.log(req.params.headerId);
  try {
    const result = await models.Test.findOne({
      where: { id: req.params.headerId },
    });
    if (result) {
      const test = await models.Test.update(req.body, {
        where: { id: req.params.testId },
      });
      return res.status(200).json(test);
    }

    return res.status(500).json({ message: "Record not available" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTest = async (req, res) => {
  try {
    const test = await models.Test.findOne({
      where: { id: req.params.id },
      include: [{ model: models.Facility, as: "header" }],
    });

    res.set("Content-Range", `headers ${test.length}/${test.length}`);
    return res.status(200).json(test);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addTest, getTests, updateTest, getTest };
