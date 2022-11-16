console.log('Client side js is loaded')

const fetchWeather = async (query) => {
  try {
    const res = await fetch(`http://localhost:3000/weather?address=${query}`)
    const resJson = await res.json()
    if (resJson.error) {
      const error = {error: resJson.error}
      return error
    }
    const formattedData = {city: resJson.location, forecast: resJson.forecast}
    return formattedData
  } catch (err) {
    const error = {error: err}
    return err
  }
}

const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()

  msgOne.textContent = 'Loading...'
  msgTwo.textContent = ''

  const location = searchInput.value

  fetchWeather(location).then((result) => {
    if (result.error) {
      msgOne.textContent = result.error
    } else {
      msgOne.textContent = result.city
      msgTwo.textContent = result.forecast
    }
  })
})
