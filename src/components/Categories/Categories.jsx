import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Categories.css";

const CATS = [
  {
    name: "Apparel",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=320&h=240&fit=crop",
  },
  {
    name: "Bags",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=320&h=240&fit=crop",
  },
  {
    name: "Drinkware",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=320&h=240&fit=crop",
  },
  {
    name: "Laptops",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=320&h=240&fit=crop",
  },
  {
    name: "Tech",
    img: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=320&h=240&fit=crop",
  },
  {
    name: "Office",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=320&h=240&fit=crop",
  },
  {
    name: "Travel",
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=320&h=240&fit=crop",
  },
  {
    name: "Gifts",
    img: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=320&h=240&fit=crop",
  },
];

export default function Categories() {
  const ITEMS_PER_PAGE = 4;

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(CATS.length / ITEMS_PER_PAGE);

  const start = page * ITEMS_PER_PAGE;
  const visibleCats = CATS.slice(start, start + ITEMS_PER_PAGE);

  const nextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <section className="cats" aria-labelledby="cats-title">
      <div className="wrap">
        <h2 className="sec-title" id="cats-title">
          Top Categories
        </h2>

        <div className="cats__track">
          {visibleCats.map((c) => (
            <a key={c.name} href="#" className="cat-card">
              <div className="cat-card__img-box">
                <img src={c.img} alt={c.name} loading="lazy" />
                <div className="cat-card__veil" />
                <span className="cat-card__label">{c.name}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="cats__nav">
          <button
            className="cats__nav-btn"
            onClick={prevPage}
            disabled={page === 0}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            className="cats__nav-btn"
            onClick={nextPage}
            disabled={page === totalPages - 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
