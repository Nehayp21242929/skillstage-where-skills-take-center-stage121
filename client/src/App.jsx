import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import Photos from "./pages/Photos";
import Profile from "./pages/Profile";
import Watch from "./pages/Watch";
import OpenImage from "./pages/OpenImage";
import Auth from "./pages/Auth";
import UploadVideo from "./uploading/UploadVideo";
import UploadForm from "./uploading/UploadForm";
import UploadPhoto from "./uploading/UploadPhoto";
import { AuthProvider } from "./context/AuthContext";
import { useLoading } from "./context/LoadingContext";
import LoadingOverlay from "./components/LoadingOverlay";

function App() {

  const { loading } = useLoading();

  return (
    <>

    {loading && <LoadingOverlay />}
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/VideoPage" element={<Videos />} />
        <Route path="/PhotoPage" element={<Photos />}/>
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/upload" element={<UploadVideo />} />
        <Route path="/watch/:id" element={<Watch />} />
        <Route path="/Open/:id" element={<OpenImage />} />
        <Route path="/uploadForm" element={<UploadForm />} />
        <Route path="/uploadPhoto" element={<UploadPhoto />} />

      </Routes>
    </AuthProvider>

    </>
  );
}

export default App;
