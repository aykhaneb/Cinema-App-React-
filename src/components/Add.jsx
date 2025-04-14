import React, { useState, useEffect } from "react";
import ResultCard from "./ResultCard";

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 1) {
        fetchMovies(query);
      } else {
        setResults([]);
      }
    }, 500);  

    return () => clearTimeout(timer);
  }, [query]);

  const fetchMovies = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e4d71eac5d3f1a72564a09ad457e7bfd&language=en-US&page=1&include_adult=false&query=${encodeURIComponent(
          searchTerm
        )}`
      );
      const data = await response.json();
      if (data && data.results) {
        const filteredResults = data.results.filter((movie) =>
          movie.title.toLowerCase().startsWith(searchTerm.toLowerCase())
        );
        setResults(filteredResults);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setResults([]);
    }
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <img
            src="https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)/9ZyAUZrfccsjtDwYgc7yvOBnqM9.jpg"
            alt=""
          />
          <div className="titles">
            <h1>Welcome</h1>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search..."
              value={query}
            />
          </div>
          {results.length > 0 && (
            <ul className="results">
              {results.map((movie) => (
                <li key={movie.id}>
                  <ResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Add;
