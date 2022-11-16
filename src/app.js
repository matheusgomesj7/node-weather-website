const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    author: 'Matheus Gomes'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    author: 'Matheus Gomes'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    title: 'Help',
    message: 'This is the help page.',
    author: 'Matheus Gomes'
  })
})

app.get('/weather', (req, res) => {

  if (!req.query.address) {
    return res.send({
      error: 'You must insert an address'
    })
  }

  geocode(req.query.address, (error, { query, lat, lon } = {}) => {
    if (error) {
      return res.send({
        error
      })
    }

    forecast(lat, lon, (error, data) => {
      if (error) {
        return res.send({
          error
        })
      }

      return res.send({
        forecast: data,
        location: query
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404',
    errorText: 'Article not found!',
    author: 'Matheus Gomes'
  })
})

app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    errorText: 'Page not found!',
    author: 'Matheus Gomes'
  })
})

app.listen(port, () => {
  console.log(`server is up on port ${port}`)
})