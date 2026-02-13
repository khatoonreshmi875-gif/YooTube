import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import axios from "axios";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,

  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath, tag = "generic") => {
  try {
    if (!localFilePath || !fs.existsSync(localFilePath)) {
      console.error("❌ File not found:", localFilePath);
      return null;
    }
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      tags: [tag],
    }); //file has been successfully upload
    console.log(
      `fileis uploaded", ${uploadResult},${uploadResult.bytes / 1024}`,
    );
    let url;
    if (uploadResult.resource_type === "image") {
      if (tag === "avatar") {
        url = cloudinary.url(uploadResult.public_id, {
          transformation: [
            {
              width: 240,
              height: 240,
              crop: "fit",
              quality: "auto",
              fetch_format: "auto",
              dpr: "auto",
            },
          ],
        });
      } else if (tag === "cover") {
        url = cloudinary.url(uploadResult.public_id, {
          transformation: [
            {
              width: 1280,
              height: 240,
              crop: "fit",
              quality: "auto",
              fetch_format: "auto",
              // gravity: "auto",
              dpr: "auto",
            },
            { effect: "improve" }, // auto enhancement
            { effect: "sharpen" },
          ],
        });
      } else if (tag === "tweet") {
        url = cloudinary.url(uploadResult.public_id, {
          transformation: [
            {
              width: 580, // target width
              aspect_ratio: "9:16",
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
              dpr: "auto",
            },
            { effect: "improve" }, // auto enhancement
            { effect: "sharpen" },
          ],
        });
      } else if (tag === "video") {
        if (uploadResult.width > 600) {
          console.log("it run");
          url = cloudinary.url(uploadResult.public_id, {
            transformation: [
              {
                width: 600,
                height: 338,

                crop: "limit",
                quality: "auto:best",
                fetch_format: "auto",
              },
              {
                effect: "sharpen",
              },
            ],
          });
        } else {
          url = cloudinary.url(uploadResult.public_id, {
            transformation: [
              { effect: "upscale" },

              {
                // upscale low-res images
                // target width
                width: 600,
                height: 338,
                crop: "fit", // keep aspect ratio, don’t distort
                // sharpen edges
                quality: "auto:best", // best visual quality
                fetch_format: "auto", // serve WebP/AVIF when supported
              },
              {
                effect: "sharpen",
              },
            ],
          });
        }
      }
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
