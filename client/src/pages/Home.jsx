import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPhotos } from "../api/photo";
import { getAllVideos } from "../api/video";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [photoRes, videoRes] = await Promise.all([
          getAllPhotos(),
          getAllVideos(),
        ]);
        setPhotos(photoRes.data.data);
        setVideos(videoRes.data.data);
      } catch (err) {
        console.error("Home fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -420 : 420,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pt-32 px-6 md:px-16 space-y-24 bg-slate-50 dark:bg-black min-h-screen">

      {/* HERO */}
      <div className="relative max-w-5xl">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <span className="inline-block mb-6 px-4 py-1.5 text-xs font-medium rounded-full 
          bg-white dark:bg-slate-900
          text-slate-600 dark:text-slate-300 
          border border-slate-200 dark:border-slate-700">
          ✨ Curated Creative Platform
        </span>

        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight text-slate-900 dark:text-white">
          Discover{" "}
          <span className="text-blue-600 dark:text-blue-500">
            Creative Content
          </span>
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl text-slate-600 dark:text-slate-400 leading-relaxed">
          Explore trending videos and stunning posts uploaded by developers/students
          around the world.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <button className="px-6 py-3 rounded-xl 
            bg-blue-600 hover:bg-blue-700
            text-white shadow-md hover:shadow-lg 
            transition-all duration-300 hover:-translate-y-1">
            Explore Now
          </button>

          <button className="px-6 py-3 rounded-xl 
            bg-white dark:bg-slate-900
            border border-slate-200 dark:border-slate-700
            text-slate-800 dark:text-slate-200
            hover:shadow-md transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>

      {/* VIDEOS */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div className="relative">
            <div className="absolute -left-6 top-3 h-10 w-1 rounded-full bg-blue-600" />
            <div className="pl-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Featured Collection
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
                Trending <span className="text-blue-600">Videos</span>
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-lg">
                Discover the most watched and shared content.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {[["left", videoRef], ["right", videoRef]].map(([dir, ref], i) => (
              <button
                key={i}
                onClick={() => scroll(ref, dir)}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              >
                {dir === "left" ? (
                  <ChevronLeft className="text-black dark:text-white" size={20} />
                ) : (
                  <ChevronRight className="text-black dark:text-white" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={videoRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 scrollbar-hide"
        >
          {videos.map((video) => (
            <Link
              key={video._id}
              to={`/watch/${video._id}`}
              className="min-w-[420px] snap-start group"
            >
              <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">

                <div className="relative h-60 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-blue-600 text-white rounded-full p-4 shadow-lg">
                      ▶
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Uploaded on : {new Date(video.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* PHOTOS */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div className="relative">
            <div className="absolute -left-6 top-3 h-10 w-1 rounded-full bg-blue-600" />
            <div className="pl-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Creative Gallery
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white">
                Recent <span className="text-blue-600">Photos</span>
              </h2>
              <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-lg">
                Fresh visual stories from our community.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            {[["left", photoRef], ["right", photoRef]].map(([dir, ref], i) => (
              <button
                key={i}
                onClick={() => scroll(ref, dir)}
                className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 transition"
              >
                {dir === "left" ? (
                  <ChevronLeft className="text-black dark:text-white" size={20} />
                ) : (
                  <ChevronRight className="text-black dark:text-white" size={20} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={photoRef}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 scrollbar-hide"
        >
          {photos.map((photo) => (
            <Link
              key={photo._id}
              to={`/Open/${photo._id}`}
              className="min-w-[370px] snap-start group"
            >
              <div className="rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:-translate-y-2">

                <div className="relative h-60 overflow-hidden">
                  <img
                    src={photo.photoFile}
                    alt={photo.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <div className="px-5 py-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                    Uploaded on: {new Date(photo.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= ABOUT SECTION ================= */}
<section className="relative mt-32 pt-20 pb-16 border-t border-slate-200 dark:border-slate-800">

  {/* Background Glow */}
  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] 
    bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 
    blur-3xl pointer-events-none" />

  <div className="relative max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

    {/* ================= BRAND INFO ================= */}
    <div>
      <h3 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Skill
        <span className=" text-blue-400  bg-clip-text ">
          Stage
        </span>
      </h3>

      <p className="mt-6 text-slate-600 dark:text-slate-400 leading-relaxed">
        SkillStage is a creative platform built to showcase talent, 
        inspire innovation, and connect developers with the world. 
        From cinematic videos to stunning posts, we provide 
        a stage where skills shine.
      </p>

      <p className="mt-4 text-slate-500 dark:text-slate-500 text-sm">
        Built with passion for creators and innovators.
      </p>
    </div>

    {/* ================= CONTACT INFO ================= */}
    <div>
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Contact
      </h4>

      <ul className="space-y-4 text-slate-600 dark:text-slate-400">
        <li>
          📧 support@skillstage.com
        </li>
        <li>
          📍 India
        </li>
        <li>
          📞 +91 00000 00000
        </li>
      </ul>
    </div>

    {/* ================= SOCIAL MEDIA ================= */}
    <div>
      <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
        Follow Us
      </h4>

      <div className="flex gap-4">

        <a
          href="#"
          className="px-4 py-2 rounded-xl text-purple-500
          bg-slate-100 dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700
          hover:shadow-md hover:-translate-y-1 
          transition-all duration-300 text-sm"
        >
          Instagram
        </a>

        <a
          href="#"
          className="px-4 py-2 rounded-xl text-blue-400
          bg-slate-100 dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700
          hover:shadow-md hover:-translate-y-1 
          transition-all duration-300 text-sm"
        >
          Twitter
        </a>

        <a
          href="#"
          className="px-4 py-2 rounded-xl  text-blue-600
          bg-slate-100 dark:bg-slate-800 
          border border-slate-200 dark:border-slate-700
          hover:shadow-md hover:-translate-y-1 
          transition-all duration-300 text-sm"
        >
          LinkedIn
        </a>

      </div>
    </div>

  </div>

  {/* ================= BOTTOM COPYRIGHT ================= */}
  <div className="mt-16 text-center text-sm text-slate-500 dark:text-slate-600 border-t border-slate-200 dark:border-slate-800 pt-6">
    © {new Date().getFullYear()} SkillStage. All rights reserved.
  </div>

</section>

    </div>
  );
};

export default Home;