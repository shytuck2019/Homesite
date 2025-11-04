import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Register(){
  const { login } = useContext(AuthContext);
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const [err,setErr]=useState('');
  async function submit(e){
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/register`, { name, email, password });
      login(res.data.token);
      window.location = '/';
    } catch (e) {
      setErr(e.response?.data?.error || 'Register failed');
    }
  }
  return (
    <form className="card auth-form" onSubmit={submit}>
      <h3>Register</h3>
      {err && <div className="error">{err}</div>}
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name (optional)" />
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
      <button className="button-primary" type="submit">Create account</button>
    </form>
  );
}
