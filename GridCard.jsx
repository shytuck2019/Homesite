import React from 'react';
import { useNavigate } from 'react-router-dom';
export default function GridCard({ item }) {
  const navigate = useNavigate();
  const img = (item.images && item.images[0]) || 'https://via.placeholder.com/600x400';
  return (
    <div className="card" onClick={()=>navigate('/meals/'+item.id)}>
      <img src={img} alt={item.title} />
      <div className="card-body">
        <h4>{item.title}</h4>
        <p className="muted">{item.city || 'Local'}</p>
      </div>
    </div>
  );
}
