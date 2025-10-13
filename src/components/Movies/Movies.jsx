import { useState,useEffect } from "react";
import axios from "axios";
import '../Movies/Movies.css'
const api_key="5f8557497311bd7eeea85b64c12d8fd4";
const api_url=` https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`;
 
// fetch api using axios instance feature 
// const instance = axios.create(
//   {
//     baseURL:"https://api.themoviedb.org/3/movie/popular?api_key=5f8557497311bd7eeea85b64c12d8fd4"
//   }
// )





export function Movies (){

const [movies,setmovies] = useState([])
// fetch api data using axios
  useEffect(() => {

    axios.get(`${api_url}`)
    .then(
        (res) => {
console.log(res.data);
setmovies(res.data.results)
        }
    )        
       .catch((err)=>{
console.log(err);

       }) 
    }
        ,[])
    return (
        <>
        <h1>Most Watched</h1>

 <div className="movies-container"> 
{movies.map(movie => (
        <div className="movie-card" key={movie.id}>
  <div className="card-image">
    <img 
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
      alt={movie.title}
    />
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

     </>
    )
}