/*eslint-disable*/
import { apiSearch } from "./search.js";
export const utilizeData = (function ()
{
async function startUpdate(){
    let weatherData = await apiSearch.valid();
    updateCityTitle(weatherData);
    updateCityTemperature(weatherData);
    updateCityWeatherData(weatherData);

}
function updateCityTitle(weatherData){
    let cityTitle = document.getElementById("cityTitle");
    cityTitle.textContent = weatherData.name;
}
function updateCityTemperature(weatherData){
    let tempDiv = document.getElementById("temperature"); 
    let span = document.createElement("span"); 
    let adjustedTemp = tempManipulate(weatherData.main.temp);  
    span.textContent = `${adjustedTemp}\xB0F`;
    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
    tempDiv.appendChild(span);
    tempDiv.appendChild(img);

}
function updateCityWeatherData(weatherData){
    let weatherDataDiv = document.getElementById("weatherdata");
    let weatherDataChildren = weatherDataDiv.childNodes;
    for(let i = 0; i < weatherDataChildren.length; i++)
    {
        weatherItemsManipulate(weatherDataChildren, weatherData, i);

    }
}
function weatherDescription(weatherData){}
function tempManipulate(string){
    let stringToChange = string.toString();
    if(stringToChange.includes("."))
    {
        let indexOfEnd = stringToChange.indexOf(".");
        let newTempString = stringToChange.slice(0, indexOfEnd);
        console.log(newTempString);
        return newTempString;
    }
}
function weatherItemsManipulate(weatherChild, weatherData, index){
    switch (index) {
        case 1:
            let date = new Date(weatherData.sys.sunrise * 1000);
            let sunrise = date.toTimeString();
            let gmtIndex = sunrise.lastIndexOf(":");
            sunrise = sunrise.slice(0, gmtIndex);
            weatherChild[index].textContent = `${weatherChild[index].textContent}: ${sunrise} AM`;
            break;
        case 3:
            let date2 = new Date(weatherData.sys.sunset * 1000);
            let sunset = date2.toTimeString();
            console.log(date2.toTimeString());
            let gmtIndex2 = sunset.lastIndexOf(":");
            sunset = sunset.slice(0, gmtIndex2);
            weatherChild[index].textContent = `${weatherChild[index].textContent}: ${sunset} PM`;
            break;
        case 5:
            weatherChild[index].textContent = `${weatherChild[index].textContent}: ${weatherData.main.humidity}%`;
            break;
            
        case 7:
            break;
        
        case 9:
            weatherChild[index].textContent = `${weatherChild[index].textContent}: ${weatherData.wind.speed} mph`;

            break;
    
        default:
            break;
    }
}
return {startUpdate};
})(document)