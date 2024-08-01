// set up the visuals of the weather app
// everything should be in one overall div > weather
// search group > search input, search btn, metric/imperial btn
// info group > day, time, temp, description, feels like, high, low
// forecast group > remaining hours of the day temps
import "../style.css";

const createView = () => {
    const weatherGroup = document.createElement('div');
    weatherGroup.setAttribute('id', 'weather-group');

    // search group
    const searchGroup = document.createElement('div');
    searchGroup.setAttribute('id', 'search-group');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('placeholder', 'Enter a city');
    searchInput.setAttribute('required', true);
    searchInput.setAttribute('type', 'text');

    const searchBtn = document.createElement('button');
    searchBtn.setAttribute('id', 'search-btn');
    searchBtn.textContent = 'Search';

    const unitSystemBtn = document.createElement('button');
    unitSystemBtn.setAttribute('id', 'unit-system-btn');
    unitSystemBtn.textContent = 'Metric / Imperial (US)';

    searchGroup.append(searchInput, searchBtn, unitSystemBtn);

    // info group
    const infoGroup = document.createElement('div');
    infoGroup.setAttribute('id', 'info-group');

    const infoDay = document.createElement('p');
    infoDay.setAttribute('id', 'info-day');

    const infoTime = document.createElement('p');
    infoTime.setAttribute('id', 'info-time');

    // an inner block for the actual temp and a short description below
    const tempBlock = document.createElement('div');
    tempBlock.setAttribute('id', 'temp-block');
    
    const infoIcon = document.createElement('img');
    infoIcon.setAttribute('id', 'main-icon');

    const infoLoc = document.createElement('p');
    infoLoc.setAttribute('id', 'info-loc');

    const infoTemp = document.createElement('p');
    infoTemp.setAttribute('id', 'info-temp');

    const infoDesc = document.createElement('p');
    infoDesc.setAttribute('id', 'info-desc');

    tempBlock.append(infoIcon, infoLoc, infoTemp, infoDesc);

    // inner block ends
    const infoFeelsLike = document.createElement('p');
    infoFeelsLike.setAttribute('id', 'info-feels-like');

    const infoHighLow = document.createElement('p');
    infoHighLow.setAttribute('id', 'info-high-low');

    infoGroup.append(infoDay, infoTime, tempBlock, infoFeelsLike, infoHighLow);

    // forecast group > dynamically fills tills the 24th hour of the day
    const forecastGroup = document.createElement('div');
    forecastGroup.setAttribute('id', 'forecast-group');

    weatherGroup.append(searchGroup, infoGroup, forecastGroup);

    return {
        weatherGroup,
        searchGroup, 
        infoGroup,
        forecastGroup,
    }

}

const makeForecastBlock = (dayData, symbol) => {
    // Create container
    const container = document.createElement('div');
    container.classList.add('forecast-block');

    // Create and configure the image element
    const blockIcon = document.createElement('img');
    blockIcon.classList.add('forecast-icon');
    blockIcon.src = `../../icons/${dayData.icon}.svg`;  // Set the source of the image
    blockIcon.alt = dayData.icon;  // Set alt text

    // Create and configure the hour paragraph
    const blockHour = document.createElement('p');
    blockHour.classList.add('forecast-block-hour');
    blockHour.textContent = dayData.datetime;  // Set the time/date text

    // Create and configure the temperature paragraph
    const blockTemp = document.createElement('p');
    blockTemp.classList.add('forecast-block-temp');
    blockTemp.textContent = `${dayData.temp} ${symbol}`;  // Set temperature with symbol

    // Create and configure the description paragraph
    const blockDesc = document.createElement('p');
    blockDesc.classList.add('forecast-block-desc');
    blockDesc.textContent = dayData.conditions;  // Set the weather condition text

    // Append all elements to the container
    container.append(blockIcon, blockHour, blockTemp, blockDesc);

    // Return the fully assembled block
    return container;
}


export {createView, makeForecastBlock};