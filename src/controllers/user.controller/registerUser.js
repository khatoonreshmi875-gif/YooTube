import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { generateRefreshAndAccessToken } from "../../utils/generateRefreshAndAccessToken.js";
export const registerUser = asynchandler(async (req, res) => {
  const { fullName, email, username, password, description, channelName } =
    req.body;
  //console.log("user info", req.body);
  const isValid =
    email.length >= 8 &&
    /[a-zA-Z]/.test(email) &&
    /\d/.test(email) &&
    email.includes("@");
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (!isValid) {
    throw new ApiError(
      400,
      "Email must contain @, a letter, a number, and be at least 8 characters.",
    );
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avatarFile = req.files?.avatar?.[0];
  console.log("avatar", avatarFile);

  const avatarLocalPath = avatarFile?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is  required");
  }
  const coverImageFile = Array.isArray(req.files?.coverImage)
    ? req.files.coverImage[0]
    : req.files?.coverImage;

  const coverImageLocalPath = coverImageFile?.path;

  //console.log("file path", avatarLocalPath);
  //console.log("file path of coverImage", coverImageLocalPath);
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  console.log("avatar file", avatar, coverImage);
  if (!avatar) {
    throw new ApiError(400, "avatar file required");
  }
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    username: username.toLowerCase(),
    password,
    description: description || "",
    channelName: channelName || fullName,
  });

  const createdUser = await User.findById(user._id).select(
    " -password -refreshToken",
  );
  if (!createdUser) {
    throw new ApiError("Something went wrong while registring the user");
  }
  const { AccessToken, RefreshToken } = await generateRefreshAndAccessToken(
    user._id,
  );
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdUser, AccessToken, RefreshToken },
        "user registered successfully",
      ),
    );
});
