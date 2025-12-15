

// export async function localData() {
//     const date = document.querySelector(".date")
//     const temp = document.querySelector(".temp")
//     const highLow= document.querySelector(".high-low")

//     const feelsTemp   = document.querySelector(".feels-temp")
//     const feelsexplain=document.querySelector(".feels-explain")

//     const windSpeed = document.querySelector("#wind")
//     const direction = document.querySelector(".direction")
//     try{
//         const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/istanbul?key=BKQEY9L5T8D2E7DUXET9CAS6Y")

//         if(response.status === 404) {
//             console.log("No Such City")
//             return ;
//         }

//         if(!response.ok) {
//             alert("Network error"+ error)
//             return;
//         }

//         const json = await response.json()
        
//         date.innerHTML = json.days[0]["datetime"]
//         temp.innerHTML = json.days[0]["temp"] +" F"
//         highLow.innerHTML= "max: " +json.days[0]["tempmax"] + " F, min: "+  json.days[0]["tempmin"] + " F"
        
//         feelsTemp.innerHTML = json.days[0]["feelslike"]+ " F"
//         feelsexplain.innerHTML = json.days[0]["conditions"]

//         windSpeed.innerHTML = json.days[0]["windspeed"] + " Km/h"
//         direction.innerHTML = "cloudcover: " +json.days[0]["cloudcover"]


//     }catch(error) {
//         alert("Network error", error.message);
//         console.log(error)
//     }
    
// }

// export async function localData() {
//     try{
//         const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleppo?key=BKQEY9L5T8D2E7DUXET9CAS6Y")
//         if(response.status === 404) {
//             console.log("No Such City")
//             return ;
//         }

//         if(!response.ok) {
//             alert("Network error"+ error)
//             return;
//         }

//         const json = await response.json()
//         dates(json.address,json.timezone, json.days[0]["datetime"], 
//             json.days[0]["temp"],json.days[0]["tempmax"],
//             json.days[0]["tempmin"],json.days[0]["feelslike"],
//             json.days[0]["conditions"],json.days[0]["windspeed"],
//             json.days[0]["cloudcover"])
//     }catch(error) {
//      console.log(error)
//     }
// }

// export function dates(nameOfCity,timeZone, day, Tempruture, max, min,
//     feelslike, conditions, windS, cloud) {
//     const newCity = document.querySelector(".city-name")

//     const date = document.querySelector(".date")
//     const temp = document.querySelector(".temp")
//     const highLow= document.querySelector(".high-low")

//     const feelsTemp   = document.querySelector(".feels-temp")
//     const feelsexplain=document.querySelector(".feels-explain")

//     const windSpeed = document.querySelector("#wind")
//     const direction = document.querySelector(".direction")

//     // Clearing All Fildes
//     date.innerHTML         = "";
//     temp.innerHTML         = "";
//     highLow.innerHTML      = "";
//     feelsTemp.innerHTML    = "";
//     feelsexplain.innerHTML = "";
//     windSpeed.innerHTML    = "";
//     direction.innerHTML    = "";
//     newCity.innerHTML = ""
    
//     newCity.innerHTML = `${nameOfCity} ${timeZone} `

//     // date.innerHTML = json.days[0]["datetime"]
//     date.innerHTML = day

//     // temp.innerHTML = json.days[0]["temp"] +" F"
//     temp.innerHTML = Tempruture +" F"
//     highLow.innerHTML= "max: " + max + " F, min: "+ min + " F"
    
//     feelsTemp.innerHTML = feelslike+ " F"
//     feelsexplain.innerHTML = conditions

//     windSpeed.innerHTML = windS + " Km/h"
//     direction.innerHTML = "cloudcover: " + cloud

// }





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

        const json = await response.json(); console.log(json["days"])
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
            "daysForecast":json["days"]
        }
            
            render(weatherData)
    }catch(error) {
     console.log("Network error: " + error)
    }
}

export function render({ 
    address, timeZone, day, temperature,
    tempMax, tempIn, feelsLike, conditions,
    windS, cloud, sunIndex, humidity, snow,
    sunRise, sunSet, daysForecast}) {    


    const newCity = document.querySelector(".city-name")
    const date   = document.querySelector(".date")
    const temp   = document.querySelector(".temp")
    const highLow= document.querySelector(".high-low")
    const feelsTemp   = document.querySelector(".feels-temp")
    const feelsexplain=document.querySelector(".feels-explain")
    const windSpeed = document.querySelector("#wind")
    const direction = document.querySelector(".direction")

    // Second line 
    const uvIndex = document.querySelector(".span-index")
    const humdtyR = document.querySelector(".span-humidity")
    const snowR = document.querySelector(".span-snow")
    const sunRiseR = document.querySelector(".span-sunrise")
    const sunSetR = document.querySelector(".span-sunset")

    //////////////////////////////////////////////////////////////// 
    
    // 1- select all li that contain day, icon, max & min
    const foreCastItems = document.querySelectorAll(".weekly-forecast li");
    
    // 2- clear all the contain by forEach
    foreCastItems.forEach(li => {
        li.querySelector(".day").textContent = "";
        li.querySelector(".icon").textContent= "";
        li.querySelector(".max").textContent = "";
        li.querySelector(".min").textContent = "";
    })
    // 3-render 8days sting by slice then trnsfer it tolcaldate
    //   then render it including dayDate, index
    daysForecast.slice(1,9).forEach((dayDate,index) => {
        const li = foreCastItems[index] // => Here we controll in each line by index
        if (!li) return;

        const dayName = new Date(dayDate.datetime).toLocaleDateString("en-us",{weekday:"short"})

        li.querySelector('.day').textContent = dayName;

        li.querySelector(".max").textContent =
            Math.round(dayDate.tempmax) + " °F";

        li.querySelector('.min').textContent =
            Math.round(dayDate.tempmin) + " °F"
        li.querySelector('.icon').innerHTML =`
            <i class="wi ${getWeatherIcon(dayDate.icon)}"></i>`
    })





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
    
    // Render New Data
    if(conditions === "partly-cloudy-night") {
        newCity.innerHTML = `<i class="qi-151-fill" style="font-size:46px; color: #333130ff;"></i>${address} ${timeZone}`
    }
    else if(conditions === "rain") {
        newCity.innerHTML = `<i class="qi-307-fill" style="font-size:(46px; color: #333130ff;"></i>${address} ${timeZone}`
    }

     //<i class="qi-150-fill" style="font-size:48px; color: #ff9800;"></i> 
    date.innerHTML = day
    
    temp.innerHTML = temperature + " F"
    highLow.innerHTML= "max: " + tempMax + " F, min: "+ tempIn + " F"
    
    feelsTemp.innerHTML = feelsLike+ " F";
    feelsexplain.innerHTML = conditions.replace("-"," ");

    windSpeed.innerHTML = windS + " Km/h";
    direction.innerHTML = "cloudcover: " + cloud;

    // Second line More features
    uvIndex.innerHTML = sunIndex;
    humdtyR.innerHTML =  "% " +humidity ;
    snowR.innerHTML = snow + "%"
    sunRiseR.innerHTML = sunRise
    sunSetR.innerHTML = sunSet

    // Rendering Days of week
}

function getWeatherIcon(icon) {
    const map = {
        "clear-day":"wi-day-sunny",
        "clear-night":"wi-night-clear",
        "snow": "wi-snow",
        "rain":"wi-rain",
        "partly-cloudy-day":"wi-day-cloudy",
        "partly-cloudy-night":"wi-night-alt-cloudy",
        "cloudy":"wi-cloudy",
    };
    return map[icon] || "wi-cloudy";
}