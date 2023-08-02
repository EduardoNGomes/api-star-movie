import express from 'express'
import 'express-async-errors'
import { env } from '../env/index.js'
import { routes } from './http/routes/index.js'
import { errorHandler } from './configs/erros.js'
import { UPLOADS_FOLDER } from './configs/multer.js'

const app = express()

app.use(express.json())

app.use(routes)
app.use('/files', express.static(UPLOADS_FOLDER))
app.use(errorHandler)

app.get('/v1/film-fans/check-live', (req, res) => {
  res.send("I'm live and breathing")
})

app.listen(env.PORT, () => {
  console.log(`Server Film Fans is running on port ${env.PORT}`)
})
