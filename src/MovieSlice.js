import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import instance from "../src/instance";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async ({ page = "1", categoryId = null }, { rejectWithValue }) => {
    try {
      const params = {
        api_key: "5f8557497311bd7eeea85b64c12d8fd4",
        page: page,
      };

      if (categoryId) {
        params.with_genres = categoryId;
      }

      let res = await instance.get("", { params });
      
      return { 
        movies: res.data.results,
        currentPage: parseInt(page)
      };
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const MovieSlice = createSlice(
    {
        name: "Movies",
        initialState:{
            movies: [],
            currentPage: 1,    
        loading: false,    
        error: null   
        },
        extraReducers: (builder)=>{
builder.addCase(getMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload.movies; 
                state.currentPage = action.payload.currentPage; 
           
})
        }
    }
)
export default MovieSlice.reducer;