const models = require("../models");

const addHeader = async (req, res) => {
  try {
    console.log(req.body);
    const header = await models.Header.create(req.body);

    return res.status(200).json("Created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHeaders = async (req, res) => {
  try {
    const header = await models.Header.findAll({
      include: [{ model: models.Facility, as: "header" }],
    });

    res.set("Content-Range", `headers ${header.length}/${header.length}`);
    return res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateHeaders = async (req, res) => {
  console.log(req.params.headerId);
  try {
    const result = await models.Header.findOne({
      where: { id: req.params.headerId },
    });
    if (result) {
      const header = await models.Header.update(req.body, {
        where: { id: req.params.headerId },
      });
      return res.status(200).json(header);
    }

    return res.status(500).json({ message: "Record not available" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHeader = async (req, res) => {
  try {
    const header = await models.Header.findOne({
      where: { id: req.params.id },
      include: [{ model: models.Facility, as: "header" }],
    });

    res.set("Content-Range", `headers ${header.length}/${header.length}`);
    return res.status(200).json(header);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addHeader, getHeaders, updateHeaders, getHeader };
