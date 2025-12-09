

export async function localData() {
    const date = document.querySelector(".date")
    const temp = document.querySelector(".temp")
    const highLow= document.querySelector(".high-low")

    const feelsTemp   = document.querySelector(".feels-temp")
    const feelsexplain=document.querySelector(".feels-explain")

    const windSpeed = document.querySelector("#wind")
    const direction = document.querySelector(".direction")
    try{
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/istanbul?key=BKQEY9L5T8D2E7DUXET9CAS6Y")

        if(response.status === 404) {
            console.log("No Such City")
            return ;
        }

        if(!response.ok) {
            alert("Network error"+ error)
            return;
        }

        const json = await response.json()
        
        date.innerHTML = json.days[0]["datetime"]
        temp.innerHTML = json.days[0]["temp"] +" F"
        highLow.innerHTML= "max: " +json.days[0]["tempmax"] + " F, min: "+  json.days[0]["tempmin"] + " F"
        
        feelsTemp.innerHTML = json.days[0]["feelslike"]+ " F"
        feelsexplain.innerHTML = json.days[0]["conditions"]

        windSpeed.innerHTML = json.days[0]["windspeed"] + " Km/h"
        direction.innerHTML = "cloudcover: " +json.days[0]["cloudcover"]


    }catch(error) {
        alert("Network error", error.message);
        console.log(error)
    }
    
}