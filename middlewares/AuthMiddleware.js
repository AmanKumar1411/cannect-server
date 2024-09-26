import jwt from "jsonwebtoken";
import User from "../models/Usermodel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
// import User from "../models/User"; // Make sure to import your User model
// import apiClient from "../utils/apiClient"; // Adjust the import as per your structure
// import { UPDATE_PROFILE_ROUTE } from "../constants/routes"; // Ensure the route is defined
export const verifyJwtToken = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decodedToken?.email._id);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

