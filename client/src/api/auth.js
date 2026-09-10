import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1", 
  withCredentials: true
})

// ✅ ADD THIS — attaches token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  window.dispatchEvent(new Event("api-loading-start"));
  return config
})
// Hide loading after request succeeds
API.interceptors.response.use(
  (response) => {
    window.dispatchEvent(new Event("api-loading-end"));
    return response;
  },
  (error) => {
    window.dispatchEvent(new Event("api-loading-end"));
    return Promise.reject(error);
  }
);

// REGISTER
export const registerUser = (formData) => {
  return API.post("/users/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

// LOGIN
export const loginUser = (data) => {
  return API.post("/users/login", data)
}

// LOGOUT
export const logoutUser = () => {
  return API.post("/users/logout")
}

// CURRENT USER
export const getCurrentUser = () => {
  return API.get("/users/current-user")
}

export default API
