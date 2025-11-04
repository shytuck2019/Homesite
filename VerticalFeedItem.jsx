import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function VerticalFeedItem({ item }) {
  const ref = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if (item.video_url) {
          const vid = node.querySelector('video');
          if (!vid) return;
          if (e.isIntersecting) { vid.play().catch(()=>{}); } else { vid.pause(); }
        }
      });
    }, { threshold: 0.6 });
    io.observe(node);
    return ()=> io.disconnect();
  }, [item]);

  const media = (item.images && item.images[0]) || null;
  return (
    <article className="vertical-item" ref={ref} onClick={()=>navigate('/meals/'+item.id)}>
      { item.video_url ? (
          <video src={item.video_url} muted playsInline loop style={{width:'100%', height:'68vh', objectFit:'cover'}} />
        ) : (
          <img src={media || 'https://via.placeholder.com/900x900?text=HomeBite'} alt={item.title} loading="lazy" />
        )
      }
      <div className="meta">
        <h3>{item.title}</h3>
        <p className="muted">{item.city || 'Local' } • {item.tags}</p>
        <p className="desc">{item.description}</p>
      </div>
    </article>
  );
}
