import { Router } from "express";

import { createTweet } from "../controllers/tweet.controller/createTweet.js";
import { getUserTweet } from "../controllers/tweet.controller/getUserTweet.js";
import { updateTweet } from "../controllers/tweet.controller/updateTweet.js";
import { deleteTweet } from "../controllers/tweet.controller/deleteTweet.js";
import { getTweetByTweetId } from "../controllers/tweet.controller/getTweetByTweetId.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { Tweet } from "../models/tweet.model.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { getTweetBySubscriber } from "../controllers/tweet.controller/getTweetBySubscriber.js";

const tweetRouter = Router();
tweetRouter.use(verifyJWT);

tweetRouter.route("/tweets-page/:userId").get(cacheMiddleware, getUserTweet);
tweetRouter
  .route("/c/:tweetId")
  .delete(
    authorizationMiddleware(["admin", "moderator"], Tweet, "tweetId"),
    deleteTweet,
  )
  .get(cacheMiddleware, getTweetByTweetId);
tweetRouter
  .route("/subscriber-tweet")
  .get(verifyJWT, cacheMiddleware, getTweetBySubscriber)

  .patch(upload.single("image"), updateTweet);
tweetRouter.route("/create-tweet").post(
  upload.fields([
    {
      name: "image",
      maxCount: 4,
    },
  ]),
  createTweet,
);
export default tweetRouter;
