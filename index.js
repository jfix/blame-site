require('dotenv').config()
const express = require('express')
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY)
const path = require('path')

const phrases = [
  'Blame on you!!!',
  'Consider yourself blamed!!!',
  'You\'ve been blamed right now!!!',
  'Such blame! Wow!'
]
const keywords = [
  'rage', 'leave', 'get-out', 'stop-it', 'blame'
]

const app = express()
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  giphy.random(keywords[Math.floor(Math.random() * keywords.length)])
  .then((gif) => {
    console.log(`gif is: ${gif.data.images.original.url}`)
    res.render('index', {
      title: 'Blam-blam-blame!',
      message: phrases[Math.floor(Math.random() * phrases.length)],
      image: gif.data.images.original.url
    })
  })
  .catch((err) => {
    res.send(JSON.stringify(err))
  })
})
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Blamer now running on ${port}!`))
