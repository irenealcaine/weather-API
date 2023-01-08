
import 'chartjs-plugin-datalabels'

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
    <div class="flex items-center justify-start p-2">
      <img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="weather icon" class="bg-sky-500 rounded-full mr-2 w-16">
      <div class="text-6xl font-bold" id="current-temp">${Math.round(temp)}&#176;C</div>
    </div>

    <div class="flex justify-between">
      <div class="font-thin">💧 Humedad</div>
      <div class="font-bold">${humidity} %</div>
    </div>

    <div class="flex justify-between">
      <div class="font-thin">🪁 Viento </div>
      <div class="font-bold">${wind_speed} m/s</div>
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
        <div class="w-full py-2 px-4 border-b border-sky-500 md:border-b-0">
              <div class="flex md:flex-col justify-between items-center gap-2">
                <div class="text-lg bg-slate-900/50 py-0.5 px-2 rounded">${showDay}</div>
                <div class="flex items-center justify-end">
                  <div class="font-bold text-2xl">${Math.round(day.temp.day)}&#176;C</div>
                  <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="weather icon" class="bg-sky-500 rounded-full w-10 ml-2 w-8">
                </div>
              </div>
            <div class="flex md:flex-col mt-2 text-sm font-thin">
              <div class="ml-4 md:ml-0 lg:ml-4">💧 ${day.humidity}%</div>
              <div class="ml-4 md:ml-0 lg:ml-4">🪁 ${day.wind_speed} m/s</div>
              <div class="ml-4 md:ml-0 lg:ml-4">🌧️ ${Math.round(day.pop * 100)}%</div>
            </div>
        </div>
        `
    }
  })

  weatherForecastEl.innerHTML = otherDayForecast

  let hoursly = []
  let hoursForecast = []
  let hourslyRain = []

  data.hourly.forEach((hour, idx) => {
    if (idx <= 12) {
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
        borderWidth: 5,
        radius: 0,
        tension: 0.4
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
        },
        datalabels: {
          anchor: 'end',
          align: 'top',
          color: '#36A2EB'
        }
      }
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#36A2EB'
      }
    }
  },
  );
}



