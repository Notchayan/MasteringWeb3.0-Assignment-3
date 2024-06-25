import React from 'react'
import { Link,NavLink } from 'react-router-dom' 
import userIcon from './userIcon.jpg'
import { useAuth0 } from '@auth0/auth0-react'

const Navbar = () => {
  const {user,isAuthenticated}=useAuth0();
  return (
    <div className='navbar'>
        <Link to="/" className="title">Weather Dashboard</Link>
        <div>
        <NavLink to="/" className={(e)=>{return e.isActive?"red":"homelink"}}>Home</NavLink>
        <NavLink to="/login" className={(e)=>{return e.isActive?"red":"icon"}}>
        {isAuthenticated?<img src={user.picture} alt="user" className='usericon'/>:<img src={userIcon} alt='user' className='usericon'/>}</NavLink>
        </div>
    </div>
  )
}

export default Navbar