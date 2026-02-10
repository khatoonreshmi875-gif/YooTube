import { Dislike } from "../models/dislike.model.js";
import { Like } from "../models/likes.model.js";

export const toggleLikeHelper = async ({
  Id,
  userId,
  entityKey,
  Model,
  likeField,
  dislikeField,
}) => {
  const existingLike = await Like.findOne({
    [entityKey]: Id,
    likedBy: userId,
  }).lean();
  const deletedDislike = await Dislike.exists({
    [entityKey]: Id,
    dislikedBy: userId,
  });
  let updatedVariable;
  let like;
  console.log("exis", existingLike, entityKey, Id);
  if (existingLike) {
    await Like.deleteOne({ _id: existingLike._id });
    updatedVariable = await Model.findByIdAndUpdate(
      Id,

      {
        $inc: {
          [likeField]: -1,
        },
      },
      { new: true },
    ).lean();
  } else {
    const incObj = { [likeField]: 1 };
    if (deletedDislike) {
      incObj[dislikeField] = -1;
      await Dislike.deleteOne({ [entityKey]: Id, dislikedBy: userId });
    }

    [like, updatedVariable] = await Promise.all([
      Like.create({ [entityKey]: Id, likedBy: userId }),

      Model.findByIdAndUpdate(
        Id,
        {
          $inc: incObj,
        },
        { new: true },
      ).lean(),
    ]);
  }
  console.log("it run till eand");
  return { existingLike, updatedVariable };
};
