import { useEffect, useState } from "react";
import { getAllPhotos} from "../api/photo"; 
import { Link } from "react-router-dom";

export default function Photos () {
  const [photos, setPhotos] = useState([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await getAllPhotos();
        setPhotos(res.data.data); // because ApiResponse -> { data: videos }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      // } finally {
      //   // setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // if (loading) return <p>Loading gallery...</p>;

  if (!photos.length)
    return <p className="text-slate-500">No uploads yet</p>;

  return (
    <div className="pt-25 px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-blue-50 dark:bg-black">
      {photos.map((photo) => (
        <Link
          to={`/Open/${photo._id}`}
          key={photo._id}
          className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={photo.photoFile}
            alt={photo.title}
            className="w-full aspect-video object-cover text-slate-500"
          />

          <div className="p-3">
            <h3 className="font-medium text-sm line-clamp-2 text-slate-500">
              {photo.title}
            </h3>

            <p className="text-xs text-slate-500 mt-1">
              {new Date(photo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}