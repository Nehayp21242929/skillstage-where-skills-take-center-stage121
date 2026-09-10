import { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

const LoginForm = ({ onSuccess }) => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      setUser(res.data.data.user); 
      onSuccess();
    } catch (err) {
      alert(err.response?.data?.message || "Login failed Try again!!!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
       <div className="flex items-center gap-3">
           <label className="w-20 whitespace-nowrap dark:text-white">Email:</label>
             <input
               name="email"
               required
               placeholder="Type... Your Email"
               onChange={handleChange}
               className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
             />
        </div>
        <div className="flex items-center gap-3">
            <label className="w-20 whitespace-nowrap dark:text-white">Password :</label>
              <input
                name="password"
                type="password"
                required
                placeholder="Your Password"
                onChange={handleChange}
                className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
              />
        </div>
        <button type="submit" className="w-full bg-blue-600 p-2 rounded text-white hover:bg-blue-500">
             Login
        </button>
    </form>
  );
};

export default LoginForm;

// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";

// const LoginForm = ({ onSuccess }) => {
//   const { login } = useAuth()  // ✅ use AuthContext login

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await login(form)  // ✅ saves token to localStorage automatically
//       onSuccess();
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed Try again!!!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <div className="flex items-center gap-3">
//         <label className="w-20 whitespace-nowrap dark:text-white">Email:</label>
//         <input
//           name="email"
//           required
//           placeholder="Type... Your Email"
//           onChange={handleChange}
//           className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
//         />
//       </div>
//       <div className="flex items-center gap-3">
//         <label className="w-20 whitespace-nowrap dark:text-white">Password:</label>
//         <input
//           name="password"
//           type="password"
//           required
//           placeholder="Your Password"
//           onChange={handleChange}
//           className="flex-1 p-2 bg-gray-100 dark:bg-gray-700 rounded text-black dark:text-white"
//         />
//       </div>
//       <button type="submit" className="w-full bg-blue-600 p-2 rounded text-white hover:bg-blue-500">
//         Login
//       </button>
//     </form>
//   );
// };

// export default LoginForm;