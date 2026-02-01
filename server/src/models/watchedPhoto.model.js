import mongoose from "mongoose";
const { Schema } = mongoose;

const watchHistoryPhotoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    photo: {
      type: Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
      index: true
    },
    watchTime: {
      type: Number, // seconds watched
      default: 0
    },
    watchedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// 🔑 Important indexes
watchHistoryPhotoSchema.index({ user: 1, video: 1 });

export const WatchHistoryPhoto = mongoose.model(
  "WatchHistoryPhoto",
  watchHistoryPhotoSchema
);
