const loadEvent = async function () {
    const rootElement = document.getElementById("root")

    let output = "pilisv"
    let listOfCitiesUrl = "http://api.weatherapi.com/v1/search.json?key=c07efd10da9e4134a49130617221605&q=" + output;

    const response01 = await fetch(listOfCitiesUrl)
    const response01Json = await response01.json()
    console.log(response01Json);

    /*let filtered = response01Json.filter(function(obj){
        //loop through each object
        for(key in obj){
          //check if object value contains value you are looking for
          if(obj[key].includes(output)){
            //add this object to the filtered array
            return obj;
        }
    }
   });
   console.log(filtered)*/

   const dataListComponent = `
        <label for="choose-a-city">Choose a city:</label>
        <input list="chosen-cities" id="choose-a-city" name="choose-a-city" />
        <datalist id="chosen-cities">
        </datalist>
        `
        
        
        const insertResultCities = function(resultCities) {
            const citiesContainer = document.getElementById("chosen-cities")

            for (const city of resultCities) {
                if (city.name !== null) {
                    console.log(city.name)
                    let cityHtml = `<option value="${city.name}">`
                    
                    citiesContainer.insertAdjacentHTML("beforeend", cityHtml)
            }
        }
    }

    
    /*let chosencity = "London"
    let url = "http://api.weatherapi.com/v1/current.json?key=c07efd10da9e4134a49130617221605&q="+ chosencity +"&aqi=no"

    const response = await fetch(url)
    const responseJson = await response.json()
    console.log(responseJson);
    rootElement.insertAdjacentHTML("beforeend", `
            <div>Helység: ${responseJson.location.name}</div>
            <div>Hőmérséklet: ${responseJson.current.temp_c}°C</div>
            <div>Páratartalom: ${responseJson.current.humidity}%</div>
            <div>Felhőzet mértéke: ${responseJson.current.cloud}%</div>
        `)*/
    rootElement.insertAdjacentHTML("beforeend", dataListComponent)

    insertResultCities(response01Json);
}
window.addEventListener("load", loadEvent)

