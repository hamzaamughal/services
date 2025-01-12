const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log("req.body (register):", req.body);

    // 1) Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2) Check if user already exists by name OR email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email or name",
      });
    }

    // 3) Generate salt and hash password
    // var salt = bcrypt.genSaltSync(10);
    // const hashedPassword = await bcrypt.hashSync(password, salt);

    // console.log("hashedPassword:", hashedPassword);

    // 4) Create a new user
    const newUser = new User({
      name,
      email,
      password,
      role: role || "user",
    });

    // 5) Save the new user to the DB
    await newUser.save();

    // 6) Respond with success
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again",
      error: error.message,
    });
  }
};

// LOGIN CONTROLLER
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("req.body (login):", req.body);

    // 1) Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // 2) Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 3) Compare the plain text password with hashed password in DB
    console.log("user.password:", user.password);
    console.log("password:", password);

    const isPasswordMatch = await bcrypt.compareSync(password, user.password);
    console.log("isPasswordMatch:", isPasswordMatch);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 4) Generate a JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    // 5) Respond with success
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token, // attach token here
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again",
      error: error.message,
    });
  }
};

const logoutController = (req, res) => {
  // Clear the JWT token cookie on logout
  res.clearCookie("token"); // "token" is the cookie name

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { registerController, loginUserController, logoutController };
