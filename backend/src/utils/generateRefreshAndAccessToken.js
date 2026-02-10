import { User } from "../models/user.model.js";
import ApiError from "./ApiError.js";

export const generateRefreshAndAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const RefreshToken = user.generateRefreshToken();
    const AccessToken = user.generateAccessToken();

    user.RefreshToken = RefreshToken;

    await user.save({ validateBeforeSave: false });
    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something is wrong while generating refresh and access token",
    );
  }
};
