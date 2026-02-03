import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { toggleCommentLike } from "../controllers/like.controller/toggleCommentLike.js";
import { toggleVideoLike } from "../controllers/like.controller/toggleVideoLike.js";
import { stateOfTweetLike } from "../controllers/like.controller/stateOfTweetLike.js";
import { toggletweetLike } from "../controllers/like.controller/toggleTweetLike.js";
import { getLikedVideos } from "../controllers/like.controller/getLikedVideos.js";

const likeRouter = Router();
likeRouter.use(verifyJWT);
likeRouter.route("/comment-like/:commentId").get(toggleCommentLike);toggletweetLike
likeRouter.route("/video/:videoId").get(toggleVideoLike);
likeRouter
  .route("/state-tweet-like/:tweetId")
  .get(cacheMiddleware, stateOfTweetLike);

likeRouter.route("/toggle-tweet/:tweetId").get(toggletweetLike);

likeRouter
  .route("/liked-videos")
  .get(verifyJWT, cacheMiddleware, getLikedVideos);

export default likeRouter;
