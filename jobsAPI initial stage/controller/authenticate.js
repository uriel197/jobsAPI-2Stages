const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bycrypt = require("bycrypt.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bycrypt.genSalt(10);
  const hashedPassword = await bycrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };

  const user = await User.create({ ...tempUser });
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWTSECRET,
    { expiresIn: process.env.LIFETIME }
  );

  res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequestError("Please fill out all fields");
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError("Invalid credentials");
  const isPasswordCorrect = await bycrypt.compare(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  const token = jwt.sign(
    { userId: user._id, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

module.exports = { register, login };
