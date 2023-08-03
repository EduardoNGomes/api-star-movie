import { Router } from 'express'
import { movieRouter } from '../Movie/router'
import { userRouter } from '../user/routes'
import { commentRouter } from '../comments/router'

const routes = Router()

routes.use('/user', userRouter)
routes.use('/movie', movieRouter)
routes.use('/comment', commentRouter)

export { routes }
