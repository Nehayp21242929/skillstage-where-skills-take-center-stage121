import mongoose from "mongoose";
const { Schema } = mongoose;

const feedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false, // allow anonymous feedback
      index: true
    },
    demo: {
      type: Schema.Types.ObjectId,
      required: true, // can reference Video or Photo
      index: true
    },
    demoType: {
      type: String,
      enum: ["video", "photo"],
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 500
    },
    sentiment: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral"
    }
  },
  { timestamps: true }
);

// Prevent same user from giving feedback twice on same demo
feedbackSchema.index({ user: 1, demo: 1 }, { unique: true });

export const Feedback = mongoose.model("Feedback", feedbackSchema);
