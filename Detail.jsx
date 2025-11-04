import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Detail(){
  const { id } = useParams();
  const nav = useNavigate();
  const [data,setData]=useState(null);
  const [reviewText,setReviewText]=useState('');
  const [rating,setRating]=useState(5);

  useEffect(()=>{ if(id) fetchDetail(); }, [id]);

  async function fetchDetail(){
    const res = await fetch(`${API}/api/meals/${id}`);
    const json = await res.json();
    setData(json);
  }

  async function postReview(){
    await fetch(`${API}/api/reviews`, { method:'POST', headers:{'content-type':'application/json','Authorization': localStorage.getItem('hb_token') ? `Bearer ${localStorage.getItem('hb_token')}` : ''}, body: JSON.stringify({
      item_type:'meal', item_id:id, rating, text:reviewText
    })});
    setReviewText(''); setRating(5); fetchDetail();
  }

  if(!data) return <div className="card">Loading…</div>;
  const { meal, reviews } = data;
  return (
    <div className="card detail">
      <button onClick={()=>nav(-1)} className="btn-ghost">← Back</button>
      <h2>{meal.title}</h2>
      <div className="detail-grid">
        <img className="big" src={(meal.images&&meal.images[0])||'https://via.placeholder.com/900x600'} alt={meal.title}/>
        <div className="info">
          <p className="muted">{meal.city}</p>
          <p>{meal.description}</p>
          <h4>Ingredients</h4>
          <ul>{(meal.ingredients||[]).map((ing,i)=><li key={i}>{ing}</li>)}</ul>
          <h4>Steps</h4>
          <ol>{(meal.steps||[]).map((s,i)=><li key={i}>{s}</li>)}</ol>
        </div>
      </div>

      <section className="reviews">
        <h3>Reviews</h3>
        {(!reviews || reviews.length===0) && <p className="muted">No reviews yet — be the first!</p>}
        {(reviews||[]).map(r => (
          <div key={r.id} className="review">
            <strong>{r.user_name}</strong> <span className="muted">• {r.rating}★</span>
            <p>{r.text}</p>
          </div>
        ))}
      </section>

      <section className="leave-review">
        <h4>Leave a review</h4>
        <div>
          <label>Rating <input type="range" min="1" max="5" value={rating} onChange={e=>setRating(+e.target.value)} /></label>
        </div>
        <textarea placeholder="Write about the meal..." value={reviewText} onChange={e=>setReviewText(e.target.value)} />
        <button className="button-primary" onClick={postReview}>Post review</button>
      </section>
    </div>
  );
}
