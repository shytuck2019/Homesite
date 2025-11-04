import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function MapView(){
  const [pos,setPos] = useState([39.1031, -84.5120]);
  const [data,setData] = useState({ meals: [], places: [] });
  const [radius,setRadius] = useState(10);

  useEffect(()=>{
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(p=> setPos([p.coords.latitude, p.coords.longitude]));
  }, []);

  useEffect(()=> fetchAround(), [pos, radius]);

  async function fetchAround(){
    const res = await fetch(`${API}/api/map/search?lat=${pos[0]}&lon=${pos[1]}&km=${radius}`);
    const json = await res.json();
    setData(json);
  }

  return (
    <div>
      <div style={{padding:8}}>
        <label>Radius (km): <input type="range" min="1" max="100" value={radius} onChange={e=>setRadius(e.target.value)} /></label>
      </div>
      <div style={{height:'70vh'}}>
        <MapContainer center={pos} zoom={13} style={{height:'100%', width:'100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={pos}><Popup>You are here</Popup></Marker>
          <Circle center={pos} radius={radius*1000} />
          {data.places.map(pl => <Marker key={pl.id} position={[pl.lat, pl.lon]}><Popup>{pl.name}<br/>{pl.city}</Popup></Marker>)}
          {data.meals.map(m => <Marker key={m.id} position={[m.lat, m.lon]}><Popup>{m.title}<br/>{m.city}</Popup></Marker>)}
        </MapContainer>
      </div>
    </div>
  );
}
