import { Router } from "express";
import {
//   getAllVideos,
//   getVideoById,
//   getChannelVideos,
  uploadPhoto,
  galleryPhotoController,
  getPhotoByIdController,
  getAllPhotos,
  addToHistoryPhoto,
  getHistoryPhoto
} from "../controllers/photo.controller.js";

import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// upload video
router.route("/upload").post(
  verifyJWT,
  upload.single("photoFile"),
  uploadPhoto
);

router.route("/gallery/:userId").get( verifyJWT ,galleryPhotoController);

router.route("/playPhoto/:id").get( getPhotoByIdController);

router.route("/allPhotos").get( getAllPhotos);

router.route("/addHistory").post(verifyJWT, addToHistoryPhoto);


// get watch history of logged-in user
router.route("/getHistory").get(verifyJWT, getHistoryPhoto);


export default router;

