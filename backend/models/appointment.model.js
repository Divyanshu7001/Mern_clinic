import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema = new mongoose.Schema({
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
  appointment_date: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  doctor: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  hasVisited: {
    type: Boolean,
    default: false,
  },
  doctorId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  patientId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Pending", "Rejected"],
    default: "Pending",
  },
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
