import { Dislike } from "../models/dislike.model.js";
import { Like } from "../models/likes.model.js";

export const toggleDislikeHelper = async ({
  Id,
  userId,
  entityKey,
  Model,
  likeField,
  dislikeField,
}) => {
  const deletedLike = await Like.exists({
    [entityKey]: Id,
    likedBy: userId,
  }).exec();
  const existingDislike = await Dislike.findOneAndDelete({
    [entityKey]: Id,
    dislikedBy: userId,
  });
  let updatedVariable;
  if (existingDislike) {
    updatedVariable = await Model.findByIdAndUpdate(
      Id,
      {
        $inc: {
          [dislikeField]: -1,
        },
      },
      { new: true },
    )

      .lean();
  } else {
    const incObj = { [dislikeField]: 1 };
    if (deletedLike) {
      incObj[likeField] = -1;
      await Like.deleteOne({ [entityKey]: Id, likedBy: userId });
    }

    [, updatedVariable] = await Promise.all([
      await Dislike.create({ [entityKey]: Id, dislikedBy: userId }),
      Model.findByIdAndUpdate(
        Id,
        {
          $inc: incObj,
        },
        { new: true },
      )

        .lean(),
    ]);
  }

  return { existingDislike, updatedVariable };
};
