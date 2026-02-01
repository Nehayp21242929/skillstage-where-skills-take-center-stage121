import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getPhotoById, addToWatchHistoryPhoto } from "../api/photo";

const OpenImage = () => {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
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
        <p className="mt-2 text-gray-500">{photo.description}</p>
      </div>
    </div>
  );
};

export default OpenImage;
