const { Department } = require("../models");

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll({});
    res.set(
      "Content-Range",
      `departments ${departments.length}/${departments.length}`
    );
    return res.status(200).json(departments);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const getDepartment = async (req, res) => {
  try {
    const department = await Department.findOne({
      where: { id: req.params.id },
    });
    return res.status(200).json(department);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const addDepartment = async (req, res) => {
  const { department_name } = req.body;
  try {
    if (department_name) {
      const result = await Department.findOne({
        where: {
          department_name: department_name,
        },
      });
      if (result !== null) {
        res.status(400).json({ message: "Record already exist" });
        return;
      }
    }

    const department = await Department.create(req.body);
    return res.status(200).json(department);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const result = Department.FindOne({ where: { id: departmentId } });
    if (result) {
      const department = await Department.Update(req.body, {
        where: { id: req.params.id },
      });
      return res.status(200).json(department);
    }
    return res.status(400).json({ message: error.message });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  getDepartments,
  addDepartment,
  getDepartment,
  updateDepartment,
};
