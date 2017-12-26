require('dotenv').config()
const express = require('express')
const giphy = require('giphy-api')()
const path = require('path')

const app = express()
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
  giphy.random('rage')
  .then((gif) => {
    res.render('index', {
      title: 'You\'re blamed!',
      message: 'Hello there!',
      image: gif.data.image_url })
  })
  .catch((err) => {
    res.send(JSON.stringify(err))
  })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
