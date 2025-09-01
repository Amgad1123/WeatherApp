const toggle = document.querySelector(".toggle")
let tempF;
let count = 1;
let weatherInfo;
const weatherPNG = document.querySelector('.weatherPNG');
const button = document.querySelector('button');
const locationName = document.querySelector("#locationName");
const wrapper = document.querySelector(".humwrap");
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
    numeral.textContent = `${tempF}°F`;
    weatherDescripition.textContent = `${currentDescription}`;

    //add display for the next days forecast
    const day0Date = document.querySelector(".day0Date");
    const day0Image = document.querySelector(".day0Image");
    const day0Temp = document.querySelector(".day0Temp")

    day0Date.textContent = `${weatherInfo.days[1].datetime}`
    day0Image.src = `icons/${weatherInfo.days[1].icon}.png`
    day0Temp.textContent = `${weatherInfo.days[1].temp}`;

}
catch (err) {
    window.alert(err.message)
}
}


let isValid;
let loco = document.querySelector("#location");
button.addEventListener("click", (event)=> {
    event.preventDefault();
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
        //weather.textContent = `The weather is currently ${tempF} degrees Fahrenheit`;
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
