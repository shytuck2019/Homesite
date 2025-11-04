import React, { useEffect, useState, useRef, useCallback } from 'react';
import VerticalFeedItem from '../components/VerticalFeedItem';
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export default function Feed() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef();

  useEffect(()=>{ loadMore(); }, []);

  async function loadMore(){
    setLoading(true);
    const res = await fetch(`${API}/api/feed?limit=6&offset=${page*6}`);
    const json = await res.json();
    setItems(prev => [...prev, ...(json.meals || [])]);
    setPage(p => p + 1);
    setLoading(false);
  }

  const lastRef = useCallback(node=>{
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) loadMore();
    }, { rootMargin: '300px' });
    if (node) observerRef.current.observe(node);
  }, [loading]);

  return (
    <div className="feed">
      <div className="vertical-feed">
        {items.map((it,i)=> (
          i === items.length-1
            ? <div ref={lastRef} key={it.id}><VerticalFeedItem item={it} /></div>
            : <VerticalFeedItem key={it.id} item={it} />
        ))}
        {loading && <div className="loading">Loading…</div>}
      </div>
    </div>
  );
}
