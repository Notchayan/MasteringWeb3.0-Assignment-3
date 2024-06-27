import './App.css';
import React, {useRef, useEffect, useState} from "react";

import Header from './Components/Header';
import WeatherCard from './Components/WeatherCard';
import Login_Page, {logOut} from './Components/Login_Page';

import axios from 'axios';

// import Map from "ol/Map.js";
// import View from "ol/View.js";
// import TileLayer from "ol/layer/Tile.js";
// import OSM from "ol/source/OSM";
// import "ol/ol.css";
//

const URL_WEATHER_API = 'http://api.weatherapi.com/v1/current.json?';
const WEATHER_API_KEY = '20b7e952cdde477395e73553242606';

function App() {
  const [user_lat, setUser_lat] = useState(0.0);
  const [user_long, setUser_long] = useState(0.0);
  const [profile, setProfile] = useState([]);
  const [user, setUser] = useState([]);
  // const mapRef = useRef(null);


  let [weather_cards, setWeather_cards] = useState([]);

  let start_loged_out = 1;
  let ID = 1;

  let latInput = React.createRef();
  let longInput = React.createRef();





  // let map = map('mymap').setView([19.5937, 78.9629], 5);

  // const logOut = () => {
  //   googleLogout();
  //   setProfile(null);
  // };

  const handleDelete = (id) => {
    const listCards = weather_cards.filter((card) => card.id !== id);
    setWeather_cards(listCards);
    // localStorage.setWeather_cards('Weather_Cards', JSON.stringify(listCards));
  }

  const handleAddCard = () =>{
    AddCard(latInput.current.value, longInput.current.value);
  }
  




  const UpdateCard =  (id) => { 
    let lat = weather_cards[id].latitude;
    let long = weather_cards[id].longitude;
     axios.get(`${URL_WEATHER_API}key=${WEATHER_API_KEY}&q=${lat.latitude},${long.longitude}&aqi=no`).then((data) => {
      weather_cards[id].temperature = data.data.current.temp_c; 
      weather_cards[id].humidity = data.data.current.humidity; 
      weather_cards[id].precipitation =  data.data.current.precip_mm;
      weather_cards[id].wind_speed = data.data.current.wind_mph;});
  }

  const AddCard =  (latitude, longitude) =>{
    
    if( -90 <= latitude <= 90 && -90 <= longitude <= 90 && latitude != 0 && longitude != 0){
    axios.get(`${URL_WEATHER_API}key=${WEATHER_API_KEY}&q=${latitude},${longitude}&aqi=no`).then((data) => {  
      setWeather_cards(prevCoords => {
        return [
          ...prevCoords,
          {id: {ID},
          latitude: {latitude},
          longitude: {longitude},
          city: data.data.location.name,
          temperature: data.data.current.temp_c, 
          humidity: data.data.current.humidity, 
          precipitation:  data.data.current.precip_mm,
          wind_speed: data.data.current.wind_mph}
        ]
      })
      console.log(data);
    });
    ID++;
  }
  else{
    console.log("Invalid Input!");
  }
  }
  






  useEffect(() => {
    
    if(start_loged_out){
      logOut( setUser, setProfile);
      start_loged_out = 0;
  }
    const fetchData = () => {
      var options = { 
        enableHighAccuracy: true, 
        timeout: 5000, 
        maximumAge: 0 
      }; 

      function success(pos) { 
        var crd = pos.coords; 
        setUser_lat(crd.latitude.toString()); 
        setUser_long(crd.longitude.toString());
        return; 
      } 

      function error(err) { 
        console.warn(`ERROR(${err.code}): ${err.message}`); 
      } 
      navigator.geolocation.getCurrentPosition(function(position) {
        setUser_lat(position.coords.latitude);
        setUser_long(position.coords.longitude);
        
      });

      if(!weather_cards.length){
        AddCard(user_lat, user_long);  
      }
      else{
        for(let i = 0; i < ID; i ++){ 
          UpdateCard(i);
        }
      } 
    }
      fetchData();
      // const map = new Map({
      //   target: "map",
      //   layers: [
      //     new TileLayer({
      //       source: new OSM(),
      //     }),
      //   ],
      //   view: new View({
      //     center: [0, 0],
      //     zoom: 2,
      //   }),
      // });
  
      // return () => {
      //   map.setTarget(null);
      // };
  },  [user_lat, user_long])


return (
  <div>
  {!profile ? (
    <div>
      <Login_Page setProfile={setProfile} user={user} setUser={setUser}/>
    </div>
  ) : ( 
    <div>
    <div id="sticky_back"></div>
    <div className="main">

      <Header profile_pic={profile.picture} name={profile.name} email={profile.email}/>

      <div  className='input'>
        
        <input type="number" min="-90" max="90" ref={latInput} placeholder="Enter Latitude..." />
        <input type="number" min="-90" max="90" ref={longInput} placeholder="Enter Longitude..." />
        <button className='addCard' onClick={(latitude, longitude) => handleAddCard()}>Add +</button>  

      </div>

        {weather_cards.length ? (
          <div className='Weather_Cards'>
            <WeatherCard  weather_cards={weather_cards} handleDelete={handleDelete}/>
          </div>
        ) : (
          <p style={{marginTop: '2rem'}}> Your list is empty</p>
        )}
        
        <button onClick={() => {logOut( setUser, setProfile)}}className='logOut'>Log out</button>

     </div>
      {/* <div id="map" style={{ width: "200px", height: "400px" }} /> */}
    </div>
  )}
  </div>
)
}

export default App;
