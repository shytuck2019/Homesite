import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Collections(){
  const { user } = useContext(AuthContext);
  const [cols,setCols] = useState([]);
  const [name,setName] = useState('');

  async function load(){
    if (!user) return;
    const res = await axios.get(`${API}/api/collections`, { headers: { Authorization: `Bearer ${localStorage.getItem('hb_token')}` } });
    setCols(res.data);
  }

  useEffect(()=>{ load(); }, [user]);

  async function create(){
    await axios.post(`${API}/api/collections`, { name }, { headers: { Authorization: `Bearer ${localStorage.getItem('hb_token')}` } });
    setName(''); load();
  }

  return (
    <div>
      <h3>Your Collections</h3>
      <div style={{display:'flex',gap:8}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Collection name" />
        <button className="button-primary" onClick={create}>Create</button>
      </div>
      <div style={{marginTop:12}}>
        {cols.map(c => <div key={c.id} className="card" style={{padding:12, marginBottom:8}}>
          <strong>{c.name}</strong> — { (c.items||[]).length } items
        </div>)}
      </div>
    </div>
  );
}
