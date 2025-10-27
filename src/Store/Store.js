
//2 

import { configureStore } from "@reduxjs/toolkit";
import FavSlice from "../FavSlice";
import MovieSlice from "../MovieSlice";

 const Store = configureStore(
    {
        reducer:{
Favorite: FavSlice,
movies:MovieSlice
        }
    }
)

export default Store;
