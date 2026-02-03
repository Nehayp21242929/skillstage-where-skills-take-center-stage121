import { useParams ,  useNavigate} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPhotoById, addToWatchHistoryPhoto, getLikedPhotos,addToLikedPhotos,deleteLikedPhotos } from "../api/photo";
import { useAuth } from "../context/AuthContext";

const OpenImage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);

  const [liked, setLiked] = useState(false);
  const [likedPhotos, setLikedPhotos] = useState([]);
  const historyAdded = useRef(false);

  // Fetch photo
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await getPhotoById(id);
        setPhoto(res.data.data);
      } catch (err) {
        console.error("Fetch photo error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  // Add to history ONCE when photo loads
  useEffect(() => {
    if (!photo || historyAdded.current) return;

    const addHistory = async () => {
      try {
        await addToWatchHistoryPhoto({
          photoId: photo._id,
      });
        historyAdded.current = true;
        console.log("✅ Photo history added");
      } catch (err) {
        console.error("❌ History error:", err);
      }
    };

    addHistory();
  }, [photo]);

  useEffect(() => {
      if (!photo || !user) return;
  
      const fetchLikedPhotos = async () => {
        try {
          const res = await getLikedPhotos();
          const likedList = res.data.data || [];
  
          setLikedPhotos(likedList);
  
          const alreadyLiked = likedList.some(
            (item) => item.photo._id === photo._id
          );
  
          setLiked(alreadyLiked);
        } catch (err) {
          console.error("Fetch liked photos error:", err);
        }
      };
  
      fetchLikedPhotos();
    }, [photo, user]);
  
    /* ---------------- Like / Unlike ---------------- */
    const handleLike = async (photoId) => {
      if (!user) {
        navigate("/login");
        return;
      }
  
      try {
        if (liked) {
          // UNLIKE
          await deleteLikedPhotos(photoId);
          setLiked(false);
          setLikedPhotos((prev) =>
            prev.filter((item) => item.photo._id !== photoId)
          );
        } else {
          // LIKE
          await addToLikedPhotos({
            photoId
          });
          setLiked(true);
        }
      } catch (err) {
        console.error("Like toggle error:", err);
      }
    };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!photo) return <p className="p-6">Photo not found</p>;

  return (
    <div className="p-20 bg-white dark:bg-black min-h-screen">
      <div className="max-w-5xl mx-auto">
        <img
          src={photo.photoFile}
          alt={photo.title}
          className="w-full rounded-xl bg-black"
        />

        <h1 className="mt-4 text-2xl font-bold">{photo.title}</h1>
        <p className="mt-2 text-gray-500">
          {new Date(photo.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => handleLike(photo._id)}
          className={`mt-4 px-4 py-2 rounded-full border transition ${
            liked
              ? "bg-red-500 text-white"
              : "bg-white text-black border-gray-300"
          }`}
        >
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <p className="mt-2 text-gray-500">{photo.description}</p>
      </div>
    </div>
  );
};

export default OpenImage;
