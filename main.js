
const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')
const hourlyData = document.getElementById('hourly-data')
const bg = document.getElementById('bg')

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const API_KEY = import.meta.env.VITE_API_KEY
const time = new Date()

setInterval(() => {
  const month = time.getMonth()
  const day = time.getDay()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const date = time.getDate()

  timeEl.innerHTML = (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
  dateEl.innerHTML = days[day] + ', ' + date + ' de ' + months[month]

}, 1000)

getWeatherData()
function getWeatherData() {
  navigator.geolocation.getCurrentPosition((succes) => {
    let { latitude, longitude } = succes.coords

    fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        showWeatherData(data)

      })
  })
}

function showWeatherData(data) {
  let { humidity, wind_speed, weather, temp } = data.current
  currentWeatherItemsEl.innerHTML =
    `
    <div class="flex items-center justify-around p-2">
      <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="bg-sky-500 rounded-full">
      <div  class="text-6xl" id="current-temp">${Math.round(temp)}&#176; C</div>
    </div>

    <div class="flex justify-between">
      <div>Humedad</div>
      <div>${humidity} %</div>
    </div>

    <div class="flex justify-between">
      <div>Viento </div>
      <div>${wind_speed} m/s</div>
    </div>
  `

  switch (weather[0].icon) {
    case '01d':
      bg.classList.add('bg-day')
      break
    case '01n':
      bg.classList.add('bg-night')
      break
    case '02d':
    case '02n':
    case '03d':
    case '03n':
    case '04d':
    case '04n':
      bg.classList.add('bg-clouds')
      break
    case '09d':
    case '09n':
    case '10d':
    case '10n':
      bg.classList.add('bg-rain')
      break
    case '11d':
    case '11n':
      bg.classList.add('bg-storm')
      break
    case '13d':
    case '13n':
      bg.classList.add('bg-snow')
      break
    case '50d':
    case '50n':
      bg.classList.add('bg-mist')
      break
  }

  let otherDayForecast = `  `

  data.daily.forEach((day, idx) => {
    if (idx == 0) {

    } else {

      const formatDays = new Date(day.dt * 1000);
      const showDay = days[formatDays.getDay()]

      otherDayForecast +=
        `
        <div class="bg-blue-700 bg-opacity-60 rounded-xl py-2 px-4 w-full hover:cursor-pointer">
          <details>
            <summary class="list-none">
              <div class="flex md:flex-col justify-between items-center">
                <div class="text-xl">${showDay}</div>
                <div class="flex md:flex-col items-center justify-end">
                  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="bg-sky-500 rounded-full w-10">
                  <div class="pl-4">${Math.round(day.temp.min)}&#176; C - ${Math.round(day.temp.max)}&#176; C</div>
                </div>
              </div>
            </summary>
            <div class="border-2 rounded-xl px-4 py-2 mt-2 text-sm">
              <div>Humedad: <b>${day.humidity}%</b></div>
              <div>Viento: <b>${day.wind_speed} m/s</b></div>
              <div>Prob. de lluvia: <b>${Math.round(day.pop * 100)}%</b></div>
            </div>
          </details>
        </div>
        `
    }
  })

  weatherForecastEl.innerHTML = otherDayForecast

  let hoursly = []
  let hoursForecast = []
  let hourslyRain = []

  data.hourly.forEach((hour, idx) => {
    if (idx <= 24) {
      hoursly[idx] = hour.temp
      hourslyRain[idx] = hour.pop * 100
      hoursForecast[idx] = `${new Date(hour.dt * 1000).getHours()}:00`
    }
  })

  const myChart = new Chart(hourlyData, {
    data: {
      labels: hoursForecast,
      datasets: [{
        type: 'line',
        label: 'Temperatura (ºC)',
        data: hoursly,
        borderColor: '#c2410c',
        radius: 0,
        tension: 0.4,

      }, {
        label: '',
        type: 'bar',
        label: 'Probabilidad de lluvia (%)',
        data: hourslyRain,
        backgroundColor: '#1d4ed8aa',
        borderColor: '#1d4ed8',
        borderWidth: 2,
        yAxisID: 'yAxis'
      }]
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "white"
          },
          grid: {
            color: "transparent"
          }
        },
        y: {
          ticks: {
            color: "white"
          },
          grid: {
            color: "transparent"
          },
        },
        yAxis: {
          position: 'right',
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            color: "white"
          },
          grid: {
            color: "transparent"
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            boxWidth: 2,
            boxHeight: 2
          }
        }
      }
    }
  },
  );
}



