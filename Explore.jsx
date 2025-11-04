import React, { useEffect, useState } from 'react';
import GridCard from '../components/GridCard';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Explore(){
  const [items,setItems]=useState([]);
  useEffect(()=>{ fetchFeed(); }, []);
  async function fetchFeed(){
    const res = await fetch(`${API}/api/feed`);
    const json = await res.json();
    setItems(json.meals || []);
  }
  return (
    <div>
      <h2>Explore</h2>
      <div className="grid">
        {items.map(i=> <GridCard key={i.id} item={i} />)}
      </div>
    </div>
  );
}
