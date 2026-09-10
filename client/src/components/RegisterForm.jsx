import { useState } from "react";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const RegisterForm = ({ onSuccess }) => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    username: "",
    password: ""
  });

  const [avatar, setAvatar] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    if (avatar) data.append("avatar", avatar);

    try {
      const res = await registerUser(data);
      setUser(res.data.data.user); 
      onSuccess();
      
      alert("Registration successful!");
      setFullname("");
      setEmail("");
      setUsername("");
      setPassword("");
      setAvatar(null);
      setCoverImage(null);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

  <div className="flex items-center gap-3">
    <label className="w-28 whitespace-nowrap dark:text-white">Full Name:</label>
    <input
      name="fullname"
      required
      placeholder="Your Full Name"
      onChange={handleChange}
      className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="w-28 whitespace-nowrap dark:text-white">Username:</label>
    <input
      name="username"
      required
      placeholder="Type your Username"
      onChange={handleChange}
      className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="w-28 whitespace-nowrap dark:text-white">Email:</label>
    <input
      name="email"
      required
      placeholder="eg. abc@gmail.com"
      onChange={handleChange}
      className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="w-28 whitespace-nowrap dark:text-white">Password:</label>
    <input
      type="password"
      name="password"
      required
      placeholder="Password"
      onChange={handleChange}
      className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
    />
  </div>

  <div className="flex items-center gap-3">
    <label className="w-28 whitespace-nowrap dark:text-white">Avatar:</label>
    <input
      type="file"
      required
      onChange={(e) => setAvatar(e.target.files[0])}
      className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
    />
  </div>
  
     <button className="w-full bg-green-600 p-2 rounded text-white hover:bg-green-500">
      Sign Up
    </button>
 </form>
  );
};



      {/* <p>Username : <input name="username" required placeholder="Username"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/></p>

      <input name="email" required placeholder="Email"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/>

      <input name="password" type="password" required placeholder="Password"
        onChange={handleChange}
        className="w-full p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"/> */}

      {/* <input type="file" onChange={(e) => setAvatar(e.target.files[0])}
        className="w-full text-sm text-gray-300"/> */}


export default RegisterForm;
