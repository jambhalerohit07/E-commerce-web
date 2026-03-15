import React, { useState, useEffect, useMemo } from 'react'
import {
  Heart, ShoppingCart, Star, Eye,
  Search, ChevronLeft, ChevronRight, Loader2, X
} from 'lucide-react'
import data from '../../data/products.json'
import { useDebounce } from '../../hooks/useDebounce.js'
import { useSearch } from '../../context/SearchContext.jsx'
import './Products.css'

const PER_PAGE = 8;
const CATS = [
  "All",
  "Apparel",
  "Bags",
  "Tech",
  "Travel",
  "Office",
  "Drinkware",
  "Health",
  "Gifts",
];

function badgeClass(b) {
  if (!b) return null
  const l = b.toLowerCase()
  if (l === 'sale')       return 'badge badge-sale'
  if (l === 'new')        return 'badge badge-new'
  if (l.includes('best')) return 'badge badge-bestseller'
  if (l === 'hot')        return 'badge badge-hot'
  if (l.includes('deal')) return 'badge badge-deal'
  if (l === 'vibrate')    return 'badge badge-vibrate'
  return 'badge badge-deal'
}

function Stars({ r, n }) {
  return (
    <div className="pc-stars" aria-label={`${r} stars, ${n} reviews`}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11}
          fill={i <= Math.round(r) ? 'currentColor' : 'none'}
          aria-hidden="true" />
      ))}
      <span className="pc-stars__n">({n})</span>
    </div>
  )
}

function Card({ p }) {
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const addCart = () => { setAdded(true); setTimeout(() => setAdded(false), 1400) }

  return (
    <article className="pc" aria-label={p.name}>
      {p.badge && <span className={badgeClass(p.badge)}>{p.badge}</span>}
      <div className="pc__img-box">
        <img src={p.img} alt={p.name} className="pc__img" loading="lazy" />
        <div className="pc__actions">
          <button
            className={`pc__act${liked ? ' liked' : ''}`}
            onClick={() => setLiked(v => !v)}
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
            aria-pressed={liked}
          >
            <Heart size={15} fill={liked ? 'currentColor' : 'none'} />
          </button>
          <button className="pc__act" aria-label="Quick view"><Eye size={15} /></button>
        </div>
      </div>
      <div className="pc__body">
        <p className="pc__cat">{p.category}</p>
        <h3 className="pc__name"><a href="#">{p.name}</a></h3>
        <Stars r={p.rating} n={p.reviews} />
        <div className="pc__price-row">
          <span className="pc__price">As low as ${p.price.toFixed(2)}</span>
          {p.oldPrice && <s className="pc__old">${p.oldPrice.toFixed(2)}</s>}
        </div>
        <button
          className={`pc__cart${added ? ' added' : ''}`}
          onClick={addCart}
          aria-label={`Add ${p.name} to cart`}
        >
          <ShoppingCart size={14} />
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </article>
  )
}

function Pager({ page, total, per, set }) {
  const pages = Math.ceil(total / per)
  if (pages <= 1) return null
  const nums = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <nav className="pager" aria-label="Products pagination">
      <button className="pager__btn pager__btn--nav" onClick={() => set(page - 1)}
        disabled={page === 1} aria-label="Previous page">
        <ChevronLeft size={15} />
      </button>
      {nums.map(n => {
        const show = n === 1 || n === pages || Math.abs(n - page) <= 1
        if (!show) {
          if (n === 2 || n === pages - 1) return <span key={n} className="pager__gap">…</span>
          return null
        }
        return (
          <button key={n}
            className={`pager__btn${n === page ? ' active' : ''}`}
            onClick={() => set(n)}
            aria-label={`Page ${n}`}
            aria-current={n === page ? 'page' : undefined}>
            {n}
          </button>
        )
      })}
      <button className="pager__btn pager__btn--nav" onClick={() => set(page + 1)}
        disabled={page === pages} aria-label="Next page">
        <ChevronRight size={15} />
      </button>
    </nav>
  )
}

export default function Products({
  cat,
  setCat,
  setInputVal,
  searchQuery = "",
}) {
  const { globalQuery, clearSearch } = useSearch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localRaw, setLocalRaw] = useState("");
  const [page, setPage] = useState(1);

  /* Debounce only the local search box */
  const localQ = useDebounce(localRaw, 400);
  const isTyping = localRaw !== localQ;

  /* Global query takes priority */
  const activeQuery = (globalQuery || localQ || "").trim();

  /* Sync local input when global query comes from header */
  useEffect(() => {
    if (globalQuery) {
      setLocalRaw(globalQuery);
    }
  }, [globalQuery]);

  /* Simulate async product load */
  useEffect(() => {
    const t = setTimeout(() => {
      setProducts(data);
      setLoading(false);
    }, 550);

    return () => clearTimeout(t);
  }, []);

  /* Reset to page 1 whenever filter or query changes */
  useEffect(() => {
    setPage(1);
  }, [cat, activeQuery]);

  /* Filter + search products */
  // const filtered = useMemo(() => {
  //   let list = products;

  //   if (cat !== "All") {
  //     list = list.filter((p) => p.category === cat);
  //   }

  //   if (activeQuery) {
  //     const lq = activeQuery.toLowerCase();

  //     list = list.filter(
  //       (p) =>
  //         p.name.toLowerCase().includes(lq) ||
  //         p.category.toLowerCase().includes(lq),
  //     );
  //   }

  //   return list;
  // }, [products, cat, activeQuery]);

  const filtered = useMemo(() => {
    let list = products;

    if (cat !== "All") {
      list = list.filter((p) => p.category === cat);
    }

    if (searchQuery) {
      const lq = searchQuery.toLowerCase();

      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(lq) ||
          p.category.toLowerCase().includes(lq),
      );
    }

    return list;
  }, [products, cat, searchQuery]);

  const paged = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const goPage = (n) => {
    setPage(n);

    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  /* Clear all filters + queries */
  const handleClearAll = () => {
    setLocalRaw("");
    setCat("All");
    clearSearch();
    setInputVal("");
  };

  /* User edits local search box — also clears global */
  const handleLocalChange = (val) => {
    setLocalRaw(val);

    if (globalQuery) {
      clearSearch();
    }
  };

  return (
    <section className="products" id="products" aria-labelledby="prod-title">
      <div className="wrap">
        <h2 className="sec-title" id="prod-title">
          Featured Products
        </h2>

        {/* Global search banner */}
        {searchQuery !== "" && (
          <div className="prod-global-banner" role="status" aria-live="polite">
            <Search size={15} />
            Showing results from global search:&nbsp;
            <strong>"{globalQuery}"</strong>
            <button
              className="prod-global-clear"
              onClick={handleClearAll}
              aria-label="Clear global search"
            >
              <X size={13} /> Clear
            </button>
          </div>
        )}

        {/* Category filters */}
        <div
          className="prod-filters"
          role="tablist"
          aria-label="Filter by category"
        >
          {CATS.map((c) => (
            <button
              key={c}
              className={`prod-filter${cat === c ? " active" : ""}`}
              onClick={() => setCat(c)}
              role="tab"
              aria-selected={cat === c}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Result count */}
        {!loading && (
          <p className="prod-info">
            {searchQuery !== "" ? (
              <>
                {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "
                <strong>{searchQuery}</strong>"
              </>
            ) : (
              <>
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </>
            )}
          </p>
        )}

        {/* Products */}
        {loading ? (
          <div className="prod-skel">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skel">
                <div className="skel__img" />
                <div className="skel__line" />
                <div className="skel__line skel__line--s" />
              </div>
            ))}
          </div>
        ) : paged.length === 0 ? (
          <div className="prod-empty">
            <Search size={40} />
            <p>
              No products found{searchQuery ? ` for "${searchQuery}"` : ""}.
            </p>

            <button className="btn-outline-orange" onClick={handleClearAll}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="prod-grid">
            {paged.map((p) => (
              <div key={p.id}>
                <Card p={p} />
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <Pager
            page={page}
            total={filtered.length}
            per={PER_PAGE}
            set={goPage}
          />
        )}
      </div>
    </section>
  );
}
