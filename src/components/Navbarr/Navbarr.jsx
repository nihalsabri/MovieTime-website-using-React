import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { themeContext } from "../Theme/Theme";

function Navbarr() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    setIsLoggedIn(!!userToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  // use fav as a shared data
  const favoritesCount = useSelector((state) => state.Favorite.value);
const {theme,setTheme} = useContext(themeContext)

const ToggleTheme =() => {
    setTheme(theme === "light" ? "dark" : "light"); 
};
    return <>
   <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">BrandLogo</Navbar.Brand>
          <Nav className="me-auto">
            {/* <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/"   >Home</NavLink> */}

            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  } to="/movies">Movies</NavLink>
            <NavLink className={({ isActive }) => 
    isActive ? "nav-link active" : "nav-link"
  }  to="/categories">Categories</NavLink>
   {/* ternary operator to conditionally render links based on isLoggedIn state */}
            {isLoggedIn ? (
              <>
        
                <NavLink 
                  to="/favorites" 
                  className={({ isActive }) => 
                    `${isActive ? "nav-link active" : "nav-link"} favorite-link`
                  }
                >
                  <span className="heart-icon">❤️</span>
                  {favoritesCount > 0 && (
                    <span className="favorite-count">{favoritesCount}</span>
                  )}
                </NavLink>

                <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
              </>
            ) : (
              <>
   
                <NavLink className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } to="/login">Login</NavLink>
                <NavLink className={({ isActive }) => 
                  isActive ? "nav-link active" : "nav-link"
                } to="/signup">Sign Up</NavLink>
              </>
            )}
  
  <button style={{
              marginLeft: '10px',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: theme === 'light' ? '#333' : '#fff',
              color: theme === 'light' ? '#fff' : '#333',
              cursor: 'pointer'
            }} onClick={()=>{ToggleTheme()}}> 
Theme
  </button>
          </Nav>

          
        </Container>
      </Navbar>


    </>

}

export default Navbarr;