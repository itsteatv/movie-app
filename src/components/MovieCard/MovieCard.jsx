import "./MovieCard.css";

function MovieCard({ movie, onHandleFavorites, onHandleRemoveFavorites }) {
  const hasPoster = movie.Poster !== "N/A";

  return (
    <div className="movie">
      <div className="movie-year">
        <p>{movie.Year}</p>
      </div>

      <div className="image-container">
        {hasPoster && <img src={movie.Poster} alt={movie.Title}></img>}
        {!hasPoster && (
          <img
            src="https://via.placeholder.com/900x900?text=No Image Found"
            alt={movie.Title}
          ></img>
        )}
      </div>

      <div className="movie-container">
        <div className="movie-type">
          {movie.Type}
          <div className="add-to-favorites" onClick={() => onHandleFavorites(movie)}>❤️</div>
          <div className="remove-favorites" onClick={() => onHandleRemoveFavorites(movie)}>🗑️</div>
        </div>
        <div className="movie-title">{movie.Title}</div>
      </div>
    </div>
  );
}

export default MovieCard;
