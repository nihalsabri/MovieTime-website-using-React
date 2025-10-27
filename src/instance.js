import axios from "axios";
// fetch api using axios instance feature 
const instance = axios.create(
  {
    baseURL:"https://api.themoviedb.org/3/movie/popular",
    timeout:2000,

  }
)

export default instance;