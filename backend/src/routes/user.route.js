import { Router } from "express";
import { loginUser } from "../controllers/user.controller/auth/loginUser.js";
import { registerUser } from "../controllers/user.controller/auth/registerUser.js";
import { logoutUser } from "../controllers/user.controller/auth/logoutUser.js";
import { deleteUser } from "../controllers/user.controller/profile/delete/deleteUser.js";
import { changeCurrentPassword } from "../controllers/user.controller/auth/password/changeCurrentPassword.js";
import { getCurrentUser } from "../controllers/user.controller/profile/getCurrentUser.js";
import { updateAccountDetails } from "../controllers/user.controller/profile/update/updateAccountDetails.js";
import { updatecoverImage } from "../controllers/user.controller/profile/update/updateCoverImage.js";
import { updateUserAvatar } from "../controllers/user.controller/profile/update/updateUserAvatar.js";
import { getWatchHistory } from "../controllers/user.controller/watchHistory/getWatchHistory.js";
import { getCurrentUserById } from "../controllers/user.controller/profile/read/getCurrentUserById.js";
import { clearAllWatchhistory } from "../controllers/user.controller/watchHistory/clearAllWatchhistory.js";
import { RemoveVideoWatchHistory } from "../controllers/user.controller/watchHistory/RemoveVideoWatchHistory.js";
import { resetPassword } from "../controllers/user.controller/auth/password/ResetPassword.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { AssignModerator } from "../controllers/user.controller/moderation/AssignModerator.js";

import { refershAccessToken } from "../controllers/user.controller/auth/token/refreshAccessToken.js";
import { getAllUser } from "../controllers/user.controller/allUser.js";
import { removeModerator } from "../controllers/user.controller/moderation/removeModerator.js";
import { forgotPassword } from "../controllers/user.controller/auth/password/forgetPassword.js";
import { getUserByModerator } from "../controllers/user.controller/moderation/getUserByModerator.js";
import { getUserByUserRole } from "../controllers/user.controller/getUserByUserRole.js";
import { adminAuthorizationMiddleware } from "../middlewares/adminAuth.middleware.js";

const userRouter = Router();
userRouter.route("/curr-user").get(verifyJWT, cacheMiddleware, getCurrentUser);

userRouter.route("/curr-user-by-id/:userId").get(verifyJWT, getCurrentUserById);

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
userRouter.route("/delete-user").delete(deleteUser);

//secured route
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/forget-password").post(forgotPassword);
userRouter
  .route("/assign-moderator")
  .post(verifyJWT, adminAuthorizationMiddleware(["admin"]), AssignModerator);
userRouter
  .route("/remove-moderator")
  .post(verifyJWT, adminAuthorizationMiddleware(["admin"]), removeModerator);
userRouter
  .route("/role-moderator")
  .get(
    verifyJWT,
    adminAuthorizationMiddleware(["admin", "moderator"]),
    getUserByModerator,
  );
userRouter
  .route("/role-user")
  .get(
    verifyJWT,
    adminAuthorizationMiddleware(["admin", "moderator"]),
    getUserByUserRole,
  );

userRouter.route("/all-user").get(getAllUser);
userRouter.route("/reset-password").post(resetPassword);
userRouter.route("/refresh-token").post(refershAccessToken);
userRouter.route("/change-password").post(verifyJWT, changeCurrentPassword);

userRouter.route("/update-account").patch(verifyJWT, updateAccountDetails);
userRouter.route("/delete-account").delete(verifyJWT, deleteUser);
userRouter.route("/delete-account/:userId").delete(verifyJWT, deleteUser);
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
