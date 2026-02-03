import asynchandler from "../utils/asynchandler.js";

export const adminAuthorizationMiddleware = (roles = []) => {
  return asynchandler(async (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  });
};
