import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const endLoading = () => setLoading(false);

    window.addEventListener("api-loading-start", startLoading);
    window.addEventListener("api-loading-end", endLoading);

    return () => {
      window.removeEventListener("api-loading-start", startLoading);
      window.removeEventListener("api-loading-end", endLoading);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);