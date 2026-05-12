const express = require('express')
const cors = require('cors')

const alternativeRoutes = require('./routes/alternativeRoutes')
const criteriaRoutes = require('./routes/criteriaRoutes')
const topsisRoutes = require('./routes/topsisRoutes')
const scoreRoutes = require('./routes/scoreRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Backend SPK TOPSIS is running')
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/alternatives', alternativeRoutes)
app.use('/api/criterias', criteriaRoutes)
app.use('/api/topsis', topsisRoutes)
app.use('/api/scores', scoreRoutes)

module.exports = app