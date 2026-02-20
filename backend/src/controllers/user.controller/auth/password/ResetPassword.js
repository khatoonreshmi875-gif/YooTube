import { User } from "../../../../models/user.model.js";
import asynchandler from "../../../../utils/asynchandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApiResponse } from "../../../../utils/ApiResponse.js";

export const resetPassword = asynchandler(async (req, res) => {
  const { token } = req.query;
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          [],
          "Confirm Password is not matched with new password",
        ),
      );
  }
  const decodedToken = jwt.verify(token, process.env.FORGOT_PASSWORD_SECRET);

  const user = await User.findById(decodedToken._id);
  const Oldpassword = user.password;
  user.password = password;

  await user.save();
  
  res
    .status(200)
    .json(new ApiResponse(200, [user], "password Updated successfully "));
});
