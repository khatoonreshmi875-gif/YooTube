import bcrypt from "bcrypt";
import { User } from "../../models/user.model.js";
import ApiError from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import asynchandler from "../../utils/asynchandler.js";
import { generateRefreshAndAccessToken } from "../../utils/generateRefreshAndAccessToken.js";
export const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  //console.log("🔍 Incoming login body:", req.body);

  if (!email) {
    throw new ApiError(400, " email is required");
  }
  const user = await User.findOne({ email })
    .lean()
    .select("password email username");

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }
  // const userDoc = new User(user);
  // const isPasswordValid = await userDoc.isPasswordCorrect(password);
  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log("password", password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "invalid user credentials");
  }
  const { AccessToken, RefreshToken } = await generateRefreshAndAccessToken(
    user._id,
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("AccessToken", AccessToken, options)
    .cookie("RefreshToken", RefreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          AccessToken,
          RefreshToken,
        },
        "User Logged in Successfully",
      ),
    );
});
