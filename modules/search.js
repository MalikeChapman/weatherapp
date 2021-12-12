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
            console.log(weatherData);
            return weatherData;
        }
    
    }
   
    return {valid};

})(document)