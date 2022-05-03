const { sequelize } = require("../models");
const { Op } = require("@sequelize/core");
const models = require("../models");
const date = new Date();
const paginate = require("jw-paginate");
const asyncHandler = require("express-async-handler");

const getTestRequests = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = req.query.limit || 5;
  const skip = (page - 1) * limit;
  const status = req.query.status;
  const search = req.query.search ? req.query.search : "";

  try {
    let data;
    if (status) {
      data = await models.TestRequest.findAll({
        where: {
          status: "Approved",
          reportNo: { [Op.startsWith]: search },
        },
        include: [
          { model: models.Product, as: "product" },
          {
            model: models.Facility,
            as: "test",
          },
          { model: models.TestInformation, as: "test_information" },

          { model: models.User, as: "user" },
          { model: models.CCTestInformation, as: "CC_info" },
          {
            model: models.TestSchedule,
            as: "testSchedule",
            where: { status: status },
          },
        ],
        order: sequelize.col("createdAt"),
      });
    } else {
      data = await models.TestRequest.findAll({
        include: [
          { model: models.Product, as: "product" },
          {
            model: models.Facility,
            as: "test",
          },
          { model: models.TestInformation, as: "test_information" },

          { model: models.User, as: "user" },
          { model: models.CCTestInformation, as: "CC_info" },
          {
            model: models.TestSchedule,
            as: "testSchedule",
          },
        ],
        order: sequelize.col("createdAt"),
      });
    }

    const allItems = status
      ? await models.TestRequest.findAll({ where: { status: status } })
      : await models.TestRequest.findAll({});
    const pageSize = Math.ceil(allItems.length / limit);

    const pager = paginate(allItems.length, page, limit);
    console.log(pager);

    return res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getLastID = asyncHandler(async (req, res) => {
  const latest = await models.TestRequest.findAll({
    order: [["id", "DESC"]],
    limit: 1,
    raw: true,
    nest: true,
  });
  const id = latest[0].id ? parseInt(latest[0].id) : 0;

  res.status(200).json(id);
});

const addTestRequest = async (req, res) => {
  const { facilityId, test_information, productId } = req.body;
  try {
    // const latest = await models.TestRequest.findAll({
    //   attributes: { exclude: ["tests", "test_desciption", "facilityId"] },
    //   include: [{ model: models.Facility, as: "test" }],
    //   order: [["id", "DESC"]],
    //   limit: 1,
    //   raw: true,
    //   nest: true,
    // });

    // const productName = await models.Product.findOne({
    //   where: { id: productId },
    // });

    // let id;
    // if (latest.length > 0) {
    //   id = parseInt(latest[0].id) + 1;
    // } else {
    //   id = 1;
    // }

    // const testRequestId = id;

    // let reportNo;
    // // create report number
    // if (facilityId === 1) {
    //   reportNo = "CV0" + id;
    // } else {
    //   reportNo = "SAM0" + id;
    // }
    if (test_information) {
      // const data = req.body;
      // data["reportNo"] = reportNo;
      // data["title"] = reportNo + "-" + productName.product_name;
      // data["testRequestId"] = testRequestId;

      const test_request = await models.TestRequest.create(req.body);
      // const testSchedule = await models.TestSchedule.create(data);
      // for (const element of test_information) {
      //   element["testRequestId"] = testRequestId;
      //   element["reportNo"] = reportNo;
      //   console.log(test_information);
      //   await models.TestInformation.create(element);
      // }

      return res.status(200).json(test_request);
    }

    throw new Error("Something went wrong");
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getTestRequestbyId = async (req, res) => {
  try {
    const testdata = await models.TestRequest.findOne({
      where: { reportNo: req.params.reportNo },
      include: [
        { model: models.Product, as: "product" },
        {
          model: models.Facility,
          as: "test",
        },
        { model: models.TestInformation, as: "test_information" },
        { model: models.CCTestInformation, as: "CC_info" },
        {
          model: models.TestSchedule,
          as: "testSchedule",
        },
        {
          model: models.Development,
          as: "development",
        },
        {
          model: models.Department,
          as: "department",
        },

        {
          model: models.User,
          as: "user",
          attributes: { exclude: ["password"] },
        },
      ],
    });
    return res.status(200).json(testdata);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getAllTestRequest = async (req, res) => {
  const { facilityId } = req.params;

  const id = req.params.facilityId ? req.params.facilityId : 1;
  try {
    const testdata = await models.TestRequest.findAll({
      where: { facilityId: id },
      include: [
        { model: models.Product, as: "product" },
        {
          model: models.Facility,
          as: "test",
        },
        { model: models.TestInformation, as: "test_information" },
        {
          model: models.TestSchedule,
          as: "testSchedule",
          where: { status: ["Received", "Booked In"] },
        },
      ],
    });
    return res.status(200).json(testdata);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateTestRequestbyId = async (req, res) => {
  try {
    const testdata = await models.TestRequest.findOne({
      where: { reportNo: req.params.reportNo },
      include: [
        { model: models.Product, as: "product" },
        {
          model: models.Facility,
          as: "test",
        },
        { model: models.TestInformation, as: "test_information" },
        {
          model: models.TestSchedule,
          as: "testSchedule",
        },
      ],
    });

    if (testdata) {
      const updatedTest = await models.TestRequest.update(req.body, {
        where: { reportNo: req.params.reportNo },
      });
      return res.status(201).json(updatedTest);
    }
    return res.status(200).json({ message: "Test report no does not exists" });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
module.exports = {
  getTestRequests,
  getTestRequestbyId,
  addTestRequest,
  updateTestRequestbyId,
  getAllTestRequest,
  getLastID,
};
