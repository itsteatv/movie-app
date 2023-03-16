import { useState, useEffect } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import SearchInput from "./components/SearchInput/SearchInput";
import MovieCard from "./components/MovieCard";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import AddFavorites from "./components/Favorites/AddFavorites";
import RemoveFavorites from "./components/Favorites/RemoveFavorites";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");

  const API_KEY = "https://www.omdbapi.com/?i=tt3896198&apikey=1a97d8e2";

  const searchMovies = async function (title) {
    const response = await fetch(`${API_KEY}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const delaySearch = (function () {
    let timer = 0;
    return function (delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchMovies(search);
      }, delay);
    };
  })();

  useEffect(() => {
    delaySearch(1000);
  }, [search]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem("favorite-movies"));
    setFavorites(getLocalStorage);
  }, []);

  const saveToLocalStorage = function (items) {
    localStorage.setItem("favorite-movies", JSON.stringify(items));
  };

  const inputChangeHandler = function (e) {
    setSearch(e.target.value);
  };

  const onSearchMovies = function () {
    searchMovies(search);
  };

  const onHandleFavorites = function (movie) {
    const favoritesList = [...favorites, movie];
    setFavorites(favoritesList);
    saveToLocalStorage(favoritesList);
  };

  const onHandleRemoveFavorites = function (movie) {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <>
      <ThemeSwitcher />
      <div className="app">
        <h1>Movie App</h1>
        <div className="search">
          <SearchInput
            placeholder="Search Movie"
            type="text"
            value={search}
            onChange={inputChangeHandler}
          />
          <FaSearch
            size={30}
            className="search-icon"
            onClick={onSearchMovies}
          />
        </div>

        {movies?.length > 0 ? (
          <div className="container">
            {movies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={index}
                favoritesList={onHandleFavorites}
                removeFavoritesList={onHandleRemoveFavorites}
              />
            ))}
          </div>
        ) : (
          <div className="error-message">
            <h2 className="error">Search Movie ...</h2>
          </div>
        )}
        <>
          {favorites?.length > 0 && (
            <div className="favorites-container">
              <h1>favorites</h1>
              {favorites.map((favorite, index) => (
                <>
                  <MovieCard
                    movie={favorite}
                    key={index}
                    favoritesList={onHandleFavorites}
                    removeFavoritesList={onHandleRemoveFavorites}
                  />
                </>
              ))}
            </div>
          )}
        </>
      </div>
      <ScrollToTop />
    </>
  );
}

export default App;
