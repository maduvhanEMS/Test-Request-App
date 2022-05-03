const models = require("../models");

const getCCTestInformation = async (req, res) => {
  try {
    const testinfo = await models.CCTestInformation.findAll({});
    return res.status(200).json(testinfo);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getCCTestInformationById = async (req, res) => {
  try {
    const testinfo = await models.CCTestInformation.findAll({
      where: { reportNo: req.params.reportNo },
    });

    return res.status(200).json(testinfo);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const addCCTestInformation = async (req, res) => {
  const { test_information, testRequestId, reportNo, facility_name } = req.body;
  try {
    if (test_information || testRequestId || reportNo) {
      //check for facility nam
      if (facility_name.toLowerCase().includes("combustible")) {
        for (const element of test_information) {
          element["testRequestId"] = testRequestId;
          element["reportNo"] = reportNo;
          element["CCC_Slurry_Batch_No"] = element["CCC Slurry Batch No."];
          element["CCC_No"] = element["CCC No."];
          element["Coating_date"] = element["Coating Date"];
          element["Coating_venue"] = element["Coating Venue"];
          element["Coating_number"] = element["Coating Number"];
          element["Coating_mass"] = element["Coating Mass [g]"];
          element["Marked"] = element["Marks"];
          element["Dry_mass"] = element["Dry Mass"];

          await models.CCTestInformation.create(element);
        }

        return res.status(200).json({ message: "successfully added" });
      } else {
        return res.status(401).json({ message: "Bad request" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please add populate test information" });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateCCTestInformation = async (req, res) => {
  const { testInformation } = req.body;
  const { reportNo } = req.params;

  try {
    if (testInformation && reportNo) {
      const result = await models.CCTestInformation.findOne({
        where: { reportNo: reportNo },
      });

      if (result) {
        console.log(result);
        for (const element of testInformation) {
          let obj = {};
          obj["id"] = parseInt(Object.keys(element)[0]);
          obj["Received"] = Object.values(element)[0];
          await models.CCTestInformation.update(
            {
              Received: obj.Received,
            },
            { where: { id: obj.id } }
          );
        }
        return res.status(201).json({ message: "successfully updated" });
      } else {
        return res
          .status(400)
          .json({ message: "Report Number does not exist" });
      }
    }

    if (reportNo) {
      const result = await models.CCTestInformation.findOne({
        where: { reportNo: reportNo },
      });
      if (result) {
        if (req.body.formData) {
          for (const element of req.body.formData) {
            const updatedInformation = await models.CCTestInformation.update(
              { file: element.file },
              {
                where: { id: element.id },
              }
            );
          }
        }

        return res.status(201).json({ message: "Successfully updated" });
      } else {
        return res
          .status(400)
          .json({ message: "Report Number does not exist" });
      }
    }
    return res.status(400).json({ message: "No test Information data" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getCCTestInformation,
  addCCTestInformation,
  getCCTestInformationById,
  updateCCTestInformation,
};
