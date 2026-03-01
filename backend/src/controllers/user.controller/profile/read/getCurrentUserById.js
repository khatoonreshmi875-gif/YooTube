import { User } from "../../../../models/user.model.js";
import { Video } from "../../../../models/video.model.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import asynchandler from "../../../../utils/asynchandler.js";
export const getCurrentUserById = asynchandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId).lean();
  const video = await Video.countDocuments({ owner: user._id });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...user, TotalVideo: video },
        "Current User Fetched Successfully",
      ),
    );
});
