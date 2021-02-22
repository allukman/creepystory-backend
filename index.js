const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const port = process.env.port
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// router

const accountRouter = require('./src/router/account')
const memberRouter = require('./src/router/member')
const categoryRouter = require('./src/router/category')
const storyRouter = require('./src/router/story')
const favoriteRouter = require('./src/router/favorite')
const labelRouter = require('./src/router/label')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(express.json())

const corsOptions = {
  origin: '*', // All Domains
  method: ['*'], // All Methods
  allowedHeaders: ['Content-Type', 'Accept', 'Authorization', 'X-Requested-With']
}
app.use(cors(corsOptions))

// router use

app.use('/account', accountRouter)
app.use('/member', memberRouter)
app.use('/category', categoryRouter)
app.use('/story', storyRouter)
app.use('/favorite', favoriteRouter)
app.use('/label', labelRouter)

app.use('/images', express.static('./uploads'))

app.get('/', (request, response) => {
  response.send('Creepy Story Backend +_+')
})

app.listen(port, () => {
  console.log(`Listen app on port ${port}`)
})

module.exports = app
