import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const handleAddToFavorites = (event) => {
    event.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const handleCardClick = () => {
    setIsClicked(true);
  };

  const cardStyle = {
    backgroundColor: isClicked ? "red" : "transparent",
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
        <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white" }}>
          <div className="cards" style={cardStyle} onClick={handleCardClick}>
            <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""}`} />
            <FontAwesomeIcon
              icon={faHeart}
              className={`heart-icon ${isFavorite ? "red-heart" : ""}`}
              onClick={handleAddToFavorites}
            />
            <div className="cards__overlay">
              <div className="card__title">{movie ? movie.original_title : ""}</div>
              <div className="card__runtime">
                {movie ? movie.release_date : ""}
                <span className="card__rating">{movie ? movie.vote_average : ""}</span>
              </div>
              <div className="card__description">{movie ? movie.overview.slice(0, 118) + "..." : ""}</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Cards;
