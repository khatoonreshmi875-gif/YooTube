import asynchandler from "../utils/asynchandler.js";

export const adminAuthorizationMiddleware = (roles = []) => {
  console.log("it run adsmin", roles);
  return asynchandler(async (req, res, next) => {
    if (roles.includes(req?.user?.role)) {
      console.log(req?.user?.role);
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  });
};
