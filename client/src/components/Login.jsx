import React from 'react';
import { FaGithub } from 'react-icons/fa'; // Import from FontAwesome set
import { GitPullRequest } from 'lucide-react'; // Keeping this for the logo icon

const Login = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/github';
  };

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6 bg-[#161b22] p-10 rounded-2xl border border-[#30363d] shadow-2xl">
        {/* Top Branding Icon */}
        <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-4">
          <GitPullRequest className="text-blue-500 w-10 h-10" />
        </div>
        
        <h1 className="text-4xl font-bold text-white tracking-tight">DevQueue</h1>
        <p className="text-gray-400 text-lg">
          Manage your Open Source contributions and PRs in one clean dashboard.
        </p>

        {/* The GitHub Login Button */}
        <button 
          onClick={handleLogin} 
          className="w-full flex items-center justify-center gap-3 bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-lg"
        >
          <FaGithub size={24} /> 
          <span>Login with GitHub</span>
        </button>

        <p className="text-xs text-gray-500 pt-4">
          Secure authentication via GitHub OAuth
        </p>
      </div>
    </div>
  );
};

export default Login;