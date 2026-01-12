import React from 'react';
import { GitPullRequest, LogOut, ExternalLink, RefreshCw, LayoutDashboard } from 'lucide-react';

const Dashboard = ({ user, prs, loading }) => {
  const handleLogout = () => {
    window.location.href = 'http://localhost:5000/logout';
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <nav className="border-b border-[#30363d] bg-[#161b22]/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold text-white text-xl">
            <div className="bg-blue-600 p-1 rounded-md">
              <GitPullRequest size={20} className="text-white" />
            </div>
            DevQueue
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end text-sm">
              <span className="text-white font-medium">{user.username}</span>
              <span className="text-green-400 text-xs">Connected</span>
            </div>
            <img src={user.avatarUrl} className="w-9 h-9 rounded-full border border-[#30363d]" alt="avatar" />
            <button onClick={handleLogout} className="p-2 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-bold text-white">Your Pull Requests</h2>
            <p className="text-gray-400 mt-1">Tracking your latest open-source activity.</p>
          </div>
        </div>

        <div className="grid gap-4">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw className="animate-spin text-blue-500" size={32} />
            </div>
          ) : prs.length > 0 ? (
            prs.map(pr => (
              <div key={pr.id} className="bg-[#161b22] border border-[#30363d] p-5 rounded-xl hover:border-blue-500/50 transition-all group">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
                        pr.state === 'open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                      }`}>
                        {pr.state}
                      </span>
                      <span className="text-xs text-gray-500">#{pr.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {pr.title}
                    </h3>
                    <p className="text-sm text-gray-400">{pr.repository_url.split('repos/')[1]}</p>
                  </div>
                  <a href={pr.html_url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-white transition-colors">
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-2 border-dashed border-[#30363d] rounded-2xl">
              <p>No PRs found. Go contribute on GitHub!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;