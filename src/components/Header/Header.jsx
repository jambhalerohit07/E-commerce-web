import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  ShoppingCart, Heart, User, Search, Menu, X,
  ChevronDown, Package, Loader2, ArrowRight, Tag
} from 'lucide-react'
import { useDebounce } from '../../hooks/useDebounce.js'
import { useSearch } from '../../context/SearchContext.jsx'
import allProducts from '../../data/products.json'
import './Header.css'

const NAV = [
  { label: "2025 New Products", link: "All" },
  { label: "Apparel", sub: true, link: "Apparel" },
  { label: "Bags", sub: true, link: "Bags" },
  { label: "Drinkware", sub: true, link: "Drinkware" },
  { label: "Health & Wellness", link: "Health" },
  { label: "Office", link: "Office" },
  { label: "Tech", sub: true, link: "Tech" },
  { label: "Gifts", sub: true, link: "Gifts" },
  { label: "Tradeshow", sub: true, link: "All" },
  { label: "Travel", sub: true, link: "Travel" },
];
const NAV_LINKS = [
  "2026 New Products",
  "Apparel",
  "Bags",
  "Drinkware",
  "Health & Wellness",
  "Office",
  "Tech",
  "Gifts",
  "Tradeshow",
  "Travel",
];

const MAX_RESULTS = 6

/* Highlight matching substring */
function Highlight({ text, query }) {
  if (!query.trim()) return <>{text}</>
  const i = text.toLowerCase().indexOf(query.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <mark className="srch-hl">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  )
}

/* Floating dropdown panel */
function Dropdown({ query, results, onSelect, onViewAll }) {
  return (
    <div className="srch-drop" role="listbox" aria-label="Search suggestions">
      {results.length === 0 ? (
        <div className="srch-drop__empty">
          <Search size={20} aria-hidden="true" />
          <p>No results for <strong>"{query}"</strong></p>
          <span>Try a different spelling or browse categories</span>
        </div>
      ) : (
        <>
          <p className="srch-drop__hd" aria-live="polite">
            {results.length >= MAX_RESULTS ? 'Top matches' : `${results.length} result${results.length !== 1 ? 's' : ''}`}
          </p>
          <ul>
            {results.map(p => (
              <li key={p.id}>
                <button
                  className="srch-drop__row"
                  role="option"
                  onClick={() => onSelect(p)}
                  aria-label={`${p.name}, ${p.category}, $${p.price.toFixed(2)}`}
                >
                  <img src={p.img} alt="" className="srch-drop__img" aria-hidden="true" />
                  <div className="srch-drop__text">
                    <span className="srch-drop__name">
                      <Highlight text={p.name} query={query} />
                    </span>
                    <span className="srch-drop__cat">
                      <Tag size={10} aria-hidden="true" />
                      <Highlight text={p.category} query={query} />
                    </span>
                  </div>
                  <div className="srch-drop__aside">
                    <span className="srch-drop__price">${p.price.toFixed(2)}</span>
                    {p.badge && <span className="srch-drop__badge">{p.badge}</span>}
                  </div>
                </button>
              </li>
            ))}
          </ul>
          <button className="srch-drop__all" onClick={onViewAll}>
            See all results for "<strong>{query}</strong>"
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </>
      )}
    </div>
  )
}

export default function Header({
  onCategoryChange,
  inputVal,
  setInputVal,
  onSearch,
}) {
  const { commitSearch } = useSearch();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mSearchOpen, setMSearchOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const debouncedQ = useDebounce(inputVal, 300);
  const isTyping = inputVal !== debouncedQ;

  const wrapRef = useRef(null);
  const desktopInp = useRef(null);
  const mobileInp = useRef(null);

  /* Shadow on scroll */
  useEffect(() => {
    const fn = () => setPinned(window.scrollY > 4);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    onSearch?.(debouncedQ);
  }, [debouncedQ]);
  /* Body scroll lock when drawer open */
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  /* Auto-focus mobile input */
  useEffect(() => {
    if (mSearchOpen && mobileInp.current) mobileInp.current.focus();
  }, [mSearchOpen]);

  /* Close dropdown on click outside */
  useEffect(() => {
    const fn = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  /* Open/close dropdown based on debounced query */
  useEffect(() => {
    setDropOpen(debouncedQ.trim().length > 0);
  }, [debouncedQ]);

  /* Escape closes dropdown */
  useEffect(() => {
    const fn = (e) => {
      if (e.key === "Escape") setDropOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  /* Live filtered results */
  const results = useMemo(() => {
    if (!debouncedQ.trim()) return [];
    const lq = debouncedQ.toLowerCase();
    return allProducts
      .filter(
        (p) =>
          p.name.toLowerCase().includes(lq) ||
          p.category.toLowerCase().includes(lq),
      )
      .slice(0, MAX_RESULTS);
  }, [debouncedQ]);

  /* User clicks a product in dropdown → fill input + scroll + filter products */
  const handleSelect = (product) => {
    setInputVal(product.name);
    setDropOpen(false);
    commitSearch(product.name);
  };

  /* Submit form or "See all results" */
  const handleCommit = (q = inputVal) => {
    if (!q.trim()) return;
    setDropOpen(false);
    commitSearch(q.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommit();
  };

  const handleViewAll = () => {
    setDropOpen(false);
    commitSearch(debouncedQ.trim());
  };

  const handleClear = () => {
    setInputVal("");
    setDropOpen(false);
    commitSearch("");
    desktopInp.current?.focus();
  };

  return (
    <header className={`hdr${pinned ? " hdr--shadow" : ""}`} role="banner">
      {/* ── TOP BAR ── */}
      <div className="hdr-top">
        <div className="wrap hdr-top__inner">
          <span className="hdr-top__left">
            Free shipping on orders over $50! Use code <strong>SHIP50</strong>
          </span>
          <div className="hdr-top__right">
            <a href="#">Sign In</a>
            <a href="#">Register</a>
            <a href="#">Track Order</a>
            <a href="#">Catalog</a>
          </div>
        </div>
      </div>

      {/* ── MAIN ROW ── */}
      <div className="hdr-main">
        <div className="wrap hdr-main__inner">
          {/* Logo */}
          <a href="#" className="hdr-logo" aria-label="Online Shopping – Home">
            <Package size={26} strokeWidth={2} aria-hidden="true" />
            <span className="hdr-logo__text">
              <strong>ONLINE</strong>
              <small>SHOPPING</small>
            </span>
          </a>

          {/* ── Desktop search + dropdown ── */}
          <div className="hdr-search-wrap" ref={wrapRef}>
            <form
              className={`hdr-search${dropOpen ? " hdr-search--active" : ""}`}
              role="search"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <label htmlFor="hdr-q" className="sr-only">
                Search products
              </label>
              <input
                id="hdr-q"
                ref={desktopInp}
                type="search"
                className="hdr-search__inp"
                placeholder="Search items..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onFocus={() => debouncedQ.trim() && setDropOpen(true)}
                aria-autocomplete="list"
                aria-expanded={dropOpen}
                aria-haspopup="listbox"
                aria-controls="hdr-results"
              />
              {/* {inputVal && (
                <button
                  type="button"
                  className="hdr-search__x"
                  onClick={handleClear}
                  aria-label="Clear search"
                >
                  <X size={13} />
                </button>
              )} */}
              <button
                className="hdr-search__btn"
                type="submit"
                aria-label="Submit search"
              >
                {isTyping ? (
                  <Loader2 size={16} className="spin" aria-hidden="true" />
                ) : (
                  <Search size={16} aria-hidden="true" />
                )}
              </button>
            </form>

            {/* Dropdown */}
            {dropOpen && debouncedQ.trim() && (
              <div id="hdr-results">
                <Dropdown
                  query={debouncedQ}
                  results={results}
                  onSelect={handleSelect}
                  onViewAll={handleViewAll}
                />
              </div>
            )}
          </div>

          {/* ── Icons ── */}
          <div className="hdr-icons">
            <button
              className="hdr-icon hdr-icon--msearch"
              onClick={() => setMSearchOpen((v) => !v)}
              aria-label={mSearchOpen ? "Close search" : "Open search"}
              aria-expanded={mSearchOpen}
            >
              {mSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <a href="#" className="hdr-icon" aria-label="My account">
              <User size={20} />
            </a>
            <a href="#" className="hdr-icon" aria-label="Wishlist">
              <Heart size={20} />
            </a>
            <a
              href="#"
              className="hdr-icon hdr-icon--cart"
              aria-label="Shopping cart, 2 items"
            >
              <ShoppingCart size={20} />
              <span className="cart-count" aria-hidden="true">
                2
              </span>
            </a>
            <button
              className="hdr-icon hdr-icon--burger"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mob-nav"
            >
              {drawerOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* ── Mobile search panel ── */}
        {mSearchOpen && (
          <div className="hdr-msearch">
            <div className="wrap">
              <form
                className="hdr-msearch__form"
                role="search"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommit();
                  setMSearchOpen(false);
                }}
              >
                <div className="hdr-msearch__field">
                  <Search size={15} aria-hidden="true" />
                  <label htmlFor="mob-q" className="sr-only">
                    Search products
                  </label>
                  <input
                    ref={mobileInp}
                    id="mob-q"
                    type="search"
                    placeholder="Search items..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    autoComplete="off"
                  />
                  {isTyping && (
                    <Loader2 size={15} className="spin" aria-hidden="true" />
                  )}
                  {inputVal && !isTyping && (
                    <button
                      type="button"
                      onClick={handleClear}
                      aria-label="Clear"
                      className="hdr-search__x"
                    >
                      <X size={13} />
                    </button>
                  )}
                </div>
              </form>

              {/* Mobile dropdown results */}
              {debouncedQ.trim() && (
                <Dropdown
                  query={debouncedQ}
                  results={results}
                  onSelect={(p) => {
                    handleSelect(p);
                    setMSearchOpen(false);
                  }}
                  onViewAll={() => {
                    handleViewAll();
                    setMSearchOpen(false);
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── NAV BAR ── */}
      <nav className="hdr-nav" aria-label="Main navigation">
        <div className="wrap">
          <ul className="hdr-nav__list" role="list">
            {NAV.map((n) => (
              <li key={n.label} className="hdr-nav__item">
                <a
                  href="#"
                  className="hdr-nav__link"
                  onClick={() => onCategoryChange?.(n.link)}
                >
                  {n.label}
                  {n.sub && <ChevronDown size={12} aria-hidden="true" />}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      {drawerOpen && (
        <div
          className="hdr-overlay"
          aria-hidden="true"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <nav
        id="mob-nav"
        className={`hdr-drawer${drawerOpen ? " hdr-drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!drawerOpen}
      >
        <div className="hdr-drawer__head">
          <span>Menu</span>
          <button
            className="hdr-icon"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <X size={21} />
          </button>
        </div>
        <ul className="hdr-drawer__list">
          {NAV.map((n) => (
            <li key={n.label}>
              <a
                href="#"
                className="hdr-drawer__link"
                onClick={() => {
                  onCategoryChange?.(n.link);
                  setDrawerOpen(false);
                }}
              >
                {n.label}
                {n.sub && <ChevronDown size={14} aria-hidden="true" />}
              </a>
            </li>
          ))}
        </ul>
        <div className="hdr-drawer__foot">
          <a href="#" className="hdr-drawer__util">
            <User size={15} /> Sign In
          </a>
          <a href="#" className="hdr-drawer__util">
            <Heart size={15} /> Wishlist
          </a>
          <a href="#" className="hdr-drawer__util">
            <ShoppingCart size={15} /> Cart (2)
          </a>
        </div>
      </nav>
    </header>
  );
}
