const container = document.querySelector('.container');
const search = document.querySelector('.search button');
const weather = document.querySelector('.weather-box');
const presentation = document.querySelector('.presentation');
const error = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIKey = 'Your Api Key';
  const city = document.querySelector('.search input').value;

  if (city === ''){
    return
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
  .then(response => response.json())
  .then(json => {

    if(json.cod === '404'){
      container.style.height = '400px';
      weather.style.display = 'none';
      presentation.style.display = 'none';
      error.style.display = 'block';
      error.classList.add('fadeIn');
      return;
    }

    error.style.display = 'none';
    error.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.presentation .humidity span');
    const wind = document.querySelector('.presentation .wind span');

    switch (json.weather[0].main) {
      case 'Clear':
        image.src = 'images/clear.png';
        break;

      case 'Rain':
        image.src = 'images/rain.png';
        break;

      case 'Snow':
        image.src = 'images/snow.png';
        break;

      case 'Clouds':
        image.src = 'images/cloud.png';
        break;
      
      case 'Haze':
        image.src = 'images/haze.png';
        break;

      default:
        image.src = '';
    }

    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

    weather.style.display = '';
    presentation.style.display = '';
    weather.classList.add('fadeIn');
    presentation.classList.add('fadeIn');
    container.style.height = '590px';

  })
})