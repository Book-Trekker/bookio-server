const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    maxLength: [30, "Name cannot exceed 30 character"],
    minLength: [3, "Name should have more  then 3 characters"],
  },
  lname: {
    type: String,
    maxLength: [30, "Name cannot exceed 30 character"],
    minLength: [3, "Name should have more  then 3 characters"],
  },
  shop: {
    type: String,
    maxLength: [40, "shop name cannot exceed 30 character"],
    minLength: [5, "shop name should have more  then 3 characters"],
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter your Email"],
    validate: [validator.isEmail, "Please enter your valid Email"],
  },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password cannot have more then 8 character"],
  },
  avatar: {
    publicId: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.methods.getResetPassword = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
