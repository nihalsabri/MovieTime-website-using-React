import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addFav, removeFav } from '../../FavSlice';
import '../Movies/Movies.css';

/* 
===============================================
OLD CODE BEFORE CATEGORIES - FOR REFERENCE ONLY
===============================================

export function Movies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Local state
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  // Redux state
  const { movies, currentPage, loading } = useSelector(state => state.movies);
  const favorites = useSelector(state => state.Favorite.movies ?? []);

  // Handle page navigation
  const handlePageChange = (newPage) => {
    dispatch(getMovies(newPage.toString()));
    navigate(`?page=${newPage}`);
  };

  // Load movies on mount and page change
  useEffect(() => {
    dispatch(getMovies(currentPage.toString()));
  }, [dispatch, currentPage]);

  // Handle search filtering
  useEffect(() => {
    if (searchTerm) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  }, [searchTerm, movies]);

  // Handle favorites
  const toggleFavorite = (movie) => {
    const isFavorite = favorites.find(fav => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFav(movie.id));
    } else {
      dispatch(addFav(movie));
    }
  };
}
*/


// // instance with loader 
// export const loaderData = async({ request }) => {
//     const url = new URL(request.url);
//     const page = url.searchParams.get("page") || "1";

// let res =  await instance.get("", {
//     params: {
//       api_key: "5f8557497311bd7eeea85b64c12d8fd4",
//       page: page,
//     }
//  } )
//   return { 
//     movies: res.data.results,
//     currentPage: parseInt(page)
//   };
// }




export function Movies (){
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const categoryId = searchParams.get('with_genres');
        const page = searchParams.get('page') || '1';
        
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=5f8557497311bd7eeea85b64c12d8fd4&page=${page}`;
        
        if (categoryId) {
          url += `&with_genres=${categoryId}`;
        }

  const response = await fetch(url);
  const data = await response.json();
  setMovies(data.results);
  setFilteredMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [location.search]);
//        .catch((err)=>{
// console.log(err);

//        }) 
//     }
//         ,[])



// 2nd method using axios instance // mounting stage
//   useEffect( () => {
//      instance.get()
//     .then(
//         (res) => {
// console.log(res.data);
// setmovies(res.data.results)
//         }
//     )        
//        .catch((err)=>{
// console.log(err);

//        }) 
//     }
//         ,[])

// const { movies, currentPage } = useLoaderData();

 const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const favorites = useSelector(state => state.Favorite.movies ?? []);

  // When user clicks prev/next we just update the query param; the fetch useEffect
  // (above) listens to location.search and will re-fetch movies accordingly.
  const handlePageChange = (newPage) => {
    navigate(`?page=${newPage}`);
  };

// useEffect(() => {
//   if (searchTerm) {
//     const filtered = movies.filter(movie =>
//       movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setMovies(filtered);
//   } else {
//     setMovies(movies); 
//   }
// }, [searchTerm, movies]);


// 3 dispatch to apply the action
  useEffect(() => {
    if (searchTerm) {
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setMovies(filtered);
    } else {
      setMovies(movies);
    }
  }, [searchTerm, movies]);

  
  //4 logic to handle usage of actions and shared data changes
    // const toggleFavorite = (movie) => { 

    //     const isFavorite = favorites.find(fav => fav.id === movie.id);
    //     if (isFavorite) {
    //         dispatch(removeFav(movie.id));  
    //     } else {
    //         dispatch(addFav(movie)); }
    // };

      const toggleFavorite = (movie) => { 
    const isFavorite = favorites.find(fav => fav.id === movie.id);
    if (isFavorite) {
      dispatch(removeFav(movie.id));  
    } else {
      dispatch(addFav(movie)); 
    }
  };




    return (
      <div className="movies-page-container">
        <h1>Have a nice time</h1>
        <div className="search-container">
          <input 
            className="search-input"
            type="text" 
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="movies-container">
          {filteredMovies.map(movie => (
            <div
              className="movie-card"
              key={movie.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/movie/${movie.id}`)}
              onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/movie/${movie.id}`); }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-image">
                <img 
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
                  alt={movie.title}
                />
                <button onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}>  
                  {favorites.some(fav => fav.id === movie.id) ? '❤️' : '🤍'} 
                </button>
                <div className="rating">{movie.vote_average.toFixed(1)}</div>
              </div>
              
              <div className="card-content">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-date">{new Date(movie.release_date).getFullYear()}</p>
                <p className="movie-overview">{movie.overview}</p>
                
                <div className="movie-details">
                  <span className={`age-rating ${movie.adult ? 'adult' : 'all'}`}>
                    {movie.adult ? '18+' : 'ALL'}
                  </span>
                  <span className="language">{movie.original_language.toUpperCase()}</span>
                </div>
                
                <div className="genres">
                  {movie.genre_ids.map(genre => (
                    <span key={genre} className="genre-tag">#{genre}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}   
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 my-4">
          <button 
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span className="fw-bold fs-4">{currentPage}</span>
          
          <button 
            className="btn btn-outline-primary"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    )
}