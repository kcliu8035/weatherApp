const temp = document.querySelector('.temp');
const condition = document.querySelector('.condition');
const conditionIcon = document.querySelector('.conditionIcon');
let cityInput = "tokyo";

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


async function getData() {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityInput}?unitGroup=metric&key=3LMRC5HLSRGT53CBJQ6ZM26QQ&contentType=json`
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      alert(json.resolvedAddress);
      alert(json.currentConditions.temp);
      alert(json.currentConditions.conditions);
      alert(json.currentConditions.icon);
      conditionIcon.src = json.currentConditions.icon;


    } catch (error) {
      console.error(error.message);
    }
}

getData();

  