const loadEvent = async function () {
    const rootElement = document.getElementById("root")

    /*fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY").then(function (response){
        console.log(response);
        return response.json()
    })
    .then(function(json){
        console.log(json.date);
        rootElement.insertAdjacentHTML("beforeend", `
            <img src="${json.hdurl}">
        `)
    })*/

    /*const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")

    const responseJson = await response.json()

    rootElement.insertAdjacentHTML("beforeend", `
            <img src="${responseJson.hdurl}">
        `)*/

    const response = await fetch("http://api.weatherapi.com/v1/current.json?key=c07efd10da9e4134a49130617221605&q=Budapest&aqi=no")
    const responseJson = await response.json()
    console.log(responseJson);
    rootElement.insertAdjacentHTML("beforeend", `
            <div>${response.json.location.name}"bármi"</div>
        `)
}
window.addEventListener("load", loadEvent)

