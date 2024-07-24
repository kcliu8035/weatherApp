const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const conditionIcon = document.querySelector('.conditionIcon');
const cityText = document.querySelector('.cityText');
const timeField = document.querySelector('.timeField');
let longitude = "";
let latitude = "";



function getCurrentLocation() {

  function success(position) {
    console.log(position);
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // console.log(latitude.toFixed(2));
    // console.log(longitude);
    let lon = longitude.toFixed(2);
    let lat = latitude.toFixed(2);
    renderCurrentLocation(longitude, latitude);
  }

  function error() {
    alert('Unable to retrieve your location.');
  }

  navigator.geolocation.getCurrentPosition(success, error);
}

document.addEventListener('DOMContentLoaded', getCurrentLocation());


// async function current(lon, lat) {
//   let apiURL = `https://api.weatherapi.com/v1/current.json?key=3879078affd243f5b1005402242306&q=data?lon=${lon}&lat=${lat}`;
//   console.log(apiURL);

// }


async function getData(city) {
    let URL = `https://api.weatherapi.com/v1/current.json?key=3879078affd243f5b1005402242306&q=${city}&aqi=no`
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      cityText.innerHTML = `${json.location.name}`;
      timeField.innerHTML = json.location.localtime;
      temp.innerHTML = `${json.current.temp_f} °F`;
      condition.innerHTML = json.current.condition.text;
      conditionIcon.src = json.current.condition.icon;
    } catch (error) {
      console.error(error.message);
    }
}

function getCity(city) {  
    let cityInput = document.querySelector('.inputField').value;
    city = cityInput;
    getData(city);
}



async function renderCurrentLocation(lon, lat) {
  // let apiURL = `https://api.weatherapi.com/v1/current.json?key=3879078affd243f5b1005402242306&q=data?lon=${lon}&lat=${lat}`;
  let apiURL = `https://api.weatherapi.com/v1/current.json?key=3879078affd243f5b1005402242306&q=${lat},${lon}`;
  try {
    const response = await fetch(apiURL, {mode: 'cors'});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    cityText.innerHTML = `${json.location.name}`;

    var militaryTime = json.location.localtime.split(' ')[1].replace(':', '');
    let jsonTime = convertMilitaryToStandardTime(militaryTime);
    timeField.innerHTML = jsonTime;
    temp.innerHTML = `${json.current.temp_f} °F`;
    condition.innerHTML = json.current.condition.text;
    conditionIcon.src = json.current.condition.icon;
  } catch (error) {
    console.error(error.message);
  }
  
  console.log(apiURL);

}

function convertMilitaryToStandardTime(militaryTime) {
  var hours = parseInt(militaryTime.substring(0, 2), 10);
  var minutes = militaryTime.substring(2, 4);
  var period = (hours >= 12) ? "PM" : "AM";
  hours = (hours > 12) ? hours - 12 : hours;
  hours = (hours == 0) ? 12 : hours;
  minutes = (minutes < 10 ? '0' : '') + minutes;
  return hours + ":" + minutes + " " + period;
}


// const OLDURL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=3LMRC5HLSRGT53CBJQ6ZM26QQ&contentType=json`


// const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}?unitGroup=metric&key=3LMRC5HLSRGT53CBJQ6ZM26QQ&contentType=json`


// fetch(URL, {
//   "method": "GET",
//   "headers": {
//   }
//   })
// .then(response => {
//   console.log(response);

// })
// .catch(err => {
//   console.error(err);
// });

  