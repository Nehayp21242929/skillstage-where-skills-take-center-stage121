import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Photo } from "../models/photo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { WatchHistoryPhoto } from "../models/watchedPhoto.model.js";

const uploadPhoto = asyncHandler(async (req, res) => {
  const { title, description,duration } = req.body;

  if (!title || !description || !duration) {
    throw new ApiError(401, "All fields are required");
  }

  const photoLocalPath = req.file?.path;

  if (!photoLocalPath) {
    throw new ApiError(402, "photofile is required");
  }

  const [photoUpload] = await Promise.all([
    uploadOnCloudinary(photoLocalPath),
  ]);

  if (!photoUpload?.url) {
    throw new ApiError(500, "photo upload failed");
  }


  const photo = await Photo.create({
    photoFile: photoUpload.url,
    title,
    description,
    duration,
    owner: req.user._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, photo, "photo uploaded successfully"));
});

const galleryPhotoController = asyncHandler(async(req,res) =>{
  const userId= req.params.userId || req.user._id;

  if(!userId){
    throw new ApiError(400, "user's id is required")

  }

  const photo = await Photo.find({owner: userId})
  .sort({createdAt :-1})
  .select( "photoFile thumbnail title duration views createdAt" );

  return res
  .json(
    new ApiResponse(200, photo ,"User photos fetched")
  )
});

const getPhotoByIdController = asyncHandler(async (req, res) => {
  const photoId = req.params.id;
  const photo = await Photo.findById(photoId); // Mongoose
  if (!photo) throw new ApiError(404, "Photo not found");
  return res.status(200).json(new ApiResponse(200, photo, "photos fetched successfully"));
});

const getAllPhotos = asyncHandler(async(req,res) => {
  const photo = await Photo.find({})
  .select("photoFile title views createdAt");
  return res
  .json(
    new ApiResponse(200, photo, "Photos fetched successfully"));
})

const addToHistoryPhoto = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { photoId, watchTime } = req.body;

  if (!photoId) {
    return res.status(400).json({
      success: false,
      message: "photoId is required",
    });
  }

  const history = await WatchHistoryPhoto.findOneAndUpdate(
    {
      user: req.user._id,
      photo: photoId,
    },
    {
      $set: {
        watchTime: watchTime || 0,
        watchedAt: new Date(),
      },
    },
    { upsert: true, new: true }
  );

  res.status(201).json(
    new ApiResponse(201, history, "Watched video added successfully")
  );
});


const getHistoryPhoto = asyncHandler(async (req, res) => {
  const history = await WatchHistoryPhoto.find({
    user: req.user._id
  })
    .populate({
      path: "photo",
      select: "photoFile title views createdAt owner"
    })
    .sort({ watchedAt: -1 });
   return res.json(
    new ApiResponse(200,history,"watched video fetched successfully")
  );
});



/*
  GET /api/videos
  Watch page → all published videos from all users
*/
// const getAllVideos = asyncHandler(async (req, res) => {

//   const pipeline = [
//     {
//       $match: { isPublished: true }
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "owner"
//       }
//     },
//     {
//       $unwind: "$owner"
//     },
//     {
//       $sort: { createdAt: -1 }
//     },
//     {
//       $project: {
//         videoFile: 1,
//         thumbnail: 1,
//         title: 1,
//         discription: 1,
//         duration: 1,
//         views: 1,
//         createdAt: 1,

//         "owner._id": 1,
//         "owner.username": 1,
//         "owner.fullname": 1,
//         "owner.avatar": 1
//       }
//     }
//   ];

//   const videos = await Video.aggregate(pipeline);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, videos, "Videos fetched successfully"));
// });


// /*
//   GET /api/videos/:videoId
//   Watch single video page
// */
// const getVideoById = asyncHandler(async (req, res) => {
//   const { videoId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(videoId)) {
//     throw new ApiError(400, "Invalid video id");
//   }

//   const video = await Video.aggregate([
//     {
//       $match: { _id: new mongoose.Types.ObjectId(videoId), isPublished: true }
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "owner"
//       }
//     },
//     { $unwind: "$owner" },
//     {
//       $project: {
//         videoFile: 1,
//         thumbnail: 1,
//         title: 1,
//         discription: 1,
//         duration: 1,
//         views: 1,
//         createdAt: 1,

//         "owner._id": 1,
//         "owner.username": 1,
//         "owner.avatar": 1,
//         "owner.fullname": 1
//       }
//     }
//   ]);

//   if (!video.length) {
//     throw new ApiError(404, "Video not found");
//   }

//   // increase views
//   await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });

//   return res
//     .status(200)
//     .json(new ApiResponse(200, video[0], "Video fetched successfully"));
// });


// /*
//   GET /api/videos/channel/:channelId
//   All videos of one channel
// */
// const getChannelVideos = asyncHandler(async (req, res) => {
//   const { channelId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(channelId)) {
//     throw new ApiError(400, "Invalid channel id");
//   }

//   const videos = await Video.aggregate([
//     {
//       $match: {
//         owner: new mongoose.Types.ObjectId(channelId),
//         isPublished: true
//       }
//     },
//     {
//       $lookup: {
//         from: "users",
//         localField: "owner",
//         foreignField: "_id",
//         as: "owner"
//       }
//     },
//     { $unwind: "$owner" },
//     { $sort: { createdAt: -1 } },
//     {
//       $project: {
//         videoFile: 1,
//         thumbnail: 1,
//         title: 1,
//         duration: 1,
//         views: 1,
//         createdAt: 1,
//         "owner.username": 1,
//         "owner.avatar": 1
//       }
//     }
//   ]);

//   return res
//     .status(200)
//     .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
// });

export {
    // getAllVideos,
    // getVideoById,
    // getChannelVideos,
    uploadPhoto,
    galleryPhotoController,
    getPhotoByIdController,
    getAllPhotos,
    addToHistoryPhoto,
    getHistoryPhoto

}