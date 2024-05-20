import { Message } from "../models/message.model.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const sendMessage = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please fill the form correctly", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message sent successfully",
  });
});

export const getAllMessages = catchAsyncErrors(async (req, res, next) => {
  const messages = await Message.find();

  res.status(200).json({
    success: true,
    messages,
  });
});

export const deleteMessage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorHandler("No message found with given details", 404));
  }

  await message.deleteOne();
  res.status(200).json({
    success: true,
    message: "Message Deleted successfully",
  });
});
