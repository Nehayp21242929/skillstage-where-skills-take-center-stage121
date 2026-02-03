import API from "./auth"; // reuse your axios instance

// Upload video
export const uploadPhoto = (formData) => {
  return API.post("/photos/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// Get all published videos (home/watch page)
export const getAllPhotos = () => {
  return API.get("/photos/allPhotos");
};

// Get single video
export const getPhotoById = (photoId) => {
  return API.get(`/photos/playphoto/${photoId}`);
};

// Get all videos of a channel
export const getChannelPhoto = (userId) => {
  return API.get(`/photos/gallery/${userId}`);
};

export const getHistoryPhoto =() =>{
  return API.get(`/photos/getHistory`)
};

export const addToWatchHistoryPhoto =({ photoId, watchTime }) =>{
  return API.post(`/photos/addHistory`, { photoId, watchTime })
};

export const getLikedPhotos =() =>{
  return API.get(`/photos/getLiked`)
}

export const addToLikedPhotos =({ photoId}) =>{
  return API.post(`/photos/addLiked`, { photoId })
};

export const deleteLikedPhotos =(photoId)=>{
  return API.delete(`/photos/deleteLiked/${photoId}`);
}

