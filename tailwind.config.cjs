/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'day': "url('https://images.unsplash.com/photo-1598965914211-6ec6872593a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')",
        'night': "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1826&q=80')",
        'clouds': "url('https://images.unsplash.com/photo-1536244636800-a3f74db0f3cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1992&q=80')",
        'rain': "url('https://images.unsplash.com/photo-1501691223387-dd0500403074?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60')",
        'storm': "url('https://images.unsplash.com/photo-1516490981167-dc990a242afe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')",
        'snow': "url('https://images.unsplash.com/photo-1414541944151-2f3ec1cfd87d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80')",
        'mist': "url('https://images.unsplash.com/photo-1543968996-ee822b8176ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1228&q=80')",
      }
    },
  },
  plugins: [],
}
