import { Outlet } from "react-router-dom";
import Navbarr from "../Navbarr/Navbarr";

export function SharedComponents(){

    return (
        <>
        
         <Navbarr />
    <Outlet />
        </>
    )
   
}