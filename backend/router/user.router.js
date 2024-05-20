import express from "express";
import {
  patientRegister,
  adminRegister,
  login,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  addNewDoctor,
  updateUser,
} from "../controllers/user.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.post("/admin/register", isAdminAuthenticated, adminRegister);
router.get("/getDoctors", getAllDoctors);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.put("/patient/updateUser/:id", isPatientAuthenticated, updateUser);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.post("/login", login);
router.post("/doctor/addNew", isAdminAuthenticated, addNewDoctor);

export default router;
