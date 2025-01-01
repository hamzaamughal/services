const express = require("express");
const router = express.Router();
const {
  registerController,
  loginUserController,
  logoutController,
} = require("../controllers/userController.js");

router.post("/register", registerController);
router.post("/login", loginUserController);
router.post("/logout", logoutController);

module.exports = router;
