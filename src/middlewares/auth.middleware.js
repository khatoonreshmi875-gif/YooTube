import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import client from "../utils/redis.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.AccessToken ||
      req.header("Authorization")?.replace("Bearer", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });

    req.user = { _id: decodedToken._id, role: decodedToken.role };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "jwt expired");
    } else if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "jwt malformed");
    } else {
      throw new ApiError(401, "invalid access token");
    }
  }
});
