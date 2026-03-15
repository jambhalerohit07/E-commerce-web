import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import './Newsletter.css'

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
export default function Newsletter() {
  const [email,     setEmail]     = useState('')
  const [error,     setError]     = useState('')
  const [done,      setDone]      = useState(false)
  const [loading,   setLoading]   = useState(false)

  const submit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 900);
  };
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!value.trim()) {
      setError("Please enter your email address. Example: name@example.com");
    } else if (!validateEmail(value)) {
      setError("Invalid email format. Please use format like name@example.com");
    } else {
      setError("");
    }
  };
  return (
    <section className="nl" aria-labelledby="nl-title">
      <div className="wrap nl__grid">
        {/* ── Col 1: Newsletter form ── */}
        <div className="nl__form-col">
          <h2 className="nl__heading" id="nl-title">
            Weekly Newsletter
          </h2>
          <p className="nl__tagline">
            New Arrivals, Hot Deals &amp; Expert Tips
          </p>
          <p className="nl__desc">
            We're committed to help you grow your brand. Get new arrivals,
            exclusive offers, and the latest trends in promotional products
            weekly.
          </p>

          {done ? (
            <div className="nl__success" role="alert">
              <CheckCircle size={20} aria-hidden="true" />
              <span>You're subscribed! Check your inbox.</span>
            </div>
          ) : (
            <form
              className="nl__form"
              onSubmit={submit}
              noValidate
              aria-label="Subscribe to newsletter"
            >
              <label htmlFor="nl-email" className="sr-only">
                Email address
              </label>
              <div
                className={`nl__input-wrap${error ? " nl__input-wrap--err" : ""}`}
              >
                <input
                  id="nl-email"
                  type="email"
                  className="nl__input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  aria-describedby={error ? "nl-err" : undefined}
                  aria-invalid={!!error}
                  autoComplete="email"
                />
                <button
                  type="submit"
                  className="nl__submit"
                  disabled={loading}
                  aria-label="Subscribe"
                >
                  {loading ? (
                    <span className="nl__spinner" aria-hidden="true" />
                  ) : (
                    <>
                      <Send size={14} aria-hidden="true" /> Subscribe
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="nl__error" id="nl-err" role="alert">
                  <AlertCircle size={13} aria-hidden="true" /> {error}
                </p>
              )}
            </form>
          )}
        </div>

        {/* ── Col 2: Travel Accessories banner ── */}
        <a
          href="#"
          className="nl__banner nl__banner--travel"
          aria-label="Travel Accessories — View Products"
        >
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=480&h=300&fit=crop"
            alt="Travel Accessories"
            loading="lazy"
          />
          <div className="nl__banner-body">
            <h3>
              Travel
              <br />
              Accessories
            </h3>
            <span className="nl__banner-cta">View Products</span>
          </div>
        </a>

        {/* ── Col 3: Gift Sets banner ── */}
        <a
          href="#"
          className="nl__banner nl__banner--gifts"
          aria-label="Gift Sets Collection 2025 — Shop Now"
        >
          <img
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=480&h=300&fit=crop"
            alt="Gift Sets"
            loading="lazy"
          />
          <div className="nl__banner-body nl__banner-body--dark">
            <p className="nl__banner-eyebrow">Collection of 2025</p>
            <h3>Gift Sets</h3>
            <span className="nl__banner-cta">Shop Now</span>
          </div>
        </a>
      </div>

      {/* ── Product image strip ── matches the 6-thumbnail row at bottom of design ── */}
      {/* <div className="nl__strip">
        <div className="wrap nl__strip-inner">
          {[
            'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=200&h=160&fit=crop',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=160&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=160&fit=crop',
            'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=160&fit=crop',
            'https://images.unsplash.com/photo-1517842645767-c639042777db?w=200&h=160&fit=crop',
            'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=200&h=160&fit=crop',
          ].map((src, i) => (
            <a key={i} href="#" className="nl__strip-item" aria-label={`Product ${i + 1}`}>
              <img src={src} alt={`Product ${i + 1}`} loading="lazy" />
            </a>
          ))}
        </div> */}
      {/* </div> */}
    </section>
  );
}
