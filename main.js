const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const conditionIcon = document.querySelector('.conditionIcon');
const cityText = document.querySelector('.cityText');
const timeField = document.querySelector('.timeField');
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

getData();

  