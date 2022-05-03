const models = require("../models");

const getTestInformation = async (req, res) => {
  try {
    const testinfo = await models.TestInformation.findAll({});
    return res.status(200).json(testinfo);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getTestInformationById = async (req, res) => {
  console.log("reportNo", req.params.reportNo);
  try {
    const testinfo = await models.TestInformation.findAll({
      where: { reportNo: req.params.reportNo },
    });

    return res.status(200).json(testinfo);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const addTestInformation = async (req, res) => {
  const { test_information, testRequestId, reportNo, facility_name } = req.body;
  try {
    if (test_information || testRequestId || reportNo) {
      //check for facility nam
      if (facility_name.toLowerCase().includes("flare")) {
        for (const element of test_information) {
          element["testRequestId"] = testRequestId;
          element["reportNo"] = reportNo;
          element["description"] = element["Lot No."];
          element["batch_no"] = element["Batch No."];
          element["sample"] = element["Quantity"];
          element["marking"] = element["Marking"];
          element["condition"] = element["Condition"];

          await models.TestInformation.create(element);
        }

        return res.status(200).json({ message: "successfully added" });
      } else {
        for (const element of test_information) {
          element["testRequestId"] = testRequestId;
          element["reportNo"] = reportNo;
          element["batch_no"] = element["Batch No."];
          await models.TestInformation.create(element);
        }
        return res.status(200).json({ message: "successfully added" });
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

const updateTestInformation = async (req, res) => {
  const { testInformation } = req.body;
  const { reportNo } = req.params;

  try {
    if (testInformation && reportNo) {
      const result = await models.TestInformation.findOne({
        where: { reportNo: reportNo },
      });

      if (result) {
        for (const element of testInformation) {
          let obj = {};
          obj["id"] = parseInt(Object.keys(element)[0]);
          obj["Received"] = Object.values(element)[0];
          await models.TestInformation.update(
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
      const result = await models.TestInformation.findOne({
        where: { reportNo: reportNo },
      });
      if (result) {
        if (req.body.formData) {
          for (const element of req.body.formData) {
            const updatedInformation = await models.TestInformation.update(
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
  getTestInformation,
  addTestInformation,
  getTestInformationById,
  updateTestInformation,
};
