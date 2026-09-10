import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser , loginUser, logoutUser} from "../api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser()
      setUser(res.data.data)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }
  
const login = async (formData) => {
    console.log("login called with:", formData)  // ✅ are credentials reaching here?
    try {
      const res = await loginUser(formData);
      console.log("Full response:", res)          // ✅ what does backend return?
      console.log("Response data:", res.data)
      console.log("Access token:", res.data.data.accessToken)  // ✅ is token here?
      
      localStorage.setItem("accessToken", res.data.data.accessToken)
      console.log("Saved to localStorage:", localStorage.getItem("accessToken"))
      
      setUser(res.data.data.user);
      return res;
    } catch (err) {
      console.error("Login error:", err.response?.data)  // ✅ what error exactly?
      console.error("Status:", err.response?.status)
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      
      // ✅ ADD THIS — clear token on logout
      localStorage.removeItem("accessToken")
      
      setUser(null);
      window.location.href = "/";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };


  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <AuthContext.Provider value={{user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
