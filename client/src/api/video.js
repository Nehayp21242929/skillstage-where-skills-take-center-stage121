import API from "./auth"; // reuse your axios instance

// Upload video
export const uploadForm = () => {
  return API
}

export const uploadVideo = (formData) => {
  return API.post("/videos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get all published videos (home/watch page)
export const getAllVideos = () => {
  return API.get("/videos/allVideos");
};

// Get single video
export const getVideoById = (videoId) => {
  return API.get(`/videos/playvideo/${videoId}`);
};

// Get all videos of a channel
export const getChannelVideos = (userId) => {
  return API.get(`/videos/gallery/${userId}`);
};

export const getHistoryVideos =() =>{
  return API.get(`/videos/getHistory`)
};

export const addToWatchHistoryVideos =({ videoId, watchTime }) =>{
  return API.post(`/videos/addHistory`, { videoId, watchTime })
};

export const getLikedVideos =() =>{
  return API.get(`/videos/getLiked`)
}

export const addToLikedVideos =({ videoId, watchTime }) =>{
  return API.post(`/videos/addLiked`, { videoId, watchTime })
};

export const deleteLiked =(videoId)=>{
  return API.delete(`/videos/deleteLiked/${videoId}`);
}
