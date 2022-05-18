const loadEvent = async function () {
    const rootElement = document.getElementById("root")
    
    const dataListComponent = `
    <label for="choose-a-city">Choose a city:</label>
    <input type="text" list="chosen-cities" id="choose-a-city" name="choose-a-city">
    <datalist id="chosen-cities">
    </datalist>
    `
    rootElement.insertAdjacentHTML("beforeend", dataListComponent)
    
    let search = document.getElementById("choose-a-city");
    
    search.addEventListener("input", updateValue);
    function updateValue () {
        getCity(search.value)
    }
    
    async function getCity (value) {
        const response01 = await fetch("http://api.weatherapi.com/v1/search.json?key=c07efd10da9e4134a49130617221605&q=" + value)
        const cities = await response01.json()
        
        insertResultCities(cities);
    }
 
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


}
window.addEventListener("load", loadEvent)

