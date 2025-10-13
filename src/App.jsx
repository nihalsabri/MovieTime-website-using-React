import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Movies } from './components/Movies/Movies'
import {SharedComponents}  from './components/sharedComponents/SharedComponents'
import { NotFound } from './components/NotFound/NotFound'
import Navbarr from './components/Navbarr/Navbarr'
import { DetailedMovie } from './components/DetailedMovie/DetailedMovie'
// another way for routing
export const routes = createBrowserRouter(
  [ { path:"/", element:<SharedComponents /> , 
    children :[
      
      {path:"/movies", element: <Movies />}
      ,{path:"/movie/:id", element: <DetailedMovie /> }
]
   },
{path:"*", element: <NotFound /> }

  ]
)

function App() {

  return (
    <>
    {/* <Navbarr />
    <BrowserRouter>
    <Routes>
          <Route path="/" element={<Movies />} />
<Route path="/movie/:id" element={<DetailedMovie />} />


    </Routes>
    </BrowserRouter> */}


    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
