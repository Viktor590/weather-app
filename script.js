"use strict"

const input = document.querySelector('.input');
const btn = document.querySelector('.btn');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  presBtn();
});


function presBtn() {
  const errorInput = document.querySelector('.error__input');
  const noneInput = document.querySelector('.none__input');
  const innerCard = document.querySelector('.weather__card-inner');


  if (input.value === '') {
    input.style.borderColor = 'red';
    noneInput.style.display = 'block';
    setTimeout(() => {
      noneInput.style.display = 'none';
      input.style.borderColor = 'aqua';
    }, 1000);
  } else {
    getResource(`http://api.openweathermap.org/data/2.5/weather?q=${input.value} &units=metric&appid=cb1eb5f8c89a3cef004e7044e143e369`)
      .then(data => {
        const { icon, description } = data.weather[0],
          name = data.name,
          temp = data.main.temp,
          speed = data.wind.speed,
          iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;



        const elem = document.createElement('div');
        elem.classList.add('weather__card');
        elem.innerHTML = `
            <img src=${iconUrl} class="weather__icon" alt="фото">
            <h3 class="weather__name-city">
              ${name}
            </h3>
            <p class="weather__temp">
              темп: ${Math.round(temp)} &deg;
            </p>
            <p class="weather__dscr">
              ${description}
            </p>
            <p class="weather-speed">
              скорость ветра ${speed.toFixed(1)}
            </p>
          `;
        innerCard.append(elem);
      })
      .catch(() => {
        input.style.borderColor = 'red';
        errorInput.style.display = 'block';
        setTimeout(() => {
          errorInput.style.display = 'none';
          input.style.borderColor = 'aqua';
          input.value = '';
        }, 2000);
      })
  };

}

async function getResource(url) {
  let res = await fetch(url);

  return await res.json();
}



