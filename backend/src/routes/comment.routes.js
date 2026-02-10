import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { Comment } from "../models/comments.model.js";
import { getCommentById } from "../controllers/comment.contoller/read/getCommentById.js";
import { deleteComment } from "../controllers/comment.contoller/delete/deleteComment.js";
import { updateComment } from "../controllers/comment.contoller/update/updateComment.js";
import { getReplyComment } from "../controllers/comment.contoller/read/getRepliesForComment.js";
import { getCommentByTweetId } from "../controllers/comment.contoller/read/getCommentByTweetId.js";
import { replyCommentForTweet } from "../controllers/comment.contoller/reply/tweet/replyToTweetComment.js";
import { addCommentForTweet } from "../controllers/comment.contoller/create/addCommentForTweet.js";
import { addComment } from "../controllers/comment.contoller/create/addCommentForVideo.js";
import { getVideoComments } from "../controllers/comment.contoller/read/getVideoComments.js";
import { replyComment } from "../controllers/comment.contoller/reply/video/replyToVideoComment.js";
const commentRouter = Router();
commentRouter.route("/comment-id/:commentId").get(getCommentById);
commentRouter.use(verifyJWT);
commentRouter
  .route("/comm/:commentId")
  .delete(
    authorizationMiddleware(["admin", "moderator"], Comment, "commentId"),
    deleteComment,
  )
  .patch(authorizationMiddleware([], Comment, "commentId"), updateComment)
  .post(replyComment)
  .get(cacheMiddleware, getReplyComment);

commentRouter
  .route("/tweet-comment/:tweetId")
  .get(cacheMiddleware, getCommentByTweetId);
commentRouter.route("/tweet-comment/:commentId").post(replyCommentForTweet);

commentRouter.route("/add-comment-tweet/:tweetId").post(addCommentForTweet);

commentRouter
  .route("/com/:videoId")
  .post(addComment)
  .get(verifyJWT, cacheMiddleware, getVideoComments);
export default commentRouter;
