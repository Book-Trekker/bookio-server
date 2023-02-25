const tryCatch = require("../middleware/tryCatch");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// create a new user
exports.registerUser = tryCatch(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "test Routes",
  });
});
