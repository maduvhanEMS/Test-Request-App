const models = require("../models");

//create (Developoment)

const createDevelopment = async (req, res) => {
  const { group, reportNo, safety, testRequestId, exp_class, cost_centre } =
    req.body;
  const newDev = await models.Development.create({
    group,
    reportNo,
    testRequestId,
    exp_class,
    safety,
    cost_centre,
  });

  res.status(200).json(newDev);
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createDevelopment };
