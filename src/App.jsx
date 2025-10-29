import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Movies } from './components/Movies/Movies'
import {SharedComponents}  from './components/sharedComponents/SharedComponents'
import { NotFound } from './components/NotFound/NotFound'
import Navbarr from './components/Navbarr/Navbarr'
import { DetailedMovie } from './components/DetailedMovie/DetailedMovie'
import { Provider } from 'react-redux'
import Store from './Store/Store';
import Favorites from './components/Favorites/Favorites'
import { Signup } from './components/Signup/Signup';
import { Login } from './components/Login/Login'
import ProtectedRoute from './components/sharedComponents/ProtectedRoute';
import { ThemeProvider } from './components/Theme/Theme'
import {  useState } from 'react'
import { Categories } from './components/Categories/Categories'
// another way for routing
export const routes = createBrowserRouter(
  [ { path:"/", element:<SharedComponents /> , 
    children :[
      {path:"/", element: <Movies />},

      {path:"/movies", element: <Movies />},
      {path:"/categories", element: <Categories />},

      {path:"/movie/:id", element: <DetailedMovie />},
      {path:"/favorites", element: 
        <ProtectedRoute>
          <Favorites />
        </ProtectedRoute>
      },
      {path:"/signup" , element:<Signup />},
      {path:"/login", element:<Login />}
]
   },
{path:"*", element: <NotFound /> }

  ]
)

function App() {
    const [theme, setTheme] = useState("light");

  return (
    <>
    {/* <Navbarr />
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Movies />} />
<Route path="/movie/:id" element={<DetailedMovie />} />


    </Routes>
    </BrowserRouter> */}
   <div className={theme == "light" ? "bg-light" : "bg-dark"}>

<ThemeProvider value={{ theme, setTheme }}>
<Provider store= {Store}>  
    <RouterProvider router={routes}></RouterProvider>
 </Provider>
 </ThemeProvider></div>
    </>
  )
}

export default App;
