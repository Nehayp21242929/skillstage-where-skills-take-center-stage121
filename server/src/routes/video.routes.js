import { Router } from "express";
import {
//   getAllVideos,
//   getVideoById,
//   getChannelVideos,
  uploadVideo,
  galleryController,
  getVideoByIdController,
  getAllVideos,
  addToHistory,
  getHistory,
  addToLiked,
  getLiked,
  deleteLiked
} from "../controllers/video.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// upload video
router.route("/upload").post(
  verifyJWT,
  upload.fields([
    { name: "videoFile", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  uploadVideo
);

router.route("/gallery/:userId").get( verifyJWT, galleryController);

router.route("/playvideo/:id").get( getVideoByIdController);

router.route("/allVideos").get( getAllVideos);

// add / update watch history
router.route("/addHistory").post(verifyJWT, addToHistory);


// get watch history of logged-in user
router.route("/getHistory").get(verifyJWT, getHistory);

router.route("/addLiked").post(verifyJWT, addToLiked);


// get watch history of logged-in user
router.route("/getLiked").get(verifyJWT, getLiked);

router.route("/deleteLiked/:videoId").delete(verifyJWT,deleteLiked);





// // watch page
// router.route("/")
//   .get(getAllVideos);

// // channel videos
// router.route("/channel/:channelId")
//   .get(getChannelVideos);

// // watch single video
// router.route("/:videoId")
//   .get(getVideoById);

export default router;

