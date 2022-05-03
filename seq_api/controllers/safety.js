const models = require("../models");

const addSafety = async (req, res) => {
  try {
    console.log(req.body);
    const safety = await models.Safety.create(req.body);

    return res.status(200).json("Created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSafetys = async (req, res) => {
  try {
    const safety = await models.Safety.findAll({
      include: [{ model: models.Facility, as: "safety" }],
    });

    res.set("Content-Range", `safety ${safety.length}/${safety.length}`);
    return res.status(200).json(safety);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSafetys = async (req, res) => {
  console.log(req.params.headerId);
  try {
    const result = await models.Safety.findOne({
      where: { id: req.params.safetyId },
    });
    if (result) {
      const safety = await models.Safety.update(req.body, {
        where: { id: req.params.safetyId },
      });
      return res.status(200).json(safety);
    }

    return res.status(500).json({ message: "Record not available" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSafety = async (req, res) => {
  try {
    const safety = await models.Safety.findOne({
      where: { id: req.params.id },
      include: [{ model: models.Facility, as: "safety" }],
    });

    res.set("Content-Range", `safety ${header.length}/${header.length}`);
    return res.status(200).json(safety);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addSafety, getSafetys, updateSafetys, getSafety };
