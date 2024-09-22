import { Router } from "express";
import {
  getUserInfo,
  logIn,
  signUp,
  updateProfile,
  addProfileImage,
  removeProfileimage,
} from "../controllers/Authcontroller.js";
import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";

import { upload } from "../middlewares/multer.middleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signUp);
authRoutes.post("/login", logIn);
authRoutes.get("/user-info", verifyJwtToken, getUserInfo);
authRoutes.post("/update-profile", verifyJwtToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyJwtToken,
  upload.single("profile-image"),
  addProfileImage
);
authRoutes.delete("/remove-profile-image", verifyJwtToken, removeProfileimage);
export default authRoutes;
