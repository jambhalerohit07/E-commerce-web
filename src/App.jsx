import React, { useState } from 'react'
import { SearchProvider } from './context/SearchContext.jsx'
import Header       from './components/Header/Header.jsx'
import Hero         from './components/Hero/Hero.jsx'
import Categories   from './components/Categories/Categories.jsx'
import Products     from './components/Products/Products.jsx'
import MediaBanner  from './components/MediaBanner/MediaBanner.jsx'
import Offers       from './components/Offers/Offers.jsx'
import Testimonials from './components/Testimonials/Testimonials.jsx'
import Newsletter   from './components/Newsletter/Newsletter.jsx'
import Footer       from './components/Footer/Footer.jsx'

export default function App() {
    const [cat, setCat] = useState("All");
  
  const onCategoryChange = (cat) => {

setCat(cat)  }
  return (
    <SearchProvider>
      <Header onCategoryChange={onCategoryChange} />
      <main>
        <Hero />
        <Categories />
        <Products cat={cat} setCat={setCat} />
        {/* <MediaBanner /> */}
        {/* <Offers /> */}
        {/* <Testimonials /> */}
      </main>
      <Newsletter />
      <Footer />
    </SearchProvider>
  );
}
