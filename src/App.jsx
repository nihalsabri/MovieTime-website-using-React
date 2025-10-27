import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Movies } from './components/Movies/Movies'
import {SharedComponents}  from './components/sharedComponents/SharedComponents'
import { NotFound } from './components/NotFound/NotFound'
import Navbarr from './components/Navbarr/Navbarr'
import { DetailedMovie } from './components/DetailedMovie/DetailedMovie'
// import { loaderData } from './components/Movies/Movies';
import { Provider } from 'react-redux'
import Store from './Store/Store';
import Favorites from './components/Favorites/Favorites'
import { Register } from './components/Signup/Signup';
import { Login } from './components/Login/Login'
import { ThemeProvider } from './components/Theme/Theme'
import {  useState } from 'react'
// another way for routing
export const routes = createBrowserRouter(
  [ { path:"/", element:<SharedComponents /> , 
    children :[
            {path:"/movies", element: <Movies /> }

      // {path:"/movies", element: <Movies /> , loader:loaderData}
      ,{path:"/movie/:id", element: <DetailedMovie />},
        {path :"/favorites", element: <Favorites />},
        {path:"/register" , element:<Register />},
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
