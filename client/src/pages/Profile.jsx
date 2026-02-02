import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import GalleryVideos from "../profile/gallery";
import GalleryPhotos from "../profile/GalleryPhotos";
import WatchedVideos from "../profile/WatchedVideos";
import WatchedPhotos from "../profile/WatchedPhoto";
import LikedVideos from "../profile/LikedVideos";




export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState("gallery");
  const [tab2, setTab2] = useState("photos");

  if (!user) return <p className="p-6">Loading...</p>;

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">

      {/* Header */}
      <div className="flex gap-6 items-center p-6 border-b border-slate-200 dark:border-slate-800">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-2 border-slate-300 dark:border-slate-700"
        />

        <div>
          <h2 className="text-2xl font-semibold">{user.fullname}</h2>
          <p className="text-slate-500 dark:text-slate-400">@{user.username}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{user.email}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 px-6 pt-2 border-b border-slate-200 dark:border-slate-800">
        <Tab label="Gallery" active={tab === "gallery"} onClick={() => setTab("gallery")} />
        <Tab label="Liked" active={tab === "liked"} onClick={() => setTab("liked")} />
        <Tab label="Watch History" active={tab === "watched"} onClick={() => setTab("watched")} />
      </div>
      <div className="flex gap-8 px-6 pt-2 border-b border-slate-200 dark:border-slate-800">
        <Tab2 label="Photos" active={tab2 === "photos"} onClick={() => setTab2("photos")} />
        <Tab2 label="Videos" active={tab2 === "videos"} onClick={() => setTab2("videos")} />
       </div>
      {/* Content */}
      <div className="p-6">
        {tab === "gallery" && tab2 === "photos" && <GalleryPhotos userId={user._id} />}
        {tab === "gallery" && tab2 === "videos" && <GalleryVideos userId={user._id} />}
        {tab === "liked" && tab2 === "photos" && <p>Your liked photos will appear here</p>}
        {tab === "liked" && tab2 === "videos" &&  <LikedVideos userId={user._id} />}
        {tab === "watched" && tab2 === "photos" && <WatchedPhotos userId={user._id} />}
        {tab === "watched" && tab2 === "videos" && <WatchedVideos userId={user._id} />}
      </div>

    </div>
  );
}

/* ---------- Tab Component ---------- */

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        pb-3 text-sm font-medium transition
        ${active 
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
          : "border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}
function Tab2({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        pb-3 text-sm font-medium transition
        ${active 
          ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
          : "border-b-2 border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        }
      `}
    >
      {label}
    </button>
  );
}
