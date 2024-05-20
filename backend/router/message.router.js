import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
} from "../controllers/message.controller.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/send", sendMessage);
router.get("/getAllmessages", isAdminAuthenticated, getAllMessages);
router.post("/deleteMessage/:id", isAdminAuthenticated, deleteMessage);
export default router;
