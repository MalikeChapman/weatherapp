/*eslint-disable*/
import { apiSearch } from "./search.js";
import { utilizeData } from "./htmlupdate.js";
export const forecast = ( function ()
{
    async function startForecast()
    {
        let {forecastWeatherData} = await apiSearch.valid();
        setTitle(forecastWeatherData);

    }
    function setTitle(forecastWeatherData)
    {
        let forecastChildren = document.getElementById("cityforecast").children;
        let index = 0;
        for(let i = 0; i < forecastChildren.length; i++)
        {
            if(forecastChildren[i].hasChildNodes)
            {
               removeAllChildren(forecastChildren[i]);
               
            }
        }
        let currentDay = extractDayOfWeek(forecastWeatherData.list[0].dt);
        for(let i = 0; i < forecastWeatherData.list.length; i++)
        {
            

            if(i === 0)
            {
                
                let title = document.createElement("h2");
                title.textContent = extractDayOfWeek(forecastWeatherData.list[i].dt);
                let hitemp = document.createElement("span");
                let photoicon = document.createElement("img");
                let lowtemp = document.createElement("span");

                hitemp.textContent = `Hi: ${utilizeData.tempManipulate(forecastWeatherData.list[i].main.temp_max)}\xB0F`;
                lowtemp.textContent = `Low: ${utilizeData.tempManipulate(forecastWeatherData.list[i].main.temp_min)}\xB0F`;
                photoicon.src = `http://openweathermap.org/img/wn/${forecastWeatherData.list[i].weather[0].icon}@2x.png`;
                forecastChildren[index].appendChild(title);
                forecastChildren[index].appendChild(hitemp);
                forecastChildren[index].appendChild(lowtemp);
                forecastChildren[index].appendChild(photoicon);
                index++;
            }
            if(index === forecastChildren.length) return;
            if(currentDay !== extractDayOfWeek(forecastWeatherData.list[i].dt))
            {
                let title = document.createElement("h2");
                title.textContent = extractDayOfWeek(forecastWeatherData.list[i].dt);
                let hitemp = document.createElement("span");
                let photoicon = document.createElement("img");
                let lowtemp = document.createElement("span");

                hitemp.textContent = `Hi: ${utilizeData.tempManipulate(forecastWeatherData.list[i].main.temp_max)}\xB0F`;
                lowtemp.textContent = `Low: ${utilizeData.tempManipulate(forecastWeatherData.list[i].main.temp_min)}\xB0F`;
                photoicon.src = `http://openweathermap.org/img/wn/${forecastWeatherData.list[i].weather[0].icon}@2x.png`;
                forecastChildren[index].appendChild(title);
                forecastChildren[index].appendChild(hitemp);
                forecastChildren[index].appendChild(lowtemp);
                forecastChildren[index].appendChild(photoicon);
                index++;
                currentDay = extractDayOfWeek(forecastWeatherData.list[i].dt);

            }

        }
    }
    function extractDayOfWeek(time){
        let dateTime = new Date(time * 1000);
        console.log(dateTime.toDateString());
        let dateTimeString = dateTime.toString();
        let dayOfWeek = dateTimeString.slice(0, dateTimeString.indexOf(" "));
        // console.log(dayOfWeek);
        return dayOfWeek;
        
    }
    function removeAllChildren(parent)
    {
        while(parent.firstChild)
        {
            parent.removeChild(parent.firstChild);
        }
        
    }
    function setTemp(forecastObject)
    {

    }
    return {startForecast};
})(document)