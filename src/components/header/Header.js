import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  

  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/">
          <img
            className="header__icon"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDb Logo"
          />
        </Link>
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <Link to="/favorites" style={{ textDecoration: "none" }}>
          <span>Favorites</span>
        </Link>
      </div>

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e)=> {
            setSearchQuery(e.target.value)
          }}
        />
        
        <button onClick={()=>{
         
          
        }} >Search </button>
      </div>
    </div>
  );
};

export default Header;
