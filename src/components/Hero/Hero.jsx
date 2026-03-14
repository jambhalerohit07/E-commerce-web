import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play } from 'lucide-react'
import './Hero.css'

const SLIDES = [
  {
    tag: "2025 Collection",
    title: "Men's Bags",
    sub: "Premium quality bags built for every adventure and lifestyle.",
    cta: "Shop Now",
    img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&h=520&fit=crop",
    bg: "linear-gradient(120deg, #1c2b3a 0%, #1f3a52 55%, #163044 100%)",
  },
  {
    tag: "Best Sellers",
    title: "Tech Gadgets",
    sub: "Smart accessories to power your everyday productivity.",
    cta: "Explore Now",
    img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=700&h=520&fit=crop",
    bg: "linear-gradient(120deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
  },
  {
    tag: "Gift Sets",
    title: "Perfect Gifts",
    sub: "Curated gift sets for every occasion and every budget.",
    cta: "View Gifts",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=700&h=520&fit=crop",
    bg: "linear-gradient(120deg, #2c1a0e 0%, #4a2c0a 55%, #3a2010 100%)",
  },
]

export default function Hero() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCur(p => (p + 1) % SLIDES.length), 5500)
    return () => clearInterval(t)
  }, [])

  const s = SLIDES[cur]
  const prev = () => setCur(p => (p - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setCur(p => (p + 1) % SLIDES.length)

  return (
    <section className="hero" aria-label="Hero banner" style={{ background: s.bg }}>
      <div className="hero__inner wrap">
        <div className="hero__copy" key={`copy-${cur}`}>
          <span className="hero__tag">{s.tag}</span>
          <h1 className="hero__title">{s.title}</h1>
          <p className="hero__sub">{s.sub}</p>
          <a href="#products" className="btn-orange hero__btn">{s.cta}</a>
        </div>
        <div className="hero__img-wrap" key={`img-${cur}`}>
          <img src={s.img} alt={s.title} className="hero__img" loading="eager" />
        </div>
      </div>

      {/* Arrows */}
      <button className="hero__arr hero__arr--l" onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={20} />
      </button>
      <button className="hero__arr hero__arr--r" onClick={next} aria-label="Next slide">
        <ChevronRight size={20} />
      </button>

      {/* Video play button (decorative, matches design) */}
      <button className="hero__play" aria-label="Play video">
        <Play size={16} fill="currentColor" />
      </button>

      {/* Dots */}
      <div className="hero__dots" role="tablist">
        {SLIDES.map((_, i) => (
          <button key={i}
            className={`hero__dot${i === cur ? ' active' : ''}`}
            onClick={() => setCur(i)}
            role="tab" aria-selected={i === cur} aria-label={`Slide ${i+1}`}
          />
        ))}
      </div>
    </section>
  )
}
