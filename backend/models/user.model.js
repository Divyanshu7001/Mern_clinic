import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name should have at least 3 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name should have at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email."],
  },
  phone: {
    type: String,
    required: true,
    minLength: [11, "Phone number must contain exact 11 digits.,"],
    maxLength: [11, "Phone number must contain exact 11 digits."],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"],
  },
  nic: {
    type: String,
    required: true,
    minLength: [5, "NIC number must contain exact 5 digits.,"],
    maxLength: [5, "NIC number must contain exact 5 digits."],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, "Password must contain 8 characters"],
    select: false,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Patient", "Doctor"],
  },
  doctorDepartment: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  // Check if the password field is being modified or if it's a new registration
  if (!this.isModified("password") || this.isNew) {
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(this.password, 10);
      this.password = hashedPassword;
    } catch (error) {
      return next(error); // Handle any errors
    }
  }
  next(); // Continue with the save operation
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw error; // Rethrow the error for further handling
  }
};

userSchema.methods.generateWebToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRES }
  );
};

export const UserModel = {
  User: mongoose.model("User", userSchema),
  comparePassword: userSchema.methods.comparePassword,
  generateWebToken: userSchema.methods.generateWebToken,
};
