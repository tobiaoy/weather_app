// this is where we get the weather data
// we'll be getting a city and a unit system -> params
// we'll need to do this asynchronously so we'll use async/await statements

const getData = async (city, unitSystem) => {
    const apiKey = 'XSHR7BYPGJ7WXNRMMEWC7RMS2';
    const searchCity = city;
    const searchUnits = unitSystem;
    const query = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchCity}/today?unitGroup=${searchUnits}&key=${apiKey}&contentType=json`

    try {
        const response = await fetch(query, {mode:'cors'});
        const weatherData = await response.json();
        console.log(weatherData);
        console.log(searchCity);
        return weatherData;
    } catch (e) {
        console.log(e);
        alert(e);
        alert('invalid entry, please enter a valid city');
        
    }
}

export { getData };