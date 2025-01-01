// const User = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// const registerController = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     console.log("name", name);

//     // Validate input
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the user already exists
//     const existingUser = await User.findOne({
//       $or: [{ name }, { email }],
//     });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "user already exist with same eamail or name",
//       });
//     }

//     // Hash the password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Create a new user
//     const newUser = await new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: role || "user",
//     });

//     console.log("name", newUser);
//     // Save the user to the database
//     await newUser.save();

//     // Respond with success
//     res.status(201).json({
//       success: true,
//       message: "user created successfully",
//       user: {
//         id: newUser._id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "internal server error please try again",
//     });
//   }
// };

// const loginUserController = async () => {
//   try {
//     const { email, password } = req.body;

//     // Validate input
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "All fields are required", success: false });
//     }

//     // Check if the user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "user not found", success: false });
//     }
//     // Compare password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res
//         .status(400)
//         .json({ message: "invalid credentials", success: false });
//     }

//     // Generate a JWT token
//     const token = jwt.sign(
//       { id: user.id, role: user.role, name: user.name, email: user.email },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "30m",
//       }
//     );

//     // Set the token as a cookie
//     // res.cookie("token", token, {
//     //   httpOnly: true,
//     //   secure: true,
//     //   sameSite: "none",
//     //   maxAge: 30 * 60 * 1000,
//     // });

//     //Respond with success
//     res.status(200).json({
//       success: true,
//       message: "user login successfully",
//       // token,
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         token,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "internal server error please try again",
//     });
//   }
// };

// module.exports = { registerController, loginUserController };

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register Controller
const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with the same email or name",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(hashedPassword);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({
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
    res.status(500).json({
      success: false,
      message: "Internal server error, please try again",
      error: error.message,
    });
  }
};

// Login Controller
const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30m" }
    );

    // Respond with success
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
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
