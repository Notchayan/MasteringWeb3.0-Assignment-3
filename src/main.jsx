import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { WeatherProvider } from './context/weather.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-40lio2bzmdz4l8at.us.auth0.com"
      clientId="RtxvuJnwt2wvsDHCwvK0NLUGOt5yZinx"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}>
    <WeatherProvider>
      <App />
    </WeatherProvider></Auth0Provider>
  </React.StrictMode>
)
