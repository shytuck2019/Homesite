import React, { useState } from 'react';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function FileUpload({ onUploaded }) {
  const [loading,setLoading] = useState(false);
  async function handle(e){
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/upload`, fd, { headers: { 'Content-Type': 'multipart/form-data' }});
      onUploaded(res.data.urls?.med || res.data.urls?.webp || res.data.urls?.originalUrl || res.data.url);
    } catch (err) {
      console.error(err); alert('Upload failed');
    } finally { setLoading(false); }
  }
  return <input type="file" accept="image/*,video/*" onChange={handle} disabled={loading} />;
}
