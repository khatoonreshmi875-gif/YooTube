import jwt from "jsonwebtoken";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { generateRefreshAndAccessToken } from "../../utils/generateRefreshAndAccessToken.js";
export const refershAccessToken = asynchandler(async (req, res) => {
  const token = req.cookies.refreshToken || req.body.refreshToken;
  if (!token) {
    throw new ApiError(401, "unauthorized request");
  }

  const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(401, "Invalid Refresh Token");
  }
  if (token !== user.refreshToken) {
    throw new ApiError(401, "Refresh token is expired or used");
  }
  const options = {
    httpOnly: true,
    secure: true,
  };
  const { AccessToken, RefreshToken } = await generateRefreshAndAccessToken(
    user._id,
  );
  return res
    .status(200)
    .cookies("AccessToken", AccessToken, options)
    .cookies("RefreshToken", RefreshToken, options)
    .json(
      new ApiResponse(
        200,
        { AccessToken, RefreshToken },
        "Access token Refreshed",
      ),
    );
});
