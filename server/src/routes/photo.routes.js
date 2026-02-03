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
  getHistoryPhoto,
  addToLikedPhoto,
  getLikedPhoto,
  deleteLikedPhoto

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

router.route("/addLiked").post(verifyJWT, addToLikedPhoto);


// get watch history of logged-in user
router.route("/getLiked").get(verifyJWT, getLikedPhoto);

router.route("/deleteLiked/:photoId").delete(verifyJWT,deleteLikedPhoto);





export default router;

