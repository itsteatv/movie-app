import { useState, useEffect } from "react";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher";
import SearchInput from "./components/SearchInput/SearchInput";
import MovieCard from "./components/MovieCard/MovieCard";
import ScrollToTop from "./components/Scroll/ScrollToTop";
import { FaSearch } from "react-icons/fa";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState("");
  console.log(favorites);

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
    try {
      const getLocalStorage = JSON.parse(
        localStorage.getItem("favorite-movies"));
        setFavorites(getLocalStorage || [])
    } catch (error) {
      console.log("Error for accessing LocalStorage (Cry Harder 😭)", error);
    }
  }, []);

  const saveToLocalStorage = function (items) {
    try {
      localStorage.setItem("favorite-movies", JSON.stringify(items))
    }
    catch (error) {
      console.log("Error for accessing LocalStorage (Cry Harder 😭)", error)
    }
  }

  const inputChangeHandler = function (e) {
    setSearch(e.target.value);
  };

  const onSearchMovies = function () {
    searchMovies(search);
  };

  const onHandleFavorites = function (movie) {
    // Check if movie is already in favorites
    const isFavorite = favorites.some(
      (favorite) => favorite.imdbID === movie.imdbID
    );
    if (isFavorite) {
      return;
    }
    const favoritesList = [...favorites, movie];
    setFavorites(favoritesList);
    saveToLocalStorage(favoritesList)
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
            {movies.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.imdbID}
                onHandleFavorites={onHandleFavorites}
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
              {favorites.map((favorite) => (
                <>
                  <MovieCard
                    movie={favorite}
                    key={favorite.imdbID}
                    onHandleFavorites={onHandleFavorites}
                    onHandleRemoveFavorites={onHandleRemoveFavorites}
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
