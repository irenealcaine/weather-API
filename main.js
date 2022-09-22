
const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timeZone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')
const hourlyData = document.getElementById('hourly-data')

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
  let { humidity, wind_speed, weather, temp, rain } = data.current
  currentWeatherItemsEl.innerHTML =
    `
    <div class="flex items-center justify-around">
      <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="bg-sky-500 rounded-full">
      <div  class="text-4xl" id="current-temp">${Math.round(temp)}&#176; C</div>
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

  let otherDayForecast = `  `

  data.daily.forEach((day, idx) => {
    if (idx == 0) {

    } else {

      const formatDays = new Date(day.dt * 1000);
      const showDay = days[formatDays.getDay()]

      otherDayForecast +=
        `
        <div class="bg-blue-700 rounded-xl py-2 px-4 w-full">
          <details>
            <summary class="list-none">
              <div class="flex justify-between items-center">
                <div class="day">${showDay}</div>
                <div class="flex items-center justify-end">
                  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="bg-sky-500 rounded-full w-10">
                  <div class="temp">${Math.round(day.temp.min)}&#176; C - ${Math.round(day.temp.max)}&#176; C</div>
                </div>
              </div>
            </summary>
            <div class="border-2 rounded-xl px-4 py-2 mt-2">
              <div>Humedad: ${day.humidity}%</div>
              <div>Viento: ${day.wind_speed} m/s</div>
              <div>Lluvia: ${day.rain} mm</div>
            </div>
          </details>
        </div>
        `
    }
  })

  weatherForecastEl.innerHTML = otherDayForecast

  let hoursly = []
  let hoursForecast = []

  data.hourly.forEach((hour, idx) => {
    if (idx <= 12) {
      hoursly[idx] = `${hour.temp}`
      hoursForecast[idx] = `${new Date(hour.dt * 1000).getHours()}:00`
    }
  })



  const hours = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  const temps = [20, 25, 22, 24, 26, 27]

  const myChart = new Chart(hourlyData, {
    type: 'line',
    data: {
      labels: hoursForecast,
      datasets: [{
        label: 'Temperatura en las próximas horas',
        scalesFontColor: '#fff',
        data: hoursly,
        borderColor: '#1d4ed8',
        radius: 0,
        tension: 0.4,
      }]
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: "white"
          },
          grid: {
            color: "#999"
          }
        },
        y: {
          ticks: {
            color: "white"
          },
          grid: {
            color: "#999"
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: 'white',
            boxWidth: 0,
            boxHeight: 0
          }
        }
      }
    }
  });
}



