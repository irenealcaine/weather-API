const timeEl = document.getElementById('time')
const dateEl = document.getElementById('date')
const currentWeatherItemsEl = document.getElementById('current-weather-item')
const timeZone = document.getElementById('time-zone')
const countryEl = document.getElementById('country')
const weatherForecastEl = document.getElementById('weather-forecast')
const currentTempEl = document.getElementById('current-temp')

const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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


