import React, { useState, useEffect, useCallback } from "react";
import { Quote, Star } from "lucide-react";
import "./Testimonials.css";

const REVIEWS = [
  {
    id: 1,
    text: "We needed a way to make a lasting impression at trade shows, and Online Shopping delivered! Their design team has created eye-catching promotional items that perfectly captured our brand. The quality was excellent, and we saw a large increase in traffic and lead generation.",
    author: "Helena Giblleon",
    role: "Marketing Director",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&crop=faces",
  },
  {
    id: 2,
    text: "Outstanding quality and speed of delivery! We ordered custom bags for our entire sales team and the results were phenomenal. Every detail was exactly as requested and arrived well before our event deadline. Highly recommend to any business.",
    author: "Marcus Johnson",
    role: "Sales Manager",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=faces",
  },
  {
    id: 3,
    text: "I've been ordering travel accessories from here for two years and the quality is consistently top-notch. The insulated tumbler I bought last month has become my daily essential. Great pricing, fast shipping, and always exactly what's shown.",
    author: "Sarah Chen",
    role: "Travel Blogger",
    rating: 4,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=faces",
  },
  {
    id: 4,
    text: "Used their corporate gift sets for our annual client appreciation event and received incredible feedback. The presentation was professional, the products felt premium, and every client commented on the thoughtful packaging. Will be ordering again.",
    author: "David Park",
    role: "Event Coordinator",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=faces",
  },
  {
    id: 5,
    text: "The selection of promotional products is unmatched and the customization options are fantastic. Our branded drinkware has been a massive hit at every conference we attend. The team is responsive and the turnaround time is impressive.",
    author: "Priya Sharma",
    role: "Brand Manager",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&h=60&fit=crop&crop=faces",
  },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCur((p) => (p + 1) % REVIEWS.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [paused, next]);

  const r = REVIEWS[cur];

  return (
    <section
      className="testi"
      aria-labelledby="testi-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="wrap testi__inner">
        <h2 className="sec-title" id="testi-title">
          Testimonials
        </h2>

        <div className="testi__quote-icon" aria-hidden="true">
          <Quote size={28} />
        </div>

        <div
          className="testi__card"
          key={cur}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="testi__text">{r.text}</p>

          <div
            className="testi__stars"
            aria-label={`${r.rating} out of 5 stars`}
          >
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={15}
                fill={s <= r.rating ? "currentColor" : "none"}
                aria-hidden="true"
              />
            ))}
          </div>

          <div className="testi__author">
            <img
              src={r.avatar}
              alt={r.author}
              className="testi__avatar"
              loading="lazy"
            />
            <div>
              <strong className="testi__name">{r.author}</strong>
              <span className="testi__role">{r.role}</span>
            </div>
          </div>
        </div>

        <div className="testi__dots" role="tablist" aria-label="Reviews">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              className={`testi__dot${i === cur ? " active" : ""}`}
              onClick={() => setCur(i)}
              role="tab"
              aria-selected={i === cur}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
