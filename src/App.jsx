import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    getStore();
    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
  }, []);

  const getStore = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products?limit=20"
      );
      setProducts(response.data); // Update products state with fetched data
    } catch (error) {
      console.error("Error loading products: ", error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <span className="top">
        <div>
          <label htmlFor="category">Select a category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </span>
      <div className="product-list">
        {products
          .filter(
            (product) =>
              (!selectedCategory || product.category === selectedCategory) &&
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((product, idx) => (
            <div key={idx}>
              <img src={product.image} alt="Product" />
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <p>{product.price}</p>
            </div>
          ))}
      </div>
      {showBackToTop && (
        <div className="back-to-top" onClick={scrollToTop}>
          <span>&uarr;</span>
        </div>
      )}
    </div>
  );
}

export default App;
