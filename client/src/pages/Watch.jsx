import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getVideoById,
  addToWatchHistoryVideos,
  getLikedVideos,
  addToLikedVideos,
  deleteLiked,
} from "../api/video";
import { useAuth } from "../context/AuthContext";

const Watch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);

  const videoRef = useRef(null);
  const historyAdded = useRef(false);

  /* ---------------- Fetch video ---------------- */
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id);
        setVideo(res.data.data);
      } catch (err) {
        console.error("Fetch video error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  /* ---------------- Watch history ---------------- */
  const handleAddToHistory = async () => {
    if (!user || !videoRef.current || historyAdded.current) return;

    try {
      await addToWatchHistoryVideos({
        videoId: video._id,
        watchTime: Math.floor(videoRef.current.currentTime),
      });
      historyAdded.current = true;
    } catch (err) {
      console.error("History error:", err);
    }
  };

  /* ---------------- Fetch liked videos ---------------- */
  useEffect(() => {
    if (!video || !user) return;

    const fetchLikedVideos = async () => {
      try {
        const res = await getLikedVideos();
        const likedList = res.data.data || [];

        setLikedVideos(likedList);

        const alreadyLiked = likedList.some(
          (item) => item.video._id === video._id
        );

        setLiked(alreadyLiked);
      } catch (err) {
        console.error("Fetch liked videos error:", err);
      }
    };

    fetchLikedVideos();
  }, [video, user]);

  /* ---------------- Like / Unlike ---------------- */
  const handleLike = async (videoId) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (liked) {
        // UNLIKE
        await deleteLiked(videoId);
        setLiked(false);
        setLikedVideos((prev) =>
          prev.filter((item) => item.video._id !== videoId)
        );
      } else {
        // LIKE
        await addToLikedVideos({
          videoId,
          watchTime: videoRef.current
            ? Math.floor(videoRef.current.currentTime)
            : 0,
        });
        setLiked(true);
      }
    } catch (err) {
      console.error("Like toggle error:", err);
    }
  };

  /* ---------------- UI ---------------- */
  if (loading) return <p className="p-6">Loading...</p>;
  if (!video) return <p className="p-6">Video not found</p>;

  return (
    <div className="pt-20 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <video
          ref={videoRef}
          src={video.videoFile}
          controls
          autoPlay
          className="w-full aspect-video rounded-xl bg-black"
          onPlay={handleAddToHistory}
        />

        <h1 className="mt-4 text-2xl font-bold">{video.title}</h1>

        <p className="mt-2 text-gray-500">
          {new Date(video.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => handleLike(video._id)}
          className={`mt-4 px-4 py-2 rounded-full border transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <p className="mt-4 text-gray-500">{video.description}</p>
      </div>
    </div>
  );
};

export default Watch;
