//1 

import { createSlice } from "@reduxjs/toolkit";

const FavSlice = createSlice(
    {
        name: "Favorite",
        initialState:{value : 0 ,
            movies: []
        },
        reducers:{
            addFav :( state, action)=> {
state.value += 1,
state.movies.push(action.payload);
            }, 
            removeFav:(state, action)=>{
                state.value -= 1,
                state.movies = state.movies.filter(movie => movie.id !== action.payload);
            }
        }
    }
)
export const { addFav, removeFav } = FavSlice.actions;
export default FavSlice.reducer;