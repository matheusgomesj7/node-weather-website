const request = require('request')

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cfb8773757fd67e6d3d52a8231be40f4&query=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`

  request({ url, json: true }, (err, { body: { error, current, location } }) => {
    if (err) {
      callback("Unable to connect to weather service!")
    } else if (error) {
      callback(`There was an error of type ${error.type}, and of code ${error.code}`)
    } else {
      callback(null, {
        forecast: `${current.weather_descriptions}. It is currently ${current.temperature} outside and it feels like ${current.feelslike} outside.`,
        location: `${location.name}, ${location.region}. ${location.country}`
      })
    }
  })
}

module.exports = forecast