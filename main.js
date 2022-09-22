const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-item')
const timeZone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const API_KEY = import.meta.env.VITE_API_KEY

setInterval(() => {
  const time = new Date()
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

}
