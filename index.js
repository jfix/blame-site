require('dotenv').config()
const express = require('express')
const giphy = require('giphy-api')()
const path = require('path')

const phrases = [
  'Blame on you!!!',
  'Consider yourself blamed!!!',
  'You\'ve been blamed right now!!!'
]

const app = express()
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  giphy.random('rage')
  .then((gif) => {
    res.render('index', {
      title: 'Blam-blam-blame!',
      message: phrases[Math.floor(Math.random() * phrases.length)],
      image: gif.data.image_url })
  })
  .catch((err) => {
    res.send(JSON.stringify(err))
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
