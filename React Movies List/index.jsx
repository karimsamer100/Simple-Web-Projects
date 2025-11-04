import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({ title: "", rating: "", review: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie({ ...movie, [name]: value });
  };

  const addMovie = () => {
    if (!movie.title.trim()) return;
    setMovies([...movies, movie]);
    setMovie({ title: "", rating: "", review: "" });
  };

  return (
    <div className="container">
      <h1>🎬 My Movie Watchlist</h1>

      <div className="form">
        <input
          name="title"
          placeholder="Movie Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          name="rating"
          placeholder="Rating (e.g. 8.5)"
          value={movie.rating}
          onChange={handleChange}
        />
        <input
          name="review"
          placeholder="Short Review"
          value={movie.review}
          onChange={handleChange}
        />
        <button onClick={addMovie}>Add Movie</button>
      </div>

      <div className="list">
        {movies.length === 0 ? (
          <p className="empty">No movies added yet 🎞️</p>
        ) : (
          movies.map((m, i) => (
            <div key={i} className="movie-card">
              <h3>{m.title}</h3>
              <p>⭐ {m.rating}</p>
              <p>{m.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
