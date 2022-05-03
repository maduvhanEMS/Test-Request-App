const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({
      include: [
        {
          model: models.Facility,
          as: "facility",
        },
      ],
    });
    res.set("Content-Range", `products ${products.length}}/${products.length}`);

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  const { product_name } = req.body;
  try {
    const results = await models.Product.findOne({
      where: { product_name: product_name },
    });
    if (results !== null) {
      return res.status(401).json({ message: "Record already exist" });
    }

    const product = await models.Product.create(req.body);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const facility = await models.Facility.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await models.Product.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: models.Facility,
          as: "facility",
        },
      ],
    });

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByName = async (req, res) => {
  console.log(req.params);
  try {
    const products = await models.Product.findAll({
      where: { product_name: { [Op.any]: JSON.parse(req.params.name) } },
    });

    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await models.Product.findOne({
      where: { id: productId },
    });

    if (product) {
      const updateProdct = await models.Product.update(req.body, {
        where: { id: productId },
      });
      return res.status(200).json(updateProdct);
    }
    return res.status(400).json({ message: "Record does not exist" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  getProduct,
  getProductsByName,
};
