import React, { useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState();
  const [isRatingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState(""); // State for user comments
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getData();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem("movieComments")) || {};
    const storedComment = storedComments[id] || "";
    setComment(storedComment);
  }, [id]);

  const openRatingModal = () => {
    setRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingSubmit = () => {
    const ratings = JSON.parse(localStorage.getItem("movieRatings")) || {};
    ratings[id] = selectedRating;
    localStorage.setItem("movieRatings", JSON.stringify(ratings));

    // Store the comment in local storage
    const comments = JSON.parse(localStorage.getItem("movieComments")) || {};
    comments[id] = comment;
    localStorage.setItem("movieComments", JSON.stringify(comments));

    closeRatingModal();
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}
          alt={currentMovieDetail ? currentMovieDetail.original_title : ""}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}
              alt={currentMovieDetail ? currentMovieDetail.original_title : ""}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
            <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
            <div className="movie__rating">
              {currentMovieDetail ? currentMovieDetail.vote_average : ""}
              <i className="fas fa-star movie__star-icon" onClick={openRatingModal}></i>
              <span className="movie__voteCount">
                {currentMovieDetail ? `(${currentMovieDetail.vote_count} votes)` : ""}
              </span>
            </div>
            <div className="movie__runtime">{currentMovieDetail ? `${currentMovieDetail.runtime} mins` : ""}</div>
            <div className="movie__releaseDate">{currentMovieDetail ? `Release date: ${currentMovieDetail.release_date}` : ""}</div>
            <div className="movie__genres">
              {currentMovieDetail && currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <span className="movie__genre" key={genre.id}>
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__links">
        <div className="movie__heading">Useful Links</div>
        {currentMovieDetail && currentMovieDetail.homepage && (
          <a href={currentMovieDetail.homepage} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
            <p>
              <span className="movie__homeButton movie__Button">
                Homepage <i className="newTab fas fa-external-link-alt"></i>
              </span>
            </p>
          </a>
        )}
        {currentMovieDetail && currentMovieDetail.imdb_id && (
          <div className="imdb-link" onClick={openRatingModal}>
            IMDb <i className="newTab fas fa-external-link-alt"></i>
          </div>
        )}
      </div>
      <div className="movie__heading">Production companies</div>
      <div className="movie__production">
        {currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map((company) => (
          <div key={company.id}>
            {company.logo_path && (
              <span className="productionCompanyImage">
               
                <span>{company.name}</span>
              </span>
            )}
          </div>
        ))}
      </div>
      {isRatingModalOpen && (
        <div className="rating-modal">
          <div className="rating-modal-content">
            <span className="close" onClick={closeRatingModal}>&times;</span>
            <h2>Rate the Movie</h2>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <span
                  key={rating}
                  className={`star ${selectedRating >= rating ? "selected" : ""}`}
                  onClick={() => handleRatingChange(rating)}
                  onMouseEnter={() => handleRatingChange(rating)}
                >
                  ★
                </span>
              ))}
            </div>
            {/* Add a text input for comments */}
            <div className="comment-input">
              <textarea
                value={comment}
                onChange={handleCommentChange}
                placeholder="Add your comments here..."
              />
            </div>
            <div className="rating-button">
              <button onClick={handleRatingSubmit} className="colorful-button">
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;