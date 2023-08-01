import { Router } from 'express'
import { createUser } from './User.controller'

const userRouter = Router()

userRouter.post('/', createUser)

export { userRouter }
