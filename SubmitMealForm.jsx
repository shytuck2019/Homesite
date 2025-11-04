import React, { useState, useContext } from 'react';
import FileUpload from './FileUpload';
import { AuthContext } from '../AuthContext';

const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function SubmitMealForm({ onDone }) {
  const { user, token } = useContext(AuthContext);
  const [title,setTitle]=useState(''); const [city,setCity]=useState(''); const [desc,setDesc]=useState('');
  const [images,setImages]=useState([]); const [videoUrl,setVideoUrl]=useState(''); const [tags,setTags]=useState('');
  const [ingredients,setIngredients]=useState(''); const [steps,setSteps]=useState('');

  function handleUploaded(url){
    setImages(prev => [url, ...prev]);
  }

  async function submit(e){
    e.preventDefault();
    const body = {
      title, type:'home', images, video_url:videoUrl, description:desc,
      ingredients: ingredients.split('\n').filter(Boolean),
      steps: steps.split('\n').filter(Boolean),
      city, tags
    };
    const res = await fetch(`${API}/api/meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' },
      body: JSON.stringify(body)
    });
    if (res.ok) { onDone && onDone(); window.location = '/'; } else { alert('Failed to post'); }
  }

  return (
    <form className="card submit-form" onSubmit={submit}>
      <h3>Post a Home-Cooked Meal</h3>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" required />
      <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City" />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Tags (comma separated)" />
      <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short description" />
      <label>Upload photo or short video</label>
      <FileUpload onUploaded={handleUploaded} />
      <div className="preview">
        {images.map((u,i)=>(<img key={i} src={u} alt="" style={{width:80,height:80,objectFit:'cover',marginRight:8,borderRadius:8}}/>))}
      </div>
      <label>Or paste hosted video URL</label>
      <input value={videoUrl} onChange={e=>setVideoUrl(e.target.value)} placeholder="https://..." />
      <textarea value={ingredients} onChange={e=>setIngredients(e.target.value)} placeholder="Ingredients (one per line)" />
      <textarea value={steps} onChange={e=>setSteps(e.target.value)} placeholder="Steps (one per line)" />
      <button className="button-primary" type="submit">Post</button>
    </form>
  );
}
