import jwt from "jsonwebtoken"
import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { WatchHistoryVideo } from "../models/watchedVideo.model.js";
import { likedVideo } from "../models/likedVideo.model.js";

const uploadVideo = asyncHandler(async (req, res) => {
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

const galleryController = asyncHandler(async(req,res) =>{
  const userId= req.params.userId || req.user._id;

  if(!userId){
    throw new ApiError(400, "user's id is required")

  }

  const video = await Video.find({owner: userId})
  .sort({createdAt :-1})
  .select( "videoFile thumbnail title duration views createdAt" );

  return res
  .json(
    new ApiResponse(200, video ,"User videos fetched")
  )
});

const getVideoByIdController = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId); // Mongoose
  if (!video) throw new ApiError(404, "Video not found");
  return res.status(200).json(new ApiResponse(200, video, "Video fetched successfully"));
});

const getAllVideos = asyncHandler(async(req,res) => {
  const videos = await Video.find({})
  .select("videoFile thumbnail title duration views createdAt");
  return res
  .json(
    new ApiResponse(200, videos, "Videos fetched successfully"));
})

const addToHistory = asyncHandler(async (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { videoId, watchTime } = req.body;

  if (!videoId) {
    return res.status(400).json({
      success: false,
      message: "videoId is required",
    });
  }

  const history = await WatchHistoryVideo.findOneAndUpdate(
    {
      user: req.user._id,
      video: videoId,
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


const getHistory = asyncHandler(async (req, res) => {
  const history = await WatchHistoryVideo.find({
    user: req.user._id
  })
    .populate({
      path: "video",
      select: "title thumbnail duration views createdAt owner"
    })
    .sort({ watchedAt: -1 });
   return res.json(
    new ApiResponse(200,history,"watched video fetched successfully")
  );
});

const addToLiked = asyncHandler(async(req,res) =>{
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { videoId, watchTime } = req.body;

  if (!videoId) {
    return res.status(400).json({
      success: false,
      message: "videoId is required",
    });
  }

  const liked = await likedVideo.findOneAndUpdate(
    {
      user: req.user._id,
      video: videoId,
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
    new ApiResponse(201, liked, "liked video added successfully")
  );
})

const getLiked = asyncHandler(async(req,res) =>{
  const likedvideo = await likedVideo.find({user : req.user._id})
  .populate({
    path:"video",
    select: "title thumbnail duration views createdAt owner"
  })
  .sort({likedAt:-1});
  return res
  .json(
    new ApiResponse(200,likedvideo,"liked video fetched successfully")
  );
})

const deleteLiked = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  const deleted = await likedVideo.findOneAndDelete({
    user: req.user._id,
    video: videoId,
  });

  if (!deleted) {
    return res.status(404).json({ message: "Video not found in liked list" });
  }

  res.status(200).json({
    message: "Video removed from liked videos",
  });
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
    uploadVideo,
    galleryController,
    getVideoByIdController,
    getAllVideos,
    addToHistory,
    getHistory,
    addToLiked,
    getLiked,
    deleteLiked

    
    
}