const toggle = document.querySelector(".toggle")
let tempF;
let count = 1;
let weatherInfo;
const weatherPNG = document.querySelector('.weatherPNG');
const button = document.querySelector('button');
const locationName = document.querySelector("#locationName");
const wrapper = document.querySelector(".humwrap");
const week = document.querySelector(".week");
let numeral = document.querySelector(".temp");
async function getLo(place) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=GMT9FQDW6A7TDWG23W3S6SPHW 
`);
try {
    const weatherData = await response.json();
    console.log(weatherData);
    tempF = weatherData.currentConditions.temp;
    weatherInfo = weatherData;
    locationName.textContent = `  ${place}`;
    toggle.style.display = "block";
    wrapper.setAttribute("style","display:flex;");
    const currentDescription = weatherInfo.currentConditions.icon;
    const iconUrl = `icons/${currentDescription}.png`;
    const icon = document.querySelector("#icon");
    icon.src = iconUrl;
    icon.setAttribute("style","display:block; ");
    numeral = document.querySelector(".temp");
    const weatherDescripition = document.querySelector(".weatherDescription");
    numeral.textContent = `${Math.round(tempF)}°F`;
    weatherDescripition.textContent = `${currentDescription}`;

    //windspeed and humidity 
    const humidity = document.querySelector(".humidityNum");
    humidity.textContent =`${weatherInfo.currentConditions.humidity}%`
    const windspeed = document.querySelector(".windSpeedNum");
    windspeed.textContent = `${weatherInfo.currentConditions.windspeed}m/s`

    //add display for the next 5 days forecast
    for(let i =2; i<=6; i++) {
        const sub = document.createElement("div");
        sub.classList.add("sub");
        const title = document.createElement("h3");
        title.classList.add("date");
        const dateTemp = document.createElement("h3");
        dateTemp.classList.add("weekTemp");
        const dateImage = document.createElement("img");

        //formatted weather
        const dateUpdate = new Date(weatherInfo.days[i].datetime);
        const options = {month: 'short', day: '2-digit'};
        const formattedDate = dateUpdate.toLocaleDateString('en-Us', options);
        title.textContent = `${formattedDate}`
    
        dateImage.src = `icons/${weatherInfo.days[i].icon}.png`
        dateImage.setAttribute("style","width: 30px; heigth: 30px;");
        dateTemp.textContent = `${Math.round(weatherInfo.days[i].temp)}`;
        sub.append(title,dateImage,dateTemp);
        week.appendChild(sub)

    }

}
catch (err) {
    window.alert(err.message)
}
}


let isValid;
let loco = document.querySelector("#location");
button.addEventListener("click", (event)=> {
    event.preventDefault();
    //clear the container holding weather info for the week so it doesn't overflow
    week.innerHTML = "";
    if (loco.value.trim().length < 3) {
        loco.setCustomValidity("Location must have at least 3 characters");
        isValid = false;
    }
    else {
        loco.setCustomValidity("");
        weatherPNG.setAttribute("style", "display: none");
        locationName.setAttribute("style", "display: block");
        getLo(loco.value);
    }

    if (!isValid) {
        loco.reportValidity();
    }
});

toggle.addEventListener("click", ()=> {
    if (count%2 === 0) {
        toggle.textContent = 'C'
        numeral.textContent = `${Math.round(tempF*(9/5)+32)}°F`
        tempF = Math.round(tempF*(9/5)+32);
    }
    else {
        toggle.textContent = "F"
        numeral.textContent = `${Math.round(((tempF-32)/9)*5)}°C`
        tempF = Math.round(((tempF-32)/9)*5);
    }
    count +=1;
})
