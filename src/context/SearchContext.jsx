import React, { createContext, useContext, useState, useCallback } from "react";

const SearchCtx = createContext(null);

export function SearchProvider({ children }) {
  const [globalQuery, setGlobalQuery] = useState("");

  const commitSearch = useCallback((q) => {
    setGlobalQuery(q);
    setTimeout(() => {
      const el = document.getElementById("products");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }, []);

  const clearSearch = useCallback(() => {
    ("Clearing search");
    setGlobalQuery("");
  }, []);

  return (
    <SearchCtx.Provider value={{ globalQuery, commitSearch, clearSearch }}>
      {children}
    </SearchCtx.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchCtx);
  if (!ctx) throw new Error("useSearch must be used inside <SearchProvider>");
  return ctx;
}
