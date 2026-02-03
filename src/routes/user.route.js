import { Router } from "express";
import { loginUser } from "../controllers/user.controller/loginUser.js";
import { registerUser } from "../controllers/user.controller/registerUser.js";
import { logoutUser } from "../controllers/user.controller/logoutUser.js";
import { getCurrentUser } from "../controllers/user.controller/getCurrentUser.js";
import { changeCurrentPassword } from "../controllers/user.controller/changeCurrentPassword.js";

import { updateAccountDetails } from "../controllers/user.controller/updateAccountDetails.js";
import { updatecoverImage } from "../controllers/user.controller/updateCoverImage.js";
import { updateUserAvatar } from "../controllers/user.controller/updateUserAvatar.js";
import { getWatchHistory } from "../controllers/user.controller/getWatchHistory.js";
import { getCurrentUserById } from "../controllers/user.controller/getCurrentUserById.js";
import { clearAllWatchhistory } from "../controllers/user.controller/clearAllWatchhistory.js";
import { RemoveVideoWatchHistory } from "../controllers/user.controller/RemoveVideoWatchHistory.js";
import { forgotPassword } from "../controllers/user.controller/forgetPassword.js";
import { resetPassword } from "../controllers/user.controller/ResetPassword.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { AssignModerator } from "../controllers/user.controller/Assignmoderator.js";
import { refershAccessToken } from "../controllers/user.controller/refreshAccessToken.js";

const userRouter = Router();
userRouter.route("/curr-user").get(verifyJWT, cacheMiddleware, getCurrentUser);

userRouter
  .route("/curr-user-by-id/:userId")
  .get(verifyJWT, cacheMiddleware, getCurrentUserById);

userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser,
);
userRouter.route("/login").post(loginUser);

//secured route
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/forget-password").post(forgotPassword);
userRouter.route("/assign-moderator").post(AssignModerator);
userRouter.route("/reset-password").post(resetPassword);
userRouter.route("/refresh-token").post(refershAccessToken);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);

userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
userRouter
  .route("/update-coverImage")
  .patch(verifyJWT, upload.single("coverImage"), updatecoverImage);
userRouter.route("/history").get(verifyJWT, cacheMiddleware, getWatchHistory);
userRouter.route("/delete-all-history").delete(verifyJWT, clearAllWatchhistory);
userRouter
  .route("/delete-video-history/:videoId")
  .delete(verifyJWT, RemoveVideoWatchHistory);

export default userRouter;
