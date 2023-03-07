const express = require("express");
const {
  registerUser,
  loginUser,
  loadUser,
} = require("../controllers/userController");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/loadUser/:id").get(loadUser);

module.exports = router;
