const models = require("../models");

const getFacilities = async (req, res) => {
  try {
    const facility = await models.Facility.findAll({
      include: [
        { model: models.Product, as: "facility" },
        { model: models.Header, as: "header" },
        { model: models.Test, as: "tests" },
        { model: models.Safety, as: "safety" },
      ],
    });
    res.set("Content-Range", ` facility ${facility.length}/${facility.length}`);
    return res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get facility by id

const getFacilityById = async (req, res) => {
  try {
    const facility = await models.Facility.findOne({
      where: { id: req.params.id },
      include: [
        { model: models.Product, as: "facility" },
        { model: models.Header, as: "header" },
        { model: models.Test, as: "tests" },
        { model: models.Safety, as: "safety" },
      ],
    });
    return res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addFacility = async (req, res) => {
  const { facility_name } = req.body;
  try {
    const results = await models.Facility.findOne({
      where: { facility_name: facility_name },
    });
    if (results !== null) {
      return res.status(401).json({ message: "Record already exist" });
    }

    const facility = await models.Facility.create(req.body);
    return res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const facility = await models.Facility.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getFacilities,
  addFacility,
  deleteFacility,
  getFacilityById,
};
