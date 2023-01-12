import { useState } from 'react';
import style from './App.module.css';
import sun from './images/sun.png';
import cloudy from './images/clouds.png';
import sun_clouds from './images/sun_clouds.png';
import sun_clouds2 from './images/sun_clouds2.png';

function App() {
  const [town, setTown] = useState('');
  const [enteredTown, setEnteredTown] = useState('');
  const [tempC, setTempC] = useState('');
  const [clouds, setClouds] = useState('');
  const [humidity, setHumidity] = useState('');
  const [pressure, setPressure] = useState('');
  const [wind, setWind] = useState('');
  const [outputIsVisible, setOutputVisible] = useState(false);
  const [error, setError] = useState(false);

  const setYourTown = (event) => {
    setTown(event.target.value);
  }

 async function checkWeather() {
  try {
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${town}&APPID=481beaf40cbafbd1b31349a31fead89e`, {mode: 'cors'})
    const weatherData = await response.json();
    const enteredTown = town;
    setEnteredTown(enteredTown);
    const tempK = weatherData.main.temp;
    const tempC = Math.round(tempK - 273.15);
    setTempC(tempC);
    const clouds = weatherData.clouds.all;
    setClouds(clouds);
    const humidity = weatherData.main.humidity;
    setHumidity(humidity);
    const pressure = weatherData.main.pressure;
    setPressure(pressure);
    const wind = weatherData.wind.speed;
    setWind(wind);
    setOutputVisible(true);
    setError(false);
  } catch(err) {
    setError(true);
    setOutputVisible(false);
  }
 
  }  
var imgSource = cloudy;
if(clouds < 20) {
  imgSource = sun;
} else if (clouds >=20 && clouds <= 50) {
  imgSource = sun_clouds;
} else if (clouds > 50 && clouds <= 70) {
  imgSource = sun_clouds2;
} else if (clouds > 70) {
  imgSource = cloudy;
}

  var context = '';
  if(outputIsVisible) {
    context = (
       <div className={style.output}>

          <div className={style.townAndImg}>
              <div className={style.townAndTemperature}><h2>{enteredTown} </h2><h2> {tempC}&ordm;C</h2></div>
              <img src={imgSource} width="200px" height="200px" alt='img weather'/>
          </div>
          <div>  
              <p>Clouds: <span> {clouds}%</span></p>
              <p>Humidity: <span> {humidity}%</span></p>
              <p>Pressure: <span> {pressure}hPa</span></p>
              <p>Wind: <span> {wind} m/s</span></p>            
          </div>
      </div>     
    )
  }
  var err;
  if(error) {
    err = (
    <div className={style.error}>
        <p >Something went wrong. Check if there is a bug on your town's name. </p>
        <p className={style.errorExample}>For example "Bielsko-Biała" we should write with "-".</p>
    </div>
      )
  } else {
    err = '';
  }
  return (
    <div className="App">          
    <div className={style.header}><h1>Weather App</h1></div>
      <div className={style.enteredTown}>
        <label htmlFor='town'>Insert your town to check the weather:</label>
        <input type='text' id='town' onChange={setYourTown}/>
        <button onClick={checkWeather}>Check weather</button>
        <div>{err}</div>
      </div>
      {context}
    </div>
  );
}

export default App;
