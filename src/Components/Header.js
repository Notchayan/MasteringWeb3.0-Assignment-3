import React from 'react'
import './Style_Sheets/Header.css'

export default function Header({profile_pic, name, email}) {
  return (
    <div className="AppHeader">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">React Weather App</a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-user-name" aria-current="page" href="#">{name}</a>
                <br/>
                <a class="nav-user-email" href="#">{email}</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#"> <img src={profile_pic} class="nav-user-img"/></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    
  )
}
