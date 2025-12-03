
function allElements() {
    const date = document.querySelector(".date")
    const temp = document.querySelector(".temp")
    const highLow= document.querySelector(".high-low")
}


export async function localData() {
    const date = document.querySelector(".date")
    const temp = document.querySelector(".temp")
    const highLow= document.querySelector(".high-low")
    try{
        const response = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/aleppo?key=BKQEY9L5T8D2E7DUXET9CAS6Y")

        if(response.status === 404) {
            console.log("No Such City")
            return ;
        }

        if(!response.ok) {
            alert("Server error", response.status)
            return;
        }

        const json = await response.json()
        // const parseJson = JSON.stringify(json)
        // console.log(parseJson)
        date.innerHTML = JSON.stringify(json.days[0]["datetime"])
        //temp.innerHTML =JSON

    }catch(error) {
        alert("Network error", error)
    }
    
}