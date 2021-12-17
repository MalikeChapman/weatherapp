/* eslint-disable */
import { apikey } from "../apikey.js";
export const apiSearch = (function ()
{
    const elevalue = document.getElementById("weatherCity").value;
  
    async function valid()
    {
        console.log(this);
        const test = document.getElementById("weatherCity");
        if (test.value === '')
        {
            alert('This can not be blank!');
            return;
        } 
        else
        {
            test.setCustomValidity("");
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${test.value}&appid=${apikey}&units=imperial`;
             let response = await fetch(url);
            let weatherData = await response.json();
            let metricurl = `https://api.openweathermap.org/data/2.5/weather?q=${test.value}&appid=${apikey}&units=metric`;
            let metricResponse = await fetch(metricurl);
            let metricWeatherData = await metricResponse.json();
            let forecasturl = `https://api.openweathermap.org/data/2.5/forecast?q=${test.value}&appid=${apikey}&units=imperial`;
            let forecastResponse = await fetch(forecasturl);
            let forecastWeatherData = await forecastResponse.json();

            // console.log(weatherData);
            // console.log(metricWeatherData);
            console.log(forecastWeatherData);
            return {weatherData, metricWeatherData, forecastWeatherData};
        }
    
    }
   
    return {valid};

})(document)