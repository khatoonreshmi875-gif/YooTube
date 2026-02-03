import dotenv from "dotenv";
import connectDB from "../db/index.js";
import { User } from "../models/user.model.js";
dotenv.config({ path: "../../.env", quiet: true });

export const createAdmin = async () => {
  await connectDB();

  const existingAdmin = await User.findOne({
    email: process.env.ADMIN_EMAIL,
  });

  if (existingAdmin) {
    console.log("Admin already exists:", existingAdmin.username);
    process.exit(0);
  }
  const adminUser = await User.create({
    fullName: "Reshmi Khatoon",
    email: process.env.ADMIN_EMAIL,
    username: "reshmi_admin",
    password: process.env.ADMIN_PASSWORD,
    role: "admin",
    avatar: "download(1).jpg",
    coverImage: "download(1).jpg",
    // ✅ required
    description: "System administrator account", //
  });
  await adminUser.save();
  console.log("✅ Admin created successfully:", adminUser.username);
  process.exit(0);
};
createAdmin();
