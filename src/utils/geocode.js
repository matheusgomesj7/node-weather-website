const request = require('request')

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=bab877054ea8ffea1759a3e5602a4e70&query=${encodeURIComponent(address)}&limit=1`
  request({ url, json: true }, (err, { body: { data } } ) => {
    if (err) {
      callback('Unable to connect to Geocode API!')
    } else if (!data || data.length === 0) {
      callback(`Unable to find location ${address}! Try another search`)
    }
    else {
      const { name, latitude, longitude } = data[0]
      const finalData = {
        query: name,
        lat: latitude,
        lon: longitude
      }
      callback(null, finalData)
    }
  })
};

module.exports = geocode