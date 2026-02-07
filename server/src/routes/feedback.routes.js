import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addFeedback,
  getFeedbacks,
  getFeedbackAnalytics
} from "../controllers/feedback.controller.js";

const router = Router();

// Add / update feedback (requires login if you want to track user)
router.route("/add").post(verifyJWT, addFeedback);

// Get feedbacks for a demo
router.route("/:demoId/:demoType").get(getFeedbacks);

// Get analytics for a demo
router.route("/:demoId/:demoType/analytics").get(getFeedbackAnalytics);

export default router;
