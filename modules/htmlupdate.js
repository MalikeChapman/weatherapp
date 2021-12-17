/*eslint-disable*/
import { apiSearch } from "./search.js";
import { forecast } from "./forecast.js";
export const utilizeData = (function ()
{
async function startUpdate(){
    let {weatherData, metricWeatherData, forecastWeatherData} = await apiSearch.valid();
    updateCityTitle(weatherData);
    weatherDescription(weatherData);
    updateCityTemperature(weatherData);
    updateCityWeatherData(weatherData, forecastWeatherData);
    forecast.startForecast();

}
function updateCityTitle(weatherData){
    let cityTitle = document.getElementById("cityTitle");
    cityTitle.textContent = weatherData.name;
}
function updateCityTemperature(weatherData){
    let tempDiv = document.getElementById("temperature"); 
    checkChildren(tempDiv);
    let span = document.createElement("span"); 
    let adjustedTemp = tempManipulate(weatherData.main.temp);  
    span.textContent = `${adjustedTemp}\xB0F`;
    span.style.marginLeft = '2rem';
    span.style.fontSize = '4.5rem';
    let img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    
    tempDiv.appendChild(span);
    tempDiv.appendChild(img);

}
function updateCityWeatherData(weatherData, forecastWeatherData){
    let weatherDataDiv = document.getElementById("weatherdata");
    let weatherDataChildren = weatherDataDiv.childNodes;
    for(let i = 0; i < weatherDataChildren.length; i++)
    {
        weatherItemsManipulate(weatherDataChildren, forecastWeatherData, weatherData, i);

    }
}
function weatherDescription(weatherData){
    let dailyitemsChildren = document.getElementById("dailyitems").children;
    dailyitemsChildren[0].textContent = weatherData.weather[0].description;
    dailyitemsChildren[1].textContent = `Hi: ${tempManipulate(weatherData.main.temp_max)}\xB0F`;
    dailyitemsChildren[2].textContent = `Low: ${tempManipulate(weatherData.main.temp_min)}\xB0F`;
}
function tempManipulate(string){
    let stringToChange = string.toString();
    if(stringToChange.includes("."))
    {
        let indexOfEnd = stringToChange.indexOf(".");
        let newTempString = stringToChange.slice(0, indexOfEnd);
        return newTempString;
    }
    return string;
}
function weatherItemsManipulate(weatherChild,forecastWeatherData, weatherData, index){
    switch (index) {
        case 1:
            let date = new Date(weatherData.sys.sunrise * 1000);
            let sunrise = date.toLocaleTimeString();
            let gmtIndex = sunrise.lastIndexOf(":");
            sunrise = sunrise.slice(0, gmtIndex);
            weatherChild[index].textContent = `Sunrise: ${sunrise} AM`;
            break;
        case 3:
            let date2 = new Date(weatherData.sys.sunset * 1000);
            let sunset = date2.toLocaleTimeString();
            let gmtIndex2 = sunset.lastIndexOf(":");
            sunset = sunset.slice(0, gmtIndex2);
            weatherChild[index].textContent = `Sunset: ${sunset} PM`;
            break;
        case 5:
            weatherChild[index].textContent = `Humidity: ${weatherData.main.humidity}%`;
            break;
            
        case 7:
            weatherChild[index].textContent = `Precipitation: ${forecastWeatherData.list[0].pop}%`;
            break;
        
        case 9:
            weatherChild[index].textContent = `Wind: ${weatherData.wind.speed} mph`;

            break;
    
        default:
            break;
    }
}
function checkChildren(parent)
{
    let childrenList = parent.children;
    if(childrenList.length > 1)
    {
        removeAllButFirstChild(parent, childrenList);
    }
}
function removeAllButFirstChild(parent, childrenList)
{
    let  i = 1;
    while(childrenList.length > 1)
    {
        parent.removeChild(childrenList[i]);
    }
}
return {startUpdate, tempManipulate};
})(document)