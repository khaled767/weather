import {render} from "./fitching"

// export function search() {

//     const search = document.getElementById("search")
//     const result = document.getElementById("search-result")
//     result.style.display = "none"
    
//     search.addEventListener("input",async(e) => {
//         const userInput = e.target.value.trim()
        
//         if(!userInput) {
//             result.innerHTML = ""
//             // result.style.display = "none"
//             return;
//         }

//         try {
//             const response = await fetch(
// `https://weather.visualcrossing.com/VisualCrossingWebServices/
// rest/services/timeline/${userInput}?key=BKQEY9L5T8D2E7DUXET9CAS6Y`
//             );
            

//         if (!response.ok) {
//             throw new Error("City Not Found");
//         }
//         result.style.display = "block"
//         const data = await response.json()
//         console.log(data)

//         // Render result
//         result.innerHTML = `
//         <p>City: ${data.resolvedAddress}</p>
//         <p>Tempruture ${data.currentConditions.temp}</p>
//         `;
//         } catch(error) {
//             result.innerHTML = `<p>City Not Found</p>`
//             console.log(error)
//         }
//     });
// }


// export function search() {
//   const searchInput = document.getElementById("search");
//   const suggestionsBox = document.querySelector(".suggestions");

//   let debounceTimer;

//   searchInput.addEventListener("input", (e) => {
//     clearTimeout(debounceTimer);

//     debounceTimer = setTimeout(() => {
//       const userInput = e.target.value.trim();
//       if (userInput.length < 2) {
//         suggestionsBox.innerHTML = "";
//         return;
//       }

//       fetchCities(userInput);
//     }, 400); // debounce delay
//   });

//   async function fetchCities(query) {
//     try {
//       const response = await fetch(
//         `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=10&language=en&format=json`
//       );

//       const data = await response.json();
//       renderSuggestions(data.results || []);
//     } catch (error) {
//       console.error("City fetch error:", error);
//     }
//   }

//   function renderSuggestions(cities) {
//     suggestionsBox.innerHTML = "";

//     cities.forEach((city) => {
//       const div = document.createElement("div");
//       div.textContent = `${city.name}, ${city.country}`;

//       div.addEventListener("click", () => {
//         searchInput.value = city.name;
//         suggestionsBox.innerHTML = "";

//         // Fetch weather AFTER selecting city
//         fetchWeather(city.name);
//       });

//       suggestionsBox.appendChild(div);
//     });
//   }

//   async function fetchWeather(cityName) {
//     try {
//       const response = await fetch(
//         `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=BKQEY9L5T8D2E7DUXET9CAS6Y`
//       );

//       const data = await response.json();
//       console.log(`Weather in ${cityName}:`, data);

//     } catch (error) {
//       console.error("Weather error:", error);
//     }
//   }
// }

























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

      const data = await response.json();
      
      renderSuggestion(data.results || []) 

    }catch(error) {
      console.error("city is not found", error)
    }
  }

  function renderSuggestion(cities) {
    suggestionsBox.innerHTML = "";

    cities.forEach((city) => {
      const div = document.createElement("div")
      div.textContent = `${city.name}, ${city.country}`;

      div.addEventListener("click", () => {
        suggestionsBox.innerHTML = ""
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
            //"condition":json["currentConditions"]["conditions"],
            "address":json.address,
            "timeZone":json.timezone,
            "day":json.days[0]["datetime"], 
            "temperature":json["currentConditions"]["temp"].toString().slice(0,2),//json.days[0]["temp"],
            "tempMax":json.days[0]["tempmax"].toString().slice(0,2),
            "tempIn":json.days[0]["tempmin"].toString().slice(0,2),
            "feelsLike":json["currentConditions"]["feelslike"].toString().slice(0,2),//json.days[0]["feelslike"],
            "conditions":json["currentConditions"]["icon"],
            "windS":json["currentConditions"]["windspeed"],//json.days[0]["windspeed"],
            "cloud":json["currentConditions"]["cloudcover"],//json.days[0]["cloudcover"],
            "sunIndex":json["currentConditions"]["uvindex"],
            "humidity":json["currentConditions"]["humidity"],
            "snow":json["currentConditions"]["snow"],
            "sunRise":json["currentConditions"]["sunrise"].slice(0,5),
            "sunSet":json["currentConditions"]["sunset"].slice(0, 5),
        }
        render(weatherData)
        // newRenderData(data.timezone)
      }
      
      // console.log(`weather in ${cityName}:`, data)
    }catch(error){
    console.error("weather error", error)
    }
  }

//   function newRenderData(city){
//     const newCity = document.querySelector(".city-name")
//     newCity.innerHTML = ""
//     newCity.innerHTML = city
//   }
}