import { User } from "../../models/user.model.js";
import asynchandler from "../../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";

export const resetPassword = asynchandler(async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;
  console.log("run reset password", token, password, confirmPassword);
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json(new ApiResponse(400, [], "Passwords do not match"));
  }
  const decodedToken = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);

  const user = await User.findById(decodedToken._id);
  const Oldpassword = user.password;
  user.password = password;
  console.log("reset-password", Oldpassword, user.password);

  await user.save();
  console.log(user.password, Oldpassword, user, password);
  console.log("updation", user);
  res
    .status(400)
    .json(new ApiResponse(400, [user], "password Updated successfully "));
});
