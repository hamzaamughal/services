// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true, trim: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [/\S+@\S+\.\S+/, "Invalid email format"],
//     },
//     password: {
//       type: String,
//       required: true,
//       trim: true,
//       minlength: 6,
//     },
//     resetPasswordToken: String,
//     resetPasswordExpire: Date,
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// Pre-save hook to hash the password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;

const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 6,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generatePasswordResetToken = function () {
  const token = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  this.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  return token;
};

module.exports = mongoose.model("User", userSchema);
