import React, { useState, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import SearchBar from './components/SearchBar';
import PlayerCard from './components/PlayerCard';
import Favorites from './components/Favorites';

function App() {
  const [player, setPlayer] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, 'test@example.com', 'password')
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error("Sign-in error:", error);
      });
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign-out error:", error);
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <nav className="bg-blue-500 p-4 text-white flex items-center justify-between">
        <h1 className="text-2xl font-bold">Soccer Seekers</h1>
        {user ? (
          <button onClick={handleSignOut} className="ml-2 p-2 bg-red-500 text-white rounded">
            Sign Out
          </button>
        ) : (
          <button onClick={handleSignIn} className="ml-2 p-2 bg-green-500 text-white rounded">
            Sign In
          </button>
        )}
      </nav>
      <div className="container mx-auto p-4">
        <SearchBar onSearch={setPlayer} />
        {player && <PlayerCard player={player} userId={user?.uid} />}
        {user && <Favorites userId={user.uid} />}
      </div>
    </div>
  );
}

export default App;
