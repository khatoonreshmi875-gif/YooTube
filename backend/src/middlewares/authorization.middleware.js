import asynchandler from "../utils/asynchandler.js";

export const authorizationMiddleware = (
  roles = [],
  Model,
  paramName = "id",
) => {
  return asynchandler(async (req, res, next) => {
    console.log("run", paramName, Model, roles);

    const resourceId = req.params[paramName]; // dynamic param name
    const resource = await Model.findById(resourceId);

    if (!resource) {
      throw new ApiError(404, "Resource not found");
    }
    console.log(resource, req.user._id);

    if (
      roles.includes(req.user.role) ||
      resource.owner.toString() === req.user._id
    ) {
      req.resource = resource;
      console.log("resource of vifdeo", resource); // attach for controller use
      return next();
    }

    return res.status(403).json({ message: "Forbidden" });
  });
};
