import React, { useEffect, useState } from 'react';
import './Favorites.css';

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Get the list of favorite movies from local storage
    const storedFavoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setFavoriteMovies(storedFavoriteMovies);
  }, []);

  const removeFromFavorites = (favMovie) => {
    // Remove the movie from favorites
    const updatedFavoriteMovies = favoriteMovies.filter((movie) => movie.id !== favMovie.id);
    setFavoriteMovies(updatedFavoriteMovies);

    // Update the local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavoriteMovies));
  };

  return (
    <div>
      <h2>Favorite Movie Details</h2>
      {favoriteMovies.map((favMovie) => (
        <div className="favorite-card" key={favMovie.id}>
          <button onClick={() => removeFromFavorites(favMovie)} className="favorite-button">
            <i className="fas fa-heart red-heart"></i>
          </button>
          <img src={`https://image.tmdb.org/t/p/original${favMovie.poster_path}`} alt="Favorite Movie" />
          <div>
            <h3>{favMovie.original_title}</h3>
            <p>{favMovie.overview}</p>
            {/* Display other favorite movie details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
