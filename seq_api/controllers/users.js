const models = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, isAdmin } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  //check if a user exist
  const userExist = await models.User.findOne({
    where: { username: username },
  });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create a user
  const user = await models.User.create({
    username: username,
    password: hashedPassword,
    email: email,
    isAdmin: isAdmin,
  });
  np;

  if (user) {
    res.status(201).json({
      id: user.id,
      name: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email } = req.body;

  const password = username === "Guest" ? "guest" : req.body.password;

  //check for username
  const user = await models.User.findOne({
    where: { username: username },
  });
  //compare password
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user.id,
      name: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//Private
const getUser = asyncHandler(async (req, res) => {
  const { id, username, email, isAdmin } = await models.User.findOne({
    where: { id: req.user.id },
  });
  res.status(200).json({
    id: id,
    username: username,
    email: email,
    isAdmin: isAdmin,
  });
});

//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
};
