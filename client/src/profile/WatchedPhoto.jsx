import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHistoryPhoto } from "../api/photo";

export default function WatchedPhotos() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistoryPhoto();
        setHistory(res.data.data);
        console.log(res.data)
        
      } catch (err) {
        console.error("Failed to fetch watch history", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading watched photos...</p>;
  if (!history.length)
    return <p className="text-slate-500">No watched photos yet</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {history.map((item) => (
        <Link
          key={item._id}
          to={`/Open/${item.photo._id}`}
          className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >

          <img
            src={item.photo.photoFile}
            alt={item.photo.title}
            className="w-full aspect-video object-cover"
          />

          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2">
              {item.photo.title}
            </h3>
            <p className="text-sm text-slate-500">
              Watched on {new Date(item.watchedAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
