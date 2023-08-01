import { Router } from 'express'
import { movieRouter } from '../Movie/router'
import { userRouter } from '../user/routes'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/movie', movieRouter)

export { routes }
