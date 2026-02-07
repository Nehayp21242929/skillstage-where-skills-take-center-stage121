import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLikedVideos } from "../api/video";

export default function LikedVideos() {
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked= async () => {
      try {
        const res = await getLikedVideos();
        console.log("API RESPONSE 👉", res.data);
        setLiked(res.data.data);
      } catch (err) {
        console.error("Failed to fetch liked videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLiked();
  }, []);

  if (loading) return <p>Loading watched videos...</p>;
  if (!liked.length)
    return <p className="text-slate-500">No watched videos yet</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {liked.map((item) => (
        <Link
          key={item._id}
          to={`/watch/${item.video._id}`}
          className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={item.video.thumbnail}
            alt={item.video.title}
            className="w-full aspect-video object-cover"
          />
          <div className="mt-2">
            <h3 className="font-medium text-sm line-clamp-2">
              {item.video.title}
            </h3>
            <p className="text-sm text-slate-500">
              Liked on {new Date(item.watchedAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
