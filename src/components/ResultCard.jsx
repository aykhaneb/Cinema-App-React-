import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const ResultCard = ({ movie }) => {
  const { addToMovieWatchlist  } = useContext(GlobalContext);

  const formattedReleaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const roundedRating = Math.ceil(movie.vote_average * 10) / 10;

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
        <button className="btn" onClick={() => addToMovieWatchlist(movie)}>Add To Watchlist</button>
      </div>
    </div>
  );
};

export default ResultCard;
