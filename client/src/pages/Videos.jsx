import { useEffect, useState } from "react";
import VideoGrid from "../components/VideoGrid";
import { getAllVideos } from "../api/video";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await getAllVideos();
        setVideos(res.data.data); // adjust if your backend structure differs
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="pt-30 px-10 bg-blue-50 dark:bg-black">
      <VideoGrid videos={videos} />
    </div>
  );
};

export default Videos;
