import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import axios from "axios";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error("❌ File not found:", localFilePath);
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    }); //file has been successfully upload
    console.log(
      `fileis uploaded", ${uploadResult},${uploadResult.bytes / 1024}`,
    );
    let url;
    if (uploadResult.resource_type === "image") {
      url = cloudinary.url(uploadResult.public_id, {
        transformation: [
          {
            width: 600,
            crop: "fit",
            quality: "auto",
            fetch_format: "auto",
            dpr: "auto",
          },
        ],
      });
    }

    return { uploadResult, url };
  } catch (error) {
    console.log("Cloudinary upload Failed : ", error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    //remove the locally saved temporarily file s the operation get
    return null;
  }
};
const deleteFromCloudinary = async (publicId, type) => {
  try {
    const deleteFile = await cloudinary.uploader.destroy(publicId, {
      resource_type: type,
    });
  } catch (error) {
    console.log("cloudinary deleted failed ", error);
  }
};
const uploadWithFlow = async (localFilePath) => {
  return await cloudinary.uploader.upload(localFilePath, {
    resource_type: "auto",
    upload_preset: "my_mediaflow_preset", // links to your MediaFlow
  });
};

export { uploadOnCloudinary, deleteFromCloudinary };
