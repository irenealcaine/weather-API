const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-items')
const timeZone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')

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

  timeEl.innerHTML = hour + ':' + minute
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
    <div class="flex items-center justify-around">
      <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="bg-sky-500 rounded-full">
      <div  class="text-4xl" id="current-temp">${temp}&#176; C</div>
    </div>

    <div class="flex justify-between">
      <div>Humedad</div>
      <div>${humidity} %</div>
    </div>

    <div class="flex justify-between">
      <div>Viento </div>
      <div>${wind_speed} m/s <span>NE</span></div>
    </div>
  `

  // <div class="flex justify-between">
  //   <div>Lluvia </div>
  //   <div>30%</div>
  // </div>

  let otherDayForecast = `  `



  data.daily.forEach((day, idx) => {
    if (idx == 0) {

    } else {

      const formatDays = new Date(day.dt * 1000);
      const showDay = days[formatDays.getDay()]
      otherDayForecast +=
        `
      <div class="bg-blue-700 rounded-xl py-2 px-4 w-full">
          <div class="flex justify-between items-center">
            <div class="day">${showDay}</div>
            <div class="flex items-center justify-end">
              <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="bg-sky-500 rounded-full w-10">
              <div class="temp">${day.temp.min}&#176; C - ${day.temp.max}&#176; C</div>
            </div>
          </div>
      </div>
      `
    }
  })

  weatherForecastEl.innerHTML = otherDayForecast
}
