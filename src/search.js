import {render} from "./main"




export function search() {
  const search = document.querySelector(".search")
  const suggestionsBox = document.querySelector(".suggestions")

  let debounceTimer;
  search.addEventListener("input", (e) => {
    clearTimeout(debounceTimer); //for every time I input it reset the time

    debounceTimer = setTimeout(() => {
      const userInput = e.target.value.trim()
      if (userInput.length < 2) {
        suggestionsBox.innerHTML = "";
        return;
      }
    
      fetchCities(userInput);
    }, 400); //debounce delay
  });

   async function fetchCities(query) {
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
      );
      suggestionsBox.style.display = "block"
      const data = await response.json();
      
      renderSuggestion(data.results || []) 

    }catch(error) {
      console.error("City is not found", error)
    }
  }

  function renderSuggestion(cities) {
    suggestionsBox.innerHTML = "";
    

    cities.forEach((city) => {
      const div = document.createElement("div")
      div.textContent = `${city.name}, ${city.country}`;

      div.addEventListener("click", () => {
        suggestionsBox.innerHTML = ""
        suggestionsBox.style.display = "none"
        search.value = city.name;

        // Fetch weather after selecting city
        fetchWeather(city.name)
      });
      suggestionsBox.appendChild(div)
    });
  }

  async function fetchWeather(cityName) {
    try{
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=BKQEY9L5T8D2E7DUXET9CAS6Y`
      );
      if(response.status === 404 || response.status === 400){
        alert("No city has been found")
        search.value = ""

      }
      if (response.ok){
        const json = await response.json(); 
        
        const weatherData = {
            "address":json.address,
            "timeZone":json.timezone,
            "day":json.days[0]["datetime"], 
            "temperature":json["currentConditions"]["temp"],
            "tempMax":json.days[0]["tempmax"],
            "tempIn":json.days[0]["tempmin"],
            "feelsLike":json["currentConditions"]["feelslike"],
            "conditions":json["currentConditions"]["icon"],
            "windS":json["currentConditions"]["windspeed"],
            "cloud":json["currentConditions"]["cloudcover"],
            "sunIndex":json["currentConditions"]["uvindex"],
            "humidity":json["currentConditions"]["humidity"],
            "snow":json["currentConditions"]["snow"],
            "sunRise":json["currentConditions"]["sunrise"],
            "sunSet":json["currentConditions"]["sunset"],
            "daysForecast":json["days"]
        };
        render(weatherData)
        
      }
      
      
    }catch(error){
    console.error("weather error", error)
    }
  }
}






