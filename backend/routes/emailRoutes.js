const express = require("express");
const { sendEmail } = require("../controllers/emailController");

const router = express.Router();

// POST /api/email/send
router.post("/send", sendEmail);

module.exports = router;
