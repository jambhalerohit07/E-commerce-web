import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import './Offers.css'

const OFFERS = [
  {
    id: 1,
    title: 'Exclusive Collection',
    sub: "Don't miss the opportunity",
    discount: '30% OFF',
    img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=520&h=360&fit=crop',
    bg: 'linear-gradient(135deg,#1c2b3a,#0f3460)',
    cta: 'Shop Now',
  },
  {
    id: 2,
    title: 'Travel Accessories',
    sub: 'Pack smarter this season',
    discount: '20% OFF',
    img: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=520&h=360&fit=crop',
    bg: 'linear-gradient(135deg,#854d0e,#b45309)',
    cta: 'Explore Now',
  },
  {
    id: 3,
    title: 'Gift Sets 2025',
    sub: 'Perfect for every occasion',
    discount: '15% OFF',
    img: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=520&h=360&fit=crop',
    bg: 'linear-gradient(135deg,#1a3a2a,#14532d)',
    cta: 'View Gifts',
  },
  {
    id: 4,
    title: 'Tech Gadgets Sale',
    sub: 'Upgrade your everyday carry',
    discount: '25% OFF',
    img: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=520&h=360&fit=crop',
    bg: 'linear-gradient(135deg,#1e1b4b,#312e81)',
    cta: 'Shop Tech',
  },
]

export default function Offers() {
  // Carousel: show 3 cards at a time on desktop
  const [start, setStart] = useState(0)
  const visible = 3
  const canPrev = start > 0
  const canNext = start + visible < OFFERS.length

  const prev = () => canPrev && setStart(s => s - 1)
  const next = () => canNext && setStart(s => s + 1)

  const shown = OFFERS.slice(start, start + visible)

  return (
    <section className="offers" aria-labelledby="offers-title">
      <div className="wrap">
        <h2 className="sec-title" id="offers-title">Offers</h2>

        <div className="offers__track">
          {shown.map((o, i) => (
            <article
              key={o.id}
              className={`offer-card${i === 1 ? ' offer-card--featured' : ''}`}
              style={{ background: o.bg }}
              aria-label={`${o.title} — ${o.discount}`}
            >
              <img src={o.img} alt={o.title} className="offer-card__img" loading="lazy" />
              <div className="offer-card__veil" aria-hidden="true" />
              <div className="offer-card__body">
                <span className="offer-card__discount">{o.discount}</span>
                <h3 className="offer-card__title">{o.title}</h3>
                <p className="offer-card__sub">{o.sub}</p>
                <a href="#" className="offer-card__cta" aria-label={`${o.cta} — ${o.title}`}>
                  {o.cta}
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Prev / Next — matches design exactly */}
        <div className="offers__nav">
          <button
            className="offers__nav-btn"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous offers"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            className="offers__nav-btn"
            onClick={next}
            disabled={!canNext}
            aria-label="Next offers"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
