import express from 'express'
import { env } from '../env/index.js'
import { routes } from './http/routes/index.js'

const app = express()
app.use(express.json())

app.use(routes)

app.listen(env.PORT, () => {
  console.log(`Server Film Fans is running on port ${env.PORT}`)
})

app.get('/v1/film-fans/check-live', (req, res) => {
  res.send("I'm live and breathing")
})
