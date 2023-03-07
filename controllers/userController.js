const tryCatch = require("../middleware/tryCatch");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// create a new user
exports.registerUser = tryCatch(async (req, res, next) => {
  const userData = req.body;
  const { name, email, password } = userData;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
  });
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  res.status(200).json({
    success: true,
    user,
    token,
  });
});

// Login user
exports.loginUser = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  /**  Check is user  given email and password  */
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password"));
  }
  /** if user not finding on database  */
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid user email or password"));
  }
  /** Check user password is isValid */
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid user email or password"));
  }

  /** sign token  */
  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "5h",
  });
  res.status(200).json({
    success: true,
    user,
    token,
  });
});
