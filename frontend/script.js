const loadEvent = async function () {
    
    const rootElement = document.getElementById("root")

    // Root ID feltöltése
    const dataListComponent = `
        <input type="text" list="chosen-cities" id="choose-a-city" name="choose-a-city" placeholder="Type here">
        <datalist id="chosen-cities">
        </datalist>
    `
    
    rootElement.insertAdjacentHTML("beforeend", dataListComponent)

    rootElement.insertAdjacentHTML("beforeend", `
                <div id="card">
                    <div id="bottom-cont">
                        <div class="temp"></div>
                        <div class="citytime">
                            <div class="city"></div>
                            <div class="time"></div>
                        </div>
                    </div>    
                    <div id="right-cont">
                        <div class="title">Weather Details</div>
                        <div class="humi">Humidity: </div>
                        <div class="cloud">Cloud cover: </div>
                        <div class="wind">Wind speed: </div>
                        <div class="uv">UV radiation: </div>
                    </div>
                </div>
        `
    )
    
    // Input value érzékelése
    let search = document.getElementById("choose-a-city");
    
    search.addEventListener("input", updateValue);
    function updateValue() {
        if (search.value.length >= 3) {
            cityList(search.value)           
        }
    }
    
    // Input value alapján fetch
    async function cityList(value) {
        const cityListResponse = await fetch("http://api.weatherapi.com/v1/search.json?key=c07efd10da9e4134a49130617221605&q=" + value)
        const cityListJson = await cityListResponse.json()
        insertResultCities(cityListJson);
    }
    
    // Kapott .json file drop-down menübe töltése
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

    // Enter event + az előző card adatainak ürítése
    search.addEventListener("keypress", pressEnter);
    function pressEnter(event) {
        if (event.key == "Enter") {
            const cardDiv = document.getElementById("card");
            cardDiv.remove();
            finalCity(search.value)
        }
    }
    
    // A kiválasztott város adatainak lekérése fetch segítségével
    async function finalCity(chosencity) {
        const finalCityResponse = await fetch("http://api.weatherapi.com/v1/current.json?key=c07efd10da9e4134a49130617221605&q="+ chosencity +"&aqi=no")
        const finalCityJson = await finalCityResponse.json()

        // Az adatok megjelenítése a card div-en belül
        rootElement.insertAdjacentHTML("beforeend", `
            <div id="card">
                <div id="bottom-cont">
                    <div class="temp"> ${finalCityJson.current.temp_c}°</div>
                    <div class="citytime">
                        <div class="city"> ${finalCityJson.location.name}</div>
                        <div class="time"> ${finalCityJson.location.localtime}</div>
                    </div>
                </div>
                <div id="right-cont">
                    <div class="title">Weather Details</div>
                    <div class="humi">Humidity: ${finalCityJson.current.humidity}%</div>
                    <div class="cloud">Cloud cover: ${finalCityJson.current.cloud}%</div>
                    <div class="wind">Wind speed: ${finalCityJson.current.wind_kph} km/h</div>
                    <div class="uv">UV radiation: ${finalCityJson.current.uv}</div>
                </div>
            </div>
            `
        )
    }
}

window.addEventListener("load", loadEvent)