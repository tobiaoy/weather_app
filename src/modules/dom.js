import { createView, makeForecastBlock } from './view';
import { getData } from './data';
import "../style.css";

// this is where we'll map view actions to the weather data for the dom
// search button > trigger a data call > fill data spots in the view
// met/imp button > change the unit sys & make a call > fill data spots
// dynamically fill the forecast group (during fill)

const setDom = () => {
    const tempDisplay = createView(); // create a view to work with
    let unitSystem = 'metric';

    const getSymbol = () => {
        if (unitSystem == 'metric'){
            return '°C';
        } else {
            return '°F';
        }
    }

    // getData(city, unitSystem) > default: toronto, metric
    // get the city from the view
    let searchCity = 'toronto' // search input > value
    let searchBtn = tempDisplay.searchGroup.childNodes[1] // search btn
    let unitSystemBtn = tempDisplay.searchGroup.childNodes[2] // unit system btn
    let weatherData;

    window.addEventListener('load', () => {
        try {
            updateWeatherView();
        } catch (e) {
            console.log(e);
        }
    })

    searchBtn.addEventListener('click', (event) => {
        try {
            event.preventDefault();
            searchCity = tempDisplay.searchGroup.childNodes[0].value ? tempDisplay.searchGroup.childNodes[0].value : 'toronto';
            updateWeatherView();
        } catch (e) {
            console.log(e);
        }
    })

    unitSystemBtn.addEventListener('click', (event) => {
        try {
            event.preventDefault();
            searchCity = tempDisplay.searchGroup.childNodes[0].value ? tempDisplay.searchGroup.childNodes[0].value : 'toronto';
            if (unitSystem == 'metric'){
                unitSystem = 'us';
            } else {
                unitSystem = 'metric';
            }
            updateWeatherView();
        } catch (e) {
            console.log(e);
        }
    })

    // make a function to update the display
    // get values > day, time, temp, description, feels like, high/low, rest of the day forecast
    const setWeatherValues = async () => {
        try {
            weatherData = await getData(searchCity, unitSystem);
            let dayData = weatherData.days[0].datetime;
            let timeData = weatherData.currentConditions.datetime;
            let locData = weatherData.resolvedAddress;
            let tempData = weatherData.currentConditions.temp;
            let descData = weatherData.currentConditions.conditions;
            let feelslikeData = weatherData.currentConditions.feelslike;
            let highData = weatherData.days[0].tempmax;
            let lowData = weatherData.days[0].tempmin;
            let forecastData = weatherData.days[0].hours;
            let iconData = weatherData.currentConditions.icon;
            // 
            return { dayData, timeData, locData, tempData, descData, feelslikeData, highData, lowData, forecastData, iconData }
        } catch (e) {
            console.log(e);
        }
    }

    // get view points > infogroup
    let viewDay = tempDisplay.infoGroup.childNodes[0]; // info day
    let viewTime = tempDisplay.infoGroup.childNodes[1]; // info time
    let viewIcon = tempDisplay.infoGroup.childNodes[2].childNodes[0] // info icon
    let viewLoc = tempDisplay.infoGroup.childNodes[2].childNodes[1]; // info loc
    let viewTemp = tempDisplay.infoGroup.childNodes[2].childNodes[2]; // info temp
    let viewDesc = tempDisplay.infoGroup.childNodes[2].childNodes[3]; // info desc
    let viewFeelsLike = tempDisplay.infoGroup.childNodes[3]; // info feelsLike
    let viewHighLow = tempDisplay.infoGroup.childNodes[4]; // info highlow

    const updateWeatherView = async () => {
        try {
            let weatherValues = await setWeatherValues();
            
            // info group
            viewDay.textContent = weatherValues.dayData;
            viewTime.textContent = weatherValues.timeData;
            viewLoc.textContent = weatherValues.locData;
            viewTemp.textContent = `${weatherValues.tempData}${getSymbol()}`;
            viewDesc.textContent = weatherValues.descData;
            viewFeelsLike.textContent = `Feels Like: ${weatherValues.feelslikeData}${getSymbol()}`;
            viewHighLow.textContent = `High: ${weatherValues.highData} ${getSymbol()} / Low: ${weatherValues.lowData} ${getSymbol()}`;
            viewIcon.src = `/weather_app/icons/${weatherValues.iconData}.svg`

            // forecast group > make a function to create forecast blocks
            // need to go from the current time to the end of the day > a subset
            // get the current hour from the time
            // > use a loop
            let currentHour = weatherValues.timeData.slice(0,2); // now we need it to be an int
            currentHour = parseInt(currentHour);

            let forecastArray = Array.from(weatherValues.forecastData); // will start from current hour to the end of the array.
            forecastArray = forecastArray.slice(currentHour);
            console.log(forecastArray);

            // clear the forecast group
            tempDisplay.forecastGroup.innerHTML = '';

            // refill the forecast group
            for (let fc in forecastArray){
                let symbol = getSymbol();
                let forecastBlock = makeForecastBlock(forecastArray[fc], symbol);
                tempDisplay.forecastGroup.appendChild(forecastBlock);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return {
        tempDisplay
    }
}

export { setDom };