import React, { useState, useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAddToFavorites = () => {
    // Get the current list of favorite movies from local storage or initialize an empty array
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

    // Check if the movie is already a favorite
    const isAlreadyFavorite = favoriteMovies.some((favMovie) => favMovie.id === movie.id);

    if (!isAlreadyFavorite) {
      // Add the movie to the list of favorites
      favoriteMovies.push(movie);

      // Store the updated list of favorite movies in local storage
      localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    }

    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    setIsClicked(true);
  };

  const cardStyle = {
    backgroundColor: isClicked ? 'red' : 'transparent',
  };

  return (
    <div className="card-container">
      {isLoading ? (
        <div className="cards loading">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`}>
          <div className="cards" style={cardStyle} onClick={handleCardClick}>
            <img
              className="cards__img"
              src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ''}`}
              alt={movie ? movie.original_title : ''}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.original_title : ''}</div>
              <div className="card__runtime">
                {movie ? movie.release_date : ''}
                <span className="card__rating">{movie ? movie.vote_average : ''}</span>
              </div>
              <div className="card__description">{movie ? movie.overview.slice(0, 118) + '...' : ''}</div>
            </div>
          </div>
        </Link>
      )}
      {/* Place the heart icon outside of the card container */}
      <div className={`favorite-button ${isFavorite ? 'red-heart' : 'white-heart'}`} onClick={handleAddToFavorites}>
        <FontAwesomeIcon icon={faHeart} className="heart-icon" />
      </div>
    </div>
  );
};

export default Cards;
