import './App.css'
import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"

import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails"
import NoPage from "./pages/NoPage";
import Navbar from "./pages/Navbar";

const router = createBrowserRouter([
  {
      path: "/", 
      element: <NavbarWrapper/>,
      children:[
          {
              path: "/",
              element: <HomePage />
          },
          {
              path: "/MovieDetails/:id",
              element: <MovieDetails />
          },
          {
              path: "/:someid",
              element: <NoPage />
          },
          {
              path: "*",
              element: <NoPage />
          },
      ]
  }
])

function NavbarWrapper(){
    return (
    <div>
        {/* <Navbar/> */}
        <Outlet/>
    </div>
    )
};

function App() {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
        )
}

export default App
