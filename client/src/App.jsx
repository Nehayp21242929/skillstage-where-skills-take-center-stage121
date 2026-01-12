import React, { useEffect, useState } from 'react';
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';

function App() {
  const [user, setUser] = useState(null);
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check for user session
    fetch('http://localhost:5000/api/user')
      .then(res => res.json())
      .then(userData => {
        if (!userData.message) {
          setUser(userData);
          // Fetch PRs if user exists
          setLoading(true);
          fetch('http://localhost:5000/api/prs')
            .then(res => res.json())
            .then(prData => {
              setPrs(prData);
              setLoading(false);
            })
            .catch(() => setLoading(false));
        }
      });
  }, []);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <Dashboard user={user} prs={prs} loading={loading} />
      )}
    </>
  );
}

export default App;