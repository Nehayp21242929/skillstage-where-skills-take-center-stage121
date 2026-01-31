import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getVideoById } from "../api/video"

const Watch = () => {
  const { id } = useParams()
  const [video, setVideo] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await getVideoById(id)
        // if backend returns array → use res.data.data[0]
        setVideo(res.data.data)
      } catch (err) {
        console.error("Fetch video error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [id])
  console.log("STATE VIDEO 👉", video)


  if (loading) return <p className="p-6">Loading...</p>
  if (!video) return <p className="p-6">Video not found</p>

  return (
    <div className="pt-20 bg-white dark:bg-black min-h-screen">

      <div className="max-w-5xl mx-auto">

        {/* 🎥 REAL VIDEO PLAYER */}
        <video
          src={video.videoFile}
          controls
          autoPlay
          className="w-full aspect-video rounded-xl bg-black"
        />

        <h1 className="mt-4 text-2xl font-bold">{video.title}</h1>
        <p className="mt-2 text-gray-500"> {new Date(video.createdAt).toLocaleDateString()}</p>
        <p className="mt-2 text-gray-500">{video.description}</p>

      </div>

    </div>
  )
}

export default Watch

