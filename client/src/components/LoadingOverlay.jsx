import React from 'react'

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-[2px]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
    </div>
  );
};

export default LoadingOverlay;