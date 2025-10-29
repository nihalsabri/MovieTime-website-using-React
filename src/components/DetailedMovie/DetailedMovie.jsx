import { useState,useEffect  } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../DetailedMovie/DetailedMovie.css'
const api_key="5f8557497311bd7eeea85b64c12d8fd4";

export function DetailedMovie (){
 let { id }  = useParams();

const [movie,setMovie] = useState(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_url=` https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}`;

console.log('Fetching from:', api_url);
    axios.get(api_url)
    .then(
        (res) => {
console.log(res.data);
          setMovie(res.data);
          console.log('Movie data:', res.data);
                  setLoading(false);

        }
    )        
       .catch((err)=>{
console.log(err);
        setLoading(false);

       }) 
    }
        ,[id])
        console.log('Current movie:', movie);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

    return (
        <>

 <div className="movies-container-detailed"> 
  {/* translucent blurred background */}
  <div
    className="bg-layer"
    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})` }}
  />

  <div className="movie-card-detailed" >
  <div className="card-image-detailed">
    <img 
      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
      alt={movie.title}
    />
    <div className="rating">{movie.vote_average.toFixed(1)}</div>
  </div>
  
  <div className="card-content">
    <h1 >{movie.title}</h1>
    <p className="movie-date">{new Date(movie.release_date).getFullYear()}</p>
    <p className="movie-overview">{movie.overview}</p>
    
    <div className="movie-details">
      <span className={`age-rating ${movie.adult ? 'adult' : 'all'}`}>
        {movie.adult ? '18+' : 'ALL'}
      </span>
      <span className="language">{movie.original_language.toUpperCase()}</span>
    </div>
    
    <div className="genres">
      {movie.genres.map(genre => (
        <span key={genre.id} className="genre-tag">#{genre.name}</span>
      ))}
    </div>
  </div>
</div>

      </div>

     </>
    )
}