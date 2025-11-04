import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Login(){
  const { login } = useContext(AuthContext);
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [err,setErr]=useState('');

  async function submit(e){
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, { email, password });
      login(res.data.token);
      window.location = '/';
    } catch (e) {
      setErr(e.response?.data?.error || 'Login failed');
    }
  }

  return (
    <form className="card auth-form" onSubmit={submit}>
      <h3>Login</h3>
      {err && <div className="error">{err}</div>}
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button className="button-primary" type="submit">Login</button>
    </form>
  );
}
