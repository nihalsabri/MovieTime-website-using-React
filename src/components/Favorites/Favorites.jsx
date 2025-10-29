import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFav } from '../../FavSlice';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const dispatch = useDispatch();
const favorites = useSelector(state => state.Favorite.movies ?? []);
  const favoritesCount = useSelector((state) => state.Favorite.value);

  const handleRemove = (movieId) => {
    dispatch(removeFav(movieId));
  };

  if (favoritesCount === 0) {
    return (
      <div className="favorites-container">
        <h2>My Favorites</h2>
        <div className="empty-favorites">
          <p>No favorite movies yet</p>
          <Link to="/movies" className="browse-link">
            Browse Movies
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fav">
      <h2>My Favorites ({favoritesCount})</h2>
      
      <div className="favorites-grid">
        {favorites.map(movie => (
          <div key={movie.id} className="favorite-card">
            <div className="favorite-image">
              <img 
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                alt={movie.title}
              />
              <button 
                className="remove-btn"
                onClick={() => handleRemove(movie.id)}
              >
             Remove
              </button>
            </div>
            
            <div className="favorite-content">
              <h3>{movie.title}</h3>
              <p className="movie-date">
                {new Date(movie.release_date).getFullYear()}
              </p>
              <p className="movie-rating">
                Rating: {movie.vote_average.toFixed(1)} ⭐
              </p>
              <Link to={`/movie/${movie.id}`} className="details-link">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;