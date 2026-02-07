import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Feedback } from "../models/feedback.model.js";
import mongoose from "mongoose";

// Add / update feedback
const addFeedback = asyncHandler(async (req, res) => {
  const { demoId, demoType, rating, comment } = req.body;

  if (!demoId || !demoType || !rating) {
    throw new ApiError(400, "demoId, demoType, and rating are required");
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  // Upsert feedback (update if exists)
  const feedback = await Feedback.findOneAndUpdate(
    { user: req.user?._id, demo: demoId },
    {
      $set: {
        user: req.user?._id,
        demo: demoId,
        demoType,
        rating,
        comment
      }
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, feedback, "Feedback submitted successfully"));
});

// Get feedbacks for a demo
const getFeedbacks = asyncHandler(async (req, res) => {
  const { demoId, demoType } = req.params;

  if (!demoId || !demoType) {
    throw new ApiError(400, "demoId and demoType are required");
  }

  const feedbacks = await Feedback.find({ demo: demoId, demoType })
    .populate("user", "name username")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, feedbacks, "Feedbacks fetched successfully"));
});

// Get analytics for a demo
const getFeedbackAnalytics = asyncHandler(async (req, res) => {
  const { demoId, demoType } = req.params;

  if (!demoId || !demoType) {
    throw new ApiError(400, "demoId and demoType are required");
  }

  const stats = await Feedback.aggregate([
    { $match: { demo: mongoose.Types.ObjectId(demoId), demoType } },
    {
      $group: {
        _id: "$demo",
        avgRating: { $avg: "$rating" },
        total: { $sum: 1 }
      }
    }
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        stats[0] || { avgRating: 0, total: 0 },
        "Feedback analytics fetched"
      )
    );
});

export { addFeedback, getFeedbacks, getFeedbackAnalytics };
