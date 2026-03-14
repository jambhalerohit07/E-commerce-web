import React, { createContext, useContext, useState, useCallback } from 'react'

const SearchCtx = createContext(null)

export function SearchProvider({ children }) {
  const [globalQuery, setGlobalQuery] = useState('')

  // Called from Header when user submits search or clicks a result
  // Scrolls to #products and sets the query
  const commitSearch = useCallback((q) => {
    setGlobalQuery(q)
    // Give React one tick to propagate state, then scroll
    setTimeout(() => {
      const el = document.getElementById('products')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }, [])

  const clearSearch = useCallback(() => {
    console.log('Clearing search')
    setGlobalQuery('')
  }, [])

  return (
    <SearchCtx.Provider value={{ globalQuery, commitSearch, clearSearch }}>
      {children}
    </SearchCtx.Provider>
  )
}

export function useSearch() {
  const ctx = useContext(SearchCtx)
  if (!ctx) throw new Error('useSearch must be used inside <SearchProvider>')
  return ctx
}
