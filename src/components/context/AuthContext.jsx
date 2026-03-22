'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let savedUser = localStorage.getItem('pollUser');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const demoUser = {
        id: 'user_abhinash_' + Date.now(),
        name: 'Abhinash Abhi',
        email: 'abhinash@poll.com'
      };
      localStorage.setItem('pollUser', JSON.stringify(demoUser));
      setUser(demoUser);
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
