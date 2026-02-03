import { Router } from "express";
import { stats } from "../controllers/subscriber.controller/stats.js";

import { totalSubscriber } from "../controllers/subscriber.controller/totalSubscriber.js";
import { totalSubscriberOfAnotherchannel } from "../controllers/subscriber.controller/totalSubscriberOfAnotherchannel.js";
import { SearchOfchannel } from "../controllers/subscriber.controller/SearchOfchannel.js";
import { stateOfSubscribeBtn } from "../controllers/subscriber.controller/stateOfSubscribeBtn.js";
import { previousStats } from "../controllers/subscriber.controller/previousStats.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
const subscriptionRouter = Router();
subscriptionRouter.use(verifyJWT);
import cacheMiddleware from "../middlewares/cache.middleware.js";
import { toggleSubcribe } from "../controllers/subscriber.controller/toggleSubscribe.js";
subscriptionRouter
  .route("/subscribe-btn/:channelId")
  .get(verifyJWT, cacheMiddleware, stateOfSubscribeBtn);

subscriptionRouter.route("/toggle-btn/:channelId").get(toggleSubcribe);
subscriptionRouter.route("/toggle-btn").get(toggleSubcribe);
subscriptionRouter.route("/c/get-subscriber").get(totalSubscriber);

subscriptionRouter
  .route("/get-all-subscriber/:channelId")
  .get(verifyJWT, totalSubscriberOfAnotherchannel);
subscriptionRouter.route("/search-channel").post(SearchOfchannel);
subscriptionRouter.route("/stats").get(cacheMiddleware, stats);
subscriptionRouter.route("/pre-stats").get(cacheMiddleware, previousStats);

export default subscriptionRouter;
