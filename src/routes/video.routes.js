import { Router } from "express";
import { publishAVideo } from "../controllers/video.controller/publishAVideo.js";
import { updateVideo } from "../controllers/video.controller/updateVideo.js";
import { deleteVideo } from "../controllers/video.controller/deleteVideo.js";
import { getRecommendedVideo } from "../controllers/video.controller/getRecommendedVideo.js";
import { getSimilarVideo } from "../controllers/video.controller/getSimilarVideo.js";
import { getSimilarChannel } from "../controllers/video.controller/getSimilarChannel.js";
import { getVideoByUserid } from "../controllers/video.controller/getVideoByUserId.js";
import { getVideoUserid } from "../controllers/video.controller/getVideoUserId.js";
import { Views } from "../controllers/video.controller/Views.js";
import { downloadVideo } from "../controllers/video.controller/downloadVideo.js";
import { getVideoByVideoId } from "../controllers/video.controller/getVideoByVideoId.js";
import { upload } from "../middlewares/multer.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
const videoRouter = Router();

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Video } from "../models/video.model.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";

videoRouter.route("/upload-video").post(
  upload.fields([
    {
      name: "videofile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  verifyJWT,

  publishAVideo,
);

videoRouter
  .route("/user-id/:userId")
  .get(verifyJWT, cacheMiddleware, getSimilarChannel);

videoRouter
  .route("/delete/:videoId")
  .delete(
    verifyJWT,
    authorizationMiddleware(["admin", "moderator"], Video, "videoId"),
    deleteVideo,
  )
  .patch(
    upload.single("thumbnail"),
    verifyJWT,
    authorizationMiddleware([], Video, "videoId"),
    updateVideo,
  );

videoRouter.route("/user/get-all-videos").get(verifyJWT, getVideoByUserid);

videoRouter
  .route("/user/get-all-videos/:userId")
  .get(verifyJWT, getVideoUserid);

videoRouter.route("/views/:videoId").patch(Views);
videoRouter.route("/download/:videoId").get(cacheMiddleware, downloadVideo);

videoRouter
  .route("/vid/:videoId")
  .get(verifyJWT, cacheMiddleware, getVideoByVideoId);
videoRouter.route("/get-reccomended-video").get(verifyJWT, getRecommendedVideo);
videoRouter
  .route("/rec-video/:videoId")
  .get(verifyJWT, cacheMiddleware, getSimilarVideo);

export default videoRouter;
