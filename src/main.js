

let currentUnit = "f";
let lastWeatherData = null; // here will save last API result

function fToC(f) {
  return Math.round((f- 32) * 5 / 9);
}
function cToF(c) {
  return Math.round((c * 9 / 5) + 32);
}

// func to return the display Value according to the unit
function tempToggle(valueInf) {
  if (currentUnit === "f") return Math.round(valueInf) +`<i class= "wi wi-fahrenheit"></i>`;
  return fToC(valueInf) + `<i class="wi wi-celsius"></i>`
}

export async function localData() {
    try{
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleppo?key=BKQEY9L5T8D2E7DUXET9CAS6Y")
        if(response.status === 404) {
            console.log("No Such City")
            return ;
        }

        if(!response.ok) {
            alert("Network error")
            return;
        }

        const json = await response.json(); 
        const weatherData = {
            // "condition":json["currentConditions"]["conditions"],
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
        }
            
            render(weatherData)
    }catch(error) {
     console.log("Network error: " + error)
    }
}

export function render(data) {    

    if(!data) return;
    lastWeatherData = data

    const newCity = document.querySelector(".city-name")
    const date   = document.querySelector(".date")
    const temp   = document.querySelector(".temp")
    const highLow= document.querySelector(".high-low")
    const feelsTemp   = document.querySelector("#feels-temp")
    const feelsexplain=document.querySelector(".feels-explain")
    const windSpeed = document.querySelector("#wind")
    const direction = document.querySelector(".direction")

    // Second line 
    const uvIndex = document.querySelector(".span-index")
    const humdtyR = document.querySelector(".span-humidity")
    const snowR = document.querySelector(".span-snow")
    const sunRiseR = document.querySelector(".span-sunrise")
    const sunSetR = document.querySelector(".span-sunset")

    // Clear All Fildes
    
    newCity.innerHTML      = "";
    date.innerHTML         = "";
    temp.innerHTML         = "";
    highLow.innerHTML      = "";
    feelsTemp.innerHTML    = "";
    feelsexplain.innerHTML = "";
    windSpeed.innerHTML    = "";
    direction.innerHTML    = "";
    uvIndex.innerHTML      = "";
    humdtyR.innerHTML      = "";
    snowR.innerHTML        = "";
    sunRiseR.innerHTML     = "";
    sunSetR.innerHTML      = ""; 

    const iconData = getWeatherIcon(data.conditions)
    newCity.innerHTML =
        `<i class="wi ${iconData.class}"
            style="color:${iconData.color}"></i>
            ${data.address.toUpperCase()} ${data.timeZone}`; 
    date.textContent = data.day
    
    //temp.innerHTML = `${Math.round(data.temperature)}<i class="wi wi-fahrenheit"></i>`;
    temp.innerHTML = `${tempToggle(data.temperature)}`
    highLow.innerHTML= `Max:${tempToggle(data.tempMax)} Min:${tempToggle(data.tempIn)}`
    
    feelsTemp.innerHTML = `${tempToggle(data.feelsLike)}`;

    feelsexplain.textContent = (typeof data.conditions === "string") ? data.conditions.split("-",3).join(" ") : "";
    
    windSpeed.textContent = Math.round(data.windS) + " Km/h";
    direction.innerHTML = `cloud cover: ${data.cloud} <i class="wi wi-day-cloudy-windy"></i> `;

    // Second line More features
    uvIndex.textContent = data.sunIndex;
    humdtyR.textContent =  "% " +Math.round(data.humidity) ;
    snowR.textContent = data.snow + "%"
    sunRiseR.textContent = data.sunRise.slice(0,5)
    sunSetR.innerHTML = data.sunSet.slice(0,5)

    // Rendering the Days Forecast
    
    // 1- select all li that contain day, icon, max & min and clear it
    const weekDays = document.querySelectorAll(".weekly-forecast li")
    weekDays.forEach(element => {
        element.querySelector('.day').textContent = "";
        element.querySelector('.icon').textContent = "";
        element.querySelector('.max').textContent = "";
        element.querySelector('.min').textContent = "";
    })
    
    // 2- fitch the 8 days you need and loop forEach day
    data.daysForecast.slice(1, 9).forEach((dayInformation,index) => {
        const li = weekDays[index]; if(!li) return;
        
        // chagne day from number to dayname
        const dayName = new Date(dayInformation.datetime).toLocaleDateString("en-US", {weekday:"short"})
        
        li.querySelector(".day").textContent = dayName; 
        li.querySelector(".max").innerHTML = `${tempToggle(dayInformation.tempmax)}`;
        li.querySelector(".min").innerHTML = `${tempToggle(dayInformation.tempmin)}`;
        li.querySelector(".icon").innerHTML =
            `<i class="wi ${getWeatherIcon(dayInformation.icon).class}"
                style="color:${getWeatherIcon(dayInformation.icon).color}">
            </i>` ;
    })

    function getWeatherIcon(icon) {
      const map = {
        "clear-day": {
          class: "wi-day-sunny",
          color: "#ddd127ff"
        },
        "clear-night": {
          class: "wi-night-clear",
          color: "#545457ff"
        },
        "partly-cloudy-day": {
          class: "wi-day-cloudy",
          color: "#f69d3c"
        },
        "partly-cloudy-night": { 
          class: "wi-night-alt-cloudy",
          color: "#474849ff"
        },
        "cloudy": {
          class: "wi-cloudy",
          color: "#beb6b6ff"
        },
        "rain": {
          class: "wi-rain",
          color: "#81b5f1ff"
        },
        "snow": {
          class: "wi-snow",
          color: "#e0f7ff"
        },
        "thunderstorm": {
          class: "wi-thunderstorm",
          color: "#ffcc00"
        }
      };
      return map[icon] || map.cloudy || "wi-cloudy";
    }
  }

// I should look to the span and <i> in week day forecast html

const tempBtn = document.querySelector("#check");
    const label   = document.querySelector("label");

    // we put this condition to make sure the element is exist 
    if (tempBtn) {
      tempBtn.addEventListener("change", () => {
        currentUnit = tempBtn.checked ? "c" : "f";

        label.innerHTML = currentUnit === "c"?`<i class="wi wi-celsius"></i>` :`<i class="wi wi-fahrenheit"></i>`
        if (lastWeatherData) render(lastWeatherData)
      })
    }