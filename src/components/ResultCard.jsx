import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalState";

const ResultCard = ({ movie }) => {
  const { watchlist, addToMovieWatchlist } = useContext(GlobalContext);
  const [showMessage, setShowMessage] = useState(false);

  const isMovieInWatchlist = watchlist.some((m) => m.id === movie.id);

  const formattedReleaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const roundedRating = Math.ceil(movie.vote_average * 10) / 10;

  const handleAdd = () => {
    if (!isMovieInWatchlist) {
      addToMovieWatchlist(movie);
      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 2000);
    }
  };

  return (
    <div className="card_item">
      <div className="info_controls">
        <div className="photo_card">
          <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="info">
          <h1>{movie.title}</h1>
          <h2>{formattedReleaseDate}</h2>
          <h4>IMDB: {roundedRating}</h4>
        </div>
      </div>

      <div className="controls">
        <button
          className="btn"
          onClick={handleAdd}
          disabled={isMovieInWatchlist}
        >
          {isMovieInWatchlist ? "Already Added" : "Add To Watchlist"}
        </button>

        {showMessage && (
          <div style={{ color: "green", marginTop: "5px" }}>
            ✅ Added successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
