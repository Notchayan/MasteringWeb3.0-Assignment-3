import './App.css'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Search from './components/Search'
import Btn from './components/Btn'
import { Link, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const {isAuthenticated}=useAuth0();

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/>{isAuthenticated ? <><Search/><Btn/><Home/></> : <div className='authwarn'>
        <div className='auth'>You are not logged in</div>
        <Link to='/login' className='authlogin'>Login</Link>
        </div>}</>
    },
    {
      path:"/login",
      element:<><Navbar/><Login/></>
    }
  ])

  return (
    <div className='app'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
