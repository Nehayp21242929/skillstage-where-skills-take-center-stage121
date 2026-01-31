import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getPhotoById } from "../api/photo"

const OpenImage = () => {
  const { id } = useParams()
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const res = await getPhotoById(id)
        // if backend returns array → use res.data.data[0]
        setPhoto(res.data.data)
      } catch (err) {
        console.error("Fetch photo error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPhoto()
  }, [id])
  console.log("STATE Photo 👉", id)


  if (loading) return <p className="p-6">Loading...</p>
  if (!photo) return <p className="p-6">Photo not found</p>

  return (
    <div className="p-20 bg-white dark:bg-black min-h-screen">

      <div className="max-w-5xl mx-auto">

        <img
          src={photo.photoFile}
          alt="photo.title"
          className="w-full aspect-video rounded-xl bg-black"
        />

        <h1 className="mt-4 text-2xl font-bold">{photo.title}</h1>
        <p className="mt-2 text-gray-500"> {new Date(photo.createdAt).toLocaleDateString()}</p>
        <p className="mt-2 text-gray-500">{photo.description}</p>

      </div>

    </div>
  )
}

export default OpenImage;