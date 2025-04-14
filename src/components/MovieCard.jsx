import React from "react";
import MovieControls from "./MovieControls";

const MovieCard = ({ movie, type }) => {
    const roundedRating = Math.ceil(movie.vote_average * 10) / 10;
  return (
    <div className="movie-card">
      <div className="overlay"></div>
      {movie.vote_average && (
        <div className="vote-average">{roundedRating}</div>
      )}
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : (
        <div className="filler-poster"></div>
      )}

      <MovieControls movie={movie} type={type} />
    </div>
  );
};

export default MovieCard;
