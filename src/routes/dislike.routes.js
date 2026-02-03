import { Router } from "express";
import { toggleVideoDisLike } from "../controllers/dislike.controller/toggleVideoDislike.js";
import { toggleTweetDisLike } from "../controllers/dislike.controller/toggleTweetDislike.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { toggleCommentDisLike } from "../controllers/dislike.controller/toggleCommentDislike.js";
import { stateOfTweetDisLike } from "../controllers/dislike.controller/stateOfTweetDislike.js";
const dislikeRouter = Router();
dislikeRouter.use(verifyJWT);
dislikeRouter.route("/comment-dislike/:commentId").get(toggleCommentDisLike);
dislikeRouter.route("/dislike-video/:videoId").get(toggleVideoDisLike);

dislikeRouter
  .route("/state-tweet-dislike/:tweetId")
  .get(cacheMiddleware, stateOfTweetDisLike);

dislikeRouter.route("/dislike-tweet/:tweetId").get(toggleTweetDisLike);

export default dislikeRouter;
