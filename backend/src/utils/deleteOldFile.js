import fs from "fs/promises";

const deleteFile = async (localpath) => {
  try {
    await fs.unlink(localpath);
    console.log("files deleted successfully from folder");
  } catch (err) {
    console.log("Error in deleting file", err);
  }
};
export { deleteFile };
