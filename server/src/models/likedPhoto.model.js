import mongoose from "mongoose";
const { Schema } = mongoose;

const likedSchema = new Schema(
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
    likedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

// 🔑 Important indexes
likedSchema.index({ user: 1, video: 1 });

export const likedPhoto = mongoose.model(
  "likedPhoto",
  likedSchema
);