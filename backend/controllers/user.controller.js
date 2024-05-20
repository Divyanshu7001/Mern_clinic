import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    nic,
    role,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !dob ||
    !nic ||
    !role
  ) {
    return next(
      new ErrorHandler("Please fill the registration form exactly", 400)
    );
  }
  let user = await UserModel.User.findOne({ email: email });
  if (user) {
    return next(
      new ErrorHandler(
        `${user.role} Already registered with this credintials`,
        402
      )
    );
  }

  user = await UserModel.User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    nic,
    role,
  });
  generateToken(user, "user registered", 201, res);
});

export const adminRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password, phone, gender, dob, nic } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !dob ||
    !nic
  ) {
    return next(
      new ErrorHandler("Please fill the registration form exactly", 400)
    );
  }
  let user = await UserModel.User.findOne({ email: email });
  if (user) {
    return next(new ErrorHandler(`${user.role} already registered`, 402));
  }
  user = await UserModel.User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    nic,
    role: "Admin",
  });
  generateToken(user, "Admin registered", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(
      new ErrorHandler("Please fill out all the needed details", 403)
    );
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password & confirm password do not match", 405)
    );
  }

  // Query user by email and select password
  const user = await UserModel.User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid user credentials", 402));
  }
  // Compare entered password with hashed password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return next(new ErrorHandler("Password doesn't match", 402));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found", 402));
  }

  generateToken(user, `${user.role} logged in successfully`, 201, res);
});

export const getAllDoctors = catchAsyncErrors(async (req, res, next) => {
  const doctors = await UserModel.User.find({ role: "Doctor" });
  res.status(200).json({
    success: true,
    doctors,
  });
});

export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin logged out successfully",
    });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Patient logged out successfully",
    });
});

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length <= 0) {
    return next(new ErrorHandler("Doctor Avatar Required!"));
  }
  const { docAvatar } = req.files;
  //console.log(docAvatar);
  //console.log(docAvatar.mimetype);
  const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(new ErrorHandler("File format not supported"));
  }

  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    nic,
    doctorDepartment,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phone ||
    !gender ||
    !dob ||
    !nic ||
    !doctorDepartment
  ) {
    return next(
      new ErrorHandler("Please provide all the needed details!!", 400)
    );
  }

  const isRegistered = await UserModel.User.find({ email });
  //console.log(isRegistered);
  if (isRegistered.length) {
    return next(
      new ErrorHandler(
        `A ${isRegistered.role} already registred with this email`
      )
    );
  }

  const tempFilePath = "../public/temp";
  //console.log("tempFilePath:", tempFilePath);
  const docAvatarPath = docAvatar.tempFilePath;
  //console.log(docAvatarPath);
  const cloudinaryResponse = await cloudinary.uploader.upload(
    docAvatarPath,
    tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error: ",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
  }

  const doctor = await UserModel.User.create({
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    dob,
    nic,
    doctorDepartment,
    role: "Doctor",
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  generateToken(doctor, "Doctor registered", 201, res);
});

export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  let user = UserModel.User.findById(id);
  if (!user) {
    return next(new ErrorHandler("No User found with this credintials", 404));
  }

  user = await UserModel.User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "User details updated successfully",
    user,
  });
});
