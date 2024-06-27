import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import userIcon from './userIcon.jpg'

const Login = () => {

    //setup of authentication method using Auth0
    const {user,loginWithRedirect,isAuthenticated,logout}=useAuth0();
  return (
    <div className='login'>
        {isAuthenticated ?
            (
                <div className='userdetails'>
                    <img src={user.picture} alt={user.name} className='user'/>
                    <div className="name">NAME- {user.name}</div>
                    <div className="email">Email- {user.email}</div>
                </div>
                
            ) : (
                <div className='userdetails'>
                    <img src={userIcon} alt="user" className='user'/>
                    <div className="name">Name- User</div>
                    <div className="email">Email- user@gmail.com</div>
                </div>
            )
        }
        {isAuthenticated ? 
            (
                <button className='logbtn' onClick={(e)=>logout()}>Logout</button>
            ) : (
                <button className='logbtn' onClick={(e)=>loginWithRedirect()}>Login</button>
            )}
    </div>
)
}

export default Login