import { Router } from "express";

import { adminAuthorizationMiddleware } from "../middlewares/adminAuth.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getReport } from "../controllers/report.controller/getReport.js";
import { postReport } from "../controllers/report.controller/report.js";
import { getReportByDate } from "../controllers/report.controller/getReportByDate.js";
const reportRouter = Router();
reportRouter.use(verifyJWT);

reportRouter.route("/report/:videoId").post(postReport);
reportRouter
  .route("/report")
  .get(adminAuthorizationMiddleware(["admin", "moderator"]), getReport);
reportRouter
  .route("/report-by-date")
  .post(adminAuthorizationMiddleware(["admin", "moderator"]), getReportByDate);

export default reportRouter;
