import express from "express";
import {
  postAppointment,
  getallAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/auth.js";

const router = express.Router();

router.post("/sendAppointment", isPatientAuthenticated, postAppointment);
router.get("/getallAppointments", isPatientAuthenticated, getallAppointments);
router.put("/updateAppointment/:id", isAdminAuthenticated, updateAppointment);
router.delete(
  "/deleteAppointment/:id",
  isAdminAuthenticated,
  deleteAppointment
);

export default router;
