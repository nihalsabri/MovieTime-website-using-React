import { useState,useEffect } from "react";
// import axios from "axios";
// import instance from "../../instance";
import '../Movies/Movies.css'

import { getMovies } from '../../MovieSlice';
import { useNavigate } from "react-router-dom";


// import { useLoaderData, useNavigate } from "react-router-dom";
// const api_key="5f8557497311bd7eeea85b64c12d8fd4";
// const api_url=` https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
 import { useDispatch, useSelector } from 'react-redux';

 import { addFav, removeFav } from '../../FavSlice';


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

// const [movies,setmovies] = useState([])
// fetch api data using axios
//   useEffect(() => {

//     axios.get(`${api_url}`)
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
const [filteredMovies, setMovies] = useState([]);
 const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { movies, currentPage } = useSelector(state => state.movies);

  // const handlePageChange = (newPage) => {
  //   navigate(`?page=${newPage}`);
  // }
  const handlePageChange = (newPage) => {
    dispatch(getMovies(newPage.toString()));
    navigate(`?page=${newPage}`);
  };


    useEffect(() => {
    dispatch(getMovies(currentPage.toString()));
  }, [dispatch, currentPage]);

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

const favorites = useSelector(state => state.Favorite.movies ?? []);
  
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
        <>
        <h1>Have a nice time</h1>
<input 
  type="text" 
  placeholder="Search movies..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  style={{
    padding: '10px',
    width: '300px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc'
  }}
/> 
 <div className="movies-container"> 
{filteredMovies.map(movie => (
        <div className="movie-card" key={movie.id}>
  <div className="card-image">
    <img 
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
      alt={movie.title}
    />
 <button onClick={() => toggleFavorite(movie)}>  
  {/* if array inculdes any matcheh movie with this id  do "FILL heart" */}
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

     </>
    )
}