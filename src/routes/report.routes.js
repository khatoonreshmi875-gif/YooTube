import { Router } from "express";

import { adminAuthorizationMiddleware } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getReport } from "../controllers/report.controller/getReport.js";
import { postReport } from "../controllers/report.controller/report.js";
const reportRouter = Router();
reportRouter.use(verifyJWT);

reportRouter
  .route("/report/:userId")
  .get(adminAuthorizationMiddleware(["admin"]), getReport)
  .post(postReport);
export default reportRouter;