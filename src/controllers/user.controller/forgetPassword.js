import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { User } from "../../models/user.model.js";
import asynchandler from "../../utils/asynchandler.js";

export const forgotPassword = asynchandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  console.log("id", user);
  if (!user) return res.status(404).json({ message: "User not found" });

  const token = jwt.sign(
    {
      email: user.email,
      _id: user._id,
    },
    process.env.FORGOT_PASSWORD_SECRET,
    {
      expiresIn: process.env.FORGOT_PASSWORD_EXPIRY,
    },
  );
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // app password
    },
  });

  const resetLink = `http:localhost:5173/reset/${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Reset Password",
    text: `Click here to reset: ${resetLink}`,
  });
  res.json({ message: "Reset email sent" });
});
