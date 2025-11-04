import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const AuthContext = createContext();
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export function AuthProvider({ children }){
  const [token, setToken] = useState(localStorage.getItem('hb_token') || null);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    if (token) {
      localStorage.setItem('hb_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, name: payload.name, email: payload.email });
      } catch(e){ setUser(null); }
    } else {
      localStorage.removeItem('hb_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const login = (t) => setToken(t);
  const logout = () => setToken(null);

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
