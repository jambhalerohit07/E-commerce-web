import React from 'react'
import { Play } from 'lucide-react'
import './MediaBanner.css'

export default function MediaBanner() {
  return (
    <section className="mbanner" aria-label="Featured brand banner">
      <div className="mbanner__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1280&h=480&fit=crop"
          alt="Premium Bluetooth Speaker"
          className="mbanner__img"
          loading="lazy"
        />
        <div className="mbanner__overlay" aria-hidden="true" />
        {/* Center play button — exact from design */}
        <button className="mbanner__play" aria-label="Play product video">
          <Play size={22} fill="currentColor" aria-hidden="true" />
        </button>
        {/* Brand watermark bottom right — matches design */}
        <span className="mbanner__brand" aria-hidden="true">Marshall</span>
      </div>
    </section>
  )
}
