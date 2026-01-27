import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
    console.log("Files received:", req.files);


  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    throw new ApiError(401, "All fields are required");
  }

  const videoLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

  if (!videoLocalPath) {
    throw new ApiError(402, "Video file is required");
  }

  if (!thumbnailLocalPath) {
    throw new ApiError(403, "Thumbnail is required");
  }

  const [videoUpload, thumbnailUpload] = await Promise.all([
    uploadOnCloudinary(videoLocalPath),
    uploadOnCloudinary(thumbnailLocalPath)
  ]);

  if (!thumbnailUpload?.url) {
    throw new ApiError(501, "Thumbnail upload failed");
  }

  if (!videoUpload?.url) {
    throw new ApiError(500, "Video upload failed");
  }


  const video = await Video.create({
    videoFile: videoUpload.url,
    thumbnail: thumbnailUpload.url,
    title,
    description,
    duration,
    owner: req.user._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, video, "Video uploaded successfully"));
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
    uploadVideo
    
}